import React, { useState, useMemo } from 'react';
import { 
  FileQuestion, 
  Search, 
  Filter, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  Sparkles, 
  Printer, 
  Download, 
  Layers, 
  Tag, 
  BookOpen,
  X,
  Bookmark,
  BookmarkCheck,
  Upload
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CLASSES_LIST, SUBJECTS_LIST, getSubjectsForClass, getChapters } from '../../data/curriculumData';
import { ClassLevel, SubjectId, Question, QuestionDifficulty, QuizConfig } from '../../types';
import { SEO } from '../SEO';
import { PdfMcqExtractorModal } from '../PdfMcqExtractorModal';

interface QuestionBankViewProps {
  onStartQuiz?: (quiz: QuizConfig) => void;
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({ onStartQuiz }) => {
  const { 
    questionBank, 
    selectedClassFilter, 
    setSelectedClassFilter,
    studentProfile,
    toggleQuestionBookmark
  } = useApp();

  const [activeClass, setActiveClass] = useState<ClassLevel | 'ALL'>(selectedClassFilter);
  const [activeSubject, setActiveSubject] = useState<SubjectId | 'ALL'>('ALL');
  const [activeChapter, setActiveChapter] = useState<string>('ALL');
  const [activeDifficulty, setActiveDifficulty] = useState<'all' | QuestionDifficulty>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);

  // AI PDF MCQ Extractor Modal State
  const [showPdfExtractor, setShowPdfExtractor] = useState(false);

  // Toggles for answers
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [copiedQuestionId, setCopiedQuestionId] = useState<string | null>(null);

  // Question Paper Generator Modal
  const [showPaperGenerator, setShowPaperGenerator] = useState(false);
  const [paperTitle, setPaperTitle] = useState('CBSE Mid-Term Examination 2026');
  const [paperClass, setPaperClass] = useState<ClassLevel>('X');
  const [paperSubject, setPaperSubject] = useState<SubjectId>('it-402');
  const [paperCount, setPaperCount] = useState<number>(5);
  const [paperTimeMins, setPaperTimeMins] = useState<number>(30);
  const [generatedPaperQuestions, setGeneratedPaperQuestions] = useState<Question[] | null>(null);

  // Synchronize class filter with global state
  React.useEffect(() => {
    if (selectedClassFilter !== 'ALL') {
      setActiveClass(selectedClassFilter);
    }
  }, [selectedClassFilter]);

  // Available subjects for active class
  const availableSubjects = useMemo(() => {
    if (activeClass === 'ALL') return SUBJECTS_LIST;
    return getSubjectsForClass(activeClass);
  }, [activeClass]);

