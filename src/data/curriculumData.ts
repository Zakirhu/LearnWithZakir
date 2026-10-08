import { ClassLevel, SubjectInfo, Chapter, SubjectId } from '../types';

export const CLASSES_LIST: { level: ClassLevel; name: string; subtitle: string }[] = [
  { level: 'VI', name: 'Class VI', subtitle: 'IT Fundamentals & Digital Literacy' },
  { level: 'VII', name: 'Class VII', subtitle: 'Spreadsheets, Coding & Web Basics' },
  { level: 'VIII', name: 'Class VIII', subtitle: 'Database Concepts & Logic Building' },
  { level: 'IX', name: 'Class IX', subtitle: 'CBSE IT (Code 402) - Part A & Part B' },
  { level: 'X', name: 'Class X', subtitle: 'CBSE Board Focus: IT (Code 402)' },
  { level: 'XI', name: 'Class XI', subtitle: 'IT (802), IP (065) & Typography (817)' },
  { level: 'XII', name: 'Class XII', subtitle: 'Board Exam: IT (802), IP (065) & Typography (817)' },
];

export const SUBJECTS_LIST: SubjectInfo[] = [
  {
    id: 'it-402',
    code: 'CBSE 402',
    name: 'Information Technology',
    classes: ['VI', 'VII', 'VIII', 'IX', 'X'],
    description: 'Digital Documentation, Electronic Spreadsheets, Database Management System (DBMS), and Web Applications & Security (Aligned with CBSESkillEducation).',
    iconName: 'Laptop',
    accentColor: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'it-802',
    code: 'CBSE 802',
    name: 'Information Technology (Sr. Secondary)',
    classes: ['XI', 'XII'],
    description: 'Computer Organization, Advanced Networking, Operating Systems, Java Programming & Web Applications (Aligned with CBSESkillEducation).',
    iconName: 'Server',
    accentColor: 'from-purple-600 to-pink-600',
  },
  {
    id: 'ip-065',
    code: 'CBSE 065',
    name: 'Informatics Practices',
    classes: ['XI', 'XII'],
    description: 'Data Handling using Python Pandas, Data Visualization using Pyplot, Database Query using SQL, and Societal Impacts of IT.',
    iconName: 'Database',
    accentColor: 'from-emerald-600 to-teal-600',
  },
  {
    id: 'typo-817',
    code: 'CBSE 817',
    name: 'Typography & Computer Applications',
    classes: ['XI', 'XII'],
    description: 'Keyboarding skills, touch typing methods, business correspondence, spreadsheet manipulation, and presentation mechanics.',
    iconName: 'Keyboard',
    accentColor: 'from-amber-600 to-orange-600',
  },
  {
    id: 'ca-165',
    code: 'CBSE 165',
    name: 'Computer Applications',
    classes: ['IX', 'X'],
    description: 'Basics of Information Technology, Cyber Ethics, HTML5 & CSS Web Design, and Scratch programming.',
    iconName: 'Code',
    accentColor: 'from-cyan-600 to-blue-600',
  },
  {
    id: 'cs-middle',
    code: 'Foundational CS',
    name: 'Computer Science & Digital Literacy',
    classes: ['VI', 'VII', 'VIII'],
    description: 'Computer Fundamentals, MS Office/LibreOffice, Scratch Block Coding, Internet Safety, and Computational Thinking.',
    iconName: 'Binary',
    accentColor: 'from-rose-600 to-red-600',
  }
];

