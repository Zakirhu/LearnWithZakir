export type ClassLevel = 'VI' | 'VII' | 'VIII' | 'IX' | 'X' | 'XI' | 'XII' | string;

export type SubjectId = 
  | 'it-402' // Information Technology (Class IX-X)
  | 'it-802' // Information Technology (Class XI-XII)
  | 'ip-065' // Informatics Practices (Class XI-XII)
  | 'typo-817' // Typography & Computer Applications (Class XI-XII)
  | 'ca-165' // Computer Applications (Class IX-X)
  | 'cs-middle' // Computer Science & Digital Literacy (Class VI-VIII)
  | 'ai-middle' // Foundations of AI (Class VI-VIII)
  | string;

export interface SubjectInfo {
  id: SubjectId;
  code: string;
  name: string;
  classes: ClassLevel[];
  description: string;
  iconName: string;
  accentColor: string;
}

export interface Chapter {
  id: string;
  classLevel: ClassLevel;
  subjectId: SubjectId;
  chapterNumber: number;
  title: string;
  description: string;
}

export type MaterialType = 'notes' | 'important_questions' | 'practical_file' | 'cheat_sheet' | 'video';

export interface StudyMaterial {
  id: string;
  classLevel: ClassLevel;
  subjectId: SubjectId;
  chapterId: string;
  chapterTitle: string;
  title: string;
  type: MaterialType;
  description: string;
  readTimeMinutes: number;
  uploadedDate: string;
  author: string;
  content: string; // Markdown or rich text content
  downloadableFileName?: string;
  codeSnippet?: {
    language: string;
    code: string;
    output?: string;
  };
  keyQuestions?: Array<{
    question: string;
    marks: number;
    answer: string;
  }>;
  videoUrl?: string;
  tags: string[];
  published?: boolean;
  pdfDataUrl?: string; // Base64 or Blob data URL of uploaded PDF
  fileSize?: string; // e.g. "1.2 MB"
  pageCount?: number;
  sourceUrl?: string; // e.g. "https://cbseskilleducation.com/information-technology"
  curriculumPart?: string; // e.g. "Part B: Subject Specific Skills"
}

export type QuestionDifficulty = 'easy' | 'medium' | 'hard';
export type QuestionType = 'mcq' | 'short_answer' | 'practical_code';

export interface Question {
  id: string;
  classLevel: ClassLevel;
  subjectId: SubjectId;
  chapterId: string;
  chapterTitle: string;
  question: string;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  marks: number;
  options: string[]; // 4 options for MCQ
  correctOptionIndex: number; // 0, 1, 2, 3
  explanation: string;
  codeSnippet?: string;
  tags?: string[];
  published?: boolean;
}

export type QuizMode = 'practice' | 'exam';

export interface QuizConfig {
  id: string;
  title: string;
  classLevel: ClassLevel;
  subjectId: SubjectId;
  chapterId?: string; // Optional if comprehensive
  chapterTitle?: string;
  mode: QuizMode;
  timeLimitMinutes: number;
  totalMarks: number;
  questionsCount: number;
  difficulty: 'all' | QuestionDifficulty;
  questions: Question[];
  description?: string;
  published?: boolean;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  classLevel: ClassLevel;
  subjectId: SubjectId;
  chapterTitle: string;
  mode: QuizMode;
  date: string;
  score: number;
  totalMarks: number;
  percentage: number;
  timeSpentSeconds: number;
  totalQuestions: number;
  correctAnswersCount: number;
  userAnswers: Record<string, number>; // questionId -> selectedOptionIndex
  questionDetails: Question[];
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  studentId: string; // e.g. "X1024" or "STD-RAHUL"
  classLevel: ClassLevel;
  role: 'student' | 'admin';
  avatarSeed?: string;
  createdAt?: string;
}

export interface StudentProfile {
  id?: string;
  name: string;
  studentId: string;
  classLevel: ClassLevel;
  email: string;
  avatarSeed: string;
  targetExamYear: string;
  enrolledSubjects: SubjectId[];
  bookmarks: string[]; // Material IDs
  bookmarkedQuestions: string[]; // Question IDs
  chaptersCompletedCount?: number;
  questionsSolvedCount?: number;
  lastActiveTopic?: {
    subjectName: string;
    chapterTitle: string;
    classLevel: ClassLevel;
    materialId?: string;
  };
  badges: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt?: string;
  }>;
}

export interface DoubtQuery {
  id: string;
  studentName: string;
  studentClass: ClassLevel;
  subject: string;
  topic: string;
  query: string;
  timestamp: string;
  status: 'replied' | 'pending';
  reply?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  category: 'chapter' | 'quiz' | 'practical' | 'general';
  classLevel?: ClassLevel;
  timestamp: string;
  isRead: boolean;
  linkTab?: string;
}

export interface PYQQuestionItem {
  qNumber: string;
  question: string;
  marks: number;
  officialAnswer: string;
  stepMarkingScheme: string;
}

export interface PYQPaper {
  id: string;
  year: string;
  examType: string;
  classLevel: ClassLevel;
  subjectId: SubjectId;
  subjectName: string;
  code: string;
  totalMarks: number;
  timeHours: number;
  questionsSummary: string;
  sampleQuestions: PYQQuestionItem[];
  pdfDataUrl?: string; // Uploaded PDF base64 or blob URL
  fileName?: string;
  fileSize?: string;
  uploadedAt?: string;
  markingSchemePdfUrl?: string;
  markingSchemeFileName?: string;
}
