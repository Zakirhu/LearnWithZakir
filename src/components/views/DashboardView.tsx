import React, { useState } from 'react';
import { 
  User, 
  Award, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  BookOpen, 
  Calendar, 
  Edit3, 
  Sparkles, 
  FileText, 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  BarChart2, 
  LineChart as LineChartIcon, 
  Filter, 
  Bookmark, 
  BookmarkCheck, 
  Eye, 
  EyeOff, 
  Trash2, 
  HelpCircle,
  Users,
  Radio,
  GraduationCap,
  Play,
  RotateCcw,
  ListChecks,
  CheckCircle2,
  Printer
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Area,
  AreaChart
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { CLASSES_LIST } from '../../data/curriculumData';
import { ClassLevel, QuizAttempt, StudyMaterial, SubjectId } from '../../types';
import { GlobalLeaderboard } from '../GlobalLeaderboard';
import { AchievementBadges } from '../AchievementBadges';
import { TopScorersWidget } from '../TopScorersWidget';
import { TopStudentsLeaderboard } from '../TopStudentsLeaderboard';
import { ProgressReportModal } from '../ProgressReportModal';
import { SEO } from '../SEO';

interface DashboardViewProps {
  onOpenMaterial: (material: StudyMaterial) => void;
  onViewCertificate: (attempt: QuizAttempt) => void;
  onStartPracticeTopic: (chapterTitle: string) => void;
  onStartQuizClick?: () => void;
  onOpenStudyRoom?: (roomId?: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenMaterial,
  onViewCertificate,
  onStartPracticeTopic,
  onStartQuizClick,
  onOpenStudyRoom
}) => {
  const { 
    currentUser,
    studentProfile, 
    updateStudentProfile, 
    quizAttempts, 
    studyMaterials,
    questionBank,
    quizzes,
    toggleBookmark,
    toggleQuestionBookmark,
    setActiveTestForReview
  } = useApp();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isReportCardOpen, setIsReportCardOpen] = useState(false);
  const [tempName, setTempName] = useState(studentProfile.name);
  const [tempClass, setTempClass] = useState<ClassLevel>(studentProfile.classLevel);
  const [tempEmail, setTempEmail] = useState(studentProfile.email);
  const [tempStudentId, setTempStudentId] = useState(studentProfile.studentId || '');

  // Active Tab Filter for My Tests
  const [testSearchQuery, setTestSearchQuery] = useState('');
  const [selectedAttemptForModal, setSelectedAttemptForModal] = useState<QuizAttempt | null>(null);

  // Bookmarking Vault State
  const [bookmarkTab, setBookmarkTab] = useState<'materials' | 'questions'>('materials');
  const [revealedSavedQuestions, setRevealedSavedQuestions] = useState<Record<string, boolean>>({});

  // Performance calculations
  const totalAttempts = quizAttempts.length;
  const averageScore = totalAttempts > 0 
    ? quizAttempts.reduce((acc, a) => acc + a.percentage, 0) / totalAttempts 
    : 0;

  const totalQuestionsSolved = (studentProfile.questionsSolvedCount || 0);
  const chaptersCompleted = (studentProfile.chaptersCompletedCount || 0);
  const bestScore = totalAttempts > 0 
    ? Math.max(...quizAttempts.map(a => a.percentage)) 
    : 0;

  const handleSaveProfile = () => {
    updateStudentProfile({
      name: tempName,
      classLevel: tempClass,
      email: tempEmail,
      studentId: tempStudentId
    });
    setIsEditingProfile(false);
  };

  // Find continue learning target material
  const continueMaterial = studyMaterials.find(m => m.classLevel === studentProfile.classLevel) || studyMaterials[0];

  // Recommendations based on active class
  const recommendedMaterials = studyMaterials
    .filter(m => m.classLevel === studentProfile.classLevel || m.classLevel === 'X')
    .slice(0, 2);
  
  const recommendedQuiz = quizzes.find(q => q.classLevel === studentProfile.classLevel) || quizzes[0];

  // Bookmarked materials & questions list
  const bookmarkedMaterials = studyMaterials.filter(m => studentProfile.bookmarks.includes(m.id));
  const bookmarkedQuestionsList = questionBank.filter(q => studentProfile.bookmarkedQuestions?.includes(q.id));

  // Filtered attempts for test history
  const filteredAttempts = quizAttempts.filter(a => 
    a.quizTitle.toLowerCase().includes(testSearchQuery.toLowerCase()) ||
    a.chapterTitle.toLowerCase().includes(testSearchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <SEO
        title={`Student Dashboard (${studentProfile.name})`}
        description={`Learning dashboard and CBSE test performance records for ${studentProfile.name} (Class ${studentProfile.classLevel}).`}
      />

      {/* 1. STUDENT WELCOME & HERO BANNER */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white font-extrabold text-2xl sm:text-3xl flex items-center justify-center shadow-lg">
            {studentProfile.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome, {studentProfile.name.split(' ')[0]} 👋
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-blue-100 border border-white/20">
                Class {studentProfile.classLevel}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-blue-200 mt-1">
              Student ID: <span className="font-mono font-bold text-white">{studentProfile.studentId || 'STD-' + studentProfile.classLevel}</span> • Target Board Exam: {studentProfile.targetExamYear}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 relative z-10 self-stretch sm:self-auto">
          <button
            onClick={() => setIsReportCardOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-900" />
            <span>Progress Report (PDF / Print)</span>
          </button>
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>{isEditingProfile ? 'Cancel' : 'Edit Profile'}</span>
          </button>
        </div>
      </div>

      {/* EDIT PROFILE MODAL / PANEL */}
      {isEditingProfile && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg space-y-4 animate-in fade-in duration-200">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Edit Student Profile & Academic Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={tempName}
                onChange={e => setTempName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Student ID / Roll
              </label>
              <input
                type="text"
                value={tempStudentId}
                onChange={e => setTempStudentId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={tempEmail}
                onChange={e => setTempEmail(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Class Level
              </label>
              <select
                value={tempClass}
                onChange={e => setTempClass(e.target.value as ClassLevel)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {CLASSES_LIST.map(c => (
                  <option key={c.level} value={c.level}>
                    Class {c.level}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => setIsEditingProfile(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md"
            >
              Save Profile
            </button>
          </div>
        </div>
      )}

      {/* 2. CONTINUE LEARNING & RECOMMENDED ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CONTINUE LEARNING CARD */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between space-y-6 border border-slate-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Resume Your Study Stream</span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Continue Learning
            </h2>
            
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2">
              <div className="flex items-center justify-between text-xs text-blue-200">
                <span className="font-bold uppercase tracking-wider text-blue-300">
                  Class {studentProfile.classLevel} • {studentProfile.lastActiveTopic?.subjectName || (continueMaterial ? continueMaterial.chapterTitle : 'Computer Science & IT')}
                </span>
                <span className="text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
                  {continueMaterial ? 'In Progress' : 'Ready to Start'}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {continueMaterial ? continueMaterial.title : 'Welcome to Zakir Learning Hub'}
              </h3>
              <p className="text-xs text-blue-100/80 leading-relaxed">
                {continueMaterial 
                  ? continueMaterial.description 
                  : 'Explore chapter-wise notes, practical exercises, and tests curated for your class.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              onClick={() => {
                if (continueMaterial) {
                  onOpenMaterial(continueMaterial);
                } else if (onStartPracticeTopic) {
                  onStartPracticeTopic('All Materials');
                }
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/30 transition-all cursor-pointer"
            >
              <span>Explore Materials</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onStartQuizClick && (
              <button
                onClick={onStartQuizClick}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Take Quiz →
              </button>
            )}
          </div>
        </div>

        {/* RECOMMENDED FOR YOU */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
                ⭐
              </div>
              <h3 className="font-bold text-slate-900 text-base">Recommended For You</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Handpicked resources based on your class curriculum:
            </p>

            <div className="space-y-2.5">
              {recommendedMaterials.length === 0 && !recommendedQuiz ? (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
                  <p className="text-xs font-medium text-slate-600">Start your learning journey</p>
                  <p className="text-[11px] text-slate-400">Head over to Study Material or Classes to explore chapters.</p>
                </div>
              ) : (
                <>
                  {recommendedMaterials.map((mat) => (
                    <div
                      key={mat.id}
                      onClick={() => onOpenMaterial(mat)}
                      className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all cursor-pointer group flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <span className="text-base">📖</span>
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">
                            {mat.title}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate">{mat.chapterTitle}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0" />
                    </div>
                  ))}

                  {recommendedQuiz && (
                    <div
                      onClick={onStartQuizClick}
                      className="p-3 rounded-xl bg-emerald-50/60 hover:bg-emerald-50 border border-emerald-200 hover:border-emerald-300 transition-all cursor-pointer group flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <span className="text-base">🎯</span>
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-emerald-950 group-hover:text-emerald-700 truncate">
                            {recommendedQuiz.title}
                          </p>
                          <p className="text-[10px] text-emerald-700 truncate">
                            {recommendedQuiz.timeLimitMinutes} mins • {recommendedQuiz.totalMarks} Marks
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <button
            onClick={() => onOpenStudyRoom && onOpenStudyRoom()}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl text-center transition-colors flex items-center justify-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>Join Class Study Room</span>
          </button>
        </div>

      </div>

      {/* 3. YOUR PROGRESS METRICS */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Your Progress & Academic Track
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-3xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Chapters Completed</span>
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <span className="text-3xl font-black text-slate-900">{chaptersCompleted}</span>
              <span className="text-sm font-bold text-slate-400"> / 20</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Class {studentProfile.classLevel} Curriculum</p>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Questions Solved</span>
              <CheckCircle className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-3xl font-black text-slate-900">{totalQuestionsSolved}</span>
            <p className="text-[11px] text-slate-500 mt-1">Interactive Board MCQs</p>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Tests Attempted</span>
              <FileText className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-3xl font-black text-slate-900">{totalAttempts}</span>
            <p className="text-[11px] text-slate-500 mt-1">Timed CBSE assessments</p>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Average Score</span>
              <TrendingUp className="w-5 h-5 text-amber-500" />
            </div>
            <span className="text-3xl font-black text-emerald-600">
              {averageScore.toFixed(0)}%
            </span>
            <p className="text-[11px] text-slate-500 mt-1">Overall test accuracy</p>
          </div>
        </div>
      </div>

      {/* 4. RECENT TESTS / TEST HISTORY (MY TESTS) */}
      <div id="student-tests-history" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
                My Tests & Scorecards
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Complete log of all your assessments. Click any test to inspect questions, answers, and download verified certificates.
            </p>
          </div>

          {/* Quick Search in My Tests */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search tests..."
              value={testSearchQuery}
              onChange={(e) => setTestSearchQuery(e.target.value)}
              className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {onStartQuizClick && (
              <button
                onClick={onStartQuizClick}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                + New Test
              </button>
            )}
          </div>
        </div>

        {/* Tests Table / List */}
        {filteredAttempts.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <FileText className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <h4 className="text-sm font-bold text-slate-700">No test attempts match your filter</h4>
            <p className="text-xs text-slate-500 mt-1">
              Take an interactive quiz to see your scores and detailed performance analytics here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredAttempts.map((att) => {
              const isPassed = att.percentage >= 60;
              const formattedDate = new Date(att.date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short'
              });

              return (
                <div
                  key={att.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 px-2 rounded-xl transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-sm shrink-0 ${
                      isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {att.percentage.toFixed(0)}%
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                          {att.quizTitle}
                        </span>
                        <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.2 rounded">
                          Class {att.classLevel}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {att.chapterTitle} • Completed on {formattedDate} • Time: {Math.floor(att.timeSpentSeconds / 60)}m {att.timeSpentSeconds % 60}s
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 justify-between sm:justify-end">
                    <div className="text-right">
                      <span className="font-extrabold text-slate-900 text-sm">
                        {att.score} / {att.totalMarks}
                      </span>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Marks</p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedAttemptForModal(att);
                          setActiveTestForReview(att);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Review Answers
                      </button>

                      {isPassed && (
                        <button
                          onClick={() => onViewCertificate(att)}
                          className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                          title="Download verified achievement certificate"
                        >
                          <Award className="w-3.5 h-3.5 text-amber-600" />
                          <span className="hidden sm:inline">Certificate</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. DETAILED ATTEMPT REVIEW MODAL */}
      {selectedAttemptForModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Test Breakdown</span>
                <h3 className="text-lg font-bold text-white">{selectedAttemptForModal.quizTitle}</h3>
                <p className="text-xs text-slate-400">
                  Scored {selectedAttemptForModal.score}/{selectedAttemptForModal.totalMarks} ({selectedAttemptForModal.percentage}%) • {new Date(selectedAttemptForModal.date).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedAttemptForModal(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body with Questions */}
            <div className="p-6 overflow-y-auto space-y-4 divide-y divide-slate-100 flex-1">
              {selectedAttemptForModal.questionDetails?.map((q, idx) => {
                const userPick = selectedAttemptForModal.userAnswers[q.id];
                const isCorrect = userPick === q.correctOptionIndex;
                const isUnattempted = userPick === undefined;

                return (
                  <div key={q.id} className="pt-4 first:pt-0 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700">Question #{idx + 1}</span>
                      {isCorrect ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">✓ Correct (+{q.marks} Mark)</span>
                      ) : isUnattempted ? (
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">Unattempted (0 Marks)</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">✕ Incorrect (0 Marks)</span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-slate-900">{q.question}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                      {q.options.map((opt, oIdx) => {
                        const isRightAnswer = oIdx === q.correctOptionIndex;
                        const isUserChoice = oIdx === userPick;

                        let optClass = 'bg-slate-50 border-slate-200 text-slate-600';
                        if (isRightAnswer) optClass = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                        else if (isUserChoice) optClass = 'bg-rose-50 border-rose-400 text-rose-950 font-bold';

                        return (
                          <div key={oIdx} className={`p-2 rounded-xl border text-[11px] flex items-center justify-between gap-2 ${optClass}`}>
                            <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                            {isRightAnswer && <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">Correct</span>}
                            {isUserChoice && !isRightAnswer && <span className="text-[9px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded">Your Pick</span>}
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 text-[11px] text-blue-950">
                      <span className="font-bold text-blue-900">Zakir Sir's Concept: </span>
                      <span>{q.explanation}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              {selectedAttemptForModal.percentage >= 60 && (
                <button
                  onClick={() => {
                    const att = selectedAttemptForModal;
                    setSelectedAttemptForModal(null);
                    onViewCertificate(att);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  <Award className="w-4 h-4" />
                  <span>View Verified Certificate</span>
                </button>
              )}
              <button
                onClick={() => setSelectedAttemptForModal(null)}
                className="ml-auto px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-semibold"
              >
                Close Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. TOP STUDENTS LEADERBOARD (GAMIFIED TOP ACCURACY & TOPICS COMPLETED) */}
      <TopStudentsLeaderboard onStartQuizClick={onStartQuizClick} />

      {/* 7. SAVED BOOKMARKS & REVISION VAULT */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Bookmark className="w-4 h-4 fill-amber-500 text-amber-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">
                Saved Bookmarks & Personal Revision Vault
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Quick access to your saved chapter notes, practical scripts, and tricky board questions.
            </p>
          </div>

          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => setBookmarkTab('materials')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                bookmarkTab === 'materials'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Study Notes ({bookmarkedMaterials.length})</span>
            </button>
            <button
              onClick={() => setBookmarkTab('questions')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                bookmarkTab === 'questions'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Saved Questions ({bookmarkedQuestionsList.length})</span>
            </button>
          </div>
        </div>

        {bookmarkTab === 'materials' ? (
          <div>
            {bookmarkedMaterials.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <Bookmark className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <p className="text-xs text-slate-500">No chapter notes bookmarked yet. Click the bookmark icon in the Study Material view.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {bookmarkedMaterials.map(mat => (
                  <div
                    key={mat.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-400 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                          Class {mat.classLevel}
                        </span>
                        <button
                          onClick={() => toggleBookmark(mat.id)}
                          className="p-1 text-amber-500 hover:text-rose-500"
                        >
                          <BookmarkCheck className="w-4 h-4 fill-amber-500" />
                        </button>
                      </div>
                      <h4 
                        onClick={() => onOpenMaterial(mat)}
                        className="font-bold text-slate-900 text-sm hover:text-blue-600 cursor-pointer line-clamp-1"
                      >
                        {mat.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{mat.description}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {mat.readTimeMinutes} mins
                      </span>
                      <button
                        onClick={() => onOpenMaterial(mat)}
                        className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <span>Open Reader</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {bookmarkedQuestionsList.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <HelpCircle className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <p className="text-xs text-slate-500">No questions saved yet. Bookmark questions from the Question Bank for rapid revision.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {bookmarkedQuestionsList.map((q, idx) => {
                  const isRevealed = !!revealedSavedQuestions[q.id];
                  return (
                    <div key={q.id} className="p-4 rounded-2xl border border-amber-200 bg-amber-50/20 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-700">#{idx + 1} • {q.chapterTitle} (Class {q.classLevel})</span>
                        <button
                          onClick={() => toggleQuestionBookmark(q.id)}
                          className="text-amber-600 hover:text-rose-600"
                        >
                          <BookmarkCheck className="w-4 h-4 fill-amber-500" />
                        </button>
                      </div>
                      <p className="text-xs font-semibold text-slate-900">{q.question}</p>
                      
                      <div className="flex items-center justify-between pt-2">
                        <button
                          onClick={() => setRevealedSavedQuestions(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                          className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                        >
                          {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          <span>{isRevealed ? 'Hide Answer' : 'Show Answer & Explanation'}</span>
                        </button>
                        <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                          {q.difficulty}
                        </span>
                      </div>

                      {isRevealed && (
                        <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-950 mt-2">
                          <span className="font-bold text-blue-900">Correct Option: </span>
                          <span>{String.fromCharCode(65 + q.correctOptionIndex)} ({q.options[q.correctOptionIndex]})</span>
                          <p className="mt-1 text-slate-600">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 8. OFFICIAL CBSE PROGRESS REPORT CARD MODAL */}
      <ProgressReportModal
        isOpen={isReportCardOpen}
        onClose={() => setIsReportCardOpen(false)}
        studentProfile={studentProfile}
        quizAttempts={quizAttempts}
        totalQuestionsSolved={totalQuestionsSolved}
        chaptersCompleted={chaptersCompleted}
      />

    </div>
  );
};
