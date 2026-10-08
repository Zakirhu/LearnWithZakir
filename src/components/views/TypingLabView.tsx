import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Keyboard, 
  RotateCcw, 
  Award, 
  Clock, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Flame, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  FileText,
  Sliders,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SEO } from '../SEO';

interface TypingPassage {
  id: string;
  title: string;
  category: 'CBSE 30 WPM Speed Test' | 'Business Correspondence' | 'IT Fundamentals';
  difficulty: 'Standard (30 WPM)' | 'Advanced (40 WPM)' | 'Board Practical';
  targetWpm: number;
  text: string;
}

const TYPING_PASSAGES: TypingPassage[] = [
  {
    id: 'pass-1',
    title: 'CBSE Code 817 Standard Speed Test Passage',
    category: 'CBSE 30 WPM Speed Test',
    difficulty: 'Standard (30 WPM)',
    targetWpm: 30,
    text: 'Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing, and adjusting the space between pairs of letters. Good keyboarding technique requires upright posture, relaxed shoulders, and keeping fingers resting gently on the home keys A S D F and J K L semicolon. Constant rhythm and high accuracy are essential for passing the board examination.'
  },
  {
    id: 'pass-2',
    title: 'Official Business Correspondence Letter Passage',
    category: 'Business Correspondence',
    difficulty: 'Board Practical',
    targetWpm: 35,
    text: 'Dear Sir, With reference to your inquiry dated fifteenth October, we have the pleasure in submitting our competitive quotation for the supply of computer equipment and peripherals. Our products strictly comply with national quality benchmarks and carry a full comprehensive on-site warranty of three years. We would be grateful if you could confirm your purchase order at your earliest convenience to facilitate prompt dispatch and installation. Yours faithfully, For Apex Informatics Systems.'
  },
  {
    id: 'pass-3',
    title: 'Computer Applications & Electronic Spreadsheets',
    category: 'IT Fundamentals',
    difficulty: 'Advanced (40 WPM)',
    targetWpm: 40,
    text: 'Electronic spreadsheets provide automatic recalculation when cell values are modified by the operator. Relative cell referencing adjusts formula locations dynamically, while absolute cell references retain fixed coordinates marked with dollar signs. Data consolidation and scenario management allow business analysts to evaluate complex financial models with ease. High typing efficiency allows operators to enter quantitative records rapidly and without computational discrepancies.'
  }
];

