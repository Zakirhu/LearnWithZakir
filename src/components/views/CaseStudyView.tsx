import React, { useState } from 'react';
import { 
  FileCheck2, 
  HelpCircle, 
  Eye, 
  EyeOff, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Lightbulb, 
  Layers, 
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { SEO } from '../SEO';

interface CaseStudyQuestion {
  id: string;
  subNumber: string;
  question: string;
  marks: number;
  modelAnswer: string;
  markingSchemeNote: string;
}

interface CaseStudyScenario {
  id: string;
  title: string;
  course: 'Class X (IT 402)' | 'Class XII (IP 065)';
  topic: string;
  scenarioText: string;
  tableData?: { headers: string[]; rows: string[][] };
  questions: CaseStudyQuestion[];
}

const CASE_STUDIES: CaseStudyScenario[] = [
  {
    id: 'case-1',
    title: 'Case Study 1: Corporate Invitation Letter & Mail Merge Workflow',
    course: 'Class X (IT 402)',
    topic: 'Digital Documentation (Advanced) - LibreOffice Writer',
    scenarioText: 'Rohan works as an administrative executive at an educational consultancy. His manager has tasked him with sending personalized formal invitation letters to 80 school principals across India for an upcoming National IT Summit. Each invitation letter contains the same formal message, summit agenda, and venue details, but requires custom recipient titles, principal names, school names, and city addresses. Rohan intends to automate this task using LibreOffice Writer instead of drafting 80 separate documents.',
    questions: [
      {
        id: 'q1-1',
        subNumber: '(a)',
        question: 'Name the specific feature in LibreOffice Writer that Rohan should employ to generate these customized letters automatically from a single master draft.',
        marks: 1,
        modelAnswer: 'Mail Merge feature (accessible via Tools -> Mail Merge Wizard).',
        markingSchemeNote: '1 Mark for correctly identifying "Mail Merge".'
      },
      {
        id: 'q1-2',
        subNumber: '(b)',
        question: 'Identify the two essential document components/files required to successfully execute this workflow.',
        marks: 2,
        modelAnswer: '1. Main Document (the master template containing common text and field placeholders).\\n2. Data Source (the database, spreadsheet, or address book containing the recipient records such as Name, School, City).',
        markingSchemeNote: '1 Mark for "Main Document / Template" and 1 Mark for "Data Source / Database / Spreadsheet".'
      },
      {
        id: 'q1-3',
        subNumber: '(c)',
        question: 'Explain the purpose of "Merge Fields" (placeholders) inserted inside the main document.',
        marks: 1,
        modelAnswer: 'Merge Fields are dynamic placeholder tags (e.g., <Principal_Name>, <School_Name>) that automatically pull and display corresponding values from the data source records during printing or merging.',
        markingSchemeNote: '1 Mark for stating dynamic substitution of data values.'
      }
    ]
  },
  {
    id: 'case-2',
    title: 'Case Study 2: School Canteen Budget Analysis & Goal Seek Optimization',
    course: 'Class X (IT 402)',
    topic: 'Electronic Spreadsheet (Advanced) - LibreOffice Calc',
    scenarioText: 'Pooja manages the financial accounts of the high-school canteen. She has set up an electronic spreadsheet in LibreOffice Calc to compute monthly profit. Her current formula computes Total Profit = (Selling Price - Cost Price) * Units Sold - Fixed Operating Expenses. With Selling Price = ₹40, Cost Price = ₹25, Fixed Expenses = ₹15,000, and current monthly Units Sold = 1,200, her current profit is ₹3,000. Her management has set a revised profit target of ₹9,000 for next month without altering the Selling Price or Fixed Expenses.',
    tableData: {
      headers: ['Parameter', 'Current Value', 'Target / Constraint'],
      rows: [
        ['Selling Price (per unit)', '₹40.00', 'Fixed'],
        ['Cost Price (per unit)', '₹25.00', 'Fixed'],
        ['Fixed Operating Expenses', '₹15,000.00', 'Fixed'],
        ['Units Sold (Monthly)', '1,200 units', 'Variable to adjust'],
        ['Total Net Profit', '₹3,000.00', 'Target: ₹9,000.00']
      ]
    },
    questions: [
      {
        id: 'q2-1',
        subNumber: '(a)',
        question: 'Which What-If Analysis tool in LibreOffice Calc is best suited to find the exact number of units Pooja needs to sell to achieve a profit of ₹9,000?',
        marks: 1,
        modelAnswer: 'Goal Seek tool (Tools -> Goal Seek in LibreOffice Calc).',
        markingSchemeNote: '1 Mark for "Goal Seek".'
      },
      {
        id: 'q2-2',
        subNumber: '(b)',
        question: 'In the Goal Seek dialogue box, what cell inputs should Pooja specify for: (i) Formula cell, (ii) Target value, and (iii) Variable cell?',
        marks: 2,
        modelAnswer: '(i) Formula cell: The cell containing the profit formula.\\n(ii) Target value: 9000\\n(iii) Variable cell: The cell containing Units Sold.',
        markingSchemeNote: '1 Mark for Target Value 9000, 1 Mark for correct Formula Cell & Variable Cell identification.'
      },
      {
        id: 'q2-3',
        subNumber: '(c)',
        question: 'State one primary limitation of Goal Seek compared to the Solver tool.',
        marks: 1,
        modelAnswer: 'Goal Seek operates on only a single variable cell to reach a specific target value, whereas Solver can optimize formulas involving multiple variable cells and constraint rules.',
        markingSchemeNote: '1 Mark for single variable limitation vs multiple variables in Solver.'
      }
    ]
  },
  {
    id: 'case-3',
    title: 'Case Study 3: Hospital Relational Database Schema & Primary Key Integrity',
    course: 'Class XII (IP 065)',
    topic: 'Database Management Systems & SQL Querying',
    scenarioText: 'CityCare Multispeciality Hospital maintains patient appointment records using a relational database management system (MySQL). The database contains two tables: PATIENT and DOCTOR. Below is an excerpt of their structures and key attributes.',
    tableData: {
      headers: ['PatientId', 'PatientName', 'Age', 'DocId (Foreign Key)', 'BillAmount'],
      rows: [
        ['P101', 'Arjun Kumar', '42', 'D201', '₹1,500'],
        ['P102', 'Sunita Rao', '35', 'D202', '₹2,200'],
        ['P103', 'Farhan Akhtar', '61', 'D201', '₹4,800'],
        ['P104', 'Simran Kaur', '29', 'D203', '₹1,800']
      ]
    },
    questions: [
      {
        id: 'q3-1',
        subNumber: '(a)',
        question: 'Identify the Primary Key and Foreign Key in the PATIENT table.',
        marks: 1,
        modelAnswer: 'Primary Key: PatientId (uniquely identifies each patient record).\\nForeign Key: DocId (references the Primary Key DocId in the DOCTOR table).',
        markingSchemeNote: '0.5 Mark for PatientId and 0.5 Mark for DocId.'
      },
      {
        id: 'q3-2',
        subNumber: '(b)',
        question: 'Write an SQL query to display the average BillAmount charged for patients treated by doctor "D201".',
        marks: 2,
        modelAnswer: 'SELECT AVG(BillAmount) FROM PATIENT WHERE DocId = "D201";',
        markingSchemeNote: '1 Mark for AVG(BillAmount), 1 Mark for WHERE DocId = "D201".'
      },
      {
        id: 'q3-3',
        subNumber: '(c)',
        question: 'Explain what will happen if a data operator attempts to insert a record into PATIENT with a DocId of "D999" when doctor "D999" does not exist in the DOCTOR table.',
        marks: 1,
        modelAnswer: 'The database will reject the INSERT command and raise a Foreign Key Referential Integrity Violation error.',
        markingSchemeNote: '1 Mark for mentioning referential integrity violation / rejection.'
      }
    ]
  }
];

export const CaseStudyView: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('case-1');
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  const activeCase = CASE_STUDIES.find(c => c.id === selectedCaseId) || CASE_STUDIES[0];

  const toggleSolution = (qId: string) => {
    setRevealedSolutions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="CBSE Competency-Based & Case Study Questions Hub (Class 10 & 12)"
        description="Master CBSE Board Competency-Based Case Study questions with step-by-step model solutions and marking scheme notes."
        keywords={['CBSE Case Study Questions', 'Competency Based Questions', 'IT 402 Case Study', 'IP 065 Case Study', 'Zakir Hussain']}
      />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white border border-white/30 text-xs font-bold">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>CBSE 50% Competency-Based Evaluation Benchmark</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Case Studies & Competency Hub
          </h1>
          <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
            Real-world practical scenarios testing application, synthesis, and problem-solving skills as mandated by the latest CBSE examination circulars.
          </p>
        </div>

        {/* Case Switcher Pills */}
        <div className="flex flex-col gap-2 w-full md:w-auto">
          {CASE_STUDIES.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCaseId(c.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold text-left transition-all cursor-pointer ${
                selectedCaseId === c.id
                  ? 'bg-white text-purple-900 shadow-md scale-102 font-extrabold'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <span className="text-[10px] text-purple-200 block">{c.course}</span>
              <span>{c.title.split(':')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Scenario Case Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        
        {/* Header Tag Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-lg bg-purple-100 text-purple-800 text-xs font-bold font-mono">
                {activeCase.course}
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {activeCase.topic}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {activeCase.title}
            </h2>
          </div>
        </div>

        {/* Narrative Scenario Box */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm leading-relaxed space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700">
            <BookOpen className="w-4 h-4" />
            <span>Examination Scenario Text</span>
          </div>
          <p className="text-slate-700 leading-relaxed font-serif text-base">
            {activeCase.scenarioText}
          </p>

          {/* Optional Table Presentation */}
          {activeCase.tableData && (
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
                  <tr>
                    {activeCase.tableData.headers.map((h, i) => (
                      <th key={i} className="px-4 py-2.5">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeCase.tableData.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-purple-50/40">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-4 py-2 text-slate-800">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Sub-Questions & Model Solutions */}
        <div className="space-y-6 pt-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>Competency Questions Based on Scenario ({activeCase.questions.length})</span>
          </h3>

          <div className="space-y-4">
            {activeCase.questions.map(q => {
              const isRevealed = !!revealedSolutions[q.id];

              return (
                <div key={q.id} className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-2.5">
                      <span className="font-bold text-purple-700 font-mono text-base">{q.subNumber}</span>
                      <p className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                        {q.question}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-bold font-mono shrink-0">
                      [{q.marks} Mark{q.marks > 1 ? 's' : ''}]
                    </span>
                  </div>

                  {/* Toggle Model Answer Button */}
                  <div className="pt-2 border-t border-slate-100 flex flex-col gap-3">
                    <button
                      onClick={() => toggleSolution(q.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 self-start cursor-pointer"
                    >
                      {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{isRevealed ? 'Hide Model Solution' : 'View Model Answer & Marking Scheme'}</span>
                    </button>

                    {isRevealed && (
                      <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 text-xs text-purple-950 space-y-3 animate-in fade-in duration-150">
                        <div className="space-y-1">
                          <strong className="text-purple-900 flex items-center gap-1.5 text-xs">
                            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                            <span>Official Model Answer:</span>
                          </strong>
                          <p className="font-sans font-medium text-slate-800 leading-relaxed pl-5 whitespace-pre-wrap">
                            {q.modelAnswer}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-purple-200/60 text-[11px] text-purple-800 space-y-0.5">
                          <strong className="block text-purple-900">Examiner Step-Marking Scheme:</strong>
                          <p className="pl-5 italic">{q.markingSchemeNote}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
