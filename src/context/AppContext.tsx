import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ClassLevel,
  SubjectId,
  SubjectInfo,
  Chapter,
  StudyMaterial,
  Question,
  QuizConfig,
  QuizAttempt,
  StudentProfile,
  DoubtQuery,
  AppNotification,
  UserAccount,
  PYQPaper
} from '../types';
import { SEED_STUDY_MATERIALS } from '../data/seedStudyMaterials';
import { SEED_QUESTIONS } from '../data/seedQuestions';
import { SEED_QUIZZES } from '../data/seedQuizzes';
import { INITIAL_PYQ_PAPERS } from '../data/pyqData';
import { CLASSES_LIST, SUBJECTS_LIST, CHAPTERS_DATA } from '../data/curriculumData';
import { 
  syncProfileToSupabase, 
  saveQuizAttemptToSupabase, 
  submitDoubtToSupabase 
} from '../lib/supabase';

export interface AuthSuccessCallback {
  (): void;
}

interface AppContextType {
  // Authentication & Unified Role System
  currentUser: UserAccount | null;
  isAuthenticated: boolean;
  userRole: 'student' | 'admin';
  setUserRole: (role: 'student' | 'admin') => void;
  registeredStudents: UserAccount[];
  
  // Auth Modal Controls
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register' | 'admin';
  authNoticeMessage: string;
  openAuthModal: (tab?: 'login' | 'register' | 'admin', notice?: string, onSuccess?: AuthSuccessCallback) => void;
  closeAuthModal: () => void;
  login: (credentials: { emailOrId: string; password?: string; role?: 'student' | 'admin' }) => { success: boolean; message?: string };
  register: (data: { name: string; email: string; studentId: string; classLevel: ClassLevel; password?: string }) => { success: boolean; message?: string };
  logout: () => void;

  // Student Profile & Progress
  studentProfile: StudentProfile;
  updateStudentProfile: (profile: Partial<StudentProfile>) => void;
  selectedClassFilter: ClassLevel | 'ALL';
  setSelectedClassFilter: (cl: ClassLevel | 'ALL') => void;
  selectedSubjectFilter: SubjectId | 'ALL';
  setSelectedSubjectFilter: (sub: SubjectId | 'ALL') => void;
  
  // Custom Curriculum Management
  customClasses: Array<{ level: string; name: string; subtitle: string }>;
  addCustomClass: (cls: { level: string; name: string; subtitle: string }) => void;
  deleteCustomClass: (level: string) => void;
  
  customSubjects: SubjectInfo[];
  addCustomSubject: (sub: SubjectInfo) => void;
  deleteCustomSubject: (id: string) => void;
  
  customChapters: Chapter[];
  addCustomChapter: (ch: Chapter) => void;
  deleteCustomChapter: (id: string) => void;
  
  // Study Materials
  studyMaterials: StudyMaterial[];
  addStudyMaterial: (material: Omit<StudyMaterial, 'id' | 'uploadedDate'>) => void;
  deleteStudyMaterial: (id: string) => void;
  togglePublishMaterial: (id: string) => void;
  
  // Questions
  questionBank: Question[];
  addQuestion: (question: Omit<Question, 'id'>) => void;
  deleteQuestion: (id: string) => void;
  togglePublishQuestion: (id: string) => void;
  
  // Quizzes
  quizzes: QuizConfig[];
  createQuiz: (quiz: Omit<QuizConfig, 'id'>) => void;
  deleteQuiz: (id: string) => void;
  togglePublishQuiz: (id: string) => void;
  
