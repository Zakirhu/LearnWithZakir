import React, { useState } from 'react';
import { 
  FileCheck2, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Sparkles, 
  BookOpen, 
  Check, 
  Layers, 
  Eye, 
  EyeOff, 
  Printer, 
  Flame,
  Award,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { SEO } from '../SEO';
import { ClassLevel, SubjectId } from '../../types';

interface ARQuestion {
  id: string;
  classLevel: ClassLevel;
  subject: string;
  topic: string;
  assertion: string;
  reason: string;
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

interface CaseStudySubQuestion {
  subNumber: string;
  question: string;
  marks: number;
  modelAnswer: string;
  markingSchemeTip: string;
}

interface CaseStudyQuestion {
  id: string;
  classLevel: ClassLevel;
  subject: string;
  title: string;
  scenario: string;
  subQuestions: CaseStudySubQuestion[];
}

const AR_QUESTIONS: ARQuestion[] = [
  {
    id: 'ar-1',
    classLevel: 'X',
    subject: 'IT (Code 402)',
    topic: 'Digital Documentation (LibreOffice Writer)',
    assertion: 'Assertion (A): Styles in LibreOffice Writer help maintain consistent document formatting across multiple pages and chapters.',
    reason: 'Reason (R): Modifying a style automatically updates every paragraph or character to which that style is applied.',
    correctOption: 'A',
    explanation: 'Both A and R are true, and R correctly explains A. The central advantage of style-based formatting over direct formatting is that changes to the style cascade automatically to all applied instances.'
  },
  {
    id: 'ar-2',
    classLevel: 'X',
    subject: 'IT (Code 402)',
    topic: 'Electronic Spreadsheet (Calc)',
    assertion: 'Assertion (A): Goal Seek tool can find the required input value for a formula having multiple unknown variables simultaneously.',
    reason: 'Reason (R): Solver tool is an advanced version of Goal Seek that can handle multiple variable constraints.',
    correctOption: 'D',
    explanation: 'Assertion (A) is FALSE because Goal Seek only operates on a SINGLE variable. Reason (R) is TRUE because Solver is specifically designed for multiple variables and constraints.'
  },
  {
    id: 'ar-3',
    classLevel: 'X',
    subject: 'IT (Code 402)',
    topic: 'RDBMS (Base)',
    assertion: 'Assertion (A): A table can have multiple Candidate Keys, but only one Primary Key is selected from among them.',
    reason: 'Reason (R): A Primary Key does not allow NULL values and must uniquely identify every record in the relation.',
    correctOption: 'B',
    explanation: 'Both A and R are true facts in relational database theory. However, R is not the direct reason for A (the reason a table can have multiple Candidate Keys is because multiple attributes or minimal superkeys may possess uniqueness properties).'
  },
  {
    id: 'ar-4',
    classLevel: 'XII',
    subject: 'IP (Code 065)',
    topic: 'Python Pandas (Series vs DataFrame)',
    assertion: 'Assertion (A): A Pandas DataFrame is value-mutable and size-mutable, whereas a Pandas Series is value-mutable but size-immutable.',
    reason: 'Reason (R): Series is a 1-dimensional labeled array, whereas DataFrame is a 2-dimensional tabular structure with rows and columns.',
    correctOption: 'B',
    explanation: 'Both A and R are correct facts regarding Pandas data structures. Dimensionality alone does not directly explain why Series is size-immutable.'
  },
  {
    id: 'ar-5',
    classLevel: 'XII',
    subject: 'IP (Code 065)',
    topic: 'Computer Networks',
    assertion: 'Assertion (A): Star topology requires a central device such as a Switch or Hub to connect all nodes.',
    reason: 'Reason (R): If one node in a Star topology breaks down, the entire network fails immediately.',
    correctOption: 'C',
    explanation: 'Assertion (A) is TRUE. Reason (R) is FALSE because in Star topology, failure of a single peripheral node does NOT disrupt the rest of the network (only failure of the central switch/hub shuts down the network).'
  }
];

const CASE_STUDY_QUESTIONS: CaseStudyQuestion[] = [
  {
    id: 'case-1',
    classLevel: 'X',
    subject: 'IT (Code 402)',
    title: 'Sunita’s Client Annual Conference Invitation (Mail Merge)',
    scenario: 'Sunita is working as an executive secretary at TechNova Solutions. She needs to dispatch personalized invitation letters for an upcoming Global IT Summit to 50 corporate clients located across India. Each letter must contain the client’s unique Name, Company Name, Address, and Pass Number, while the invitation message remains identical. She decides to use LibreOffice Writer.',
    subQuestions: [
      {
        subNumber: '(i)',
        question: 'Identify the feature in LibreOffice Writer that Sunita should employ to accomplish this task efficiently without typing 50 separate letters.',
        marks: 1,
        modelAnswer: 'Sunita should use the "Mail Merge" feature (accessible via Tools → Mail Merge Wizard).',
        markingSchemeTip: '1 Mark for correctly identifying "Mail Merge".'
      },
      {
        subNumber: '(ii)',
        question: 'Name the two essential documents/files required to perform this operation.',
        marks: 2,
        modelAnswer: '1. Main Document (the letter containing standard body text and merge field placeholders)\n2. Data Source (the database/spreadsheet containing the 50 clients’ records such as Name, Address, Company, Pass Number).',
        markingSchemeTip: '1 Mark for Main Document and 1 Mark for Data Source.'
      },
      {
        subNumber: '(iii)',
        question: 'State one major advantage of using this automated feature over copying and pasting individual client names manually.',
        marks: 1,
        modelAnswer: 'It eliminates human typographical errors, saves considerable administrative time, and allows instant reuse of the data source for future mailings.',
        markingSchemeTip: '1 Mark for stating any valid advantage (time saving, error reduction, consistency).'
      }
    ]
  },
  {
    id: 'case-2',
    classLevel: 'X',
    subject: 'IT (Code 402)',
    title: 'Green Valley Public School Library Management System (RDBMS)',
    scenario: 'A school librarian maintains two tables in LibreOffice Base: "BookDetails" (BookID, Title, Author, Price) and "IssueRecord" (IssueID, BookID, StudentRollNo, IssueDate, ReturnDate). The librarian wants to ensure that no book can be issued unless it already exists in the "BookDetails" table.',
    subQuestions: [
      {
        subNumber: '(i)',
        question: 'Which column should be designated as the Primary Key in the "BookDetails" table?',
        marks: 1,
        modelAnswer: 'BookID should be designated as the Primary Key as it uniquely identifies each book and cannot be duplicated or left NULL.',
        markingSchemeTip: '1 Mark for identifying BookID.'
      },
      {
        subNumber: '(ii)',
        question: 'Identify the Foreign Key in the "IssueRecord" table and describe its function.',
        marks: 2,
        modelAnswer: 'BookID is the Foreign Key in the "IssueRecord" table. It references the Primary Key (BookID) of "BookDetails" to maintain Referential Integrity between both tables.',
        markingSchemeTip: '1 Mark for naming BookID, 1 Mark for explaining referential integrity constraint.'
      },
      {
        subNumber: '(iii)',
        question: 'Write a basic SQL query to display the Title and Price of all books whose Price is greater than ₹500.',
        marks: 1,
        modelAnswer: 'SELECT Title, Price FROM BookDetails WHERE Price > 500;',
        markingSchemeTip: '0.5 Mark for SELECT Title, Price, 0.5 Mark for WHERE Price > 500.'
      }
    ]
  },
  {
    id: 'case-3',
    classLevel: 'XII',
    subject: 'IP (Code 065)',
    title: 'Apex Financial Services Data Extraction (Python Pandas)',
    scenario: 'An analyst receives a dataset of 5 quarterly performance metrics for 4 branch offices stored in a DataFrame named `branch_df`. The row indices are ["Delhi", "Mumbai", "Kolkata", "Bengaluru"] and columns are ["Q1", "Q2", "Q3", "Q4"]. The manager asks the analyst to extract specific subsets of performance data.',
    subQuestions: [
      {
        subNumber: '(i)',
        question: 'Write the command to extract performance figures for all 4 quarters of the "Mumbai" branch using label-based indexing.',
        marks: 1,
        modelAnswer: 'branch_df.loc["Mumbai"]',
        markingSchemeTip: '1 Mark for using .loc["Mumbai"] or branch_df.loc["Mumbai", :].'
      },
      {
        subNumber: '(ii)',
        question: 'Write the command to display only the first 2 branches and first 2 quarters using integer position indexing.',
        marks: 1,
        modelAnswer: 'branch_df.iloc[0:2, 0:2]',
        markingSchemeTip: '1 Mark for branch_df.iloc[0:2, 0:2] (Remember iloc excludes the stop index).'
      },
      {
        subNumber: '(iii)',
        question: 'Write a command to add a new column named "Total" containing the sum of all quarters for each branch.',
        marks: 2,
        modelAnswer: 'branch_df["Total"] = branch_df["Q1"] + branch_df["Q2"] + branch_df["Q3"] + branch_df["Q4"]\n(OR: branch_df["Total"] = branch_df.sum(axis=1))',
        markingSchemeTip: '2 Marks for correct addition syntax or sum(axis=1).'
      }
    ]
  }
];

export const CompetencyQuestionsView: React.FC = () => {
  const [activeModule, setActiveModule] = useState<'ar' | 'case'>('ar');
  const [selectedARAnswers, setSelectedARAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [revealedCaseAnswers, setRevealedCaseAnswers] = useState<Record<string, boolean>>({});

  const handleSelectAR = (qId: string, option: 'A' | 'B' | 'C' | 'D') => {
    setSelectedARAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const toggleCaseReveal = (caseId: string) => {
    setRevealedCaseAnswers(prev => ({ ...prev, [caseId]: !prev[caseId] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      <SEO
        title="CBSE Competency-Based & Case Study Questions Hub"
        description="Master 50%+ board exam competency questions: Assertion & Reasoning questions and multi-part Case Study scenarios."
      />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-purple-100 rounded-full text-xs font-semibold border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>Latest CBSE 2025–2026 Examination Blueprint: 50%+ Competency Focus</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Competency-Based & Case Study Questions Hub
          </h1>
          <p className="text-xs sm:text-sm text-purple-100/90 max-w-2xl leading-relaxed">
            Practice Assertion & Reasoning (A&R) questions and real-world scenario questions with official step-marking schemes and expert hints by <strong>Mr. Zakir Hussain</strong>.
          </p>
        </div>

        {/* Module Switcher Pills */}
        <div className="flex p-1.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 gap-1 shrink-0">
          <button
            onClick={() => setActiveModule('ar')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeModule === 'ar'
                ? 'bg-white text-purple-900 shadow-md'
                : 'text-purple-200 hover:text-white'
            }`}
          >
            Assertion & Reasoning ({AR_QUESTIONS.length})
          </button>
          <button
            onClick={() => setActiveModule('case')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeModule === 'case'
                ? 'bg-white text-purple-900 shadow-md'
                : 'text-purple-200 hover:text-white'
            }`}
          >
            Scenario / Case Studies ({CASE_STUDY_QUESTIONS.length})
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 1. ASSERTION & REASONING MODULE */}
      {/* ===================================================================== */}
      {activeModule === 'ar' && (
        <div className="space-y-6">
          
          {/* Option Guide Strip */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-purple-600" />
              <span>CBSE Standard Assertion-Reasoning Option Framework</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-900 border border-purple-200">
                <strong>(A)</strong> Both A and R are true, and R is the correct explanation of A.
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-900 border border-purple-200">
                <strong>(B)</strong> Both A and R are true, but R is NOT the correct explanation of A.
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-900 border border-purple-200">
                <strong>(C)</strong> Assertion (A) is true, but Reason (R) is false.
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-900 border border-purple-200">
                <strong>(D)</strong> Assertion (A) is false, but Reason (R) is true.
              </div>
            </div>
          </div>

          {/* AR Questions List */}
          <div className="space-y-5">
            {AR_QUESTIONS.map((q, idx) => {
              const userSelection = selectedARAnswers[q.id];
              const isAnswered = !!userSelection;
              const isCorrect = userSelection === q.correctOption;

              return (
                <div key={q.id} className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-xl bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center font-mono">
                        Q{idx + 1}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700">
                        Class {q.classLevel} • {q.subject}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">({q.topic})</span>
                    </div>

                    <span className="text-xs font-bold text-slate-400 font-mono">1 Mark</span>
                  </div>

                  {/* Assertion and Reason box */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs sm:text-sm text-slate-800">
                    <p className="font-semibold">{q.assertion}</p>
                    <p className="font-semibold text-slate-700">{q.reason}</p>
                  </div>

                  {/* Option Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                    {(['A', 'B', 'C', 'D'] as const).map(opt => {
                      const isSelected = userSelection === opt;
                      const isThisCorrect = opt === q.correctOption;

                      let btnStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';
                      if (isAnswered) {
                        if (isThisCorrect) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'border-rose-400 bg-rose-50 text-rose-800';
                        } else {
                          btnStyle = 'border-slate-100 opacity-60 text-slate-400';
                        }
                      }

                      return (
                        <button
                          key={opt}
                          onClick={() => handleSelectAR(q.id, opt)}
                          disabled={isAnswered}
                          className={`p-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                        >
                          <span>Option ({opt})</span>
                          {isAnswered && isThisCorrect && <Check className="w-4 h-4 text-emerald-600" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Explanation */}
                  {isAnswered && (
                    <div className={`p-4 rounded-2xl border text-xs space-y-1 animate-in fade-in duration-200 ${
                      isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-blue-50 border-blue-200 text-blue-950'
                    }`}>
                      <div className="flex items-center gap-1.5 font-bold">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span>{isCorrect ? '✓ Correct Choice!' : `Correct Answer: Option (${q.correctOption})`}</span>
                      </div>
                      <p className="leading-relaxed pl-5 text-[11px]">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. SCENARIO / CASE-BASED QUESTIONS */}
      {/* ===================================================================== */}
      {activeModule === 'case' && (
        <div className="space-y-6">
          {CASE_STUDY_QUESTIONS.map((caseItem, idx) => {
            const isRevealed = revealedCaseAnswers[caseItem.id];

            return (
              <div key={caseItem.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-800 font-bold text-xs flex items-center justify-center font-mono">
                      C{idx + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{caseItem.title}</h3>
                      <p className="text-[11px] text-slate-400">Class {caseItem.classLevel} • {caseItem.subject}</p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    4 Marks Case Study
                  </span>
                </div>

                {/* Scenario Paragraph */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs sm:text-sm text-slate-800 leading-relaxed font-serif">
                  <span className="font-bold text-slate-900 font-sans block text-xs uppercase tracking-wider mb-1">
                    Board Scenario Prompt:
                  </span>
                  <p>{caseItem.scenario}</p>
                </div>

                {/* Sub-Questions List */}
                <div className="space-y-4 pt-1">
                  <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">
                    Answer the following sub-questions:
                  </h4>

                  {caseItem.subQuestions.map((sub, sIdx) => (
                    <div key={sIdx} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs sm:text-sm font-semibold text-slate-900">
                          <strong className="text-blue-600 font-mono mr-1.5">{sub.subNumber}</strong>
                          {sub.question}
                        </p>
                        <span className="text-[11px] text-slate-400 font-mono shrink-0">[{sub.marks} Mark{sub.marks > 1 ? 's' : ''}]</span>
                      </div>

                      {/* Model Answer (Revealable) */}
                      {isRevealed && (
                        <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs animate-in fade-in duration-150">
                          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950">
                            <strong className="block text-emerald-900 mb-0.5">Model Answer (Official Standard):</strong>
                            <p className="whitespace-pre-line text-[11px]">{sub.modelAnswer}</p>
                          </div>
                          <div className="p-2.5 bg-blue-50/70 rounded-xl text-blue-900 text-[10px]">
                            <strong>CBSE Examiner Marking Tip: </strong>
                            <span>{sub.markingSchemeTip}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Toggle Model Solution Button */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => toggleCaseReveal(caseItem.id)}
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span>{isRevealed ? 'Hide Solutions' : 'View Model Solutions & Marking Scheme'}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
