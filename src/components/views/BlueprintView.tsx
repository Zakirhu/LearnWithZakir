import React, { useState } from 'react';
import { 
  BarChart3, 
  Layers, 
  Award, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Printer, 
  Flame, 
  FileText, 
  BookOpen, 
  ChevronRight,
  TrendingUp,
  Percent,
  Check
} from 'lucide-react';
import { SEO } from '../SEO';
import { ClassLevel, SubjectId } from '../../types';

interface BlueprintChapter {
  unitNumber: number;
  title: string;
  part: 'Part A: Employability Skills' | 'Part B: Subject Specific Skills' | 'Part C: Practical Examination';
  marks: number;
  percentage: number;
  isHighWeightage?: boolean;
  isFrequentlyTested?: boolean;
  isPracticalFocus?: boolean;
  questionDistribution: {
    mcq1m: number;
    short2m: number;
    long4m: number;
  };
  keyTopics: string[];
}

interface SubjectBlueprint {
  subjectId: SubjectId;
  subjectName: string;
  code: string;
  classLevel: ClassLevel;
  totalTheoryMarks: number;
  totalPracticalMarks: number;
  timeHours: number;
  overview: string;
  parts: {
    partName: string;
    marks: number;
    description: string;
  }[];
  chapters: BlueprintChapter[];
}