  // Attempts & Bookmarks
  quizAttempts: QuizAttempt[];
  recordQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'date'>) => QuizAttempt;
  toggleBookmark: (materialId: string) => void;
  toggleQuestionBookmark: (questionId: string) => void;
  
  // Test Review & Certificate
  activeCertificateAttempt: QuizAttempt | null;
  setActiveCertificateAttempt: (attempt: QuizAttempt | null) => void;
  activeTestForReview: QuizAttempt | null;
  setActiveTestForReview: (attempt: QuizAttempt | null) => void;

  // Doubts & Q&A
  doubts: DoubtQuery[];
  submitDoubt: (doubt: Omit<DoubtQuery, 'id' | 'timestamp' | 'status'>) => void;
  replyToDoubt: (id: string, reply: string) => void;

  // Previous Years Papers (PYQs)
  pyqPapers: PYQPaper[];
  addPYQPaper: (paper: Omit<PYQPaper, 'id' | 'uploadedAt'>) => void;
  deletePYQPaper: (id: string) => void;
  
  // Notifications
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'timestamp' | 'isRead'>) => void;
  
  syncAllCBSESkillMaterials: () => void;
  resetAllData: () => void;
}

// Single authorized Administrator account
const ADMIN_ACCOUNT: UserAccount = {
  id: 'usr-admin-1',
  name: 'Mr. Zakir Hussain',
  email: 'zakhu1099@gmail.com',
  studentId: 'ADMIN-01',
  classLevel: 'XII',
  role: 'admin',
  avatarSeed: 'Zakir',
  createdAt: '2026-01-01'
};

const DEFAULT_STUDENTS: UserAccount[] = [ADMIN_ACCOUNT];

const DEFAULT_PROFILE: StudentProfile = {
  id: '',
  name: 'Student',
  studentId: '',
  classLevel: 'X',
  email: '',
  avatarSeed: 'Student',
  targetExamYear: '2026',
  enrolledSubjects: ['it-402'],
  bookmarks: [],
  bookmarkedQuestions: [],
  chaptersCompletedCount: 0,
  questionsSolvedCount: 0,
  badges: []
};

const DEFAULT_ATTEMPTS: QuizAttempt[] = [];

const DEFAULT_NOTIFICATIONS: AppNotification[] = [];