  // Available chapters for active class + subject
  const availableChapters = useMemo(() => {
    if (activeClass === 'ALL' || activeSubject === 'ALL') return [];
    return getChapters(activeClass, activeSubject);
  }, [activeClass, activeSubject]);

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    return questionBank.filter(q => {
      if (activeClass !== 'ALL' && q.classLevel !== activeClass) return false;
      if (activeSubject !== 'ALL' && q.subjectId !== activeSubject) return false;
      if (activeChapter !== 'ALL' && q.chapterId !== activeChapter) return false;
      if (activeDifficulty !== 'all' && q.difficulty !== activeDifficulty) return false;
      if (showOnlyBookmarked && !(studentProfile.bookmarkedQuestions || []).includes(q.id)) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesQ = q.question.toLowerCase().includes(query);
        const matchesCh = q.chapterTitle.toLowerCase().includes(query);
        const matchesOpt = q.options.some(o => o.toLowerCase().includes(query));
        const matchesExp = q.explanation.toLowerCase().includes(query);
        if (!matchesQ && !matchesCh && !matchesOpt && !matchesExp) return false;
      }
      return true;
    });
  }, [questionBank, activeClass, activeSubject, activeChapter, activeDifficulty, searchQuery, showOnlyBookmarked, studentProfile.bookmarkedQuestions]);

  const toggleAnswer = (id: string) => {
    setRevealedAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyQuestion = (q: Question) => {
    const text = `Q: ${q.question}\nA) ${q.options[0]}\nB) ${q.options[1]}\nC) ${q.options[2]}\nD) ${q.options[3]}\nCorrect Answer: ${String.fromCharCode(65 + q.correctOptionIndex)} - ${q.options[q.correctOptionIndex]}\nExplanation: ${q.explanation}`;
    navigator.clipboard.writeText(text);
    setCopiedQuestionId(q.id);
    setTimeout(() => setCopiedQuestionId(null), 2000);
  };

  const handleGeneratePaper = () => {
    const eligible = questionBank.filter(q => q.classLevel === paperClass && q.subjectId === paperSubject);
    const pool = eligible.length > 0 ? eligible : questionBank.filter(q => q.classLevel === paperClass);
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    setGeneratedPaperQuestions(shuffled.slice(0, Math.min(paperCount, shuffled.length)));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title={
          activeClass !== 'ALL'
            ? `Class ${activeClass} Question Bank & MCQs`
            : 'Question Bank & MCQs (Classes VI–XII)'
        }
        description="Browse authentic CBSE board-pattern MCQs, concept explanations, and generate custom test papers for Classes VI to XII."
        keywords={['Question Bank', 'CBSE MCQs', 'IT 402 Questions', 'IP 065 MCQs', 'Typography 817', 'Zakir Hussain']}
      />
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">
            <FileQuestion className="w-4 h-4" />
            <span>Curated Assessment Repository</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">
            Comprehensive CBSE Question Bank
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Explore hundreds of verified MCQs, board-pattern questions, and detailed pedagogical explanations for Classes VI to XII.
          </p>
        </div>

        {/* Actions Triggers */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowPdfExtractor(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-500/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Upload PDF & Extract MCQs (AI)</span>
          </button>

          <button
            onClick={() => {
              handleGeneratePaper();
              setShowPaperGenerator(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-blue-600" />
            <span>Generate Printable Paper</span>
          </button>
        </div>
      </div>

      {/* AI Extraction Highlight Strip */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border border-purple-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-slate-900">
              Automated PDF Question Extraction Powered by Gemini 3.8 Flash
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Upload any CBSE question paper, assignment, or chapter textbook PDF to extract structured MCQs with four options and verified explanations in seconds.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowPdfExtractor(true)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs transition-colors shrink-0 flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload PDF Now</span>
        </button>
      </div>

      {/* Filter Pipeline: Class -> Subject -> Chapter */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {/* Class Hierarchy Bar */}
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Filter by Class (VI–XII)
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => {
                setActiveClass('ALL');
                setSelectedClassFilter('ALL');
                setActiveSubject('ALL');
                setActiveChapter('ALL');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeClass === 'ALL'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              All Classes
            </button>
            {CLASSES_LIST.map(c => (
              <button
                key={c.level}
                onClick={() => {
                  setActiveClass(c.level as ClassLevel);
                  setSelectedClassFilter(c.level as ClassLevel);
                  setActiveSubject('ALL');
                  setActiveChapter('ALL');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeClass === c.level
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Hierarchy Bar */}
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Filter by Subject
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => {
                setActiveSubject('ALL');
                setActiveChapter('ALL');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubject === 'ALL'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              All Subjects
            </button>
            {availableSubjects.map(sub => (
              <button
                key={sub.id}
                onClick={() => {
                  setActiveSubject(sub.id);
                  setActiveChapter('ALL');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeSubject === sub.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {sub.name} ({sub.code})
              </button>
            ))}
          </div>
        </div>

        {/* Chapter Bar */}
        {availableChapters.length > 0 && (
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Filter by Chapter
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveChapter('ALL')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                  activeChapter === 'ALL'
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                All Chapters ({availableChapters.length})
              </button>
              {availableChapters.map(ch => (
                <button
                  key={ch.id}
                  onClick={() => setActiveChapter(ch.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                    activeChapter === ch.id
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  Ch {ch.chapterNumber}: {ch.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search & Actions Bar */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search in questions & options..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-blue-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                showOnlyBookmarked
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${showOnlyBookmarked ? 'fill-white' : ''}`} />
              <span>Bookmarked Only ({studentProfile.bookmarkedQuestions?.length || 0})</span>
            </button>

            <button
              onClick={() => setShowAllAnswers(!showAllAnswers)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
            >
              {showAllAnswers ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showAllAnswers ? 'Hide All Answers' : 'Reveal All Answers'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Showing {filteredQuestions.length} Questions
          </span>
        </div>

        {filteredQuestions.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <FileQuestion className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <h3 className="text-base font-bold text-slate-800">No questions found</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting your filters or search keywords.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuestions.map((q, idx) => {
              const isRevealed = showAllAnswers || !!revealedAnswers[q.id];

              return (
                <div
                  key={q.id}
                  className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-4 hover:border-slate-300 transition-all"
                >
                  {/* Question Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 rounded">
                        Class {q.classLevel}
                      </span>
                      <span className="text-xs font-semibold text-slate-600">
                        {q.chapterTitle}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        {q.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-xs text-slate-500 font-semibold mr-1">
                        {q.marks} Mark{q.marks === 1 ? '' : 's'}
                      </span>
                      {(() => {
                        const isBookmarked = (studentProfile.bookmarkedQuestions || []).includes(q.id);
                        return (
                          <button
                            onClick={() => toggleQuestionBookmark(q.id)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              isBookmarked
                                ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                            }`}
                            title={isBookmarked ? 'Remove bookmark' : 'Bookmark this question for revision'}
                          >
                            {isBookmarked ? (
                              <BookmarkCheck className="w-4 h-4 fill-amber-500 text-amber-600" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </button>
                        );
                      })()}
                      <button
                        onClick={() => handleCopyQuestion(q)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Copy question text"
                      >
                        {copiedQuestionId === q.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Question Text */}
                  <p className="font-semibold text-slate-900 text-base leading-relaxed">
                    {q.question}
                  </p>

                  {/* 4 Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isCorrect = q.correctOptionIndex === optIdx;
                      return (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 transition-colors ${
                            isRevealed && isCorrect
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold'
                              : 'bg-slate-50 border-slate-200/80 text-slate-700'
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[11px] ${
                            isRevealed && isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Answer Toggle & Explanation Box */}
                  <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                    <button
                      onClick={() => toggleAnswer(q.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 self-start"
                    >
                      {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{isRevealed ? 'Hide Answer' : 'Show Answer & Explanation'}</span>
                    </button>

                    {isRevealed && (
                      <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 space-y-1 animate-in fade-in duration-150">
                        <div className="flex items-center gap-1 font-bold text-blue-900">
                          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                          <span>Correct Answer: Option {String.fromCharCode(65 + q.correctOptionIndex)} ({q.options[q.correctOptionIndex]})</span>
                        </div>
                        <p className="leading-relaxed pl-4">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Question Paper Generator Modal */}
      {showPaperGenerator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[92vh]">
            {/* Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0 print:hidden">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-blue-400" />
                <span className="font-semibold text-sm">Automated CBSE Question Paper Generator</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Test Paper</span>
                </button>
                <button
                  onClick={() => setShowPaperGenerator(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Config controls inside modal */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 print:hidden">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">Class</label>
                <select
                  value={paperClass}
                  onChange={e => setPaperClass(e.target.value as ClassLevel)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs"
                >
                  {CLASSES_LIST.map(c => (
                    <option key={c.level} value={c.level}>Class {c.level}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">Subject</label>
                <select
                  value={paperSubject}
                  onChange={e => setPaperSubject(e.target.value as SubjectId)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs"
                >
                  {getSubjectsForClass(paperClass).map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">No. of MCQs</label>
                <select
                  value={paperCount}
                  onChange={e => setPaperCount(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs"
                >
                  <option value={5}>5 Questions</option>
                  <option value={10}>10 Questions</option>
                  <option value={15}>15 Questions</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleGeneratePaper}
                  className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
                >
                  Regenerate
                </button>
              </div>
            </div>

            {/* Printable Paper Canvas */}
            <div className="p-8 sm:p-12 overflow-y-auto font-serif text-slate-900 space-y-6">
              {/* Paper Header */}
              <div className="text-center border-b-2 border-slate-900 pb-4">
                <p className="text-xs uppercase tracking-widest font-sans font-bold text-slate-600">
                  LEARN WITH ZAKIR • COMPUTER SCIENCE & INFORMATION TECHNOLOGY PORTAL
                </p>
                <h2 className="text-xl sm:text-2xl font-bold uppercase mt-1">
                  {paperTitle}
                </h2>
                <div className="flex justify-between items-center text-xs font-sans font-medium text-slate-700 mt-3 pt-2 border-t border-slate-200">
                  <span>Class: {paperClass}</span>
                  <span>Subject: {SUBJECTS_LIST.find(s => s.id === paperSubject)?.name || 'IT & IP'}</span>
                  <span>Time Allowed: {paperTimeMins} Minutes</span>
                  <span>Max Marks: {generatedPaperQuestions?.length || 5}</span>
                </div>
              </div>

              {/* General Instructions */}
              <div className="text-xs font-sans text-slate-600 bg-slate-50 p-3 rounded border border-slate-200">
                <strong>General Instructions:</strong>
                <ol className="list-decimal pl-5 mt-1 space-y-0.5">
                  <li>Please check that this question paper contains {generatedPaperQuestions?.length || 0} questions.</li>
                  <li>All questions are compulsory. Each question carries 1 mark.</li>
                  <li>There is no negative marking. Write your answers neatly.</li>
                </ol>
              </div>

              {/* Question list */}
              <div className="space-y-6 pt-2">
                {generatedPaperQuestions?.map((q, idx) => (
                  <div key={q.id} className="space-y-2">
                    <p className="font-bold text-sm">
                      Q{idx + 1}. {q.question} <span className="text-xs font-normal font-sans float-right">[{q.marks} Mark]</span>
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs pl-4 font-sans">
                      <div>(A) {q.options[0]}</div>
                      <div>(B) {q.options[1]}</div>
                      <div>(C) {q.options[2]}</div>
                      <div>(D) {q.options[3]}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Answer Key at bottom */}
              <div className="pt-8 border-t-2 border-dashed border-slate-300 mt-10">
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">
                  Examiner Answer Key & Solution Notes (For Teacher Reference)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-sans">
                  {generatedPaperQuestions?.map((q, idx) => (
                    <div key={q.id} className="p-2 bg-slate-100 rounded text-slate-700">
                      <strong>Q{idx + 1}:</strong> Option {String.fromCharCode(65 + q.correctOptionIndex)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI PDF MCQ Extractor Modal */}
      <PdfMcqExtractorModal
        isOpen={showPdfExtractor}
        onClose={() => setShowPdfExtractor(false)}
        defaultClass={activeClass === 'ALL' ? 'X' : activeClass}
        defaultSubject={activeSubject === 'ALL' ? 'it-402' : activeSubject}
        onStartQuizWithExtracted={onStartQuiz}
      />
    </div>
  );
};
