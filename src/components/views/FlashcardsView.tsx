import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  CheckCircle2, 
  Layers, 
  Printer, 
  FileText, 
  BookOpen, 
  Check, 
  Clock, 
  Zap, 
  Flame,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { SEO } from '../SEO';

interface Flashcard {
  id: string;
  category: 'shortcuts' | 'sql' | 'networking' | 'cyber' | 'pandas';
  front: string;
  back: string;
  hint: string;
}

const FLASHCARDS_DATA: Flashcard[] = [
  // Shortcuts
  {
    id: 'fc-1',
    category: 'shortcuts',
    front: 'What is the shortcut to open the Styles & Formatting deck in LibreOffice Writer?',
    back: 'F11 (or Format → Styles and Formatting)',
    hint: 'Single function key on top of the keyboard.'
  },
  {
    id: 'fc-2',
    category: 'shortcuts',
    front: 'Which key combination creates a New Style from Selection in Writer?',
    back: 'Shift + F11',
    hint: 'Hold Shift with the Styles shortcut.'
  },
  {
    id: 'fc-3',
    category: 'shortcuts',
    front: 'How do you insert Fields (like Page Number / Date) in LibreOffice Writer?',
    back: 'Ctrl + F2',
    hint: 'Ctrl with Function Key 2.'
  },
  {
    id: 'fc-4',
    category: 'shortcuts',
    front: 'What is the shortcut for inserting a Non-Breaking Space in LibreOffice?',
    back: 'Ctrl + Shift + Space',
    hint: 'Prevents two words from splitting across lines.'
  },
  // SQL
  {
    id: 'fc-5',
    category: 'sql',
    front: 'Difference between DDL and DML in SQL?',
    back: 'DDL (Data Definition Language) creates/modifies table structure (CREATE, ALTER, DROP).\nDML (Data Manipulation Language) manages rows/tuples (SELECT, INSERT, UPDATE, DELETE).',
    hint: 'Structure vs Data records.'
  },
  {
    id: 'fc-6',
    category: 'sql',
    front: 'What is the function of the HAVING clause in SQL?',
    back: 'HAVING filters grouped records created by GROUP BY. (WHERE filters individual rows before grouping).',
    hint: 'Used with aggregate functions like COUNT or SUM.'
  },
  {
    id: 'fc-7',
    category: 'sql',
    front: 'Can a Primary Key column contain NULL values?',
    back: 'NO. Primary Key strictly enforces entity integrity: values must be unique and NOT NULL.',
    hint: 'Candidate keys may allow nulls, but PK never does.'
  },
  // Networking
  {
    id: 'fc-8',
    category: 'networking',
    front: 'MAC Address vs IP Address differences?',
    back: 'MAC is a 48-bit physical/hardware address burned into the NIC card (Hexadecimal).\nIP is a 32-bit (IPv4) or 128-bit (IPv6) logical network address.',
    hint: 'Physical vs Logical addressing.'
  },
  {
    id: 'fc-9',
    category: 'networking',
    front: 'What is DNS and why is it needed?',
    back: 'Domain Name System (DNS) translates human-readable domain names (e.g., cbse.gov.in) into machine IP addresses.',
    hint: 'The phonebook of the internet.'
  },
  {
    id: 'fc-10',
    category: 'networking',
    front: 'Difference between SMTP and POP3/IMAP?',
    back: 'SMTP (Simple Mail Transfer Protocol) is used for SENDING emails.\nPOP3/IMAP are used for RECEIVING/RETRIEVING emails from a mail server.',
    hint: 'Push vs Pull protocol.'
  },
  // Cyber
  {
    id: 'fc-11',
    category: 'cyber',
    front: 'What is the Indian Information Technology (IT) Act, 2000?',
    back: 'The primary Indian law dealing with cybercrime, electronic commerce, digital signatures, and penalties for hacking/identity theft (amended in 2008).',
    hint: 'Passed in May 2000.'
  },
  {
    id: 'fc-12',
    category: 'cyber',
    front: 'What is Section 66C of the IT Act?',
    back: 'Punishment for identity theft: using password or electronic signature of another person fraudulently (Imprisonment up to 3 years and fine up to ₹1 Lakh).',
    hint: 'Identity theft & password stealing.'
  },
  // Pandas
  {
    id: 'fc-13',
    category: 'pandas',
    front: 'Difference between df.loc[] and df.iloc[] in Pandas?',
    back: 'df.loc[] is LABEL-based (endpoint IS included in slices).\ndf.iloc[] is INTEGER-POSITION based (endpoint is EXCLUDED in slices).',
    hint: 'Label vs Integer position.'
  },
  {
    id: 'fc-14',
    category: 'pandas',
    front: 'What does df.shape return in Pandas?',
    back: 'Returns a tuple of integers representing (number of rows, number of columns).',
    hint: 'Dimensions as a Python tuple.'
  }
];

