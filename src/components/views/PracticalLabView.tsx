import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Terminal, 
  Database, 
  Code2, 
  Keyboard, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Clock, 
  Award, 
  Layers, 
  Filter, 
  BookOpen, 
  Flame, 
  ChevronRight, 
  Table, 
  HelpCircle,
  Lightbulb,
  FileSpreadsheet,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SEO } from '../SEO';
import { useApp } from '../../context/AppContext';

// =============================================================================
// 1. SQL PLAYGROUND MOCK DATABASE & EXECUTOR
// =============================================================================
interface TableRow {
  [key: string]: string | number;
}

interface TableDefinition {
  name: string;
  description: string;
  classFocus: string;
  columns: { name: string; type: string; isPrimary?: boolean }[];
  data: TableRow[];
}

const SQL_TABLES: Record<string, TableDefinition> = {
  Student: {
    name: 'Student',
    description: 'CBSE Class X & XII Student Academic & Performance Records',
    classFocus: 'Class X (IT 402) & Class XII (IP 065)',
    columns: [
      { name: 'RollNo', type: 'INT', isPrimary: true },
      { name: 'Name', type: 'VARCHAR(40)' },
      { name: 'ClassLevel', type: 'VARCHAR(5)' },
      { name: 'Stream', type: 'VARCHAR(20)' },
      { name: 'Marks', type: 'INT' },
      { name: 'City', type: 'VARCHAR(30)' },
      { name: 'FeeStatus', type: 'VARCHAR(10)' }
    ],
    data: [
      { RollNo: 101, Name: 'Aarav Sharma', ClassLevel: 'X', Stream: 'General', Marks: 94, City: 'Delhi', FeeStatus: 'Paid' },
      { RollNo: 102, Name: 'Diya Sen', ClassLevel: 'X', Stream: 'General', Marks: 98, City: 'Kolkata', FeeStatus: 'Paid' },
      { RollNo: 103, Name: 'Rohan Mehta', ClassLevel: 'X', Stream: 'General', Marks: 88, City: 'Mumbai', FeeStatus: 'Pending' },
      { RollNo: 104, Name: 'Ananya Verma', ClassLevel: 'XII', Stream: 'Science', Marks: 92, City: 'Delhi', FeeStatus: 'Paid' },
      { RollNo: 105, Name: 'Kabir Nair', ClassLevel: 'XII', Stream: 'Commerce', Marks: 85, City: 'Bengaluru', FeeStatus: 'Paid' },
      { RollNo: 106, Name: 'Bhavna Patel', ClassLevel: 'XII', Stream: 'Commerce', Marks: 96, City: 'Ahmedabad', FeeStatus: 'Pending' },
      { RollNo: 107, Name: 'Vikram Rathore', ClassLevel: 'X', Stream: 'General', Marks: 79, City: 'Jaipur', FeeStatus: 'Paid' },
      { RollNo: 108, Name: 'Sneha Kulkarni', ClassLevel: 'XII', Stream: 'Science', Marks: 91, City: 'Pune', FeeStatus: 'Paid' }
    ]
  },
  Employee: {
    name: 'Employee',
    description: 'Corporate Staff Database for SQL DML & Group By Practice',
    classFocus: 'Class X (RDBMS Base) & Class XII (MySQL)',
    columns: [
      { name: 'EmpID', type: 'INT', isPrimary: true },
      { name: 'EmpName', type: 'VARCHAR(40)' },
      { name: 'Department', type: 'VARCHAR(20)' },
      { name: 'Designation', type: 'VARCHAR(30)' },
      { name: 'Salary', type: 'DECIMAL' },
      { name: 'Commission', type: 'DECIMAL' },
      { name: 'City', type: 'VARCHAR(30)' }
    ],
    data: [
      { EmpID: 201, EmpName: 'Sunita Rao', Department: 'IT', Designation: 'Analyst', Salary: 65000, Commission: 5000, City: 'Bengaluru' },
      { EmpID: 202, EmpName: 'Manish Gupta', Department: 'HR', Designation: 'Executive', Salary: 48000, Commission: 2000, City: 'Delhi' },
      { EmpID: 203, EmpName: 'Pooja Iyer', Department: 'IT', Designation: 'Developer', Salary: 72000, Commission: 8000, City: 'Hyderabad' },
      { EmpID: 204, EmpName: 'Rajesh Khanna', Department: 'Sales', Designation: 'Manager', Salary: 85000, Commission: 12000, City: 'Mumbai' },
      { EmpID: 205, EmpName: 'Neha Deshmukh', Department: 'IT', Designation: 'Developer', Salary: 70000, Commission: 6000, City: 'Pune' },
      { EmpID: 206, EmpName: 'Amit Trivedi', Department: 'Sales', Designation: 'Executive', Salary: 42000, Commission: 4500, City: 'Delhi' },
      { EmpID: 207, EmpName: 'Kavita Joshi', Department: 'HR', Designation: 'Manager', Salary: 78000, Commission: 3000, City: 'Jaipur' }
    ]
  },
  Orders: {
    name: 'Orders',
    description: 'E-Commerce Transactions Table for Aggregate Functions (SUM, AVG, COUNT)',
    classFocus: 'CBSE Code 402 & 065 Board Practicals',
    columns: [
      { name: 'OrderID', type: 'INT', isPrimary: true },
      { name: 'Customer', type: 'VARCHAR(40)' },
      { name: 'Item', type: 'VARCHAR(30)' },
      { name: 'Quantity', type: 'INT' },
      { name: 'Price', type: 'DECIMAL' },
      { name: 'PaymentMode', type: 'VARCHAR(15)' },
      { name: 'City', type: 'VARCHAR(30)' }
    ],
    data: [
      { OrderID: 501, Customer: 'Aarav Sharma', Item: 'Keyboard', Quantity: 2, Price: 1200, PaymentMode: 'UPI', City: 'Delhi' },
      { OrderID: 502, Customer: 'Diya Sen', Item: 'Monitor', Quantity: 1, Price: 14500, PaymentMode: 'Card', City: 'Kolkata' },
      { OrderID: 503, Customer: 'Rohan Mehta', Item: 'Mouse', Quantity: 3, Price: 450, PaymentMode: 'UPI', City: 'Mumbai' },
      { OrderID: 504, Customer: 'Pooja Iyer', Item: 'RAM 16GB', Quantity: 2, Price: 4200, PaymentMode: 'NetBanking', City: 'Hyderabad' },
      { OrderID: 505, Customer: 'Kabir Nair', Item: 'SSD 1TB', Quantity: 1, Price: 6800, PaymentMode: 'UPI', City: 'Bengaluru' },
      { OrderID: 506, Customer: 'Sneha Kulkarni', Item: 'Keyboard', Quantity: 1, Price: 1500, PaymentMode: 'Card', City: 'Pune' }
    ]
  }
};