const BLUEPRINTS: SubjectBlueprint[] = [
  {
    subjectId: 'it-402',
    subjectName: 'Information Technology',
    code: 'CBSE 402',
    classLevel: 'X',
    totalTheoryMarks: 50,
    totalPracticalMarks: 50,
    timeHours: 2,
    overview: 'Class X CBSE Board examination pattern consists of 50 marks Theory paper (Part A & Part B) and 50 marks Practical exam (Practical file, Viva Voce & Hands-on project).',
    parts: [
      { partName: 'Part A: Employability Skills', marks: 10, description: 'Communication, Self-Management, ICT, Entrepreneurship & Green Skills' },
      { partName: 'Part B: Subject Specific Skills', marks: 40, description: 'Digital Documentation, Electronic Spreadsheets, RDBMS & Web Applications' },
      { partName: 'Part C: Practical Exam & Project', marks: 50, description: 'Hands-on practical tests, Project Portfolio, Viva & Practical Record Book' }
    ],
    chapters: [
      {
        unitNumber: 1,
        title: 'Digital Documentation (Advanced)',
        part: 'Part B: Subject Specific Skills',
        marks: 8,
        percentage: 20,
        isFrequentlyTested: true,
        questionDistribution: { mcq1m: 2, short2m: 1, long4m: 1 },
        keyTopics: ['Styles in Writer', 'Fill Format Mode', 'Images & Text Wrap', 'Table of Contents (TOC)', 'Templates']
      },
      {
        unitNumber: 2,
        title: 'Electronic Spreadsheet (Advanced)',
        part: 'Part B: Subject Specific Skills',
        marks: 10,
        percentage: 25,
        isHighWeightage: true,
        isPracticalFocus: true,
        questionDistribution: { mcq1m: 2, short2m: 2, long4m: 1 },
        keyTopics: ['Consolidating Data', 'Subtotals', 'What-If Scenarios', 'Goal Seek & Solver', 'Macros in Calc']
      },
      {
        unitNumber: 3,
        title: 'Database Management System (DBMS)',
        part: 'Part B: Subject Specific Skills',
        marks: 12,
        percentage: 30,
        isHighWeightage: true,
        isFrequentlyTested: true,
        questionDistribution: { mcq1m: 3, short2m: 2, long4m: 1 },
        keyTopics: ['Relational Concepts', 'Primary vs Foreign Key', 'DDL vs DML', 'SQL SELECT & WHERE', 'Forms & Reports in Base']
      },
      {
        unitNumber: 4,
        title: 'Web Applications and Security',
        part: 'Part B: Subject Specific Skills',
        marks: 10,
        percentage: 25,
        isFrequentlyTested: true,
        questionDistribution: { mcq1m: 2, short2m: 2, long4m: 1 },
        keyTopics: ['Accessibility Options', 'Networking Fundamentals (LAN, WAN)', 'Instant Messaging', 'Online Transactions', 'Workplace Safety & IT Hazards']
      },
      {
        unitNumber: 5,
        title: 'Part A: Employability Skills (5 Units Combined)',
        part: 'Part A: Employability Skills',
        marks: 10,
        percentage: 20,
        questionDistribution: { mcq1m: 4, short2m: 3, long4m: 0 },
        keyTopics: ['Communication Methods', 'Stress Management', 'Operating System Basics', 'Entrepreneurial Qualities', 'Green Economy']
      }
    ]
  },
  {
    subjectId: 'ip-065',
    subjectName: 'Informatics Practices',
    code: 'CBSE 065',
    classLevel: 'XII',
    totalTheoryMarks: 70,
    totalPracticalMarks: 30,
    timeHours: 3,
    overview: 'Senior Secondary CBSE Board examination pattern for Informatics Practices carries 70 Marks Theory and 30 Marks Practical exam.',
    parts: [
      { partName: 'Data Handling using Pandas and Data Visualization', marks: 25, description: 'Python Series, DataFrames, Data operations, Matplotlib Bar/Histogram' },
      { partName: 'Database Query using SQL', marks: 25, description: 'MySQL Math, String & Date Functions, Aggregate Functions, Group By, Joins' },
      { partName: 'Introduction to Computer Networks', marks: 10, description: 'Topologies, Network devices, Internet protocols, Web services' },
      { partName: 'Societal Impacts', marks: 10, description: 'Digital footprint, Cyber crimes, IT Act 2000, E-waste management' }
    ],
    chapters: [
      {
        unitNumber: 1,
        title: 'Data Handling using Pandas (Series & DataFrame)',
        part: 'Part B: Subject Specific Skills',
        marks: 18,
        percentage: 26,
        isHighWeightage: true,
        isPracticalFocus: true,
        questionDistribution: { mcq1m: 4, short2m: 3, long4m: 2 },
        keyTopics: ['Series Creation & Slicing', 'DataFrame from Dicts', '.loc[] vs .iloc[]', 'head() & tail()', 'Boolean Indexing']
      },
      {
        unitNumber: 2,
        title: 'Data Visualization using Pyplot (Matplotlib)',
        part: 'Part B: Subject Specific Skills',
        marks: 7,
        percentage: 10,
        isPracticalFocus: true,
        questionDistribution: { mcq1m: 2, short2m: 1, long4m: 1 },
        keyTopics: ['Line Charts', 'Bar Plots & Horizontal Bars', 'Histograms', 'plot(), title(), xlabel(), legend()']
      },
      {
        unitNumber: 3,
        title: 'Database Query using SQL (MySQL Functions & Joins)',
        part: 'Part B: Subject Specific Skills',
        marks: 25,
        percentage: 35,
        isHighWeightage: true,
        isFrequentlyTested: true,
        questionDistribution: { mcq1m: 6, short2m: 3, long4m: 3 },
        keyTopics: ['Single Row Math & String Functions', 'Date Functions', 'GROUP BY & HAVING', 'COUNT, SUM, AVG', 'Equi-Joins']
      },
      {
        unitNumber: 4,
        title: 'Computer Networks',
        part: 'Part B: Subject Specific Skills',
        marks: 10,
        percentage: 14,
        isFrequentlyTested: true,
        questionDistribution: { mcq1m: 2, short2m: 2, long4m: 1 },
        keyTopics: ['Star vs Bus Topology', 'Router, Switch, Gateway', 'HTTP, FTP, VoIP, DNS', 'Cookies & Browser Security']
      },
      {
        unitNumber: 5,
        title: 'Societal Impacts & Cyber Ethics',
        part: 'Part B: Subject Specific Skills',
        marks: 10,
        percentage: 14,
        questionDistribution: { mcq1m: 2, short2m: 2, long4m: 1 },
        keyTopics: ['Digital Footprint', 'Phishing & Identity Theft', 'Indian IT Act 2000', 'E-waste Hazard Mitigation', 'Plagiarism & Open Source']
      }
    ]
  },
  {
    subjectId: 'typo-817',
    subjectName: 'Typography & Computer Applications',
    code: 'CBSE 817',
    classLevel: 'XII',
    totalTheoryMarks: 60,
    totalPracticalMarks: 40,
    timeHours: 2,
    overview: 'CBSE Typography & Computer Applications (Code 817) tests touch typing accuracy, memorandum mechanics, and office tools.',
    parts: [
      { partName: 'Part A: Employability Skills', marks: 10, description: 'Communication, Green Skills, Entrepreneurship' },
      { partName: 'Part B: Vocational Typography Skills', marks: 50, description: 'Touch Keyboarding, Correspondence, Tabular work & Spreadsheets' },
      { partName: 'Part C: Practical Examination', marks: 40, description: 'Speed Typing Test (35 WPM), Block Letter Alignment, Table Creation' }
    ],
    chapters: [
      {
        unitNumber: 1,
        title: 'Touch Keyboarding & Speed Mechanics',
        part: 'Part B: Subject Specific Skills',
        marks: 15,
        percentage: 30,
        isHighWeightage: true,
        isPracticalFocus: true,
        questionDistribution: { mcq1m: 4, short2m: 2, long4m: 1 },
        keyTopics: ['Home Row Finger Placement', 'GWPM & NWPM Calculations', 'Touch Technique Rules', 'Backspace Penalty Rules']
      },
      {
        unitNumber: 2,
        title: 'Official & Business Correspondence Styles',
        part: 'Part B: Subject Specific Skills',
        marks: 20,
        percentage: 40,
        isHighWeightage: true,
        isFrequentlyTested: true,
        questionDistribution: { mcq1m: 4, short2m: 3, long4m: 2 },
        keyTopics: ['Fully Blocked Letter Style', 'Memorandums vs Notices', 'Demi-Official (D.O.) Letters', 'Salutation & Complimentary Close Placement']
      },
      {
        unitNumber: 3,
        title: 'Tabular Processing & Document Formatting',
        part: 'Part B: Subject Specific Skills',
        marks: 15,
        percentage: 30,
        isPracticalFocus: true,
        questionDistribution: { mcq1m: 3, short2m: 2, long4m: 1 },
        keyTopics: ['Column Alignment Rules', 'Decimal Tabs in Tables', 'Margins & Page Setup', 'Manuscript Signs & Proof Correction Marks']
      }
    ]
  }
];