const CHEAT_SHEETS = [
  {
    id: 'cs-it-402',
    title: 'Class X IT (Code 402) • 60-Second Board Exam Morning Sheet',
    sections: [
      {
        heading: '1. LibreOffice Writer Styles & TOC',
        points: [
          'Styles: Paragraph, Character, Page, Frame, List. Press F11 to open Styles deck.',
          'Fill Format Mode: Apply style quickly to multiple text blocks without repeated clicks.',
          'Table of Contents: Heading 1 (Level 1), Heading 2 (Level 2), Heading 3 (Level 3). Check "Protected against manual changes" to safeguard against accidental edits.',
          'Mail Merge: Tools → Mail Merge Wizard. Needs Main Document (template) + Data Source (.odb/.ods).'
        ]
      },
      {
        heading: '2. LibreOffice Calc Advanced Tools',
        points: [
          'Data Consolidation: Data → Consolidate. Combines data from multiple sheet ranges using SUM, AVERAGE, COUNT.',
          'Subtotals: Data → Subtotals. Group data by category; automatically inserts subtotal formulas.',
          'What-If Scenarios: Tools → Scenarios. Saves multiple sets of input values for comparison on the same sheet.',
          'Goal Seek: Tools → Goal Seek. Works backwards on ONE variable to achieve a target result.',
          'Solver: Tools → Solver. Advanced Goal Seek dealing with multiple variable constraints.'
        ]
      },
      {
        heading: '3. RDBMS (Base) & SQL Essentials',
        points: [
          'Candidate Key: Minimal set of attributes that uniquely identify a record.',
          'Primary Key: Chosen Candidate Key; strictly UNIQUE and NOT NULL.',
          'Foreign Key: Field in child table referencing Primary Key of parent table for Referential Integrity.',
          'DDL: CREATE TABLE, ALTER TABLE, DROP TABLE (Alters structure).',
          'DML: SELECT, INSERT INTO, UPDATE, DELETE (Manipulates data rows).'
        ]
      },
      {
        heading: '4. Web Applications & Security',
        points: [
          'Sticky Keys: Accessibility tool for users who have difficulty pressing two keys at once.',
          'Toggle Keys: Emits a tone when Caps Lock, Num Lock, or Scroll Lock are toggled.',
          'LAN (Local Area Network - within a building) vs WAN (Wide Area Network - global/countrywide).',
          'Instant Messaging: WhatsApp, Telegram (requires real-time internet connection).',
          'Cyber Safety: Use strong passwords, anti-virus, firewall, HTTPS, and keep data backed up regularly.'
        ]
      }
    ]
  },
  {
    id: 'cs-ip-065',
    title: 'Class XII IP (Code 065) • High-Yield Python & SQL Formula Sheet',
    sections: [
      {
        heading: '1. Pandas Series & DataFrame Rules',
        points: [
          'Series: 1D labeled array. Size-immutable, value-mutable.',
          'DataFrame: 2D labeled tabular structure. Size-mutable and value-mutable.',
          'Creation: pd.Series(dict_or_list, index=[...]), pd.DataFrame(data, index=[...], columns=[...]).',
          '.loc[row_label, col_label] (Inclusive of stop label) vs .iloc[row_idx, col_idx] (Exclusive of stop index).',
          'head(n) returns first n rows (default 5); tail(n) returns last n rows (default 5).'
        ]
      },
      {
        heading: '2. MySQL Functions & Grouping Syntax',
        points: [
          'Math: POWER(m, n), ROUND(num, dec), MOD(m, n), TRUNCATE(num, dec).',
          'String: LENGTH(str), CONCAT(s1, s2), LOWER(s), UPPER(s), SUBSTR(str, pos, len), INSTR(str, substr).',
          'Date: NOW(), CURDATE(), SYSDATE(), MONTH(date), YEAR(date), DAYNAME(date).',
          'Aggregate Functions: COUNT(*), SUM(col), AVG(col), MIN(col), MAX(col) - ignore NULL values except COUNT(*).',
          'GROUP BY group_col HAVING condition ORDER BY sort_col ASC/DESC.'
        ]
      },
      {
        heading: '3. Networking & Cyber Law Reminders',
        points: [
          'Star Topology: Central switch/hub. Failure of one node does not bring down the network.',
          'Tree Topology: Hierarchical combination of Star and Bus topologies.',
          'MAC (48-bit physical) vs IP (32-bit IPv4 / 128-bit IPv6 logical).',
          'IT Act 2000 Section 43 (Penalty for damage to computer system), Section 66 (Computer hacking), Section 66E (Privacy violation).'
        ]
      }
    ]
  }
];

