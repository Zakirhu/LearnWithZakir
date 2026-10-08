import React, { useState } from 'react';
import { 
  ArrowRight, 
  BookOpen, 
  HelpCircle, 
  CheckCircle2, 
  Laptop, 
  Database, 
  Keyboard, 
  Clock, 
  Zap, 
  GraduationCap,
  Flame,
  Check,
  Sparkles,
  BarChart3,
  Award,
  Terminal,
  FileCheck2,
  FileText,
  Upload
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ClassLevel, StudyMaterial, QuizConfig } from '../../types';
import { SEO } from '../SEO';
import { Logo } from '../Logo';
import { PdfMcqExtractorModal } from '../PdfMcqExtractorModal';

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
  onOpenMaterialReader: (material: StudyMaterial) => void;
  onStartQuiz: (quiz: QuizConfig) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setCurrentTab,
  onOpenMaterialReader,
  onStartQuiz
}) => {
  const { 
    quizzes, 
    setSelectedClassFilter, 
    questionBank,
    studyMaterials 
  } = useApp();

  // Daily Challenge State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);

  // AI PDF MCQ Extractor Modal State
  const [showPdfExtractor, setShowPdfExtractor] = useState<boolean>(false);

  // Daily challenge question: Class X LibreOffice Writer style
  const dailyMCQ = {
    title: 'DAILY MCQ CHALLENGE',
    subject: 'Class X • Information Technology',
    counter: '1 / 10 Questions',
    question: 'Which style in LibreOffice Writer is used to format frames and text boxes?',
    options: [
      'A. Page Style',
      'B. Frame Style',
      'C. Character Style',
      'D. Paragraph Style'
    ],
    correctIndex: 1,
    explanation: 'Frame styles in LibreOffice Writer are used to format graphic and text frames, including borders, backgrounds, columns, and how text wraps around the frame.'
  };

  const handleOptionSelect = (index: number) => {
    if (!hasAnswered) {
      setSelectedOption(index);
      setHasAnswered(true);
    }
  };

  const handleStartDailyQuiz = () => {
    const classXQuiz = quizzes.find(q => q.classLevel === 'X') || quizzes[0];
    if (classXQuiz) {
      onStartQuiz(classXQuiz);
    } else {
      setCurrentTab('quiz');
    }
  };

  // Class Cards with topics & curriculum tracks
  const classCards = [
    { level: 'VI' as ClassLevel, name: 'Class VI', topic: 'IT Fundamentals', stats: 'Middle School IT' },
    { level: 'VII' as ClassLevel, name: 'Class VII', topic: 'Digital Documentation', stats: 'Middle School IT' },
    { level: 'VIII' as ClassLevel, name: 'Class VIII', topic: 'Web & Coding Basics', stats: 'Middle School IT' },
    { level: 'IX' as ClassLevel, name: 'Class IX', topic: 'IT 402 & Applications', stats: 'Secondary Track' },
    { level: 'X' as ClassLevel, name: 'Class X', topic: 'IT Code 402 & RDBMS', stats: 'Board Exam Track' },
    { level: 'XI' as ClassLevel, name: 'Class XI', topic: 'IP 065 Python Basics', stats: 'Senior Secondary' },
    { level: 'XII' as ClassLevel, name: 'Class XII', topic: 'IP 065 & Typo 817', stats: 'Senior Board Track' },
  ];

  return (
    <div className="space-y-16 pb-20">
      <SEO
        title="Computer Science • IT • IP • Typography (Classes VI–XII)"
        description="Zakir Learning Hub – Study material, chapter-wise notes, practical resources, MCQs, and online tests by Zakir Hussain for Classes VI to XII."
        keywords={['Zakir Learning Hub', 'CBSE Computer Science', 'IT 402', 'IP 065', 'Typography 817', 'Zakir Hussain', 'Class 10 IT', 'Class 12 IP']}
      />
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 bg-gradient-to-b from-blue-50/70 via-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          {/* Official Emblem Logo */}
          <div className="flex justify-center">
            <Logo className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-md hover:scale-105 transition-transform" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100/90 text-blue-800 rounded-full text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-blue-600" />
            <span>Computer Science & IT Learning Hub • Classes VI–XII</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto text-balance">
            Learn. Practice. Master. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Computer Science & IT with Confidence.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Class VI–XII study material, chapter-wise notes, practical resources, MCQs and online tests — created and curated by <strong className="text-slate-900 font-bold">Zakir Hussain</strong>.
          </p>

          {/* Three Hero Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setCurrentTab('materials')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all cursor-pointer hover:scale-102"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Study Material</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentTab('quiz')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-300 shadow-sm transition-all cursor-pointer hover:scale-102"
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Take a Quiz</span>
            </button>

            <button
              onClick={() => setCurrentTab('qbank')}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200/90 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span>Browse Question Bank</span>
            </button>
          </div>

          {/* Personal Identity Line */}
          <div className="pt-4 text-xs text-slate-600 flex flex-wrap items-center justify-center gap-2">
            <span className="font-bold text-slate-900">Created & curated by Zakir Hussain</span>
            <span className="text-slate-400">•</span>
            <span>PGT Computer Science</span>
            <span className="text-slate-400">•</span>
            <span>Educator</span>
            <span className="text-slate-400">•</span>
            <span>Technology Enthusiast</span>
          </div>

          {/* Quick Highlight Strip */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Classes VI to XII</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>IT 402, IP 065 & Typography 817</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Instant Scorecard & Certificates</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% Free For Students</span>
            </span>
          </div>

        </div>
      </section>

      {/* 2. SELECT YOUR CLASS */}
      <section id="classes-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Targeted Curriculum</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Select Your Class
          </h2>
          <p className="text-sm text-slate-500">
            Choose your grade to view curated chapter notes, practical solutions, and quizzes
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3.5">
          {classCards.map(cls => (
            <div
              key={cls.level}
              onClick={() => {
                setSelectedClassFilter(cls.level);
                setCurrentTab('materials');
              }}
              className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-400 hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-600 text-blue-700 group-hover:text-white flex items-center justify-center font-extrabold text-base transition-colors mb-3">
                  {cls.level}
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-sm">
                  {cls.name}
                </h3>
                <p className="text-xs text-slate-700 font-medium mt-1 leading-snug">
                  {cls.topic}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-100 space-y-2">
                <span className="text-[10px] text-slate-500 font-medium block">
                  {cls.stats}
                </span>
                <div className="flex items-center justify-between text-[11px] text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>Open Class</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. EXPLORE SUBJECTS (3 Large Professional Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Curriculum Specialization</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Explore Subjects
          </h2>
          <p className="text-sm text-slate-500">
            In-depth subject tracks structured with theory, code snippets, and assessment banks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. Information Technology */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:border-blue-300 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Laptop className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Information Technology
                </h3>
                <p className="text-xs font-bold text-blue-600 mt-0.5">
                  Code 402 / 802 • Classes IX–XII
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Digital Documentation (Writer), Electronic Spreadsheets (Calc), RDBMS with SQL queries, and Web Security fundamentals.
              </p>

              <div className="pt-2 text-xs font-semibold text-slate-700 space-y-1.5 border-t border-slate-100">
                <p className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                  <span>Notes • Practicals • MCQs • Tests</span>
                </p>
                <p className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                  <span>Goal Seek, Subtotals & Consolidate Data</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedClassFilter('X');
                setCurrentTab('materials');
              }}
              className="w-full py-3 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 rounded-xl text-xs font-bold transition-all text-center cursor-pointer"
            >
              Explore IT 402 Material →
            </button>
          </div>

          {/* 2. Informatics Practices */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:border-indigo-300 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Informatics Practices
                </h3>
                <p className="text-xs font-bold text-indigo-600 mt-0.5">
                  Code 065 • Classes XI–XII
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Python Pandas Series & DataFrames, Matplotlib data visualization, MySQL Aggregate & Single-Row functions, and Computer Networks.
              </p>

              <div className="pt-2 text-xs font-semibold text-slate-700 space-y-1.5 border-t border-slate-100">
                <p className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Python • Pandas • SQL • Database</span>
                </p>
                <p className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-600" />
                  <span>GROUP BY, HAVING & DataFrame Slicing</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedClassFilter('XII');
                setCurrentTab('materials');
              }}
              className="w-full py-3 bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 rounded-xl text-xs font-bold transition-all text-center cursor-pointer"
            >
              Explore IP 065 Material →
            </button>
          </div>

          {/* 3. Typography & Computer Apps */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:border-purple-300 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Keyboard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Typography & Computer Apps
                </h3>
                <p className="text-xs font-bold text-purple-600 mt-0.5">
                  Code 817 • Classes XI–XII
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Touch-typing technique, speed calculations, manuscript proof-correction symbols, official correspondence, and Demi-Official (D.O.) letters.
              </p>

              <div className="pt-2 text-xs font-semibold text-slate-700 space-y-1.5 border-t border-slate-100">
                <p className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-600" />
                  <span>Theory • Practical • MCQs</span>
                </p>
                <p className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-600" />
                  <span>Proof Signs (stet, tr, cap, #) & Drills</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedClassFilter('XII');
                setCurrentTab('materials');
              }}
              className="w-full py-3 bg-purple-50 hover:bg-purple-600 hover:text-white text-purple-700 rounded-xl text-xs font-bold transition-all text-center cursor-pointer"
            >
              Explore Typo 817 Material →
            </button>
          </div>

        </div>
      </section>

      {/* 4. EVERYTHING YOU NEED TO LEARN & PRACTICE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Learn • Practice • Test</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Everything You Need to Learn & Practice
          </h2>
          <p className="text-sm text-slate-500">
            A cohesive set of tools designed to guide you from foundational concepts to top exam scores
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
              📚
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Chapter Notes</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Structured study material for Classes VI–XII with clear explanations and diagrams.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">
              💻
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Practical Resources</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Programs, SQL queries, Python/Pandas and practical exercises ready to execute.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">
              📝
            </div>
            <h3 className="font-bold text-slate-900 text-sm">MCQ Question Bank</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Chapter-wise curated questions with full explanations for effective revision.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
              🎯
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Online Tests</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Timed quizzes and board exam simulations with instant results and scorecards.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg">
              📊
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Track Your Progress</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Monitor scores, earn topic badges, and identify areas that need more practice.
            </p>
          </div>

        </div>
      </section>

      {/* 4.5. INTERACTIVE PRACTICAL PLAYGROUNDS & CBSE BOARD HUB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-2 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>CBSE Practical Playgrounds & Exam Excellence</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Practical Playgrounds & CBSE Board Hub
            </h2>
            <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
              50% of CBSE Computer Science, IT 402, IP 065, and Typography 817 marks are earned in practical and competency questions. Practice live in your browser without complex software installations.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Card 1: SQL & Python Playground */}
            <div className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/30 text-blue-300 flex items-center justify-center font-bold">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    50% Practical Marks
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">In-Browser SQL & Python Sandbox</h3>
                  <p className="text-xs text-blue-100/80 mt-1 leading-relaxed">
                    Execute real SELECT, WHERE, GROUP BY, and HAVING queries on pre-loaded Student, Employee, and Orders tables. Visualize Pandas Series and DataFrames (.loc, .iloc, stats).
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setCurrentTab('lab');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Launch Practical Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2: Typing Speed & Accuracy Lab */}
            <div className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/30 text-amber-300 flex items-center justify-center font-bold">
                    <Keyboard className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Typography Code 817
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Touch Typing Speed & Accuracy Lab</h3>
                  <p className="text-xs text-blue-100/80 mt-1 leading-relaxed">
                    Live gross words per minute (GWPM), real-time accuracy %, and backspace counter with official CBSE business correspondence and memorandum texts.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setCurrentTab('lab');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Start Typing Test</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 3: CBSE Blueprint & Weightage */}
            <div className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/30 text-purple-300 flex items-center justify-center font-bold">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Weightage Roadmap
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Board Blueprint & Unit Weightage</h3>
                  <p className="text-xs text-blue-100/80 mt-1 leading-relaxed">
                    Visual progress bars showing Part A (10M), Part B (40M), and Part C (50M Practicals) with High-Yield chapter tags to prioritize revision time effectively.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setCurrentTab('blueprint');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Explore Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 4: Competency & Case Studies */}
            <div className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/30 text-emerald-300 flex items-center justify-center font-bold">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    50%+ Board Pattern
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Competency-Based Questions (CBQs)</h3>
                  <p className="text-xs text-blue-100/80 mt-1 leading-relaxed">
                    Assertion-Reasoning drills and real-world scenario case questions (mail merge, network topology, SQL data recovery) with official model answers and marking tips.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setCurrentTab('competency');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Practice CBQs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 5: Flashcards & Morning Cheats */}
            <div className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/30 text-rose-300 flex items-center justify-center font-bold">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    60-Sec Revision
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Flashcards & Exam Morning Cheats</h3>
                  <p className="text-xs text-blue-100/80 mt-1 leading-relaxed">
                    Interactive flip cards for LibreOffice shortcuts, SQL command syntax, networking protocols (TCP/IP, DNS, IPv4 vs IPv6), and cyber laws (IT Act 2000).
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setCurrentTab('flashcards');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Open Flashcards</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 6: PYQ Archive & Step Marking */}
            <div className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/30 text-sky-300 flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    Past 5 Years
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">PYQ Archive & Official Step Marking</h3>
                  <p className="text-xs text-blue-100/80 mt-1 leading-relaxed">
                    Structured past 5 years CBSE board papers with official examiner model answer keys and step-marking guidelines to understand how examiners award points.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setCurrentTab('pyq');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>View Board Papers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 7: AI PDF MCQ Extractor */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900/60 to-purple-900/50 hover:from-indigo-900/80 hover:to-purple-900/70 border border-purple-400/30 transition-all flex flex-col justify-between space-y-4 md:col-span-2 lg:col-span-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-purple-500/30 text-purple-300 border border-purple-400/30 flex items-center justify-center font-bold shrink-0">
                    <Sparkles className="w-6 h-6 text-purple-300 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/40 uppercase tracking-wider">
                        Gemini 3.8 Flash AI
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Zero Setup • Instant
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      AI PDF to MCQ Extractor & Generator
                    </h3>
                    <p className="text-xs sm:text-sm text-purple-100/80 mt-1 max-w-3xl leading-relaxed">
                      Upload school assignments, question papers, notes, or chapter textbook PDFs. The AI instantly parses the pages, extracts question items, formulates 4 verified answer options, and outputs board-standard MCQs directly into your study and quiz portal.
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2 shrink-0">
                  <button
                    onClick={() => setShowPdfExtractor(true)}
                    className="flex-1 sm:flex-none py-2.5 px-5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-900/50"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload PDF Now</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab('qbank');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex-1 sm:flex-none py-2.5 px-4 bg-white/10 hover:bg-white/20 text-purple-200 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Question Bank</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. DAILY MCQ CHALLENGE (Interactive Showcase) */}
      {questionBank.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-5">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                      {dailyMCQ.title}
                    </h3>
                    <p className="text-sm font-bold text-slate-900">{dailyMCQ.subject}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-slate-100 rounded-xl text-xs font-mono font-bold text-slate-600">
                  {dailyMCQ.counter}
                </span>
              </div>
            </div>

            {/* Question Body */}
            <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {dailyMCQ.question}
            </p>

            {/* Options List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {dailyMCQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === dailyMCQ.correctIndex;
                let style = "border-slate-200 hover:border-blue-400 hover:bg-slate-50 text-slate-700";

                if (hasAnswered) {
                  if (isCorrect) {
                    style = "border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold";
                  } else if (isSelected) {
                    style = "border-rose-400 bg-rose-50 text-rose-800";
                  } else {
                    style = "border-slate-100 opacity-60 text-slate-400";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={hasAnswered}
                    className={`text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${style}`}
                  >
                    <span>{opt}</span>
                    {hasAnswered && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Explanation Feedback */}
            {hasAnswered && (
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 text-xs text-blue-950 space-y-1 animate-in fade-in duration-200">
                <span className="font-bold text-blue-900 flex items-center gap-1.5 text-sm">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  {selectedOption === dailyMCQ.correctIndex ? 'Correct Answer!' : 'Explanation:'}
                </span>
                <p className="text-xs text-blue-800 leading-relaxed">
                  {dailyMCQ.explanation}
                </p>
              </div>
            )}

            {/* CTA Button & Features Strip */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
              <p className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                <span>🔥 10 questions</span>
                <span aria-hidden="true">·</span>
                <span>10 minutes</span>
                <span aria-hidden="true">·</span>
                <span>Instant result</span>
              </p>

              <button
                onClick={handleStartDailyQuiz}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Start Quiz →</span>
              </button>
            </div>

          </div>
        </section>
      )}

      {/* 6. ABOUT ZAKIR HUSSAIN (Meet Your Educator) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-8">
          
          {/* Avatar Portrait Box */}
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex flex-col items-center justify-center p-4 shadow-xl shrink-0 text-center border-2 border-white/10">
            <Logo className="w-16 h-16 sm:w-20 sm:h-20 mb-2 drop-shadow-md" />
            <span className="font-extrabold text-base text-white tracking-tight">Zakir Hussain</span>
            <span className="text-[11px] text-blue-200 font-medium">PGT Computer Science</span>
          </div>

          {/* Bio & Vision */}
          <div className="space-y-4 text-center lg:text-left flex-1">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block">
              Meet Your Educator
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Zakir Hussain
            </h2>

            <p className="text-xs sm:text-sm font-semibold text-blue-300">
              PGT Computer Science • Educator • Technology Enthusiast
            </p>

            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              "I created this platform to bring study material, practical resources and online assessment together in one simple learning environment for school students."
            </p>

            <div className="pt-2">
              <button
                onClick={() => setCurrentTab('about')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                <span>Read More About Me</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS (01 to 05) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Roadmap</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            How It Works
          </h2>
          <p className="text-sm text-slate-500">
            Follow this 5-step learning workflow to build genuine mastery
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          
          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold font-mono text-blue-600 block">01</span>
            <h3 className="font-bold text-slate-900 text-sm">Choose Your Class</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Select VI–XII to view targeted curriculum.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold font-mono text-indigo-600 block">02</span>
            <h3 className="font-bold text-slate-900 text-sm">Learn</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Read notes and comprehensive study resources.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold font-mono text-amber-600 block">03</span>
            <h3 className="font-bold text-slate-900 text-sm">Practice</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Solve chapter-wise MCQs and practical exercises.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold font-mono text-emerald-600 block">04</span>
            <h3 className="font-bold text-slate-900 text-sm">Test Yourself</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Take timed online quizzes with timer and instant score.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold font-mono text-purple-600 block">05</span>
            <h3 className="font-bold text-slate-900 text-sm">Improve</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Review your results and strengthen weak areas.
            </p>
          </div>

        </div>
      </section>

      {/* 8. NUMBERS / METRICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="text-3xl font-black text-blue-600 font-mono">7</span>
            <p className="text-xs font-bold text-slate-800 mt-1 uppercase">Classes Covered</p>
            <p className="text-[11px] text-slate-500">Classes VI to XII</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="text-3xl font-black text-indigo-600 font-mono">{questionBank.length}+</span>
            <p className="text-xs font-bold text-slate-800 mt-1 uppercase">Curated MCQs</p>
            <p className="text-[11px] text-slate-500">With full explanations</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="text-3xl font-black text-amber-600 font-mono">{studyMaterials.length}</span>
            <p className="text-xs font-bold text-slate-800 mt-1 uppercase">Study Packages</p>
            <p className="text-[11px] text-slate-500">Notes, code & practicals</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="text-3xl font-black text-emerald-600 font-mono">100%</span>
            <p className="text-xs font-bold text-slate-800 mt-1 uppercase">Free & Accessible</p>
            <p className="text-[11px] text-slate-500">No Paywalls, Just Learning</p>
          </div>
        </div>
      </section>

      {/* AI PDF MCQ Extractor Modal */}
      <PdfMcqExtractorModal
        isOpen={showPdfExtractor}
        onClose={() => setShowPdfExtractor(false)}
        defaultClass="X"
        defaultSubject="it-402"
        onStartQuizWithExtracted={quiz => {
          setShowPdfExtractor(false);
          onStartQuiz(quiz);
        }}
      />

    </div>
  );
};
