import React, { useState } from 'react';
import { Mail, BookOpen, HelpCircle, Heart, Shield, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ClassLevel } from '../types';
import { LegalModal } from './LegalModal';
import { Logo } from './Logo';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  const { setSelectedClassFilter, userRole, openAuthModal } = useApp();
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'disclaimer' | null>(null);

  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Logo className="w-12 h-12 shrink-0 drop-shadow-md" />
              <div>
                <span className="text-xl font-bold text-white tracking-tight">Zakir Learning Hub</span>
                <p className="text-xs text-blue-400 font-medium">Computer Science • IT • IP • Typography (Classes VI–XII)</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering school students with structured chapter notes, interactive MCQ tests, practical Python & SQL files, and comprehensive board exam preparation materials.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:zakhu1099@gmail.com" className="hover:text-blue-300 transition-colors text-slate-300">
                  zakhu1099@gmail.com
                </a>
              </p>
              <p className="text-slate-400">
                Curated by Zakir Hussain • PGT Computer Science & Educator
              </p>
            </div>
          </div>

          {/* Quick Classes */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Classes VI – XII
            </h4>
            <ul className="space-y-2 text-sm">
              {(['VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'] as ClassLevel[]).map(lvl => (
                <li key={lvl}>
                  <button
                    onClick={() => {
                      setSelectedClassFilter(lvl);
                      setCurrentTab('materials');
                    }}
                    className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <span>Class {lvl} Materials</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialized Subject Syllabi */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Subjects
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setSelectedClassFilter('X');
                    setCurrentTab('materials');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  IT (Code 402 / 802)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedClassFilter('XII');
                    setCurrentTab('materials');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Informatics Practices (065)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedClassFilter('XII');
                    setCurrentTab('materials');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Typography & Applications (817)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedClassFilter('IX');
                    setCurrentTab('materials');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Computer Applications (165)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedClassFilter('VI');
                    setCurrentTab('materials');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Middle School Coding (VI–VIII)
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation & Policies */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Portal & Policies
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setCurrentTab('quiz')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Interactive MCQ Tests
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('lab')} className="hover:text-blue-400 transition-colors cursor-pointer text-amber-300 font-semibold">
                  Practical Lab (SQL • Python • Typing)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('blueprint')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  CBSE Blueprint & Weightage
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('competency')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Competency & Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('flashcards')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Flashcards & 60-Sec Cheats
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('pyq')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Past 5 Years PYQ Papers
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('qbank')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Class Question Bank
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('dashboard')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Student Scorecard & Badges
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('about')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  About Zakir Hussain
                </button>
              </li>
              <li>
                <button onClick={() => setLegalModalType('privacy')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setLegalModalType('terms')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => setLegalModalType('disclaimer')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (userRole === 'admin') {
                      setCurrentTab('admin');
                    } else {
                      openAuthModal('admin', 'Administrator sign-in is required to access the Content Management System (CMS).');
                    }
                  }}
                  className="hover:text-amber-400 text-amber-300 font-medium transition-colors cursor-pointer"
                >
                  Content Management (CMS)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Zakir Learning Hub • Dedicated to Computer Science & IT Excellence.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for School Students
            </span>
            <span>•</span>
            <span>Learn • Practice • Test • Improve</span>
          </div>
        </div>
      </div>

      {/* Legal Modal */}
      {legalModalType && (
        <LegalModal
          isOpen={!!legalModalType}
          onClose={() => setLegalModalType(null)}
          type={legalModalType}
        />
      )}
    </footer>
  );
};