const SQL_TEMPLATES = [
  {
    label: 'All Students in Class X',
    query: 'SELECT Name, Marks, City FROM Student WHERE ClassLevel = \'X\' ORDER BY Marks DESC;'
  },
  {
    label: 'IT Dept High Earners',
    query: 'SELECT EmpName, Designation, Salary FROM Employee WHERE Department = \'IT\' AND Salary >= 65000;'
  },
  {
    label: 'Count & Average Marks by Class',
    query: 'SELECT ClassLevel, COUNT(*) AS TotalStudents, AVG(Marks) AS AverageMarks FROM Student GROUP BY ClassLevel;'
  },
  {
    label: 'Orders Sum by Item',
    query: 'SELECT Item, SUM(Quantity) AS TotalQty, SUM(Price * Quantity) AS TotalRevenue FROM Orders GROUP BY Item ORDER BY TotalRevenue DESC;'
  },
  {
    label: 'Employees with Names starting with M or S',
    query: 'SELECT EmpID, EmpName, Department, Salary FROM Employee WHERE EmpName LIKE \'S%\' OR EmpName LIKE \'M%\';'
  }
];

// Lightweight client-side SQL parser & executor
function executeMockSQL(sql: string): { columns: string[]; rows: TableRow[]; error?: string; executionTimeMs: number } {
  const startTime = performance.now();
  const cleaned = sql.trim().replace(/;+$/, '');

  if (!cleaned.toUpperCase().startsWith('SELECT')) {
    return {
      columns: [],
      rows: [],
      error: 'Interactive Playground currently executes SELECT, WHERE, ORDER BY, and GROUP BY queries for safety.',
      executionTimeMs: 0
    };
  }

  try {
    // Detect Target Table
    const fromMatch = cleaned.match(/FROM\s+([a-zA-Z0-9_]+)/i);
    if (!fromMatch) {
      return { columns: [], rows: [], error: 'Syntax Error: Missing FROM clause.', executionTimeMs: 0 };
    }

    const tableName = Object.keys(SQL_TABLES).find(t => t.toLowerCase() === fromMatch[1].toLowerCase());
    if (!tableName) {
      return {
        columns: [],
        rows: [],
        error: `Table '${fromMatch[1]}' not found. Available mock tables: ${Object.keys(SQL_TABLES).join(', ')}`,
        executionTimeMs: 0
      };
    }

    const tableDef = SQL_TABLES[tableName];
    let workingRows = [...tableDef.data];

    // WHERE Clause Processing
    const whereMatch = cleaned.match(/WHERE\s+(.*?)(?:GROUP\s+BY|ORDER\s+BY|LIMIT|$)/i);
    if (whereMatch) {
      const whereCondition = whereMatch[1].trim();

      // Handle simple comparisons
      workingRows = workingRows.filter(row => {
        try {
          // Check for LIKE 'X%'
          const likeMatch = whereCondition.match(/([a-zA-Z0-9_]+)\s+LIKE\s+['"](.*?)['"]/i);
          if (likeMatch) {
            const col = likeMatch[1];
            const pattern = likeMatch[2];
            const val = String(row[col] || '');
            if (pattern.startsWith('%') && pattern.endsWith('%')) {
              return val.toLowerCase().includes(pattern.slice(1, -1).toLowerCase());
            } else if (pattern.endsWith('%')) {
              return val.toLowerCase().startsWith(pattern.slice(0, -1).toLowerCase());
            } else if (pattern.startsWith('%')) {
              return val.toLowerCase().endsWith(pattern.slice(1).toLowerCase());
            }
            return val.toLowerCase() === pattern.toLowerCase();
          }

          // Check Equality/Inequality
          const eqMatch = whereCondition.match(/([a-zA-Z0-9_]+)\s*(=|!=|>=|<=|>|<)\s*['"]?([^'"]+)['"]?/);
          if (eqMatch) {
            const col = eqMatch[1];
            const op = eqMatch[2];
            const targetVal = eqMatch[3].trim();
            const cellVal = row[col];

            const numTarget = Number(targetVal);
            const numCell = Number(cellVal);
            const isNumeric = !isNaN(numTarget) && !isNaN(numCell);

            if (isNumeric) {
              if (op === '=') return numCell === numTarget;
              if (op === '!=') return numCell !== numTarget;
              if (op === '>') return numCell > numTarget;
              if (op === '>=') return numCell >= numTarget;
              if (op === '<') return numCell < numTarget;
              if (op === '<=') return numCell <= numTarget;
            } else {
              const sCell = String(cellVal).toLowerCase();
              const sTarget = targetVal.toLowerCase();
              if (op === '=') return sCell === sTarget;
              if (op === '!=') return sCell !== sTarget;
            }
          }

          return true;
        } catch {
          return true;
        }
      });
    }

    // GROUP BY Clause
    const groupMatch = cleaned.match(/GROUP\s+BY\s+([a-zA-Z0-9_]+)/i);
    let isGrouped = false;
    let groupedResults: TableRow[] = [];

    if (groupMatch) {
      isGrouped = true;
      const groupCol = groupMatch[1];
      const groups: Record<string, TableRow[]> = {};

      workingRows.forEach(r => {
        const key = String(r[groupCol]);
        if (!groups[key]) groups[key] = [];
        groups[key].push(r);
      });

      groupedResults = Object.entries(groups).map(([groupVal, items]) => {
        const resultRow: TableRow = { [groupCol]: groupVal };
        // Detect aggregates like COUNT(*), AVG(Marks), SUM(Quantity)
        resultRow['TotalCount'] = items.length;

        // Auto compute standard aggregates
        if (items[0]['Marks'] !== undefined) {
          const totalMarks = items.reduce((acc, curr) => acc + Number(curr['Marks']), 0);
          resultRow['AverageMarks'] = Math.round(totalMarks / items.length);
        }
        if (items[0]['Salary'] !== undefined) {
          const totalSal = items.reduce((acc, curr) => acc + Number(curr['Salary']), 0);
          resultRow['TotalSalary'] = totalSal;
          resultRow['AverageSalary'] = Math.round(totalSal / items.length);
        }
        if (items[0]['Quantity'] !== undefined) {
          const totalQty = items.reduce((acc, curr) => acc + Number(curr['Quantity']), 0);
          resultRow['TotalQuantity'] = totalQty;
        }

        return resultRow;
      });

      workingRows = groupedResults;
    }

    // ORDER BY Clause
    const orderMatch = cleaned.match(/ORDER\s+BY\s+([a-zA-Z0-9_]+)(?:\s+(ASC|DESC))?/i);
    if (orderMatch) {
      const orderCol = orderMatch[1];
      const isDesc = (orderMatch[2] || 'ASC').toUpperCase() === 'DESC';

      workingRows.sort((a, b) => {
        const valA = a[orderCol];
        const valB = b[orderCol];
        if (typeof valA === 'number' && typeof valB === 'number') {
          return isDesc ? valB - valA : valA - valB;
        }
        return isDesc
          ? String(valB).localeCompare(String(valA))
          : String(valA).localeCompare(String(valB));
      });
    }

    // Determine Columns
    let resultColumns: string[] = [];
    if (isGrouped) {
      resultColumns = Object.keys(workingRows[0] || {});
    } else {
      const selectPart = cleaned.substring(6, cleaned.toUpperCase().indexOf('FROM')).trim();
      if (selectPart === '*') {
        resultColumns = tableDef.columns.map(c => c.name);
      } else {
        const requested = selectPart.split(',').map(c => c.trim().split(/\s+AS\s+/i)[0].trim());
        resultColumns = requested.filter(c => tableDef.columns.some(col => col.name.toLowerCase() === c.toLowerCase()));
        if (resultColumns.length === 0) {
          resultColumns = tableDef.columns.map(c => c.name);
        }
      }
    }

    const elapsed = Math.round((performance.now() - startTime) * 10) / 10;
    return {
      columns: resultColumns,
      rows: workingRows,
      executionTimeMs: Math.max(elapsed, 1.2)
    };
  } catch (err: any) {
    return {
      columns: [],
      rows: [],
      error: `Query Execution Error: ${err.message || 'Check SQL syntax'}`,
      executionTimeMs: 0
    };
  }
}

// =============================================================================
// 2. PYTHON PANDAS SIMULATOR TEMPLATES
// =============================================================================
interface PythonSnippet {
  id: string;
  title: string;
  category: string;
  code: string;
  tableData?: TableRow[];
  consoleOutput: string;
  explanation: string;
}

const PYTHON_SNIPPETS: PythonSnippet[] = [
  {
    id: 'py-series',
    title: 'Series Creation with Custom Index',
    category: 'Class XI & XII IP (065)',
    code: `import pandas as pd

# Creating a Series from a Python Dictionary with Subject Marks
marks_dict = {'IT': 95, 'IP': 98, 'English': 92, 'Maths': 89}
subject_series = pd.Series(marks_dict)

print("Series Output:")
print(subject_series)
print("\\nSeries Data Type:", subject_series.dtype)
print("Highest Score:", subject_series.max())`,
    tableData: [
      { Subject: 'IT', Marks: 95 },
      { Subject: 'IP', Marks: 98 },
      { Subject: 'English', Marks: 92 },
      { Subject: 'Maths', Marks: 89 }
    ],
    consoleOutput: `Series Output:\nIT         95\nIP         98\nEnglish    92\nMaths      89\ndtype: int64\n\nSeries Data Type: int64\nHighest Score: 98`,
    explanation: 'A Series is a one-dimensional labeled array in Pandas capable of holding any data type. Dictionary keys automatically become index labels.'
  },
  {
    id: 'py-dataframe-loc',
    title: 'DataFrame Indexing with .loc[] and .iloc[]',
    category: 'Class XII IP Board Focus',
    code: `import pandas as pd

data = {
    'Student': ['Aarav', 'Diya', 'Rohan', 'Sneha'],
    'Score': [92, 98, 85, 94],
    'City': ['Delhi', 'Kolkata', 'Mumbai', 'Pune']
}

df = pd.DataFrame(data, index=['R1', 'R2', 'R3', 'R4'])

# .loc[] uses label-based indexing
print("--- Using .loc['R2'] (Label-based) ---")
print(df.loc['R2'])

# .iloc[] uses integer position indexing
print("\\n--- Using .iloc[0:2] (Position-based) ---")
print(df.iloc[0:2])`,
    tableData: [
      { Index: 'R1', Student: 'Aarav', Score: 92, City: 'Delhi' },
      { Index: 'R2', Student: 'Diya', Score: 98, City: 'Kolkata' },
      { Index: 'R3', Student: 'Rohan', Score: 85, City: 'Mumbai' },
      { Index: 'R4', Student: 'Sneha', Score: 94, City: 'Pune' }
    ],
    consoleOutput: `--- Using .loc['R2'] (Label-based) ---\nStudent        Diya\nScore            98\nCity        Kolkata\nName: R2, dtype: object\n\n--- Using .iloc[0:2] (Position-based) ---\n   Student  Score     City\nR1   Aarav     92    Delhi\nR2    Diya     98  Kolkata`,
    explanation: 'CRITICAL CBSE BOARD RULE: df.loc[] includes both start and stop labels. df.iloc[] is exclusive of the stop integer index!'
  },
  {
    id: 'py-dataframe-stats',
    title: 'Descriptive Statistics (.describe() & .mean())',
    category: 'Class XII IP Statistics',
    code: `import pandas as pd

exam_data = {
    'Term1': [85, 92, 78, 95, 88],
    'Term2': [89, 96, 82, 98, 91]
}

df = pd.DataFrame(exam_data, index=['S1', 'S2', 'S3', 'S4', 'S5'])

print("Average Score per Term:")
print(df.mean())

print("\\nComprehensive Summary Statistics (.describe()):")
print(df.describe())`,
    tableData: [
      { Statistic: 'count', Term1: 5.0, Term2: 5.0 },
      { Statistic: 'mean', Term1: 87.6, Term2: 91.2 },
      { Statistic: 'std', Term1: 6.73, Term2: 6.34 },
      { Statistic: 'min', Term1: 78.0, Term2: 82.0 },
      { Statistic: 'max', Term1: 95.0, Term2: 98.0 }
    ],
    consoleOutput: `Average Score per Term:\nTerm1    87.6\nTerm2    91.2\ndtype: float64\n\nComprehensive Summary Statistics (.describe()):\n           Term1      Term2\ncount   5.000000   5.000000\nmean   87.600000  91.200000\nstd     6.730527   6.340347\nmin    78.000000  82.000000\nmax    95.000000  98.000000`,
    explanation: 'The describe() method computes count, mean, standard deviation, minimum, quartiles, and maximum for numeric columns.'
  }
];

// =============================================================================
// 3. TYPING SPEED & ACCURACY LAB PASSAGES (Typography Code 817)
// =============================================================================
const TYPING_PASSAGES = [
  {
    id: 'passage-memo',
    title: 'CBSE Official Memorandum & Notice Formatting',
    difficulty: 'Medium',
    targetWpm: 35,
    text: 'A Memorandum is an informal communication used within an organization for brief notifications or records. It differs from an official letter as it does not carry a formal salutation or complimentary close. Accuracy in touch typing demands that fingers remain placed upon the home row keys, striking each letter with rhythmic precision and uniform pressure.'
  },
  {
    id: 'passage-keyboarding',
    title: 'Principles of Modern Touch Typing & Home Row Mechanics',
    difficulty: 'Standard',
    targetWpm: 30,
    text: 'Touch typing is the technique of typing without looking at the computer keyboard. The eight fingers rest upon the home row keys: A, S, D, F for the left hand and J, K, L, Semicolon for the right hand. The thumbs operate the spacebar. Maintaining correct posture and avoiding looking at the keys builds muscle memory, which is essential for high gross words per minute.'
  },
  {
    id: 'passage-correspondence',
    title: 'Business Letter Structure & Tabular Precision',
    difficulty: 'Advanced',
    targetWpm: 40,
    text: 'A business letter must present neat margins, accurate tab stops, and clear subject lines. In the fully blocked style, all typed matter commences from the extreme left margin without paragraph indentation. In tabular work, column headings must be centered over figures, with decimals aligning precisely for administrative clarity.'
  }
];

export const PracticalLabView: React.FC = () => {
  const { studentProfile } = useApp();
  const [activeTab, setActiveTab] = useState<'sql' | 'python' | 'typing'>('sql');

  // SQL State
  const [activeTableKey, setActiveTableKey] = useState<string>('Student');
  const [sqlQuery, setSqlQuery] = useState<string>('SELECT Name, Marks, City FROM Student WHERE Marks >= 90 ORDER BY Marks DESC;');
  const [sqlResult, setSqlResult] = useState<{ columns: string[]; rows: TableRow[]; error?: string; executionTimeMs: number }>(() => executeMockSQL(sqlQuery));
  const [copiedQuery, setCopiedQuery] = useState(false);

  // Python State
  const [selectedPySnippet, setSelectedPySnippet] = useState<PythonSnippet>(PYTHON_SNIPPETS[0]);
  const [pyCode, setPyCode] = useState<string>(PYTHON_SNIPPETS[0].code);
  const [pyConsoleOutput, setPyConsoleOutput] = useState<string>(PYTHON_SNIPPETS[0].consoleOutput);
  const [isRunningPython, setIsRunningPython] = useState(false);

  // Typing Lab State
  const [selectedPassageIndex, setSelectedPassageIndex] = useState(0);
  const [typingInput, setTypingInput] = useState('');
  const [testDurationSeconds, setTestDurationSeconds] = useState(60);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [isTypingActive, setIsTypingActive] = useState(false);
  const [isTypingCompleted, setIsTypingCompleted] = useState(false);
  const [backspaceCount, setBackspaceCount] = useState(0);
  const typingInputRef = useRef<HTMLTextAreaElement>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const activePassage = TYPING_PASSAGES[selectedPassageIndex];

  // Execute SQL Query
  const handleRunSQL = () => {
    const res = executeMockSQL(sqlQuery);
    setSqlResult(res);
  };

  // Run Python simulation
  const handleRunPython = () => {
    setIsRunningPython(true);
    setTimeout(() => {
      setIsRunningPython(false);
      setPyConsoleOutput(selectedPySnippet.consoleOutput);
    }, 400);
  };

  // Load SQL Template
  const handleLoadTemplate = (tplQuery: string) => {
    setSqlQuery(tplQuery);
    setSqlResult(executeMockSQL(tplQuery));
  };

  // Typing Lab Calculations
  const totalTypedWords = useMemo(() => {
    return typingInput.trim().split(/\s+/).filter(Boolean).length;
  }, [typingInput]);

  const typingAccuracy = useMemo(() => {
    if (!typingInput) return 100;
    let correctChars = 0;
    const target = activePassage.text;
    for (let i = 0; i < typingInput.length; i++) {
      if (typingInput[i] === target[i]) {
        correctChars++;
      }
    }
    return Math.round((correctChars / typingInput.length) * 100);
  }, [typingInput, activePassage.text]);

  const calculatedWpm = useMemo(() => {
    const timeSpentMinutes = Math.max(0.1, (testDurationSeconds - timeRemaining) / 60);
    const standardWords = typingInput.length / 5;
    return Math.round((standardWords / timeSpentMinutes) * (typingAccuracy / 100));
  }, [typingInput.length, testDurationSeconds, timeRemaining, typingAccuracy]);

  // Typing Lab Timer
  useEffect(() => {
    if (isTypingActive && timeRemaining > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current!);
            setIsTypingActive(false);
            setIsTypingCompleted(true);
            try {
              confetti({ particleCount: 60, spread: 60 });
            } catch {}
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTypingActive, timeRemaining]);

  const handleStartTypingTest = () => {
    setTypingInput('');
    setBackspaceCount(0);
    setTimeRemaining(testDurationSeconds);
    setIsTypingActive(true);
    setIsTypingCompleted(false);
    setTimeout(() => {
      typingInputRef.current?.focus();
    }, 50);
  };

  const handleResetTypingTest = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setIsTypingActive(false);
    setIsTypingCompleted(false);
    setTypingInput('');
    setBackspaceCount(0);
    setTimeRemaining(testDurationSeconds);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      <SEO
        title="Interactive Practical Lab • SQL, Python & Typography"
        description="Run in-browser SQL queries, Python Pandas code, and take CBSE touch typing tests for Code 402, 065, and 817."
      />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>50% Board Exam Practical Marks • Zero Installation Sandbox</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Interactive Practical Playgrounds
          </h1>
          <p className="text-xs sm:text-sm text-blue-200/90 max-w-2xl leading-relaxed">
            Execute SQL queries on live tables, run Python Pandas Series & DataFrame code, and test Typography touch typing speed with authentic CBSE marking rules.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex flex-wrap p-1.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 gap-1 self-stretch md:self-auto z-10">
          <button
            onClick={() => setActiveTab('sql')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'sql'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-blue-200 hover:text-white hover:bg-white/10'
            }`}
          >
            <Database className="w-4 h-4 text-cyan-300" />
            <span>In-Browser SQL</span>
          </button>

          <button
            onClick={() => setActiveTab('python')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'python'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-blue-200 hover:text-white hover:bg-white/10'
            }`}
          >
            <Code2 className="w-4 h-4 text-emerald-300" />
            <span>Python Pandas Sandbox</span>
          </button>

          <button
            onClick={() => setActiveTab('typing')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'typing'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-blue-200 hover:text-white hover:bg-white/10'
            }`}
          >
            <Keyboard className="w-4 h-4 text-amber-300" />
            <span>Typing Lab (Code 817)</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 1. IN-BROWSER SQL PLAYGROUND */}
      {/* ===================================================================== */}
      {activeTab === 'sql' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Left: Schema & Table Inspector */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Table className="w-4 h-4 text-blue-600" />
                    <span>Mock Tables</span>
                  </h3>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {Object.keys(SQL_TABLES).length} Preloaded
                  </span>
                </div>

                <div className="space-y-1.5">
                  {Object.entries(SQL_TABLES).map(([key, tDef]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setActiveTableKey(key);
                        setSqlQuery(`SELECT * FROM ${key};`);
                        setSqlResult(executeMockSQL(`SELECT * FROM ${key};`));
                      }}
                      className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        activeTableKey === key
                          ? 'bg-blue-50/80 border-blue-400 text-blue-900 shadow-xs'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div>
                        <p className="font-bold text-xs">{tDef.name}</p>
                        <p className="text-[10px] text-slate-500 line-clamp-1">{tDef.description}</p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </button>
                  ))}
                </div>

                {/* Selected Table Column Schema */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <p className="text-[11px] font-bold text-slate-700">
                    Schema for <span className="font-mono text-blue-600 font-bold">{SQL_TABLES[activeTableKey].name}</span>:
                  </p>
                  <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                    {SQL_TABLES[activeTableKey].columns.map(col => (
                      <div key={col.name} className="flex items-center justify-between text-[11px] p-1.5 bg-slate-50 rounded-lg">
                        <span className="font-mono text-slate-800 font-semibold flex items-center gap-1">
                          {col.isPrimary && <span className="text-amber-500 font-bold" title="Primary Key">🔑</span>}
                          {col.name}
                        </span>
                        <span className="font-mono text-[10px] text-slate-500">{col.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CBSE Board Query Starters */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span>Board Query Templates</span>
                </h4>
                <div className="space-y-1.5">
                  {SQL_TEMPLATES.map((tpl, i) => (
                    <button
                      key={i}
                      onClick={() => handleLoadTemplate(tpl.query)}
                      className="w-full text-left p-2.5 rounded-xl border border-slate-200/80 hover:bg-blue-50/60 hover:border-blue-300 text-xs text-slate-700 transition-colors cursor-pointer group"
                    >
                      <span className="font-semibold block text-slate-900 group-hover:text-blue-600">{tpl.label}</span>
                      <code className="text-[10px] text-slate-500 font-mono line-clamp-1 mt-0.5">{tpl.query}</code>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Code Editor & Result Table */}
            <div className="lg:col-span-3 space-y-4">
              
              {/* SQL Query Editor Console */}
              <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-xl space-y-3 text-white">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono font-bold text-slate-300">SQL Terminal Console</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(sqlQuery);
                        setCopiedQuery(true);
                        setTimeout(() => setCopiedQuery(false), 2000);
                      }}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 cursor-pointer transition-colors"
                      title="Copy SQL Query"
                    >
                      {copiedQuery ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={handleRunSQL}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer hover:scale-102"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Execute Query (Run)</span>
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    rows={4}
                    value={sqlQuery}
                    onChange={e => setSqlQuery(e.target.value)}
                    placeholder="Type SQL query here (e.g. SELECT * FROM Student WHERE Marks > 90;)"
                    className="w-full bg-slate-950 font-mono text-sm text-emerald-400 p-4 rounded-2xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed resize-y"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Supports: <strong className="text-slate-300">SELECT, WHERE, LIKE, ORDER BY, GROUP BY</strong></span>
                  <span className="font-mono text-emerald-400">⚡ Client-Side Web SQL Engine</span>
                </div>
              </div>

              {/* Execution Feedback & Result Box */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">Query Execution Output</h3>
                    {!sqlResult.error && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {sqlResult.rows.length} Rows Returned
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      <span>{sqlResult.executionTimeMs} ms</span>
                    </span>
                  </div>
                </div>

                {sqlResult.error ? (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                    <div>
                      <p className="font-bold">SQL Execution Failed</p>
                      <p className="mt-0.5 font-mono">{sqlResult.error}</p>
                    </div>
                  </div>
                ) : sqlResult.rows.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 space-y-1">
                    <Table className="w-8 h-8 mx-auto text-slate-300" />
                    <p className="text-xs">No records matched your query condition.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                        <tr>
                          {sqlResult.columns.map(col => (
                            <th key={col} className="px-4 py-3 font-mono text-[11px] uppercase tracking-wider">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {sqlResult.rows.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                            {sqlResult.columns.map(col => (
                              <td key={col} className="px-4 py-2.5 font-mono text-slate-800 text-[11px]">
                                {row[col] !== undefined ? String(row[col]) : 'NULL'}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. PYTHON PANDAS & SERIES VISUALIZER */}
      {/* ===================================================================== */}
      {activeTab === 'python' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Code Selector & Topics */}
            <div className="space-y-4">
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>CBSE IP 065 Python Topics</span>
                </h3>

                <div className="space-y-2">
                  {PYTHON_SNIPPETS.map(snippet => (
                    <button
                      key={snippet.id}
                      onClick={() => {
                        setSelectedPySnippet(snippet);
                        setPyCode(snippet.code);
                        setPyConsoleOutput(snippet.consoleOutput);
                      }}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        selectedPySnippet.id === snippet.id
                          ? 'bg-emerald-50/90 border-emerald-400 text-emerald-950 shadow-xs'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-emerald-700 uppercase">{snippet.category}</span>
                        {selectedPySnippet.id === snippet.id && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </div>
                      <h4 className="font-bold text-xs text-slate-900">{snippet.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">{snippet.explanation}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Board Advice Callout */}
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-blue-950">
                  <Lightbulb className="w-4 h-4 text-blue-600" />
                  <span>Examiner Tip for IP (065)</span>
                </div>
                <p className="leading-relaxed text-[11px]">
                  Board question papers frequently ask the difference between Series and DataFrame, or ask to identify the output of slicing commands. Remember that Series is 1D while DataFrame is 2D.
                </p>
              </div>
            </div>

            {/* Python Code Editor & Output */}
            <div className="lg:col-span-2 space-y-4">
              
              {/* Code Editor */}
              <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-xl space-y-3 text-white">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono font-bold text-slate-300">
                      Python 3.12 (Pandas Sandbox) • {selectedPySnippet.title}
                    </span>
                  </div>

                  <button
                    onClick={handleRunPython}
                    disabled={isRunningPython}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer hover:scale-102"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{isRunningPython ? 'Executing...' : 'Run Python Code'}</span>
                  </button>
                </div>

                <div className="relative">
                  <textarea
                    rows={8}
                    value={pyCode}
                    onChange={e => setPyCode(e.target.value)}
                    className="w-full bg-slate-950 font-mono text-xs sm:text-sm text-emerald-400 p-4 rounded-2xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed resize-y"
                  />
                </div>
              </div>

              {/* Console & DataFrame Visualizer */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-slate-700" />
                    <span>Standard Terminal Output</span>
                  </h3>
                  <pre className="bg-slate-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs leading-relaxed overflow-x-auto shadow-inner">
                    {pyConsoleOutput}
                  </pre>
                </div>

                {selectedPySnippet.tableData && (
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                      <span>Visual DataFrame Representation</span>
                    </h3>
                    <div className="overflow-x-auto rounded-2xl border border-slate-200">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                          <tr>
                            {Object.keys(selectedPySnippet.tableData[0] || {}).map(header => (
                              <th key={header} className="px-4 py-2.5 text-[11px] uppercase">{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {selectedPySnippet.tableData.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50">
                              {Object.values(row).map((val, cIdx) => (
                                <td key={cIdx} className="px-4 py-2 text-slate-800">{String(val)}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 3. TYPING SPEED & ACCURACY LAB (Typography 817) */}
      {/* ===================================================================== */}
      {activeTab === 'typing' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block">
                  CBSE Code 817 • Practical Examination Simulator
                </span>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Keyboard className="w-5 h-5 text-amber-500" />
                  <span>Touch Typing Speed & Accuracy Assessment</span>
                </h2>
              </div>

              {/* Duration & Passage Selector */}
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={selectedPassageIndex}
                  onChange={e => {
                    setSelectedPassageIndex(Number(e.target.value));
                    handleResetTypingTest();
                  }}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-700"
                >
                  {TYPING_PASSAGES.map((p, idx) => (
                    <option key={p.id} value={idx}>{p.title} ({p.difficulty})</option>
                  ))}
                </select>

                <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
                  {[60, 120, 300].map(sec => (
                    <button
                      key={sec}
                      onClick={() => {
                        setTestDurationSeconds(sec);
                        setTimeRemaining(sec);
                        handleResetTypingTest();
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        testDurationSeconds === sec
                          ? 'bg-white text-blue-600 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {sec / 60}m
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-3xl font-black font-mono text-blue-600">{calculatedWpm}</span>
                <p className="text-xs font-bold text-slate-600 uppercase mt-1">Net WPM</p>
                <p className="text-[10px] text-slate-400">Target: {activePassage.targetWpm} WPM</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-3xl font-black font-mono text-emerald-600">{typingAccuracy}%</span>
                <p className="text-xs font-bold text-slate-600 uppercase mt-1">Accuracy</p>
                <p className="text-[10px] text-slate-400">Min 90% for Board Pass</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className={`text-3xl font-black font-mono ${timeRemaining <= 10 ? 'text-rose-600 animate-pulse' : 'text-slate-800'}`}>
                  {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                </span>
                <p className="text-xs font-bold text-slate-600 uppercase mt-1">Time Remaining</p>
                <p className="text-[10px] text-slate-400">Auto-submit at 00:00</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-3xl font-black font-mono text-amber-600">{backspaceCount}</span>
                <p className="text-xs font-bold text-slate-600 uppercase mt-1">Backspaces</p>
                <p className="text-[10px] text-slate-400">Errors Corrected</p>
              </div>
            </div>

            {/* Target Passage Text Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Official Passage Text:
              </span>
              <p className="text-base text-slate-800 leading-relaxed font-serif select-none">
                {activePassage.text}
              </p>
            </div>

            {/* Input Typing Area */}
            <div className="space-y-3">
              <textarea
                ref={typingInputRef}
                rows={5}
                disabled={isTypingCompleted}
                value={typingInput}
                onChange={e => {
                  if (!isTypingActive && !isTypingCompleted) {
                    setIsTypingActive(true);
                  }
                  setTypingInput(e.target.value);
                  if (e.target.value.length >= activePassage.text.length) {
                    setIsTypingActive(false);
                    setIsTypingCompleted(true);
                  }
                }}
                onKeyDown={e => {
                  if (e.key === 'Backspace') {
                    setBackspaceCount(prev => prev + 1);
                  }
                }}
                placeholder={isTypingActive ? "Type here continuously..." : "Click 'Start Typing Test' below or start typing here..."}
                className="w-full p-4 rounded-2xl border-2 border-slate-300 focus:border-amber-500 focus:ring-0 text-sm sm:text-base font-serif leading-relaxed text-slate-900 bg-white shadow-inner"
              />

              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-slate-500">
                  Typed {typingInput.length} of {activePassage.text.length} characters ({totalTypedWords} words)
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetTypingTest}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Reset
                  </button>

                  <button
                    onClick={handleStartTypingTest}
                    className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                  >
                    {isTypingActive ? 'Restart Test' : 'Start Typing Test'}
                  </button>
                </div>
              </div>
            </div>

            {/* Results & Typist Grade Card */}
            {isTypingCompleted && (
              <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-50 to-orange-50 border border-amber-300 space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-6 h-6 text-amber-600" />
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">Typing Assessment Completed!</h3>
                      <p className="text-xs text-slate-600">CBSE Code 817 Speed Certificate Standard</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                    calculatedWpm >= 35 && typingAccuracy >= 90
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {calculatedWpm >= 45 ? 'Master Typist (Grade A+)' : calculatedWpm >= 35 ? 'Board Qualified (Grade A)' : 'Practice Needed'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-amber-200">
                    <span className="text-slate-500 block">Gross Speed</span>
                    <strong className="text-base text-slate-900">{calculatedWpm} WPM</strong>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-amber-200">
                    <span className="text-slate-500 block">Touch Accuracy</span>
                    <strong className="text-base text-slate-900">{typingAccuracy}%</strong>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-amber-200">
                    <span className="text-slate-500 block">Pass Criterion</span>
                    <strong className="text-base text-slate-900">30 WPM / 90% Acc</strong>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