export const CHAPTERS_DATA: Chapter[] = [
  // ==========================================
  // Class X - IT (Code 402) - Part B: Subject Specific Skills
  // ==========================================
  {
    id: 'x-it-ch1',
    classLevel: 'X',
    subjectId: 'it-402',
    chapterNumber: 1,
    title: 'Digital Documentation (Advanced)',
    description: 'Styles, Fill Format, inserting images, text wrapping, Table of Contents (TOC), and Templates in LibreOffice Writer.'
  },
  {
    id: 'x-it-ch2',
    classLevel: 'X',
    subjectId: 'it-402',
    chapterNumber: 2,
    title: 'Electronic Spreadsheet (Advanced)',
    description: 'Consolidating data, Subtotals, What-If Analysis (Scenarios, Goal Seek, Solver), Linking spreadsheets, Sharing & Macros in Calc.'
  },
  {
    id: 'x-it-ch3',
    classLevel: 'X',
    subjectId: 'it-402',
    chapterNumber: 3,
    title: 'Database Management System (DBMS)',
    description: 'Relational concepts, Primary & Foreign Keys, SQL Commands (SELECT, INSERT, UPDATE, DELETE), Tables, Forms & Reports in Base.'
  },
  {
    id: 'x-it-ch4',
    classLevel: 'X',
    subjectId: 'it-402',
    chapterNumber: 4,
    title: 'Web Applications and Security',
    description: 'Accessibility options, networking fundamentals, instant messaging, blogs, online transactions, cyber safety & workplace hazards.'
  },

  // Class X - IT (Code 402) - Part A: Employability Skills
  {
    id: 'x-it-ch5',
    classLevel: 'X',
    subjectId: 'it-402',
    chapterNumber: 5,
    title: 'Communication Skills - II',
    description: 'Methods of communication, communication cycle, feedback types, barriers to communication, and the 7 Cs of communication.'
  },
  {
    id: 'x-it-ch6',
    classLevel: 'X',
    subjectId: 'it-402',
    chapterNumber: 6,
    title: 'Self-Management Skills - II',
    description: 'Stress management techniques, physical exercise, working independently, self-awareness, and SMART goal setting.'
  },
  {
    id: 'x-it-ch7',
    classLevel: 'X',
    subjectId: 'it-402',
    chapterNumber: 7,
    title: 'Basic ICT Skills - II',
    description: 'Operating system functions, file & folder management, system maintenance, virus protection, and data backup.'
  },
  {
    id: 'x-it-ch8',
    classLevel: 'X',
    subjectId: 'it-402',
    chapterNumber: 8,
    title: 'Entrepreneurial Skills - II',
    description: 'Characteristics of entrepreneurs, role of entrepreneurship in economic growth, and overcoming business myths.'
  },
  {
    id: 'x-it-ch9',
    classLevel: 'X',
    subjectId: 'it-402',
    chapterNumber: 9,
    title: 'Green Skills - II',
    description: 'Sustainable development concepts, UN Sustainable Development Goals (SDGs), and green economy initiatives.'
  },

  // ==========================================
  // Class IX - IT (Code 402) - Part B: Subject Specific Skills
  // ==========================================
  {
    id: 'ix-it-ch1',
    classLevel: 'IX',
    subjectId: 'it-402',
    chapterNumber: 1,
    title: 'Introduction to IT-ITeS Industry',
    description: 'IT and ITeS definitions, BPO, BPM, and applications of IT in education, banking, healthcare, engineering, and governance.'
  },
  {
    id: 'ix-it-ch2',
    classLevel: 'IX',
    subjectId: 'it-402',
    chapterNumber: 2,
    title: 'Data Entry & Keyboarding Skills',
    description: 'Touch typing methodology, home row keys, ergonomic posture, RapidTyping software, and calculating WPM/Accuracy.'
  },
  {
    id: 'ix-it-ch3',
    classLevel: 'IX',
    subjectId: 'it-402',
    chapterNumber: 3,
    title: 'Digital Documentation (Basics)',
    description: 'LibreOffice Writer interface, text formatting, find & replace, spell check, page borders, headers/footers, and tables.'
  },
  {
    id: 'ix-it-ch4',
    classLevel: 'IX',
    subjectId: 'it-402',
    chapterNumber: 4,
    title: 'Electronic Spreadsheet (Basics)',
    description: 'LibreOffice Calc workbook, rows, columns, cell referencing, mathematical formulas, SUM/AVERAGE/COUNT functions, and charts.'
  },
  {
    id: 'ix-it-ch5',
    classLevel: 'IX',
    subjectId: 'it-402',
    chapterNumber: 5,
    title: 'Digital Presentation (Impress)',
    description: 'LibreOffice Impress slides, slide layouts, inserting media, slide transitions, custom animations, and slide master.'
  },

  // Class IX - IT (Code 402) - Part A: Employability Skills
  {
    id: 'ix-it-ch6',
    classLevel: 'IX',
    subjectId: 'it-402',
    chapterNumber: 6,
    title: 'Communication Skills - I',
    description: 'Verbal communication, non-verbal cues, visual communication, and basic writing skills.'
  },
  {
    id: 'ix-it-ch7',
    classLevel: 'IX',
    subjectId: 'it-402',
    chapterNumber: 7,
    title: 'Self-Management Skills - I',
    description: 'Self-confidence, positive thinking, personal hygiene, and grooming essentials.'
  },
  {
    id: 'ix-it-ch8',
    classLevel: 'IX',
    subjectId: 'it-402',
    chapterNumber: 8,
    title: 'Basic ICT Skills - I',
    description: 'Hardware vs software, computer components, mobile technology, and internet fundamentals.'
  },

  // ==========================================
  // Class XI - IT (Code 802) - Senior Secondary
  // ==========================================
  {
    id: 'xi-it802-ch1',
    classLevel: 'XI',
    subjectId: 'it-802',
    chapterNumber: 1,
    title: 'Computer Organization & Architecture',
    description: 'Computer hardware, CPU components (ALU, CU, Registers), memory hierarchy, cache memory, system buses, and OS types.'
  },
  {
    id: 'xi-it802-ch2',
    classLevel: 'XI',
    subjectId: 'it-802',
    chapterNumber: 2,
    title: 'Networking and Internet Fundamentals',
    description: 'Network topologies, transmission media, OSI and TCP/IP models, network devices (routers, switches, hubs), and IP addressing.'
  },
  {
    id: 'xi-it802-ch3',
    classLevel: 'XI',
    subjectId: 'it-802',
    chapterNumber: 3,
    title: 'Office Automation Tools',
    description: 'Advanced document formatting, spreadsheet data management, complex formulas, and professional presentation delivery.'
  },
  {
    id: 'xi-it802-ch4',
    classLevel: 'XI',
    subjectId: 'it-802',
    chapterNumber: 4,
    title: 'Relational Database Management System (RDBMS)',
    description: 'Relational models, database schema, integrity constraints, and DDL/DML SQL statements (CREATE, ALTER, INSERT, SELECT).'
  },
  {
    id: 'xi-it802-ch5',
    classLevel: 'XI',
    subjectId: 'it-802',
    chapterNumber: 5,
    title: 'Fundamentals of Java Programming',
    description: 'Java Bytecode, JDK/JRE, primitive types, operators, decision making (if-else, switch), loops (for, while), and classes.'
  },

  // ==========================================
  // Class XII - IT (Code 802) - Senior Secondary
  // ==========================================
  {
    id: 'xii-it802-ch1',
    classLevel: 'XII',
    subjectId: 'it-802',
    chapterNumber: 1,
    title: 'Database Concepts & Advanced SQL',
    description: 'Database normalization (1NF, 2NF, 3NF), nested subqueries, joins (INNER, LEFT, RIGHT), GROUP BY, HAVING, and transactions.'
  },
  {
    id: 'xii-it802-ch2',
    classLevel: 'XII',
    subjectId: 'it-802',
    chapterNumber: 2,
    title: 'Operating Web-Based Applications',
    description: 'Client-server architecture, HTML5 markup, CSS3 styling, JavaScript client validation, web hosting, and CMS platforms.'
  },
  {
    id: 'xii-it802-ch3',
    classLevel: 'XII',
    subjectId: 'it-802',
    chapterNumber: 3,
    title: 'Java Programming & Object-Oriented Design',
    description: 'Encapsulation, inheritance, polymorphism, abstract classes, exception handling (try-catch-finally), and Java Swing GUI.'
  },
  {
    id: 'xii-it802-ch4',
    classLevel: 'XII',
    subjectId: 'it-802',
    chapterNumber: 4,
    title: 'Work-Integrated Learning in IT',
    description: 'Software development lifecycle (SDLC), Agile/Scrum, testing methods (unit, integration), and project documentation.'
  },

  // ==========================================
  // Class XII - IP (Code 065) - Informatics Practices
  // ==========================================
  {
    id: 'xii-ip-ch1',
    classLevel: 'XII',
    subjectId: 'ip-065',
    chapterNumber: 1,
    title: 'Data Handling using Pandas - I (Series & DataFrame)',
    description: 'Pandas Series, creation, slicing, DataFrame manipulation, indexing, head(), tail(), and attributes.'
  },
  {
    id: 'xii-ip-ch2',
    classLevel: 'XII',
    subjectId: 'ip-065',
    chapterNumber: 2,
    title: 'Data Handling using Pandas - II & Matplotlib',
    description: 'Handling missing values, boolean indexing, line plots, bar charts, histograms, custom legends, and styling with Pyplot.'
  },
  {
    id: 'xii-ip-ch3',
    classLevel: 'XII',
    subjectId: 'ip-065',
    chapterNumber: 3,
    title: 'Database Query using SQL & Aggregate Functions',
    description: 'Math functions, string functions, date functions, aggregate functions (COUNT, SUM, AVG, MIN, MAX), GROUP BY and HAVING clauses.'
  },
  {
    id: 'xii-ip-ch4',
    classLevel: 'XII',
    subjectId: 'ip-065',
    chapterNumber: 4,
    title: 'Introduction to Computer Networks',
    description: 'LAN, MAN, WAN, network topologies, transmission media, network devices, and basic web concepts.'
  },
  {
    id: 'xii-ip-ch5',
    classLevel: 'XII',
    subjectId: 'ip-065',
    chapterNumber: 5,
    title: 'Societal Impacts of IT',
    description: 'Digital footprint, netiquette, intellectual property rights, open-source software, cyber crime & IT Act.'
  },

  // ==========================================
  // Class XII - Typography (Code 817)
  // ==========================================
  {
    id: 'xii-typo-ch1',
    classLevel: 'XII',
    subjectId: 'typo-817',
    chapterNumber: 1,
    title: 'Correspondence & Office Practice',
    description: 'Official letters, semi-official letters, memorandums, office orders, circulars, and standard layout conventions.'
  },
  {
    id: 'xii-typo-ch2',
    classLevel: 'XII',
    subjectId: 'typo-817',
    chapterNumber: 2,
    title: 'Manuscript Editing & Proof Reading Signs',
    description: 'Standard proof correction symbols, inserting punctuation, transposition marks, spacing corrections, and tabular statements.'
  },
  {
    id: 'xii-typo-ch3',
    classLevel: 'XII',
    subjectId: 'typo-817',
    chapterNumber: 3,
    title: 'Advanced Word Processing & Speed Techniques',
    description: 'Touch typing accuracy, speed drills, mail merge, keyboard shortcuts, formatting tables, and document security.'
  },

  // ==========================================
  // Class XI - IP (Code 065)
  // ==========================================
  {
    id: 'xi-ip-ch1',
    classLevel: 'XI',
    subjectId: 'ip-065',
    chapterNumber: 1,
    title: 'Computer System & Python Fundamentals',
    description: 'Hardware, software, memory hierarchy, tokens in Python, variables, data types, and operators.'
  },
  {
    id: 'xi-ip-ch2',
    classLevel: 'XI',
    subjectId: 'ip-065',
    chapterNumber: 2,
    title: 'Python Control Statements & Lists',
    description: 'if-elif-else branching, for and while loops, list creation, indexing, slicing, and list built-in methods.'
  },
  {
    id: 'xi-ip-ch3',
    classLevel: 'XI',
    subjectId: 'ip-065',
    chapterNumber: 3,
    title: 'Relational Database & Basic SQL',
    description: 'Relational models, tables, keys, CREATE TABLE, INSERT INTO, SELECT with WHERE, ORDER BY, and operators.'
  },

  // ==========================================
  // Middle School CS / IT (Classes VI - VIII)
  // ==========================================
  {
    id: 'vi-it-ch1',
    classLevel: 'VI',
    subjectId: 'it-402',
    chapterNumber: 1,
    title: 'Foundations of Information Technology & Hardware',
    description: 'Input/output devices, memory units (bit, byte, KB, MB, GB), storage media, and operating system basics.'
  },
  {
    id: 'vi-it-ch2',
    classLevel: 'VI',
    subjectId: 'it-402',
    chapterNumber: 2,
    title: 'Digital Word Processing & Formatting',
    description: 'Creating documents, font styles, text alignment, bullets and numbering, and inserting shapes in Writer.'
  },
  {
    id: 'vii-it-ch1',
    classLevel: 'VII',
    subjectId: 'it-402',
    chapterNumber: 1,
    title: 'Electronic Spreadsheet Fundamentals',
    description: 'Workbook, worksheets, rows and columns, cell referencing, arithmetic formulas (SUM, AVERAGE), and simple charts.'
  },
  {
    id: 'vii-it-ch2',
    classLevel: 'VII',
    subjectId: 'it-402',
    chapterNumber: 2,
    title: 'Web Navigation & Cyber Safety Essentials',
    description: 'Web browsers, search engines, URLs, internet etiquette (netiquette), and identifying phishing scams.'
  },
  {
    id: 'viii-it-ch1',
    classLevel: 'VIII',
    subjectId: 'it-402',
    chapterNumber: 1,
    title: 'Database Management Basics & Tables',
    description: 'Data vs Information, tables, fields, records, data types, and primary key concept in relational databases.'
  },
  {
    id: 'viii-it-ch2',
    classLevel: 'VIII',
    subjectId: 'it-402',
    chapterNumber: 2,
    title: 'Digital Presentation & Slide Master',
    description: 'Creating professional presentations, Slide Master design, custom animations, transitions, and printing handouts.'
  }
];

export const getSubjectsForClass = (classLevel: ClassLevel): SubjectInfo[] => {
  return SUBJECTS_LIST.filter(sub => sub.classes.includes(classLevel));
};

export const getChapters = (classLevel: ClassLevel, subjectId: SubjectId): Chapter[] => {
  return CHAPTERS_DATA.filter(ch => ch.classLevel === classLevel && ch.subjectId === subjectId);
};