export const FlashcardsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flashcards' | 'cheatsheet'>('flashcards');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>({});

  const filteredCards = FLASHCARDS_DATA.filter(c => {
    if (selectedCategory === 'all') return true;
    return c.category === selectedCategory;
  });

  const activeCard = filteredCards[currentCardIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCardIndex(prev => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentCardIndex(prev => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const toggleMastered = (cardId: string) => {
    setMasteredCards(prev => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      <SEO
        title="Flashcards & 60-Second Exam Cheat Sheets"
        description="Quick flip cards for LibreOffice shortcuts, SQL syntax, networking protocols, and printable pre-exam cheat sheets."
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 print:border print:border-slate-300">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-amber-100 rounded-full text-xs font-semibold border border-white/20">
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>High-Speed Active Recall & Last-Minute Exam Revisions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Flashcards & 60-Second Exam Cheat Sheets
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/90 max-w-2xl leading-relaxed">
            Boost memory retention with interactive 3D flip flashcards for keyboard shortcuts, SQL commands, and print high-density cheat sheets right before stepping into the exam hall.
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="flex p-1.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 gap-1 shrink-0 print:hidden">
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'flashcards'
                ? 'bg-white text-amber-900 shadow-md'
                : 'text-amber-100 hover:text-white'
            }`}
          >
            Digital Flashcards
          </button>
          <button
            onClick={() => setActiveTab('cheatsheet')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'cheatsheet'
                ? 'bg-white text-amber-900 shadow-md'
                : 'text-amber-100 hover:text-white'
            }`}
          >
            Printable Cheat Sheets
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 1. DIGITAL FLASHCARDS */}
      {/* ===================================================================== */}
      {activeTab === 'flashcards' && (
        <div className="space-y-6">
          
          {/* Category Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-2xl">
              {[
                { id: 'all', label: 'All Cards' },
                { id: 'shortcuts', label: 'LibreOffice Shortcuts' },
                { id: 'sql', label: 'SQL Commands' },
                { id: 'networking', label: 'Networking Acronyms' },
                { id: 'cyber', label: 'Cyber Ethics & Law' },
                { id: 'pandas', label: 'Python Pandas' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setCurrentCardIndex(0);
                    setIsFlipped(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <span className="text-xs font-bold text-slate-500 font-mono">
              Card {currentCardIndex + 1} of {filteredCards.length}
            </span>
          </div>

          {/* 3D Flip Card Canvas */}
          <div className="max-w-2xl mx-auto perspective-1000 py-6">
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="relative min-h-[300px] w-full bg-white rounded-3xl p-8 sm:p-12 border-2 border-slate-200/90 hover:border-amber-400 shadow-xl cursor-pointer transition-all flex flex-col justify-between select-none group"
            >
              {/* Top Card Badge */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                  {activeCard.category.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 group-hover:text-amber-600 transition-colors">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Click to flip</span>
                </span>
              </div>

              {/* Card Question / Answer Body */}
              <div className="py-8 text-center space-y-4">
                {!isFlipped ? (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Question Prompt</p>
                    <h2 className="text-lg sm:text-2xl font-bold text-slate-900 leading-snug">
                      {activeCard.front}
                    </h2>
                    <p className="text-xs text-slate-500 italic mt-2">💡 Hint: {activeCard.hint}</p>
                  </div>
                ) : (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Verified Solution</p>
                    <div className="text-base sm:text-xl font-bold text-emerald-950 leading-relaxed whitespace-pre-line bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200">
                      {activeCard.back}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Bottom Toolbar */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    toggleMastered(activeCard.id);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    masteredCards[activeCard.id]
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{masteredCards[activeCard.id] ? 'Mastered ✓' : 'Mark as Mastered'}</span>
                </button>

                <span className="text-[11px] text-slate-400">
                  {Object.values(masteredCards).filter(Boolean).length} of {FLASHCARDS_DATA.length} Mastered
                </span>
              </div>
            </div>
          </div>

          {/* Next / Prev Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              <span>Next Card</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. PRINTABLE 60-SECOND PRE-EXAM CHEAT SHEETS */}
      {/* ===================================================================== */}
      {activeTab === 'cheatsheet' && (
        <div className="space-y-6">
          <div className="flex justify-end print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Cheat Sheets (1-Page Exam Format)</span>
            </button>
          </div>

          <div className="space-y-8">
            {CHEAT_SHEETS.map(sheet => (
              <div key={sheet.id} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 print:border-none print:shadow-none print:p-0">
                <div className="border-b-2 border-slate-900 pb-3">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block font-sans">
                    Zakir Learning Hub • High-Yield Pre-Exam Reference
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                    {sheet.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sheet.sections.map((section, sIdx) => (
                    <div key={sIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider text-blue-900">
                        {section.heading}
                      </h3>
                      <ul className="space-y-1.5 text-xs text-slate-700 leading-relaxed list-disc pl-4">
                        {section.points.map((pt, pIdx) => (
                          <li key={pIdx}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
