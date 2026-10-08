import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  HelpCircle, 
  User, 
  ShieldCheck, 
  Menu, 
  X, 
  FileQuestion, 
  Sparkles, 
  Search,
  Layers,
  ChevronDown,
  Bell,
  Check,
  LogIn,
  LogOut,
  Award,
  BarChart3,
  Flame,
  LayoutDashboard,
  Terminal,
  FileCheck2,
  Zap,
  FileText
} from 'lucide-react';
import { Logo } from './Logo';
import { useApp } from '../context/AppContext';
import { CLASSES_LIST } from '../data/curriculumData';
import { ClassLevel } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onSearchClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, onSearchClick }) => {
  const { 
    currentUser,
    isAuthenticated,
    userRole, 
    setUserRole, 
    logout,
    openAuthModal,
    studentProfile, 
    selectedClassFilter, 
    setSelectedClassFilter,
    notifications,
    markNotificationRead
  } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [classesDropdownOpen, setClassesDropdownOpen] = useState(false);
  const [boardHubDropdownOpen, setBoardHubDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const BOARD_HUB_ITEMS = [
    {
      id: 'lab',
      label: 'Practical Lab (SQL • Pandas • Typing)',
      desc: 'Interactive In-browser SQL playground & touch typing test',
      icon: Terminal,
      badge: 'Interactive'
    },
    {
      id: 'blueprint',
      label: 'CBSE Blueprint & Weightage',
      desc: 'Unit-wise marks, Part A/B/C and high-yield chapters',
      icon: BarChart3,
      badge: 'Board 2026'
    },
    {
      id: 'competency',
      label: 'Competency & Case Studies',
      desc: 'Assertion-Reasoning & scenario-based case questions',
      icon: FileCheck2,
      badge: '50% Pattern'
    },
    {
      id: 'flashcards',
      label: 'Flashcards & 60-Sec Cheats',
      desc: 'Quick flip cards & 1-page exam morning cheat sheets',
      icon: Zap,
      badge: 'Revision'
    },
    {
      id: 'pyq',
      label: 'PYQ Archive & Step Marking',
      desc: 'Past 5 years CBSE board papers with official model keys',
      icon: FileText,
      badge: 'Official'
    },
    {
      id: 'qbank',
      label: 'AI PDF to MCQ Extractor',
      desc: 'Upload notes or past papers to extract MCQs with Gemini',
      icon: Sparkles,
      badge: 'Gemini AI'
    }
  ];

  // Dynamic Navigation Links based on Role & Auth
  const getNavLinks = () => {
    if (userRole === 'admin') {
      return [
        { id: 'admin', label: 'Admin CMS', icon: ShieldCheck },
        { id: 'lab', label: 'Practical Lab' },
        { id: 'boardHub', label: 'Exam Hub', isDropdown: true },
        { id: 'materials', label: 'Study Material' },
        { id: 'quiz', label: 'Quizzes' },
        { id: 'qbank', label: 'Question Bank' },
        { id: 'home', label: 'Public View' }
      ];
    }

    if (isAuthenticated) {
      // Student Logged-In Navigation
      return [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'classes', label: 'Classes', isDropdown: true },
        { id: 'lab', label: 'Practical Lab' },
        { id: 'boardHub', label: 'Exam Hub', isDropdown: true },
        { id: 'materials', label: 'Study Material' },
        { id: 'quiz', label: 'Quizzes' },
        { id: 'mytests', label: 'My Tests' },
        { id: 'studyroom', label: 'Study Rooms' }
      ];
    }

    // Public / Guest Navigation
    return [
      { id: 'home', label: 'Home' },
      { id: 'classes', label: 'Classes', isDropdown: true },
      { id: 'lab', label: 'Practical Lab' },
      { id: 'boardHub', label: 'Exam Hub', isDropdown: true },
      { id: 'materials', label: 'Study Material' },
      { id: 'quiz', label: 'Quizzes' },
      { id: 'qbank', label: 'Question Bank' },
      { id: 'about', label: 'About' }
    ];
  };

  const navLinks = getNavLinks();

  const handleNavClick = (id: string) => {
    if (id === 'classes') {
      if (currentTab === 'home') {
        const el = document.getElementById('classes-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        setCurrentTab('home');
        setTimeout(() => {
          const el = document.getElementById('classes-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (id === 'mytests') {
      setCurrentTab('dashboard');
      setTimeout(() => {
        const el = document.getElementById('student-tests-history');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (id === 'boardHub') {
      setCurrentTab('lab');
    } else {
      setCurrentTab(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* 1. Brand Logo */}
          <div 
            onClick={() => setCurrentTab(isAuthenticated ? 'dashboard' : 'home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <Logo className="w-10 h-10 group-hover:scale-105 transition-transform drop-shadow-xs" />
            <div className="leading-tight">
              <span className="text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors block">
                Zakir Learning Hub
              </span>
              <span className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Computer Science • IT • IP • Typography
              </span>
            </div>
          </div>

          {/* 2. Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map(link => {
              const isActive = currentTab === link.id;

              if (link.id === 'classes') {
                return (
                  <div key={link.id} className="relative">
                    <button
                      onClick={() => {
                        setClassesDropdownOpen(!classesDropdownOpen);
                        setBoardHubDropdownOpen(false);
                      }}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        selectedClassFilter !== 'ALL'
                          ? 'bg-blue-50 text-blue-700 font-bold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                      }`}
                    >
                      <span>{selectedClassFilter !== 'ALL' ? `Class ${selectedClassFilter}` : link.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {/* Classes Dropdown Menu */}
                    {classesDropdownOpen && (
                      <div 
                        onMouseLeave={() => setClassesDropdownOpen(false)}
                        className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95 duration-150"
                      >
                        <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Select Class Level</span>
                          <button 
                            onClick={() => {
                              setSelectedClassFilter('ALL');
                              setClassesDropdownOpen(false);
                            }}
                            className="text-[11px] text-blue-600 hover:underline font-semibold"
                          >
                            Reset
                          </button>
                        </div>

                        <div className="p-2 grid grid-cols-1 gap-1">
                          {CLASSES_LIST.map(cls => (
                            <button
                              key={cls.level}
                              onClick={() => {
                                setSelectedClassFilter(cls.level as ClassLevel);
                                setClassesDropdownOpen(false);
                                setCurrentTab('materials');
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                                selectedClassFilter === cls.level
                                  ? 'bg-blue-600 text-white font-bold'
                                  : 'hover:bg-slate-100 text-slate-700'
                              }`}
                            >
                              <div>
                                <span className="font-bold">{cls.name}</span>
                                <p className={`text-[10px] ${selectedClassFilter === cls.level ? 'text-blue-100' : 'text-slate-400'}`}>
                                  {cls.subtitle}
                                </p>
                              </div>
                              {selectedClassFilter === cls.level && <Check className="w-4 h-4" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              if (link.id === 'boardHub') {
                const isHubActive = ['lab', 'blueprint', 'competency', 'flashcards', 'pyq'].includes(currentTab);
                return (
                  <div key={link.id} className="relative">
                    <button
                      onClick={() => {
                        setBoardHubDropdownOpen(!boardHubDropdownOpen);
                        setClassesDropdownOpen(false);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isHubActive
                          ? 'bg-blue-50 text-blue-700 font-bold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Exam Hub</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {boardHubDropdownOpen && (
                      <div
                        onMouseLeave={() => setBoardHubDropdownOpen(false)}
                        className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                      >
                        <div className="px-4 py-2 border-b border-slate-100">
                          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                            CBSE Board Labs & Tools
                          </p>
                          <p className="text-[10px] text-slate-400">
                            Practical playgrounds, blueprints & past papers
                          </p>
                        </div>

                        <div className="p-2 space-y-1">
                          {BOARD_HUB_ITEMS.map(item => {
                            const Icon = item.icon;
                            const isItemActive = currentTab === item.id;
                            return (
                              <button
                                key={item.id}
                                onClick={() => {
                                  setCurrentTab(item.id);
                                  setBoardHubDropdownOpen(false);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                                  isItemActive
                                    ? 'bg-blue-50 border border-blue-200 text-blue-900'
                                    : 'hover:bg-slate-50 text-slate-800'
                                }`}
                              >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                                  isItemActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                                }`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="text-xs font-bold truncate">{item.label}</span>
                                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 shrink-0">
                                      {item.badge}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                                    {item.desc}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* 3. Action Zone */}
          <div className="flex items-center gap-2">
            
            {/* Search Button */}
            <button
              onClick={onSearchClick}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-600 text-xs font-medium border border-slate-200/70 transition-all cursor-pointer"
              title="Search materials & MCQs (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.2 text-[10px] font-mono text-slate-500 bg-white border border-slate-200 rounded shadow-xs">
                ⌘K
              </kbd>
            </button>

            {/* Notification Bell */}
            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                  className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative cursor-pointer"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                  )}
                </button>

                {notifDropdownOpen && (
                  <div 
                    onMouseLeave={() => setNotifDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-2"
                  >
                    <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="px-1.5 py-0.2 bg-blue-100 text-blue-800 text-[10px] font-bold rounded">
                          {unreadCount} new
                        </span>
                      )}
                    </div>

                    <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 px-2">
                      {notifications.length === 0 ? (
                        <div className="py-6 px-4 text-center text-slate-400 space-y-1">
                          <p className="text-xs font-medium text-slate-600">No notifications yet</p>
                          <p className="text-[11px] text-slate-400">You're all caught up with portal updates.</p>
                        </div>
                      ) : (
                        notifications.map(n => (
                          <div
                            key={n.id}
                            onClick={() => {
                              markNotificationRead(n.id);
                              if (n.linkTab) setCurrentTab(n.linkTab);
                              setNotifDropdownOpen(false);
                            }}
                            className={`p-2.5 rounded-xl cursor-pointer transition-colors ${
                              !n.isRead ? 'bg-blue-50/70 hover:bg-blue-50' : 'hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-900">{n.title}</span>
                              {!n.isRead && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                            </div>
                            <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Authentication Buttons & User Dropdown */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1 bg-blue-50 hover:bg-blue-100/80 border border-blue-200/80 rounded-full transition-colors cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    {currentUser?.name.charAt(0) || 'S'}
                  </div>
                  <div className="text-left hidden sm:block">
                    <span className="text-xs font-bold text-slate-900 block leading-tight">
                      {currentUser?.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] font-semibold text-blue-600 block leading-tight">
                      {currentUser?.role === 'admin' ? 'Teacher / Admin' : `Class ${currentUser?.classLevel || studentProfile.classLevel}`}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div 
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{currentUser?.name}</p>
                      <p className="text-[11px] text-slate-500">{currentUser?.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-[10px] font-bold">
                        ID: {currentUser?.studentId || 'X1024'}
                      </span>
                    </div>

                    <div className="p-1 space-y-0.5">
                      {currentUser?.role === 'admin' ? (
                        <button
                          onClick={() => {
                            setCurrentTab('admin');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                        >
                          <ShieldCheck className="w-4 h-4 text-purple-600" />
                          <span>Admin Control Center</span>
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setCurrentTab('dashboard');
                              setProfileDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                          >
                            <LayoutDashboard className="w-4 h-4 text-blue-600" />
                            <span>Student Dashboard</span>
                          </button>
                          <button
                            onClick={() => {
                              handleNavClick('mytests');
                              setProfileDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                          >
                            <Award className="w-4 h-4 text-amber-600" />
                            <span>My Tests & Certificates</span>
                          </button>
                        </>
                      )}

                      {currentUser?.role === 'admin' && (
                        <button
                          onClick={() => {
                            if (userRole === 'student') {
                              setUserRole('admin');
                              setCurrentTab('admin');
                            } else {
                              setUserRole('student');
                              setCurrentTab('dashboard');
                            }
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-purple-700 hover:bg-purple-50"
                        >
                          <ShieldCheck className="w-4 h-4 text-purple-600" />
                          <span>Switch to {userRole === 'admin' ? 'Student View' : 'Teacher View'}</span>
                        </button>
                      )}

                      <div className="pt-1 border-t border-slate-100">
                        <button
                          onClick={() => {
                            logout();
                            setProfileDropdownOpen(false);
                            setCurrentTab('home');
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => openAuthModal('register')}
                  className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
                >
                  <span>Register</span>
                </button>
              </div>
            )}

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                  currentTab === link.id
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Exam Hub Shortcuts */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">
              CBSE Exam Tools & Practical Labs
            </p>
            <div className="grid grid-cols-1 gap-1.5">
              {BOARD_HUB_ITEMS.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentTab(item.id);
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-left transition-colors ${
                      currentTab === item.id ? 'bg-blue-600 text-white font-bold' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-blue-500" />
                      <span>{item.label}</span>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                      {item.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {!isAuthenticated && (
            <div className="pt-2 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold text-center"
              >
                Student Login
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('register');
                }}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold text-center"
              >
                Register
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