export const TypingLabView: React.FC = () => {
  const [selectedPassageIndex, setSelectedPassageIndex] = useState<number>(0);
  const currentPassage = TYPING_PASSAGES[selectedPassageIndex];

  const [inputVal, setInputVal] = useState<string>('');
  const [isTestRunning, setIsTestRunning] = useState<boolean>(false);
  const [isTestFinished, setIsTestFinished] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [backspaceCount, setBackspaceCount] = useState<number>(0);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer Effect
  useEffect(() => {
    if (isTestRunning && !isTestFinished) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTestRunning, isTestFinished]);

  // Handle Typing Input
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;

    if (!isTestRunning && !isTestFinished && val.length > 0) {
      setIsTestRunning(true);
      setStartTime(Date.now());
    }

    setInputVal(val);

    // Check if completed entire text
    if (val.length >= currentPassage.text.length) {
      setIsTestRunning(false);
      setIsTestFinished(true);
      try {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      } catch {}
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Backspace') {
      setBackspaceCount(prev => prev + 1);
    }
  };

  // Metrics Calculations
  const metrics = useMemo(() => {
    const totalCharsTyped = inputVal.length;
    let correctChars = 0;
    let errorChars = 0;

    for (let i = 0; i < totalCharsTyped; i++) {
      if (inputVal[i] === currentPassage.text[i]) {
        correctChars++;
      } else {
        errorChars++;
      }
    }

    const accuracy = totalCharsTyped > 0 
      ? Math.max(0, Math.round((correctChars / totalCharsTyped) * 100))
      : 100;

    const timeMinutes = Math.max(1, elapsedSeconds) / 60;
    // Standard typing calculation: (characters / 5) / minutes
    const grossWpm = Math.round((totalCharsTyped / 5) / timeMinutes);
    const netWpm = Math.max(0, Math.round((correctChars / 5) / timeMinutes));

    return {
      grossWpm,
      netWpm,
      accuracy,
      correctChars,
      errorChars,
      progressPercent: Math.min(100, Math.round((totalCharsTyped / currentPassage.text.length) * 100))
    };
  }, [inputVal, currentPassage.text, elapsedSeconds]);

  const handleReset = () => {
    setInputVal('');
    setIsTestRunning(false);
    setIsTestFinished(false);
    setStartTime(null);
    setElapsedSeconds(0);
    setBackspaceCount(0);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="Typography 817 Touch Typing Speed Test (Classes XI & XII)"
        description="Official CBSE Code 817 Typography Touch Typing Speed Test. Track WPM, Accuracy, and gross words per minute for board practical exam."
        keywords={['Typography 817', 'Typing Speed Test', 'CBSE Code 817', 'WPM Calculator', 'Zakir Hussain']}
      />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-700 text-white rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white border border-white/30 text-xs font-bold">
            <Keyboard className="w-3.5 h-3.5" />
            <span>CBSE Typography & Computer Applications (Code 817)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Touch Typing Speed & Accuracy Lab
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
            Practice board speed test passages with live Gross & Net WPM, accuracy %, and error tracking calibrated to official CBSE examination criteria.
          </p>
        </div>

        {/* Live Metrics Header Box */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 grid grid-cols-3 gap-4 text-center shrink-0">
          <div>
            <span className="text-2xl sm:text-3xl font-black font-mono block">{metrics.netWpm}</span>
            <span className="text-[10px] uppercase font-bold text-amber-200">Net WPM</span>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black font-mono block">{metrics.accuracy}%</span>
            <span className="text-[10px] uppercase font-bold text-amber-200">Accuracy</span>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black font-mono block">
              {Math.floor(elapsedSeconds / 60)}:{(elapsedSeconds % 60).toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-amber-200">Time</span>
          </div>
        </div>
      </div>

      {/* Passage Selector Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-600" />
              <span>Select Examination Passage</span>
            </h3>
            <p className="text-xs text-slate-500">Choose a speed passage aligned with the Class XI/XII curriculum:</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Target Benchmark:</span>
            <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold font-mono">
              {currentPassage.targetWpm} WPM
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {TYPING_PASSAGES.map((pass, pIdx) => (
            <button
              key={pass.id}
              onClick={() => {
                setSelectedPassageIndex(pIdx);
                handleReset();
              }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedPassageIndex === pIdx
                  ? 'bg-amber-50 border-amber-500 text-amber-950 font-semibold shadow-xs'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                {pass.category}
              </span>
              <p className="text-xs font-bold leading-snug">{pass.title}</p>
              <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-2">
                <span>🎯 {pass.difficulty}</span>
                <span>•</span>
                <span>{pass.text.split(' ').length} words</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Typing Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Typing Zone (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          
          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Passage Completion</span>
              <span className="font-mono">{metrics.progressPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-150"
                style={{ width: `${metrics.progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Reference Text Display Box with Live Color Highlighting */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-base sm:text-lg leading-relaxed font-mono select-none overflow-y-auto max-h-56">
            {currentPassage.text.split('').map((char, index) => {
              const typedChar = inputVal[index];
              let charStyle = 'text-slate-400';

              if (typedChar !== undefined) {
                if (typedChar === char) {
                  charStyle = 'text-emerald-600 bg-emerald-100/70 font-semibold';
                } else {
                  charStyle = 'text-rose-600 bg-rose-200 font-bold underline';
                }
              } else if (index === inputVal.length) {
                charStyle = 'bg-blue-300 text-blue-950 font-bold animate-pulse';
              }

              return (
                <span key={index} className={charStyle}>
                  {char}
                </span>
              );
            })}
          </div>

          {/* Live Typing Input Area */}
          <div className="space-y-3">
            <textarea
              ref={inputRef}
              rows={4}
              value={inputVal}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={isTestFinished}
              placeholder="Start typing the passage here to begin the speed countdown..."
              className="w-full p-4 rounded-2xl border-2 border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 font-mono text-sm leading-relaxed focus:outline-none transition-all shadow-inner disabled:bg-slate-100"
            />

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 flex items-center gap-2">
                <span>Backspaces: <strong>{backspaceCount}</strong></span>
                <span>•</span>
                <span>Errors: <strong className="text-rose-600">{metrics.errorChars}</strong></span>
              </span>

              <button
                onClick={handleReset}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Test</span>
              </button>
            </div>
          </div>

          {/* Completion Celebration Card */}
          {isTestFinished && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-amber-300" />
                  <h3 className="text-lg font-bold">Speed Test Completed!</h3>
                </div>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold font-mono">
                  {metrics.netWpm >= currentPassage.targetWpm ? 'Passed Benchmark 🏆' : 'Keep Practicing'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/10 p-3 rounded-xl text-center">
                <div>
                  <span className="text-xl font-black font-mono block">{metrics.netWpm}</span>
                  <span className="text-[10px] uppercase font-bold text-emerald-100">Net WPM</span>
                </div>
                <div>
                  <span className="text-xl font-black font-mono block">{metrics.grossWpm}</span>
                  <span className="text-[10px] uppercase font-bold text-emerald-100">Gross WPM</span>
                </div>
                <div>
                  <span className="text-xl font-black font-mono block">{metrics.accuracy}%</span>
                  <span className="text-[10px] uppercase font-bold text-emerald-100">Accuracy</span>
                </div>
                <div>
                  <span className="text-xl font-black font-mono block">{metrics.errorChars}</span>
                  <span className="text-[10px] uppercase font-bold text-emerald-100">Errors</span>
                </div>
              </div>

              <p className="text-xs text-emerald-100 leading-relaxed">
                {metrics.netWpm >= currentPassage.targetWpm
                  ? `Outstanding! You achieved ${metrics.netWpm} WPM with ${metrics.accuracy}% accuracy, satisfying the CBSE Code 817 practical examination requirement.`
                  : `You completed the test with ${metrics.netWpm} WPM. Focus on the home keys to reduce error count and achieve the ${currentPassage.targetWpm} WPM target.`}
              </p>
            </div>
          )}
        </div>

        {/* Right: Touch Typing Home Keys & Posture Guide (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Key Finger Positioning Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Home Row Key Placement</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Left Hand Fingers:</span>
                <p className="text-slate-600 font-mono text-[11px]">
                  Pinky: <strong className="text-blue-600">A</strong> • Ring: <strong className="text-blue-600">S</strong> • Middle: <strong className="text-blue-600">D</strong> • Index: <strong className="text-blue-600">F</strong>
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Right Hand Fingers:</span>
                <p className="text-slate-600 font-mono text-[11px]">
                  Index: <strong className="text-blue-600">J</strong> • Middle: <strong className="text-blue-600">K</strong> • Ring: <strong className="text-blue-600">L</strong> • Pinky: <strong className="text-blue-600">;</strong>
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Both Thumbs:</span>
                <p className="text-slate-600 font-mono text-[11px]">
                  Rest gently on the <strong className="text-blue-600">Spacebar</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Keyboarding Posture Checklist for Board Exam */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-sm space-y-4 border border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Zakir Sir's Exam Room Posture</span>
            </h3>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Keep your spine straight and feet flat on the floor.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Keep wrists suspended slightly above the desk, not resting.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Look at the copy passage on screen, never glance at fingers.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Maintain a steady, rhythmic keystroke cadence.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