export const BlueprintView: React.FC = () => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId>('it-402');
  const activeBlueprint = BLUEPRINTS.find(b => b.subjectId === selectedSubjectId) || BLUEPRINTS[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      <SEO
        title="CBSE Board Blueprint & Chapter Weightage Visualizer"
        description="Official CBSE chapter-wise marks breakdown, high-yield topics, and question distribution for IT 402, IP 065, and Typo 817."
      />

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 print:border print:border-slate-300">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-blue-100 rounded-full text-xs font-semibold border border-white/20">
            <BarChart3 className="w-3.5 h-3.5 text-blue-300" />
            <span>Official CBSE Syllabus Breakdown & High-Yield Blueprint</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            CBSE Board Blueprint & Weightage Visualizer
          </h1>
          <p className="text-xs sm:text-sm text-blue-100/90 max-w-2xl leading-relaxed">
            Discover which chapters carry the highest marks, prepare with authentic question distributions, and target high-yield topics curated by <strong>Mr. Zakir Hussain</strong>.
          </p>
        </div>

        {/* Print / Save PDF Button */}
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer print:hidden shrink-0"
        >
          <Printer className="w-4 h-4 text-blue-600" />
          <span>Print / Save Blueprint PDF</span>
        </button>
      </div>

      {/* Subject Switcher */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-200/80 rounded-2xl print:hidden">
        {BLUEPRINTS.map(b => (
          <button
            key={b.subjectId}
            onClick={() => setSelectedSubjectId(b.subjectId)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              selectedSubjectId === b.subjectId
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>{b.subjectName}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 font-mono">
              Class {b.classLevel}
            </span>
          </button>
        ))}
      </div>

      {/* Overview Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 text-center shadow-xs">
          <span className="text-2xl font-black text-blue-600 font-mono">
            {activeBlueprint.totalTheoryMarks} Marks
          </span>
          <p className="text-xs font-bold text-slate-700 uppercase mt-1">Theory Paper</p>
          <p className="text-[11px] text-slate-400">Written Board Exam</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 text-center shadow-xs">
          <span className="text-2xl font-black text-emerald-600 font-mono">
            {activeBlueprint.totalPracticalMarks} Marks
          </span>
          <p className="text-xs font-bold text-slate-700 uppercase mt-1">Practical Exam</p>
          <p className="text-[11px] text-slate-400">Lab Test + Viva Voce</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 text-center shadow-xs">
          <span className="text-2xl font-black text-purple-600 font-mono">
            {activeBlueprint.timeHours} Hours
          </span>
          <p className="text-xs font-bold text-slate-700 uppercase mt-1">Exam Duration</p>
          <p className="text-[11px] text-slate-400">Standard Board Timing</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 text-center shadow-xs">
          <span className="text-2xl font-black text-amber-600 font-mono">
            100 Marks
          </span>
          <p className="text-xs font-bold text-slate-700 uppercase mt-1">Total Assessment</p>
          <p className="text-[11px] text-slate-400">Combined Score</p>
        </div>
      </div>

      {/* Part Distribution Progress Visualizer */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <span>Mark Distribution by Syllabus Component ({activeBlueprint.code})</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {activeBlueprint.overview}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeBlueprint.parts.map((part, pIdx) => (
            <div key={pIdx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-slate-900">{part.partName}</span>
                  <span className="font-mono text-sm font-black text-blue-600">{part.marks}M</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{part.description}</p>
              </div>

              {/* Progress bar */}
              <div className="pt-2">
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                    style={{ width: `${(part.marks / (activeBlueprint.totalTheoryMarks + activeBlueprint.totalPracticalMarks)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chapter-by-Chapter Weightage Matrix */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <span>Chapter-by-Chapter Weightage & Question Pattern</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Specific marks allotted to each chapter with question distribution and high-yield focus areas.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {activeBlueprint.chapters.map((ch) => (
            <div 
              key={ch.unitNumber} 
              className="p-5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-slate-50/50 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="w-7 h-7 rounded-xl bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center font-mono">
                    U{ch.unitNumber}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {ch.title}
                  </h3>

                  {ch.isHighWeightage && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-rose-100 text-rose-700 flex items-center gap-1">
                      <Flame className="w-3 h-3 text-rose-600" />
                      <span>High Weightage</span>
                    </span>
                  )}

                  {ch.isFrequentlyTested && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800 flex items-center gap-1">
                      <span>⭐ Frequently Tested</span>
                    </span>
                  )}

                  {ch.isPracticalFocus && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <span>🧪 Practical Focus</span>
                    </span>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <span className="text-lg font-black font-mono text-blue-600">{ch.marks} Marks</span>
                  <span className="text-xs text-slate-400 ml-1">({ch.percentage}% of Theory)</span>
                </div>
              </div>

              {/* Question Distribution Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Estimated Questions:</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[11px]">
                  {ch.questionDistribution.mcq1m} × 1-Mark MCQ
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[11px]">
                  {ch.questionDistribution.short2m} × 2-Marks Short
                </span>
                {ch.questionDistribution.long4m > 0 && (
                  <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-700 font-semibold text-[11px]">
                    {ch.questionDistribution.long4m} × 4-Marks Practical/Long
                  </span>
                )}
              </div>

              {/* Key Topics List */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-semibold text-slate-400">Essential Topics:</span>
                {ch.keyTopics.map((topic, tIdx) => (
                  <span key={tIdx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
