/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CertificateModal } from './components/CertificateModal';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { HomeView } from './components/views/HomeView';
import { StudyMaterialView } from './components/views/StudyMaterialView';
import { QuizView } from './components/views/QuizView';
import { DashboardView } from './components/views/DashboardView';
import { QuestionBankView } from './components/views/QuestionBankView';
import { AdminPanelView } from './components/views/AdminPanelView';
import { AboutView } from './components/views/AboutView';
import { ContactView } from './components/views/ContactView';
import { StudyRoomView } from './components/views/StudyRoomView';
import { PracticalLabView } from './components/views/PracticalLabView';
import { BlueprintView } from './components/views/BlueprintView';
import { CompetencyQuestionsView } from './components/views/CompetencyQuestionsView';
import { FlashcardsView } from './components/views/FlashcardsView';
import { PYQArchiveView } from './components/views/PYQArchiveView';
import { StudyMaterial, QuizConfig, QuizAttempt, ClassLevel, SubjectId } from './types';

const MainLayout: React.FC = () => {
  const { 
    userRole, 
    studentProfile, 
    activeCertificateAttempt, 
    setActiveCertificateAttempt, 
    quizzes, 
    setSelectedClassFilter 
  } = useApp();

  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [materialToOpenInReader, setMaterialToOpenInReader] = useState<StudyMaterial | null>(null);
  const [quizToStartDirectly, setQuizToStartDirectly] = useState<QuizConfig | null>(null);
  const [studyRoomToOpen, setStudyRoomToOpen] = useState<string | null>(null);

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenMaterialReader = (mat: StudyMaterial) => {
    setMaterialToOpenInReader(mat);
    setCurrentTab('materials');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartQuiz = (qz: QuizConfig) => {
    setQuizToStartDirectly(qz);
    setCurrentTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartQuizWithChapter = (classLevel: ClassLevel, subjectId: SubjectId, chapterId?: string) => {
    setSelectedClassFilter(classLevel);
    const match = quizzes.find(q => q.classLevel === classLevel && q.subjectId === subjectId);
    if (match) {
      setQuizToStartDirectly(match);
    }
    setCurrentTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartPracticeTopic = (chapterTitle: string) => {
    setCurrentTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={tab => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSearchClick={() => setIsSearchOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            setCurrentTab={tab => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenMaterialReader={handleOpenMaterialReader}
            onStartQuiz={handleStartQuiz}
          />
        )}

        {currentTab === 'materials' && (
          <StudyMaterialView
            initialMaterialToOpen={materialToOpenInReader}
            onClearInitialMaterial={() => setMaterialToOpenInReader(null)}
            onStartQuizWithChapter={handleStartQuizWithChapter}
          />
        )}

        {currentTab === 'quiz' && (
          <QuizView
            initialQuizToStart={quizToStartDirectly}
            onClearInitialQuiz={() => setQuizToStartDirectly(null)}
            onViewCertificate={attempt => setActiveCertificateAttempt(attempt)}
            onNavigateToDashboard={() => {
              setCurrentTab('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'studyroom' && (
          <StudyRoomView
            initialRoomId={studyRoomToOpen}
            onOpenStudyMaterial={() => {
              setCurrentTab('materials');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardView
            onOpenMaterial={handleOpenMaterialReader}
            onViewCertificate={attempt => setActiveCertificateAttempt(attempt)}
            onStartPracticeTopic={handleStartPracticeTopic}
            onStartQuizClick={() => {
              setCurrentTab('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenStudyRoom={(roomId) => {
              setStudyRoomToOpen(roomId || null);
              setCurrentTab('studyroom');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'qbank' && <QuestionBankView onStartQuiz={handleStartQuiz} />}

        {currentTab === 'lab' && <PracticalLabView />}

        {currentTab === 'blueprint' && <BlueprintView />}

        {currentTab === 'competency' && <CompetencyQuestionsView />}

        {currentTab === 'flashcards' && <FlashcardsView />}

        {currentTab === 'pyq' && <PYQArchiveView />}

        {currentTab === 'admin' && (
          <AdminPanelView
            onBackToHome={() => {
              setCurrentTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'about' && (
          <AboutView
            setCurrentTab={tab => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'contact' && <ContactView />}
      </main>

      {/* Global Footer */}
      <Footer
        setCurrentTab={tab => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectMaterial={handleOpenMaterialReader}
        onSelectQuizTab={() => {
          setCurrentTab('quiz');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Global Certificate Modal */}
      {activeCertificateAttempt && (
        <CertificateModal
          attempt={activeCertificateAttempt}
          studentName={studentProfile.name}
          onClose={() => setActiveCertificateAttempt(null)}
        />
      )}

      {/* Global Auth Modal for Login / Registration */}
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