const DEFAULT_DOUBTS: DoubtQuery[] = [];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Unified User & Auth State
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('zakir_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [registeredStudents, setRegisteredStudents] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem('zakir_registered_students');
    return saved ? JSON.parse(saved) : DEFAULT_STUDENTS;
  });

  const [userRole, setUserRole] = useState<'student' | 'admin'>(() => {
    return currentUser?.role || 'student';
  });

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register' | 'admin'>('login');
  const [authNoticeMessage, setAuthNoticeMessage] = useState<string>('');
  const [authSuccessCallback, setAuthSuccessCallback] = useState<{ cb?: AuthSuccessCallback } | null>(null);

  // Student Profile
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('zakir_student_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_PROFILE;
      }
    }
    return DEFAULT_PROFILE;
  });

  // Filtering
  const [selectedClassFilter, setSelectedClassFilter] = useState<ClassLevel | 'ALL'>('ALL');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<SubjectId | 'ALL'>('ALL');

  // Custom Content Lists
  const [customClasses, setCustomClasses] = useState<Array<{ level: string; name: string; subtitle: string }>>(() => {
    const saved = localStorage.getItem('zakir_custom_classes');
    return saved ? JSON.parse(saved) : CLASSES_LIST;
  });

  const [customSubjects, setCustomSubjects] = useState<SubjectInfo[]>(() => {
    const saved = localStorage.getItem('zakir_custom_subjects');
    return saved ? JSON.parse(saved) : SUBJECTS_LIST;
  });

  const [customChapters, setCustomChapters] = useState<Chapter[]>(() => {
    const saved = localStorage.getItem('zakir_custom_chapters');
    return saved ? JSON.parse(saved) : CHAPTERS_DATA;
  });

  // Production-ready clean reset: permanently delete all demo/test content
  useEffect(() => {
    const PROD_KEY = 'zakir_prod_clean_slate_2026_final_v2';
    if (!localStorage.getItem(PROD_KEY)) {
      // Purge all old demo/sample local storage records
      localStorage.removeItem('zakir_study_materials');
      localStorage.removeItem('zakir_questions');
      localStorage.removeItem('zakir_quizzes');
      localStorage.removeItem('zakir_quiz_attempts');
      localStorage.removeItem('zakir_doubts');
      localStorage.removeItem('zakir_notifications');
      localStorage.removeItem('learn_zakir_highlights');
      localStorage.removeItem('learn_zakir_stickynotes');
      localStorage.removeItem('zakir_current_user');
      
      // Preserve only the real administrator account
      localStorage.setItem('zakir_registered_students', JSON.stringify([ADMIN_ACCOUNT]));
      localStorage.setItem('zakir_student_profile', JSON.stringify(DEFAULT_PROFILE));
      localStorage.setItem('zakir_study_materials', JSON.stringify([]));
      localStorage.setItem('zakir_questions', JSON.stringify([]));
      localStorage.setItem('zakir_quizzes', JSON.stringify([]));
      localStorage.setItem('zakir_quiz_attempts', JSON.stringify([]));
      localStorage.setItem('zakir_doubts', JSON.stringify([]));
      localStorage.setItem('zakir_notifications', JSON.stringify([]));
      localStorage.setItem('zakir_custom_classes', JSON.stringify(CLASSES_LIST));
      localStorage.setItem('zakir_custom_subjects', JSON.stringify(SUBJECTS_LIST));
      localStorage.setItem('zakir_custom_chapters', JSON.stringify(CHAPTERS_DATA));
      
      localStorage.setItem(PROD_KEY, 'true');

      setCurrentUser(null);
      setRegisteredStudents([ADMIN_ACCOUNT]);
      setStudentProfile(DEFAULT_PROFILE);
      setStudyMaterials([]);
      setQuestionBank([]);
      setQuizzes([]);
      setQuizAttempts([]);
      setDoubts([]);
      setNotifications([]);
      setCustomClasses(CLASSES_LIST);
      setCustomSubjects(SUBJECTS_LIST);
      setCustomChapters(CHAPTERS_DATA);
    }
  }, []);

  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>(() => {
    const saved = localStorage.getItem('zakir_study_materials');
    return saved ? JSON.parse(saved) : [];
  });

  const [questionBank, setQuestionBank] = useState<Question[]>(() => {
    const saved = localStorage.getItem('zakir_questions');
    return saved ? JSON.parse(saved) : [];
  });

  const [quizzes, setQuizzes] = useState<QuizConfig[]>(() => {
    const saved = localStorage.getItem('zakir_quizzes');
    return saved ? JSON.parse(saved) : [];
  });

  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>(() => {
    const saved = localStorage.getItem('zakir_quiz_attempts');
    return saved ? JSON.parse(saved) : [];
  });

  const [doubts, setDoubts] = useState<DoubtQuery[]>(() => {
    const saved = localStorage.getItem('zakir_doubts');
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('zakir_notifications');
    return saved ? JSON.parse(saved) : [];
  });

  const [pyqPapers, setPyqPapers] = useState<PYQPaper[]>(() => {
    const saved = localStorage.getItem('zakir_pyq_papers');
    return saved ? JSON.parse(saved) : INITIAL_PYQ_PAPERS;
  });

  const [activeCertificateAttempt, setActiveCertificateAttempt] = useState<QuizAttempt | null>(null);
  const [activeTestForReview, setActiveTestForReview] = useState<QuizAttempt | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('zakir_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('zakir_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('zakir_registered_students', JSON.stringify(registeredStudents));
  }, [registeredStudents]);

  useEffect(() => {
    localStorage.setItem('zakir_student_profile', JSON.stringify(studentProfile));
  }, [studentProfile]);

  useEffect(() => {
    localStorage.setItem('zakir_custom_classes', JSON.stringify(customClasses));
  }, [customClasses]);

  useEffect(() => {
    localStorage.setItem('zakir_custom_subjects', JSON.stringify(customSubjects));
  }, [customSubjects]);

  useEffect(() => {
    localStorage.setItem('zakir_custom_chapters', JSON.stringify(customChapters));
  }, [customChapters]);

  useEffect(() => {
    localStorage.setItem('zakir_study_materials', JSON.stringify(studyMaterials));
  }, [studyMaterials]);

  useEffect(() => {
    localStorage.setItem('zakir_questions', JSON.stringify(questionBank));
  }, [questionBank]);

  useEffect(() => {
    localStorage.setItem('zakir_quizzes', JSON.stringify(quizzes));
  }, [quizzes]);

  useEffect(() => {
    localStorage.setItem('zakir_quiz_attempts', JSON.stringify(quizAttempts));
  }, [quizAttempts]);

  useEffect(() => {
    localStorage.setItem('zakir_doubts', JSON.stringify(doubts));
  }, [doubts]);

  useEffect(() => {
    localStorage.setItem('zakir_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('zakir_pyq_papers', JSON.stringify(pyqPapers));
  }, [pyqPapers]);

  // Auth Operations
  const openAuthModal = (tab: 'login' | 'register' | 'admin' = 'login', notice: string = '', onSuccess?: AuthSuccessCallback) => {
    setAuthModalTab(tab);
    setAuthNoticeMessage(notice);
    setAuthSuccessCallback(onSuccess ? { cb: onSuccess } : null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthNoticeMessage('');
    setAuthSuccessCallback(null);
  };

  const login = (credentials: { emailOrId: string; password?: string; role?: 'student' | 'admin' }) => {
    const q = credentials.emailOrId.trim().toLowerCase();
    
    // Check if Administrator login
    if (
      q === 'admin' || 
      q === 'zakir' || 
      q === 'zakhu1099@gmail.com' || 
      q === 'tanhazakir66@gmail.com' || 
      q === 'admin-01' || 
      credentials.role === 'admin'
    ) {
      if (!credentials.password || credentials.password.trim() !== 'zakir@1630502') {
        return { success: false, message: 'Incorrect administrator password. Please try again.' };
      }
      setCurrentUser(ADMIN_ACCOUNT);
      setUserRole('admin');
      closeAuthModal();
      if (authSuccessCallback?.cb) {
        authSuccessCallback.cb();
      }
      return { success: true };
    }

    // Check registered students
    const matched = registeredStudents.find(
      s => s.email.toLowerCase() === q || s.studentId.toLowerCase() === q
    );

    if (matched) {
      setCurrentUser(matched);
      setUserRole('student');
      setStudentProfile(prev => ({
        ...prev,
        id: matched.id,
        name: matched.name,
        email: matched.email,
        studentId: matched.studentId,
        classLevel: matched.classLevel
      }));
      closeAuthModal();
      if (authSuccessCallback?.cb) {
        authSuccessCallback.cb();
      }
      return { success: true };
    }

    // Allow student login with provided credentials
    const newStudentSession: UserAccount = {
      id: `usr-${Date.now()}`,
      name: credentials.emailOrId.includes('@') ? credentials.emailOrId.split('@')[0] : credentials.emailOrId,
      email: credentials.emailOrId.includes('@') ? credentials.emailOrId : `${credentials.emailOrId.toLowerCase()}@student.edu`,
      studentId: `STD-${Math.floor(1000 + Math.random() * 9000)}`,
      classLevel: 'X',
      role: 'student',
      avatarSeed: credentials.emailOrId
    };

    setRegisteredStudents(prev => [...prev, newStudentSession]);
    setCurrentUser(newStudentSession);
    setUserRole('student');
    
    setStudentProfile(prev => ({
      ...prev,
      id: newStudentSession.id,
      name: newStudentSession.name,
      email: newStudentSession.email,
      studentId: newStudentSession.studentId,
      classLevel: newStudentSession.classLevel
    }));

    closeAuthModal();
    if (authSuccessCallback?.cb) {
      authSuccessCallback.cb();
    }
    return { success: true };
  };

  const register = (data: { name: string; email: string; studentId: string; classLevel: ClassLevel; password?: string }) => {
    const newStudent: UserAccount = {
      id: `usr-${Date.now()}`,
      name: data.name.trim(),
      email: data.email.trim(),
      studentId: data.studentId.trim() || `STD-${data.classLevel}${Math.floor(100 + Math.random() * 900)}`,
      classLevel: data.classLevel,
      role: 'student',
      avatarSeed: data.name,
      createdAt: new Date().toISOString()
    };

    setRegisteredStudents(prev => [...prev.filter(s => s.email !== newStudent.email), newStudent]);
    setCurrentUser(newStudent);
    setUserRole('student');

    setStudentProfile({
      id: newStudent.id,
      name: newStudent.name,
      email: newStudent.email,
      studentId: newStudent.studentId,
      classLevel: newStudent.classLevel,
      avatarSeed: newStudent.name,
      targetExamYear: '2026',
      enrolledSubjects: ['it-402'],
      bookmarks: [],
      bookmarkedQuestions: [],
      chaptersCompletedCount: 0,
      questionsSolvedCount: 0,
      badges: []
    });

    addNotification({
      title: `Welcome to Zakir Learning Hub, ${newStudent.name}! 🎉`,
      message: `Your student account has been created. Start exploring chapter notes and taking quizzes!`,
      category: 'general',
      classLevel: newStudent.classLevel,
      linkTab: 'dashboard'
    });

    closeAuthModal();
    if (authSuccessCallback?.cb) {
      authSuccessCallback.cb();
    }
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setUserRole('student');
  };

  // Profile
  const updateStudentProfile = (updated: Partial<StudentProfile>) => {
    setStudentProfile(prev => {
      const next = { ...prev, ...updated };
      syncProfileToSupabase(next);
      return next;
    });
    if (currentUser) {
      setCurrentUser(prev => prev ? {
        ...prev,
        name: updated.name || prev.name,
        classLevel: updated.classLevel || prev.classLevel,
        email: updated.email || prev.email
      } : null);
    }
  };

  // Custom Classes
  const addCustomClass = (cls: { level: string; name: string; subtitle: string }) => {
    setCustomClasses(prev => [...prev.filter(c => c.level !== cls.level), cls]);
  };

  const deleteCustomClass = (level: string) => {
    setCustomClasses(prev => prev.filter(c => c.level !== level));
  };

  // Custom Subjects
  const addCustomSubject = (sub: SubjectInfo) => {
    setCustomSubjects(prev => [...prev.filter(s => s.id !== sub.id), sub]);
  };

  const deleteCustomSubject = (id: string) => {
    setCustomSubjects(prev => prev.filter(s => s.id !== id));
  };

  // Custom Chapters
  const addCustomChapter = (ch: Chapter) => {
    setCustomChapters(prev => [...prev.filter(c => c.id !== ch.id), ch]);
  };

  const deleteCustomChapter = (id: string) => {
    setCustomChapters(prev => prev.filter(c => c.id !== id));
  };

  // Study Materials
  const addStudyMaterial = (mat: Omit<StudyMaterial, 'id' | 'uploadedDate'>) => {
    const newMat: StudyMaterial = {
      ...mat,
      id: `mat-${Date.now()}`,
      uploadedDate: new Date().toISOString().split('T')[0],
      published: true
    };
    setStudyMaterials(prev => [newMat, ...prev]);

    addNotification({
      title: `New Material Added for Class ${mat.classLevel}`,
      message: `${mat.title} (${mat.chapterTitle}) is now available.`,
      category: 'chapter',
      classLevel: mat.classLevel,
      linkTab: 'materials'
    });
  };

  const deleteStudyMaterial = (id: string) => {
    setStudyMaterials(prev => prev.filter(m => m.id !== id));
  };

  const togglePublishMaterial = (id: string) => {
    setStudyMaterials(prev => prev.map(m => m.id === id ? { ...m, published: !m.published } : m));
  };

  // Questions
  const addQuestion = (q: Omit<Question, 'id'>) => {
    const newQ: Question = {
      ...q,
      id: `q-custom-${Date.now()}`,
      published: true
    };
    setQuestionBank(prev => [newQ, ...prev]);
  };

  const deleteQuestion = (id: string) => {
    setQuestionBank(prev => prev.filter(q => q.id !== id));
  };

  const togglePublishQuestion = (id: string) => {
    setQuestionBank(prev => prev.map(q => q.id === id ? { ...q, published: !q.published } : q));
  };

  // Quizzes
  const createQuiz = (quiz: Omit<QuizConfig, 'id'>) => {
    const newQuiz: QuizConfig = {
      ...quiz,
      id: `quiz-custom-${Date.now()}`,
      published: true
    };
    setQuizzes(prev => [newQuiz, ...prev]);

    addNotification({
      title: `New Assessment Published: Class ${quiz.classLevel}`,
      message: `${quiz.title} (${quiz.questionsCount} questions, ${quiz.timeLimitMinutes} mins).`,
      category: 'quiz',
      classLevel: quiz.classLevel,
      linkTab: 'quiz'
    });
  };

  const deleteQuiz = (id: string) => {
    setQuizzes(prev => prev.filter(q => q.id !== id));
  };

  const togglePublishQuiz = (id: string) => {
    setQuizzes(prev => prev.map(q => q.id === id ? { ...q, published: !q.published } : q));
  };

  // Attempts & Bookmarks
  const recordQuizAttempt = (attempt: Omit<QuizAttempt, 'id' | 'date'>): QuizAttempt => {
    const newAttempt: QuizAttempt = {
      ...attempt,
      id: `att-${Date.now()}`,
      date: new Date().toISOString()
    };
    
    setQuizAttempts(prev => [newAttempt, ...prev]);
    saveQuizAttemptToSupabase(newAttempt);

    setStudentProfile(prev => ({
      ...prev,
      questionsSolvedCount: (prev.questionsSolvedCount || 0) + attempt.totalQuestions,
      lastActiveTopic: {
        subjectName: attempt.subjectId === 'it-402' ? 'Information Technology' : 'Informatics Practices',
        chapterTitle: attempt.chapterTitle,
        classLevel: attempt.classLevel
      }
    }));

    return newAttempt;
  };

  const toggleBookmark = (materialId: string) => {
    setStudentProfile(prev => {
      const exists = prev.bookmarks.includes(materialId);
      const nextBookmarks = exists 
        ? prev.bookmarks.filter(id => id !== materialId)
        : [...prev.bookmarks, materialId];
      const updated = { ...prev, bookmarks: nextBookmarks };
      syncProfileToSupabase(updated);
      return updated;
    });
  };

  const toggleQuestionBookmark = (questionId: string) => {
    setStudentProfile(prev => {
      const exists = prev.bookmarkedQuestions?.includes(questionId);
      return {
        ...prev,
        bookmarkedQuestions: exists
          ? prev.bookmarkedQuestions.filter(id => id !== questionId)
          : [...(prev.bookmarkedQuestions || []), questionId]
      };
    });
  };

  // Doubts
  const submitDoubt = (doubt: Omit<DoubtQuery, 'id' | 'timestamp' | 'status'>) => {
    const newDoubt: DoubtQuery = {
      ...doubt,
      id: `doubt-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    setDoubts(prev => [newDoubt, ...prev]);
    submitDoubtToSupabase(newDoubt);
  };

  const replyToDoubt = (id: string, reply: string) => {
    setDoubts(prev => prev.map(d => (d.id === id ? { ...d, reply, status: 'replied' } : d)));
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const addNotification = (notif: Omit<AppNotification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const addPYQPaper = (paper: Omit<PYQPaper, 'id' | 'uploadedAt'>) => {
    const newPaper: PYQPaper = {
      ...paper,
      id: `pyq-${paper.year}-${paper.classLevel.toLowerCase()}-${paper.subjectId}-${Date.now()}`,
      uploadedAt: new Date().toISOString()
    };
    setPyqPapers(prev => [newPaper, ...prev]);

    addNotification({
      title: `Board Paper Added: Class ${paper.classLevel} (${paper.year})`,
      message: `${paper.subjectName} (${paper.code}) previous year paper uploaded.`,
      category: 'general',
      classLevel: paper.classLevel,
      linkTab: 'pyq'
    });
  };

  const deletePYQPaper = (id: string) => {
    setPyqPapers(prev => prev.filter(p => p.id !== id));
  };

  const syncAllCBSESkillMaterials = () => {
    localStorage.setItem('zakir_study_materials', JSON.stringify(SEED_STUDY_MATERIALS));
    localStorage.setItem('zakir_custom_chapters', JSON.stringify(CHAPTERS_DATA));
    setStudyMaterials(SEED_STUDY_MATERIALS);
    setCustomChapters(CHAPTERS_DATA);
    addNotification({
      title: 'CBSE Skill Education Material Synchronized',
      message: 'All Information Technology chapters and PDFs from cbseskilleducation.com have been updated.',
      category: 'chapter',
      linkTab: 'materials'
    });
  };

  const resetAllData = () => {
    localStorage.clear();
    const PROD_KEY = 'zakir_prod_clean_slate_2026_final_v2';
    localStorage.setItem(PROD_KEY, 'true');
    localStorage.setItem('zakir_registered_students', JSON.stringify([ADMIN_ACCOUNT]));
    localStorage.setItem('zakir_student_profile', JSON.stringify(DEFAULT_PROFILE));
    localStorage.setItem('zakir_study_materials', JSON.stringify([]));
    localStorage.setItem('zakir_questions', JSON.stringify([]));
    localStorage.setItem('zakir_quizzes', JSON.stringify([]));
    localStorage.setItem('zakir_quiz_attempts', JSON.stringify([]));
    localStorage.setItem('zakir_doubts', JSON.stringify([]));
    localStorage.setItem('zakir_notifications', JSON.stringify([]));
    localStorage.setItem('zakir_custom_classes', JSON.stringify(CLASSES_LIST));
    localStorage.setItem('zakir_custom_subjects', JSON.stringify(SUBJECTS_LIST));
    localStorage.setItem('zakir_custom_chapters', JSON.stringify(CHAPTERS_DATA));

    setCurrentUser(null);
    setRegisteredStudents([ADMIN_ACCOUNT]);
    setStudentProfile(DEFAULT_PROFILE);
    setStudyMaterials([]);
    setQuestionBank([]);
    setQuizzes([]);
    setQuizAttempts([]);
    setDoubts([]);
    setNotifications([]);
    setCustomClasses(CLASSES_LIST);
    setCustomSubjects(SUBJECTS_LIST);
    setCustomChapters(CHAPTERS_DATA);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        userRole,
        setUserRole,
        registeredStudents,
        isAuthModalOpen,
        authModalTab,
        authNoticeMessage,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
        studentProfile,
        updateStudentProfile,
        selectedClassFilter,
        setSelectedClassFilter,
        selectedSubjectFilter,
        setSelectedSubjectFilter,
        customClasses,
        addCustomClass,
        deleteCustomClass,
        customSubjects,
        addCustomSubject,
        deleteCustomSubject,
        customChapters,
        addCustomChapter,
        deleteCustomChapter,
        studyMaterials,
        addStudyMaterial,
        deleteStudyMaterial,
        togglePublishMaterial,
        questionBank,
        addQuestion,
        deleteQuestion,
        togglePublishQuestion,
        quizzes,
        createQuiz,
        deleteQuiz,
        togglePublishQuiz,
        quizAttempts,
        recordQuizAttempt,
        toggleBookmark,
        toggleQuestionBookmark,
        activeCertificateAttempt,
        setActiveCertificateAttempt,
        activeTestForReview,
        setActiveTestForReview,
        doubts,
        submitDoubt,
        replyToDoubt,
        pyqPapers,
        addPYQPaper,
        deletePYQPaper,
        notifications,
        markNotificationRead,
        addNotification,
        syncAllCBSESkillMaterials,
        resetAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
