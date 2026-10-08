import React, { useState } from 'react';
import { 
  ShieldCheck, 
  PlusCircle, 
  Upload, 
  CheckCircle2, 
  Trash2, 
  Layers, 
  FileText, 
  HelpCircle, 
  MessageSquare, 
  Video, 
  Code, 
  Eye, 
  Clock,
  Sparkles,
  BookOpen,
  Laptop,
  Check,
  ToggleLeft,
  ToggleRight,
  Search,
  Users,
  Award,
  BarChart,
  FolderPlus,
  Send,
  FileType,
  Lock,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ClassLevel, SubjectId, MaterialType, Question, QuestionDifficulty, QuizMode, SubjectInfo, Chapter } from '../../types';
import { SEO } from '../SEO';
import { ChapterPdfUploader } from '../ChapterPdfUploader';
import { PdfMcqExtractorModal } from '../PdfMcqExtractorModal';
import { PYQPdfUploaderModal } from '../PYQPdfUploaderModal';

interface AdminPanelViewProps {
  onBackToHome?: () => void;
}

export const AdminPanelView: React.FC<AdminPanelViewProps> = ({ onBackToHome }) => {
  const { 
    currentUser,
    userRole,
    openAuthModal,
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
    doubts,
    replyToDoubt,
    customClasses,
    addCustomClass,
    deleteCustomClass,
    customSubjects,
    addCustomSubject,
    deleteCustomSubject,
    customChapters,
    addCustomChapter,
    deleteCustomChapter,
    quizAttempts,
    registeredStudents,
    pyqPapers,
    deletePYQPaper,
    resetAllData
  } = useApp();

  // ACCESS GUARD: Only the authorized administrator (Mr. Zakir Hussain) can access the CMS
  if (userRole !== 'admin' || currentUser?.role !== 'admin') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center">
        <SEO
          title="Access Restricted • Administrator Portal"
          description="Content Management Center access is strictly protected and restricted to authorized educators."
        />
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200 shadow-xs">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-700">
              Access Restricted
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Admin CMS Is Protected
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              This Content Management Center is strictly protected and reserved for <strong>Mr. Zakir Hussain</strong>. Students and unauthorized visitors cannot view or modify study materials, quizzes, or student records.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1 max-w-md mx-auto text-left">
            <p className="font-bold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span>Are you Mr. Zakir Hussain?</span>
            </p>
            <p>
              Please authenticate using your verified administrator credentials to unlock the curriculum builder, PDF uploader, question bank, and assessment logs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => openAuthModal('admin', 'Administrator sign-in is required to access the CMS.')}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Sign In</span>
            </button>
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Student Home</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState<'pdf-upload' | 'pyq-upload' | 'hierarchy' | 'material' | 'qbank' | 'quiz' | 'library' | 'results' | 'doubts' | 'database'>('pdf-upload');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showAdminPdfExtractor, setShowAdminPdfExtractor] = useState(false);
  const [showPyqUploadModal, setShowPyqUploadModal] = useState(false);

  // Hierarchy Form States
  const [newClassLevel, setNewClassLevel] = useState('');
  const [newClassName, setNewClassName] = useState('');
  const [newClassSubtitle, setNewClassSubtitle] = useState('');

  const [newSubId, setNewSubId] = useState('');
  const [newSubCode, setNewSubCode] = useState('');
  const [newSubName, setNewSubName] = useState('');
  const [newSubClasses, setNewSubClasses] = useState('IX, X');
  const [newSubDesc, setNewSubDesc] = useState('');

  const [newChClass, setNewChClass] = useState<ClassLevel>('X');
  const [newChSubject, setNewChSubject] = useState<SubjectId>('it-402');
  const [newChNum, setNewChNum] = useState<number>(1);
  const [newChTitle, setNewChTitle] = useState('');
  const [newChDesc, setNewChDesc] = useState('');

  // Study Material Form States
  const [matClass, setMatClass] = useState<ClassLevel>('X');
  const [matSubject, setMatSubject] = useState<SubjectId>('it-402');
  const [matChapterId, setMatChapterId] = useState('');
  const [matChapterTitle, setMatChapterTitle] = useState('');
  const [matTitle, setMatTitle] = useState('');
  const [matType, setMatType] = useState<MaterialType>('notes');
  const [matDesc, setMatDesc] = useState('');
  const [matReadTime, setMatReadTime] = useState<number>(10);
  const [matContent, setMatContent] = useState('');
  const [matCodeLang, setMatCodeLang] = useState('python');
  const [matCode, setMatCode] = useState('');
  const [matCodeOutput, setMatCodeOutput] = useState('');
  const [matVideoUrl, setMatVideoUrl] = useState('');
  const [matFileName, setMatFileName] = useState('');
  const [matTags, setMatTags] = useState('Notes, 2026 Board');

  // Question Bank Form States
  const [qbClass, setQbClass] = useState<ClassLevel>('X');
  const [qbSubject, setQbSubject] = useState<SubjectId>('it-402');
  const [qbChapterTitle, setQbChapterTitle] = useState('Electronic Spreadsheets (Calc)');
  const [qbQuestion, setQbQuestion] = useState('');
  const [qbOptions, setQbOptions] = useState<[string, string, string, string]>(['', '', '', '']);
  const [qbCorrectIndex, setQbCorrectIndex] = useState<number>(0);
  const [qbExplanation, setQbExplanation] = useState('');
  const [qbDifficulty, setQbDifficulty] = useState<QuestionDifficulty>('medium');
  const [qbMarks, setQbMarks] = useState<number>(1);
  const [qbCodeSnippet, setQbCodeSnippet] = useState('');

  // Quiz Builder Form States
  const [qzClass, setQzClass] = useState<ClassLevel>('X');
  const [qzSubject, setQzSubject] = useState<SubjectId>('it-402');
  const [qzTitle, setQzTitle] = useState('');
  const [qzChapterTitle, setQzChapterTitle] = useState('Comprehensive Unit Revision');
  const [qzMode, setQzMode] = useState<QuizMode>('exam');
  const [qzTimeMins, setQzTimeMins] = useState<number>(15);
  const [qzDescription, setQzDescription] = useState('');
  const [qzQuestions, setQzQuestions] = useState<Array<{
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    marks: number;
    difficulty: QuestionDifficulty;
  }>>([
    {
      question: '',
      options: ['', '', '', ''],
      correctIndex: 0,
      explanation: '',
      marks: 1,
      difficulty: 'medium'
    }
  ]);

  // Reply state for doubts
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [librarySearch, setLibrarySearch] = useState('');

  const showToast = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  // 1. Hierarchy Handlers
  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassLevel.trim() || !newClassName.trim()) return;
    addCustomClass({
      level: newClassLevel.trim().toUpperCase(),
      name: newClassName.trim(),
      subtitle: newClassSubtitle.trim() || 'Curriculum Specialization'
    });
    showToast(`✓ Class ${newClassLevel} created successfully!`);
    setNewClassLevel('');
    setNewClassName('');
    setNewClassSubtitle('');
  };

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubCode.trim() || !newSubName.trim()) return;
    const generatedId = newSubId.trim() || newSubName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    addCustomSubject({
      id: generatedId,
      code: newSubCode.trim(),
      name: newSubName.trim(),
      classes: newSubClasses.split(',').map(s => s.trim()) as ClassLevel[],
      description: newSubDesc.trim() || 'Comprehensive subject curriculum.',
      iconName: 'Laptop',
      accentColor: 'blue'
    });
    showToast(`✓ Subject ${newSubName} (${newSubCode}) created!`);
    setNewSubId('');
    setNewSubCode('');
    setNewSubName('');
    setNewSubDesc('');
  };

  const handleAddChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChTitle.trim()) return;
    addCustomChapter({
      id: `ch-${newChSubject}-${newChNum}-${Date.now()}`,
      classLevel: newChClass,
      subjectId: newChSubject,
      chapterNumber: Number(newChNum),
      title: newChTitle.trim(),
      description: newChDesc.trim() || 'Unit core topics and practicals.'
    });
    showToast(`✓ Chapter "${newChTitle}" added to Class ${newChClass}!`);
    setNewChTitle('');
    setNewChDesc('');
    setNewChNum(prev => prev + 1);
  };

  // 2. Study Material Handler
  const handlePublishMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matTitle.trim() || !matContent.trim()) {
      alert('Please provide a title and notes content.');
      return;
    }

    addStudyMaterial({
      classLevel: matClass,
      subjectId: matSubject,
      chapterId: matChapterId || `custom-ch-${Date.now()}`,
      chapterTitle: matChapterTitle || 'Core Concepts & Revision',
      title: matTitle,
      type: matType,
      description: matDesc || 'Comprehensive resource compiled by Zakir Hussain.',
      readTimeMinutes: Number(matReadTime) || 10,
      author: 'Zakir Hussain (PGT CS & IT)',
      content: matContent,
      downloadableFileName: matFileName || `${matTitle.replace(/\s+/g, '_')}.pdf`,
      tags: matTags.split(',').map(t => t.trim()).filter(Boolean),
      videoUrl: matVideoUrl || undefined,
      published: true,
      codeSnippet: matCode.trim() ? {
        language: matCodeLang,
        code: matCode,
        output: matCodeOutput || undefined
      } : undefined
    });

    showToast(`✓ Study Material "${matTitle}" published live for Class ${matClass}!`);
    setMatTitle('');
    setMatDesc('');
    setMatContent('');
    setMatCode('');
    setMatCodeOutput('');
    setMatFileName('');
  };

  // 3. Question Bank Handler
  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qbQuestion.trim() || qbOptions.some(o => !o.trim())) {
      alert('Please fill out the question and all 4 options.');
      return;
    }

    addQuestion({
      classLevel: qbClass,
      subjectId: qbSubject,
      chapterId: `ch-${Date.now()}`,
      chapterTitle: qbChapterTitle,
      question: qbQuestion,
      type: 'mcq',
      difficulty: qbDifficulty,
      marks: Number(qbMarks) || 1,
      options: [...qbOptions],
      correctOptionIndex: qbCorrectIndex,
      explanation: qbExplanation || 'Standard CBSE curriculum definition.',
      codeSnippet: qbCodeSnippet.trim() || undefined,
      published: true
    });

    showToast(`✓ Question added to Question Bank!`);
    setQbQuestion('');
    setQbOptions(['', '', '', '']);
    setQbExplanation('');
    setQbCodeSnippet('');
  };

  // 4. Quiz Builder Handlers
  const addQuestionSlot = () => {
    setQzQuestions([
      ...qzQuestions,
      {
        question: '',
        options: ['', '', '', ''],
        correctIndex: 0,
        explanation: '',
        marks: 1,
        difficulty: 'medium'
      }
    ]);
  };

  const removeQuestionSlot = (idx: number) => {
    if (qzQuestions.length <= 1) return;
    setQzQuestions(qzQuestions.filter((_, i) => i !== idx));
  };

  const handlePublishQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qzTitle.trim()) {
      alert('Please provide a quiz title.');
      return;
    }

    const invalidQ = qzQuestions.find(q => !q.question.trim() || q.options.some(opt => !opt.trim()));
    if (invalidQ) {
      alert('Please fill out all question texts and 4 options for every question.');
      return;
    }

    const formattedQuestions: Question[] = qzQuestions.map((q, idx) => ({
      id: `q-quiz-${Date.now()}-${idx}`,
      classLevel: qzClass,
      subjectId: qzSubject,
      chapterId: `ch-${Date.now()}`,
      chapterTitle: qzChapterTitle,
      question: q.question,
      type: 'mcq',
      difficulty: q.difficulty,
      marks: q.marks,
      options: q.options,
      correctOptionIndex: q.correctIndex,
      explanation: q.explanation || 'Verified answer.',
      published: true
    }));

    const totalMarks = formattedQuestions.reduce((acc, curr) => acc + curr.marks, 0);

    createQuiz({
      title: qzTitle,
      classLevel: qzClass,
      subjectId: qzSubject,
      chapterTitle: qzChapterTitle,
      mode: qzMode,
      timeLimitMinutes: Number(qzTimeMins) || 15,
      totalMarks,
      questionsCount: formattedQuestions.length,
      difficulty: 'all',
      description: qzDescription || 'Timed chapter assessment compiled by Zakir Hussain.',
      questions: formattedQuestions,
      published: true
    });

    showToast(`✓ Quiz "${qzTitle}" published with ${formattedQuestions.length} questions!`);
    setQzTitle('');
    setQzDescription('');
    setQzQuestions([{
      question: '',
      options: ['', '', '', ''],
      correctIndex: 0,
      explanation: '',
      marks: 1,
      difficulty: 'medium'
    }]);
  };

  // Doubt reply handler
  const handleSendReply = (doubtId: string) => {
    const text = replyInputs[doubtId];
    if (!text || !text.trim()) return;
    replyToDoubt(doubtId, text.trim());
    setReplyInputs(prev => ({ ...prev, [doubtId]: '' }));
    showToast('✓ Reply submitted to student!');
  };

  // Filter library items
  const filteredMaterials = studyMaterials.filter(m => 
    m.title.toLowerCase().includes(librarySearch.toLowerCase()) ||
    m.chapterTitle.toLowerCase().includes(librarySearch.toLowerCase()) ||
    m.classLevel.toLowerCase().includes(librarySearch.toLowerCase())
  );

  const filteredQuizzes = quizzes.filter(q => 
    q.title.toLowerCase().includes(librarySearch.toLowerCase()) ||
    q.classLevel.toLowerCase().includes(librarySearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SEO
        title="Admin Content Management (CMS)"
        description="Educator CMS panel to publish chapter notes, practical files, MCQs, and timed assessment papers."
      />
      {/* Toast Notification */}
      {successMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 bg-slate-900 text-white rounded-2xl shadow-2xl border border-blue-500/40 flex items-center gap-3 animate-in slide-in-from-right duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{successMessage}</span>
        </div>
      )}

      {/* Admin Header */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Educator Content Management System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Zakir Learning Hub CMS
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Manage classes, subjects, chapters, notes, code solutions, MCQs, and timed quizzes live without touching code.
          </p>
        </div>

        {/* CMS Stats Strip */}
        <div className="flex items-center gap-3 self-start md:self-auto bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
          <div className="text-center px-2.5">
            <span className="text-base sm:text-lg font-mono font-bold text-blue-400">{studyMaterials.length}</span>
            <p className="text-[10px] text-slate-400 uppercase">Notes</p>
          </div>
          <div className="h-6 w-px bg-slate-700"></div>
          <div className="text-center px-2.5">
            <span className="text-base sm:text-lg font-mono font-bold text-amber-400">{questionBank.length}</span>
            <p className="text-[10px] text-slate-400 uppercase">MCQs</p>
          </div>
          <div className="h-6 w-px bg-slate-700"></div>
          <div className="text-center px-2.5">
            <span className="text-base sm:text-lg font-mono font-bold text-emerald-400">{quizzes.length}</span>
            <p className="text-[10px] text-slate-400 uppercase">Quizzes</p>
          </div>
          <div className="h-6 w-px bg-slate-700"></div>
          <div className="text-center px-2.5">
            <span className="text-base sm:text-lg font-mono font-bold text-purple-400">{pyqPapers.length}</span>
            <p className="text-[10px] text-slate-400 uppercase">Board Papers</p>
          </div>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/80 rounded-2xl">
        <button
          onClick={() => setActiveTab('pdf-upload')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'pdf-upload' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileType className="w-4 h-4 text-rose-500" />
          <span>Chapter PDF Notes</span>
        </button>

        <button
          onClick={() => setActiveTab('pyq-upload')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'pyq-upload' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4 text-purple-600" />
          <span>Upload PYQ Papers ({pyqPapers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('material')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'material' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>Custom Notes / Code</span>
        </button>

        <button
          onClick={() => setActiveTab('qbank')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'qbank' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Add MCQ Questions</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'quiz' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Quiz</span>
        </button>

        <button
          onClick={() => setActiveTab('hierarchy')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'hierarchy' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FolderPlus className="w-4 h-4" />
          <span>Manage Classes & Subjects</span>
        </button>

        <button
          onClick={() => setActiveTab('library')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'library' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Content Library & Publish</span>
        </button>

        <button
          onClick={() => setActiveTab('results')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'results' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BarChart className="w-4 h-4" />
          <span>Quiz Results ({quizAttempts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('doubts')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'doubts' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Student Doubts ({doubts.filter(d => d.status === 'pending').length} pending)</span>
        </button>

        <button
          onClick={() => setActiveTab('database')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'database' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Production Status & Reset</span>
        </button>
      </div>

      {/* TAB 0: DRAG & DROP CHAPTER PDF UPLOADER */}
      {activeTab === 'pdf-upload' && (
        <div className="space-y-6">
          <ChapterPdfUploader onSuccess={() => showToast('✓ Chapter PDF uploaded and linked to curriculum!')} />

          {/* AI PDF MCQ Extractor Launch Card */}
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-400/30">
                <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                <span>AI Automated Question Extraction</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">
                Extract MCQs & Test Papers from any PDF Document
              </h3>
              <p className="text-xs text-purple-200/90 leading-relaxed">
                Upload school question papers, past board PDFs, or textbook notes to automatically extract multiple-choice questions, verify correct answers, write concept explanations, and populate your Question Bank or Quizzes.
              </p>
            </div>

            <button
              onClick={() => setShowAdminPdfExtractor(true)}
              className="px-6 py-3.5 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-500/30 transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Launch AI PDF MCQ Extractor</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB PYQ: UPLOAD & MANAGE PREVIOUS YEAR PAPERS */}
      {activeTab === 'pyq-upload' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl border border-blue-900/50">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-400/30">
                <Award className="w-3.5 h-3.5 text-purple-300" />
                <span>CBSE Board Exam Repository</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">
                Upload Previous Year Question Papers (PDF)
              </h3>
              <p className="text-xs text-blue-200/90 leading-relaxed">
                Add authentic past CBSE board question papers, official marking rubrics, and step-marking keys for Classes VI through XII. Students can inspect questions, review examiner model answers, and download or print the PDF.
              </p>
            </div>

            <button
              onClick={() => setShowPyqUploadModal(true)}
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Upload className="w-4 h-4" />
              <span>Upload New Board Paper PDF</span>
            </button>
          </div>

          {/* List of current papers in CMS */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  Archived Board Papers ({pyqPapers.length})
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Live question papers visible in the student's PYQ Archive view.
                </p>
              </div>

              <button
                onClick={() => setShowPyqUploadModal(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Board Paper</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pyqPapers.map(paper => (
                <div
                  key={paper.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg font-bold text-xs bg-blue-100 text-blue-800 font-mono">
                          {paper.year}
                        </span>
                        <span className="text-xs font-bold text-slate-800">
                          Class {paper.classLevel} • {paper.code}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 font-bold">
                        {paper.totalMarks} Marks • {paper.timeHours}h
                      </span>
                    </div>

                    <h5 className="font-bold text-sm text-slate-900">
                      {paper.subjectName}
                    </h5>

                    <p className="text-xs text-slate-600 line-clamp-2">
                      {paper.questionsSummary}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                      <span className="flex items-center gap-1">
                        <FileType className="w-3.5 h-3.5 text-blue-600" />
                        <span className="truncate max-w-[150px]">{paper.fileName || 'Attached PDF'}</span>
                      </span>
                      {paper.fileSize && <span>({paper.fileSize})</span>}
                      {paper.markingSchemePdfUrl && (
                        <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 font-bold text-[10px]">
                          Key PDF
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      {paper.sampleQuestions?.length || 0} Featured Question{(paper.sampleQuestions?.length || 0) === 1 ? '' : 's'}
                    </span>

                    <button
                      onClick={() => {
                        if (confirm(`Delete paper "${paper.subjectName} (${paper.year})"?`)) {
                          deletePYQPaper(paper.id);
                          showToast('✓ Paper deleted from archive.');
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Paper"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: UPLOAD STUDY MATERIAL */}
      {activeTab === 'material' && (
        <form onSubmit={handlePublishMaterial} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-600" />
              <span>Publish Study Notes, Practicals & Code Files</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Add structured markdown chapter notes, attached PDF references, executable Python/SQL code, and key exam questions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Class Level *</label>
              <select
                value={matClass}
                onChange={e => setMatClass(e.target.value as ClassLevel)}
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800"
              >
                {customClasses.map(c => (
                  <option key={c.level} value={c.level}>Class {c.level} ({c.name})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subject *</label>
              <select
                value={matSubject}
                onChange={e => setMatSubject(e.target.value as SubjectId)}
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800"
              >
                {customSubjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Resource Type *</label>
              <select
                value={matType}
                onChange={e => setMatType(e.target.value as MaterialType)}
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800"
              >
                <option value="notes">📚 Comprehensive Chapter Notes</option>
                <option value="practical_file">💻 Practical File & Code Exercise</option>
                <option value="important_questions">📝 Important Board Questions</option>
                <option value="cheat_sheet">⚡ Quick Revision Cheat-Sheet</option>
                <option value="video">🎥 Video Lecture Lesson</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Chapter / Unit Title *</label>
              <input
                type="text"
                required
                value={matChapterTitle}
                onChange={e => setMatChapterTitle(e.target.value)}
                placeholder="e.g. Unit 2: Electronic Spreadsheets (Advanced)"
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Study Material Title *</label>
              <input
                type="text"
                required
                value={matTitle}
                onChange={e => setMatTitle(e.target.value)}
                placeholder="e.g. Complete Goal Seek, Scenarios & Data Consolidation Guide"
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Short Summary / Description</label>
            <textarea
              rows={2}
              value={matDesc}
              onChange={e => setMatDesc(e.target.value)}
              placeholder="Brief summary shown on resource cards..."
              className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Complete Notes Body (Supports Markdown & Headings) *</label>
            <textarea
              rows={8}
              required
              value={matContent}
              onChange={e => setMatContent(e.target.value)}
              placeholder="# Chapter Notes&#10;&#10;## 1. Concept Overview&#10;Explain principles clearly..."
              className="w-full p-3 bg-slate-50 rounded-xl border border-slate-300 text-xs font-mono text-slate-800 leading-relaxed"
            />
          </div>

          {/* Practical Code Solution (Optional) */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Code className="w-4 h-4 text-indigo-600" />
              <span>Optional Code Solution / Practical Query</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Language</label>
                <select
                  value={matCodeLang}
                  onChange={e => setMatCodeLang(e.target.value)}
                  className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs font-semibold"
                >
                  <option value="python">Python (Pandas / Pyplot / Script)</option>
                  <option value="sql">MySQL (DDL / DML Queries)</option>
                  <option value="calc">LibreOffice Calc Formula</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Attached PDF File Name</label>
                <input
                  type="text"
                  value={matFileName}
                  onChange={e => setMatFileName(e.target.value)}
                  placeholder="e.g. Class_X_IT402_Calc_Practical.pdf"
                  className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Code / Query Text</label>
              <textarea
                rows={4}
                value={matCode}
                onChange={e => setMatCode(e.target.value)}
                placeholder="import pandas as pd&#10;df = pd.DataFrame({...})"
                className="w-full p-2.5 bg-slate-900 text-emerald-300 font-mono text-xs rounded-xl border border-slate-800"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Publish Resource Live</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: ADD MCQ QUESTIONS */}
      {activeTab === 'qbank' && (
        <div className="space-y-6">
          <div className="p-4 bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border border-purple-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold shrink-0">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <p className="font-bold text-slate-900">
                  Bulk Extract MCQs Automatically from any PDF Document
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Save time typing questions manually: upload your chapter or exam PDF to auto-generate multiple-choice questions with answer keys.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowAdminPdfExtractor(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl text-xs transition-colors shrink-0 flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload PDF & Extract MCQs (AI)</span>
            </button>
          </div>

          <form onSubmit={handleAddQuestion} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-500" />
              <span>Add Chapter-Wise MCQ Question</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Add single and multi-mark questions with 4 options, verified answers, and concept explanations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Class Level</label>
              <select
                value={qbClass}
                onChange={e => setQbClass(e.target.value as ClassLevel)}
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs font-semibold"
              >
                {customClasses.map(c => (
                  <option key={c.level} value={c.level}>Class {c.level}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
              <select
                value={qbSubject}
                onChange={e => setQbSubject(e.target.value as SubjectId)}
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs font-semibold"
              >
                {customSubjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Difficulty</label>
              <select
                value={qbDifficulty}
                onChange={e => setQbDifficulty(e.target.value as QuestionDifficulty)}
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs font-semibold"
              >
                <option value="easy">Easy (Foundational)</option>
                <option value="medium">Medium (Standard Board)</option>
                <option value="hard">Hard (Application / HOTS)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Marks</label>
              <input
                type="number"
                min={1}
                max={5}
                value={qbMarks}
                onChange={e => setQbMarks(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Chapter / Unit Title *</label>
            <input
              type="text"
              required
              value={qbChapterTitle}
              onChange={e => setQbChapterTitle(e.target.value)}
              placeholder="e.g. Pandas Series & DataFrames"
              className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Question Text *</label>
            <textarea
              rows={3}
              required
              value={qbQuestion}
              onChange={e => setQbQuestion(e.target.value)}
              placeholder="Enter question statement here..."
              className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs text-slate-800"
            />
          </div>

          {/* 4 Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[0, 1, 2, 3].map(idx => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-700">Option {String.fromCharCode(65 + idx)}</span>
                  <label className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 cursor-pointer">
                    <input
                      type="radio"
                      name="correctOption"
                      checked={qbCorrectIndex === idx}
                      onChange={() => setQbCorrectIndex(idx)}
                      className="text-emerald-600"
                    />
                    <span>Correct Answer</span>
                  </label>
                </div>
                <input
                  type="text"
                  required
                  value={qbOptions[idx]}
                  onChange={e => {
                    const next = [...qbOptions] as [string, string, string, string];
                    next[idx] = e.target.value;
                    setQbOptions(next);
                  }}
                  placeholder={`Option ${String.fromCharCode(65 + idx)} text`}
                  className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Explanation (Shown after student answers)</label>
            <textarea
              rows={2}
              value={qbExplanation}
              onChange={e => setQbExplanation(e.target.value)}
              placeholder="Why this option is correct based on CBSE syllabus..."
              className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs text-slate-800"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Save Question to Bank</span>
            </button>
          </div>
        </form>
        </div>
      )}

      {/* TAB 3: CREATE QUIZ */}
      {activeTab === 'quiz' && (
        <form onSubmit={handlePublishQuiz} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-emerald-600" />
              <span>Create Timed Online Quiz / Exam Simulation</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Build an interactive timed assessment with questions, instant scoring, and certificates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Class Level</label>
              <select
                value={qzClass}
                onChange={e => setQzClass(e.target.value as ClassLevel)}
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs font-semibold"
              >
                {customClasses.map(c => (
                  <option key={c.level} value={c.level}>Class {c.level}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
              <select
                value={qzSubject}
                onChange={e => setQzSubject(e.target.value as SubjectId)}
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs font-semibold"
              >
                {customSubjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mode</label>
              <select
                value={qzMode}
                onChange={e => setQzMode(e.target.value as QuizMode)}
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs font-semibold"
              >
                <option value="exam">Exam Simulation (Strict Timer)</option>
                <option value="practice">Practice Mode (Instant Feedback)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Time Limit (Minutes)</label>
              <input
                type="number"
                min={5}
                max={90}
                value={qzTimeMins}
                onChange={e => setQzTimeMins(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Quiz Title *</label>
              <input
                type="text"
                required
                value={qzTitle}
                onChange={e => setQzTitle(e.target.value)}
                placeholder="e.g. Class X IT 402 Term-1 Full Mock Test"
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Chapter Coverage</label>
              <input
                type="text"
                value={qzChapterTitle}
                onChange={e => setQzChapterTitle(e.target.value)}
                placeholder="e.g. Units 1, 2 & 3 Comprehensive"
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs text-slate-800"
              />
            </div>
          </div>

          {/* Question Slots Builder */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Quiz Questions ({qzQuestions.length})
              </span>
              <button
                type="button"
                onClick={addQuestionSlot}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Question Slot</span>
              </button>
            </div>

            {qzQuestions.map((q, qIndex) => (
              <div key={qIndex} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700 font-mono">Q{qIndex + 1}</span>
                  {qzQuestions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestionSlot(qIndex)}
                      className="text-rose-600 hover:text-rose-800 text-xs font-bold cursor-pointer"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  required
                  value={q.question}
                  onChange={e => {
                    const next = [...qzQuestions];
                    next[qIndex].question = e.target.value;
                    setQzQuestions(next);
                  }}
                  placeholder={`Question ${qIndex + 1} text...`}
                  className="w-full p-2.5 bg-white rounded-xl border border-slate-300 text-xs text-slate-800"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[0, 1, 2, 3].map(optIdx => (
                    <div key={optIdx} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200">
                      <input
                        type="radio"
                        name={`correct-${qIndex}`}
                        checked={q.correctIndex === optIdx}
                        onChange={() => {
                          const next = [...qzQuestions];
                          next[qIndex].correctIndex = optIdx;
                          setQzQuestions(next);
                        }}
                      />
                      <input
                        type="text"
                        required
                        value={q.options[optIdx]}
                        onChange={e => {
                          const next = [...qzQuestions];
                          next[qIndex].options[optIdx] = e.target.value;
                          setQzQuestions(next);
                        }}
                        placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                        className="w-full text-xs outline-none bg-transparent"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Publish Quiz Live</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 4: MANAGE CLASSES & SUBJECTS */}
      {activeTab === 'hierarchy' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Create Custom Class */}
          <form onSubmit={handleAddClass} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FolderPlus className="w-4 h-4 text-blue-600" />
              <span>Add / Manage Class Level</span>
            </h3>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Class Level (e.g. IX, X, XII) *</label>
              <input
                type="text"
                required
                value={newClassLevel}
                onChange={e => setNewClassLevel(e.target.value)}
                placeholder="e.g. XII"
                className="w-full p-2 bg-slate-50 rounded-lg border border-slate-300 text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Display Name *</label>
              <input
                type="text"
                required
                value={newClassName}
                onChange={e => setNewClassName(e.target.value)}
                placeholder="e.g. Class XII Senior Secondary"
                className="w-full p-2 bg-slate-50 rounded-lg border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Subtitle / Specialization</label>
              <input
                type="text"
                value={newClassSubtitle}
                onChange={e => setNewClassSubtitle(e.target.value)}
                placeholder="e.g. IP 065 & Typography 817"
                className="w-full p-2 bg-slate-50 rounded-lg border border-slate-300 text-xs"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors"
            >
              Add Class
            </button>

            <div className="pt-2 border-t border-slate-100 space-y-1.5 max-h-48 overflow-y-auto">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Existing Classes ({customClasses.length})</span>
              {customClasses.map(c => (
                <div key={c.level} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg text-xs">
                  <div>
                    <span className="font-bold text-slate-800">Class {c.level}</span>
                    <p className="text-[10px] text-slate-500 truncate max-w-[140px]">{c.subtitle}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteCustomClass(c.level)}
                    className="text-rose-500 hover:text-rose-700 text-xs"
                    title="Delete Class"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </form>

          {/* Create Custom Subject */}
          <form onSubmit={handleAddSubject} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Laptop className="w-4 h-4 text-indigo-600" />
              <span>Add / Manage Subject</span>
            </h3>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Subject Code *</label>
              <input
                type="text"
                required
                value={newSubCode}
                onChange={e => setNewSubCode(e.target.value)}
                placeholder="e.g. Code 402"
                className="w-full p-2 bg-slate-50 rounded-lg border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Subject Name *</label>
              <input
                type="text"
                required
                value={newSubName}
                onChange={e => setNewSubName(e.target.value)}
                placeholder="e.g. Information Technology"
                className="w-full p-2 bg-slate-50 rounded-lg border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Classes (Comma-separated)</label>
              <input
                type="text"
                value={newSubClasses}
                onChange={e => setNewSubClasses(e.target.value)}
                placeholder="e.g. IX, X"
                className="w-full p-2 bg-slate-50 rounded-lg border border-slate-300 text-xs"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors"
            >
              Add Subject
            </button>

            <div className="pt-2 border-t border-slate-100 space-y-1.5 max-h-48 overflow-y-auto">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Existing Subjects ({customSubjects.length})</span>
              {customSubjects.map(s => (
                <div key={s.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg text-xs">
                  <div>
                    <span className="font-bold text-slate-800">{s.name}</span>
                    <p className="text-[10px] text-slate-500">{s.code}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteCustomSubject(s.id)}
                    className="text-rose-500 hover:text-rose-700 text-xs"
                    title="Delete Subject"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </form>

          {/* Create Custom Chapter */}
          <form onSubmit={handleAddChapter} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Add / Manage Chapter</span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Class</label>
                <select
                  value={newChClass}
                  onChange={e => setNewChClass(e.target.value as ClassLevel)}
                  className="w-full p-2 bg-slate-50 rounded-lg border border-slate-300 text-xs"
                >
                  {customClasses.map(c => <option key={c.level} value={c.level}>Class {c.level}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Ch #</label>
                <input
                  type="number"
                  value={newChNum}
                  onChange={e => setNewChNum(Number(e.target.value))}
                  className="w-full p-2 bg-slate-50 rounded-lg border border-slate-300 text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Chapter Title *</label>
              <input
                type="text"
                required
                value={newChTitle}
                onChange={e => setNewChTitle(e.target.value)}
                placeholder="e.g. Data Handling Using Pandas - II"
                className="w-full p-2 bg-slate-50 rounded-lg border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Description</label>
              <textarea
                rows={2}
                value={newChDesc}
                onChange={e => setNewChDesc(e.target.value)}
                placeholder="Key learning points..."
                className="w-full p-2 bg-slate-50 rounded-lg border border-slate-300 text-xs"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors"
            >
              Add Chapter
            </button>
          </form>

        </div>
      )}

      {/* TAB 5: CONTENT LIBRARY & PUBLISH TOGGLES */}
      {activeTab === 'library' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" />
                <span>Live Content Library & Publish Toggles</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Inspect, toggle published status, or remove study packages and tests.
              </p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={librarySearch}
                onChange={e => setLibrarySearch(e.target.value)}
                placeholder="Filter library..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-300 text-xs"
              />
            </div>
          </div>

          {/* Study Materials Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Study Materials & Notes ({filteredMaterials.length})
            </h3>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
              {filteredMaterials.map(m => (
                <div key={m.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[10px]">
                        Class {m.classLevel}
                      </span>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{m.title}</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{m.chapterTitle} • {m.readTimeMinutes} mins read</p>
                  </div>
                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <button
                      onClick={() => togglePublishMaterial(m.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                        m.published !== false ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {m.published !== false ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      <span>{m.published !== false ? 'Published' : 'Draft'}</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${m.title}"?`)) deleteStudyMaterial(m.id);
                      }}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quizzes Table */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Quizzes & Tests ({filteredQuizzes.length})
            </h3>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
              {filteredQuizzes.map(q => (
                <div key={q.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-bold text-[10px]">
                        Class {q.classLevel}
                      </span>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{q.title}</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{q.questions.length} Questions • {q.timeLimitMinutes} Mins • {q.totalMarks} Marks</p>
                  </div>
                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <button
                      onClick={() => togglePublishQuiz(q.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                        q.published !== false ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {q.published !== false ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      <span>{q.published !== false ? 'Published' : 'Draft'}</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${q.title}"?`)) deleteQuiz(q.id);
                      }}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: QUIZ RESULTS & STUDENT ATTEMPTS */}
      {activeTab === 'results' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BarChart className="w-5 h-5 text-indigo-600" />
              <span>Student Quiz Attempts & Assessment Records ({quizAttempts.length})</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live submission log of scores, percentage mastery, and time taken by students.
            </p>
          </div>

          {quizAttempts.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <BarChart className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <h4 className="text-sm font-bold text-slate-700">No Student Quiz Attempts Recorded</h4>
              <p className="text-xs text-slate-500 mt-1">
                Real student scores, time spent, and test results will appear here as students complete assessments.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
              {quizAttempts.map(att => (
                <div key={att.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{att.quizTitle}</span>
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-bold uppercase">
                        Class {att.classLevel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Submitted: {new Date(att.date).toLocaleDateString()} at {new Date(att.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Time Spent: {Math.round(att.timeSpentSeconds / 60)} mins
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className={`text-base font-bold font-mono ${
                        att.percentage >= 80 ? 'text-emerald-600' : att.percentage >= 50 ? 'text-blue-600' : 'text-amber-600'
                      }`}>
                        {att.percentage}%
                      </span>
                      <p className="text-[10px] text-slate-400 font-mono">{att.score} / {att.totalMarks} Marks</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 7: DOUBTS RESOLUTION */}
      {activeTab === 'doubts' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span>Student Doubts & Concept Inquiries ({doubts.length})</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Respond directly to student queries to help them master tough Python, SQL, or Calc concepts.
            </p>
          </div>

          {doubts.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <MessageSquare className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <h4 className="text-sm font-bold text-slate-700">No Student Doubts Submitted</h4>
              <p className="text-xs text-slate-500 mt-1">
                Concept inquiries and queries submitted via the Contact / Doubts portal will be listed here for your response.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {doubts.map(d => (
                <div key={d.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">{d.studentName}</span>
                      <span className="text-xs text-slate-500 ml-2">Class {d.studentClass} • {d.subject}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase self-start sm:self-auto ${
                      d.status === 'replied' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {d.status}
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800">
                    <strong className="text-slate-900 block mb-1">Topic: {d.topic}</strong>
                    <p>{d.query}</p>
                  </div>

                  {d.reply ? (
                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900">
                      <strong className="block text-blue-950 mb-1">Zakir Sir's Reply:</strong>
                      <p>{d.reply}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <textarea
                        rows={2}
                        value={replyInputs[d.id] || ''}
                        onChange={e => setReplyInputs(prev => ({ ...prev, [d.id]: e.target.value }))}
                        placeholder="Type your explanation for the student..."
                        className="w-full p-2.5 bg-white rounded-xl border border-slate-300 text-xs text-slate-800"
                      />
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleSendReply(d.id)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Solution</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 8: PRODUCTION DATABASE STATUS & CLEAN RESET */}
      {activeTab === 'database' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Production Status & Clean Launch Verification</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time verification of clean database state for launch with authentic school users.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Production-Ready: Clean</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="text-xl font-bold font-mono text-purple-700">1</span>
              <p className="text-[11px] font-bold text-slate-600 uppercase mt-1">Admin Account</p>
              <p className="text-[10px] text-slate-400">Mr. Zakir Hussain</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="text-xl font-bold font-mono text-emerald-600">{Math.max(0, registeredStudents.length - 1)}</span>
              <p className="text-[11px] font-bold text-slate-600 uppercase mt-1">Real Students</p>
              <p className="text-[10px] text-slate-400">0 Demo Users</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="text-xl font-bold font-mono text-blue-600">{studyMaterials.length}</span>
              <p className="text-[11px] font-bold text-slate-600 uppercase mt-1">Study Materials</p>
              <p className="text-[10px] text-slate-400">Chapter PDFs & Notes</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="text-xl font-bold font-mono text-amber-600">{questionBank.length}</span>
              <p className="text-[11px] font-bold text-slate-600 uppercase mt-1">Questions</p>
              <p className="text-[10px] text-slate-400">Curated MCQs</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="text-xl font-bold font-mono text-rose-600">{quizzes.length}</span>
              <p className="text-[11px] font-bold text-slate-600 uppercase mt-1">Quizzes</p>
              <p className="text-[10px] text-slate-400">Published Tests</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="text-xl font-bold font-mono text-indigo-600">{quizAttempts.length}</span>
              <p className="text-[11px] font-bold text-slate-600 uppercase mt-1">Test Attempts</p>
              <p className="text-[10px] text-slate-400">0 Demo Attempts</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2">
              <span>🧹 Production Reset & Database Clean</span>
            </h4>
            <p className="text-xs text-amber-900 leading-relaxed">
              Use this action to permanently purge all temporary records, test submissions, demo notes, sample quiz attempts, and student submissions. The official administrator account (Mr. Zakir Hussain) and CBSE curriculum structure (Classes VI–XII) will remain preserved.
            </p>
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Are you sure you want to completely clean and reset all records to a clean production state? All test submissions, questions, materials, and sample attempts will be permanently cleared.')) {
                  resetAllData();
                  showToast('✓ Production clean state applied! All demo/test records have been permanently purged.');
                }
              }}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm"
            >
              Clean & Reset to Production Slate
            </button>
          </div>
        </div>
      )}

      {/* AI PDF MCQ Extractor Modal */}
      <PdfMcqExtractorModal
        isOpen={showAdminPdfExtractor}
        onClose={() => setShowAdminPdfExtractor(false)}
        defaultClass={qbClass}
        defaultSubject={qbSubject}
      />

      {/* Previous Year Papers PDF Uploader Modal */}
      <PYQPdfUploaderModal
        isOpen={showPyqUploadModal}
        onClose={() => setShowPyqUploadModal(false)}
      />

    </div>
  );
};
