import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Filter, 
  Search, 
  Bookmark, 
  BookmarkCheck, 
  Clock, 
  FileText, 
  Code, 
  HelpCircle, 
  Download, 
  Check, 
  Copy, 
  Play, 
  X, 
  ArrowRight,
  Printer,
  Sparkles,
  Share2,
  Highlighter,
  StickyNote as StickyNoteIcon,
  Plus,
  Upload,
  RefreshCw,
  FileType,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CLASSES_LIST, getSubjectsForClass, getChapters, SUBJECTS_LIST } from '../../data/curriculumData';
import { ClassLevel, SubjectId, StudyMaterial, MaterialType } from '../../types';
import { 
  AnnotationToolbar, 
  StickyNotesDrawer, 
  HighlightColor, 
  TextHighlight, 
  StickyNote, 
  COLOR_CLASSES 
} from '../DocumentAnnotations';
import { downloadChapterPDF } from '../../lib/pdfGenerator';
import { SEO } from '../SEO';
import { ChapterPdfUploader } from '../ChapterPdfUploader';

interface StudyMaterialViewProps {
  initialMaterialToOpen?: StudyMaterial | null;
  onClearInitialMaterial?: () => void;
  onStartQuizWithChapter?: (classLevel: ClassLevel, subjectId: SubjectId, chapterId?: string) => void;
}

export const StudyMaterialView: React.FC<StudyMaterialViewProps> = ({
  initialMaterialToOpen,
  onClearInitialMaterial,
  onStartQuizWithChapter
}) => {
  const { 
    studyMaterials, 
    selectedClassFilter, 
    setSelectedClassFilter, 
    studentProfile, 
    toggleBookmark,
    syncAllCBSESkillMaterials,
    userRole
  } = useApp();

  const [activeClass, setActiveClass] = useState<ClassLevel | 'ALL'>(selectedClassFilter);
  const [activeSubject, setActiveSubject] = useState<SubjectId | 'ALL'>('ALL');
  const [activeChapter, setActiveChapter] = useState<string>('ALL');
  const [activeType, setActiveType] = useState<MaterialType | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Reader Modal State
  const [activeReaderMaterial, setActiveReaderMaterial] = useState<StudyMaterial | null>(
    initialMaterialToOpen || null
  );
  const [copiedCode, setCopiedCode] = useState(false);
  const [codeRunOutputVisible, setCodeRunOutputVisible] = useState(false);
  const [showShareNotification, setShowShareNotification] = useState(false);

  // Annotation States
  const [highlights, setHighlights] = useState<Record<string, TextHighlight[]>>(() => {
    try {
      const saved = localStorage.getItem('learn_zakir_highlights');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [stickyNotes, setStickyNotes] = useState<Record<string, StickyNote[]>>(() => {
    try {
      const saved = localStorage.getItem('learn_zakir_stickynotes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activeHighlightColor, setActiveHighlightColor] = useState<HighlightColor>('yellow');
  const [isHighlightMode, setIsHighlightMode] = useState<boolean>(false);
  const [isNotesDrawerOpen, setIsNotesDrawerOpen] = useState<boolean>(false);
  const [inlineNoteTargetParagraph, setInlineNoteTargetParagraph] = useState<number | null>(null);
  const [inlineNoteText, setInlineNoteText] = useState<string>('');

  React.useEffect(() => {
    try {
      localStorage.setItem('learn_zakir_highlights', JSON.stringify(highlights));
    } catch {}
  }, [highlights]);

  React.useEffect(() => {
    try {
      localStorage.setItem('learn_zakir_stickynotes', JSON.stringify(stickyNotes));
    } catch {}
  }, [stickyNotes]);

  const currentHighlights = useMemo(() => {
    if (!activeReaderMaterial) return [];
    return highlights[activeReaderMaterial.id] || [];
  }, [activeReaderMaterial, highlights]);

  const currentStickyNotes = useMemo(() => {
    if (!activeReaderMaterial) return [];
    return stickyNotes[activeReaderMaterial.id] || [];
  }, [activeReaderMaterial, stickyNotes]);

  const toggleHighlightLine = (paragraphIndex: number, lineText: string) => {
    if (!activeReaderMaterial) return;
    const matId = activeReaderMaterial.id;
    const existing = (highlights[matId] || []).find(h => h.paragraphIndex === paragraphIndex);

    setHighlights(prev => {
      const list = prev[matId] || [];
      if (existing) {
        return {
          ...prev,
          [matId]: list.filter(h => h.paragraphIndex !== paragraphIndex)
        };
      } else {
        const newHighlight: TextHighlight = {
          id: `hl-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          materialId: matId,
          text: lineText,
          color: activeHighlightColor,
          createdAt: new Date().toLocaleDateString(),
          paragraphIndex
        };
        return {
          ...prev,
          [matId]: [...list, newHighlight]
        };
      }
    });
  };

  const addStickyNote = (text: string, color: HighlightColor, paragraphIndex?: number) => {
    if (!activeReaderMaterial) return;
    const matId = activeReaderMaterial.id;
    const newNote: StickyNote = {
      id: `sn-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      materialId: matId,
      text,
      color,
      createdAt: 'Just now',
      paragraphIndex
    };

    setStickyNotes(prev => ({
      ...prev,
      [matId]: [newNote, ...(prev[matId] || [])]
    }));
  };

  const deleteStickyNote = (noteId: string) => {
    if (!activeReaderMaterial) return;
    const matId = activeReaderMaterial.id;
    setStickyNotes(prev => ({
      ...prev,
      [matId]: (prev[matId] || []).filter(n => n.id !== noteId)
    }));
  };

  const clearAllAnnotations = () => {
    if (!activeReaderMaterial) return;
    const matId = activeReaderMaterial.id;
    setHighlights(prev => {
      const updated = { ...prev };
      delete updated[matId];
      return updated;
    });
    setStickyNotes(prev => {
      const updated = { ...prev };
      delete updated[matId];
      return updated;
    });
  };

  // Synchronize if prop changes
  React.useEffect(() => {
    if (initialMaterialToOpen) {
      setActiveReaderMaterial(initialMaterialToOpen);
    }
  }, [initialMaterialToOpen]);

  // Synchronize class filter with global state
  React.useEffect(() => {
    if (selectedClassFilter !== 'ALL') {
      setActiveClass(selectedClassFilter);
    }
  }, [selectedClassFilter]);

  // Available subjects for currently active class
  const availableSubjects = useMemo(() => {
    if (activeClass === 'ALL') return SUBJECTS_LIST;
    return getSubjectsForClass(activeClass);
  }, [activeClass]);

  // Available chapters based on class and subject
  const availableChapters = useMemo(() => {
    if (activeClass === 'ALL' || activeSubject === 'ALL') return [];
    return getChapters(activeClass, activeSubject);
  }, [activeClass, activeSubject]);

  // Filtered materials
  const filteredMaterials = useMemo(() => {
    return studyMaterials.filter(mat => {
      // Class filter
      if (activeClass !== 'ALL' && mat.classLevel !== activeClass) return false;
      // Subject filter
      if (activeSubject !== 'ALL' && mat.subjectId !== activeSubject) return false;
      // Chapter filter
      if (activeChapter !== 'ALL' && mat.chapterId !== activeChapter) return false;
      // Type filter
      if (activeType !== 'ALL' && mat.type !== activeType) return false;
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = mat.title.toLowerCase().includes(q);
        const matchesDesc = mat.description.toLowerCase().includes(q);
        const matchesChapter = mat.chapterTitle.toLowerCase().includes(q);
        const matchesTag = mat.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesChapter && !matchesTag) return false;
      }
      return true;
    });
  }, [studyMaterials, activeClass, activeSubject, activeChapter, activeType, searchQuery]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleShare = (mat: StudyMaterial) => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareNotification(true);
    setTimeout(() => setShowShareNotification(false), 2500);
  };

  const getTypeBadge = (type: MaterialType) => {
    switch (type) {
      case 'notes':
        return { label: 'Chapter Notes', color: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'practical_file':
        return { label: 'Practical Lab File', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'important_questions':
        return { label: 'Important Q&A', color: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'cheat_sheet':
        return { label: 'Cheat Sheet', color: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'video':
        return { label: 'Video Lecture', color: 'bg-rose-50 text-rose-700 border-rose-200' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title={
          activeReaderMaterial 
            ? `${activeReaderMaterial.title} (Class ${activeReaderMaterial.classLevel})`
            : activeClass !== 'ALL' 
              ? `Class ${activeClass} Study Materials & Chapter Notes`
              : 'Study Material & Chapter Notes'
        }
        description={
          activeReaderMaterial 
            ? activeReaderMaterial.description 
            : 'Access comprehensive chapter notes, practical code files, and key board exam questions for Classes VI–XII.'
        }
        keywords={['Study Material', 'Chapter Notes', 'Practical File', 'CBSE Notes', 'Zakir Hussain', 'IT 402', 'IP 065']}
      />
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Structured Study Repository</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">
            Study Material: Class → Subject → Chapter
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Read chapter-wise revision notes, copy-paste practical scripts for Python & SQL, and review previous years' CBSE board exam questions.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-900 rounded-lg text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>Aligned with <strong>CBSESkillEducation.com</strong> Information Technology Curriculum (Code 402 & 802) • Chapter-wise PDF Downloads</span>
          </div>
        </div>

        {/* Actions & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
          <button
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer shrink-0"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Chapter PDF</span>
          </button>

          <button
            type="button"
            onClick={() => syncAllCBSESkillMaterials()}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0"
            title="Reload/Sync all CBSE Skill Education IT chapters"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Sync CBSE Chapters</span>
          </button>

          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search chapters & notes..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Filter Pipeline: Class -> Subject -> Chapter */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {/* 1. Class Selector */}
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            1. Select Class
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => {
                setActiveClass('ALL');
                setSelectedClassFilter('ALL');
                setActiveSubject('ALL');
                setActiveChapter('ALL');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeClass === 'ALL'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              All Classes
            </button>
            {CLASSES_LIST.map(c => (
              <button
                key={c.level}
                onClick={() => {
                  setActiveClass(c.level as ClassLevel);
                  setSelectedClassFilter(c.level as ClassLevel);
                  setActiveSubject('ALL');
                  setActiveChapter('ALL');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeClass === c.level
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Subject Selector */}
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            2. Select Subject
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => {
                setActiveSubject('ALL');
                setActiveChapter('ALL');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubject === 'ALL'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              All Subjects
            </button>
            {availableSubjects.map(sub => (
              <button
                key={sub.id}
                onClick={() => {
                  setActiveSubject(sub.id);
                  setActiveChapter('ALL');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeSubject === sub.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {sub.name} ({sub.code})
              </button>
            ))}
          </div>
        </div>

        {/* 3. Chapter Selector (if specific subject selected) */}
        {availableChapters.length > 0 && (
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              3. Select Chapter
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveChapter('ALL')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                  activeChapter === 'ALL'
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                All Chapters ({availableChapters.length})
              </button>
              {availableChapters.map(ch => (
                <button
                  key={ch.id}
                  onClick={() => setActiveChapter(ch.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                    activeChapter === ch.id
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  Ch {ch.chapterNumber}: {ch.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 4. Type Pills */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Format:</span>
          {(['ALL', 'notes', 'practical_file', 'important_questions', 'cheat_sheet'] as (MaterialType | 'ALL')[]).map(t => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`px-2 py-0.5 rounded text-xs transition-colors ${
                activeType === t
                  ? 'bg-slate-900 text-white font-medium'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {t === 'ALL' ? 'All Types' : t.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Material Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Showing {filteredMaterials.length} Study Package{filteredMaterials.length === 1 ? '' : 's'}
          </span>
          {studentProfile.bookmarks.length > 0 && (
            <span className="text-xs text-blue-600 font-medium">
              ★ {studentProfile.bookmarks.length} Bookmarked Material{studentProfile.bookmarks.length === 1 ? '' : 's'}
            </span>
          )}
        </div>

        {filteredMaterials.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <h3 className="text-base font-bold text-slate-800">No study materials found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No content matched the current filters. Try changing your class, subject or search keywords.
            </p>
            <button
              onClick={() => {
                setActiveClass('ALL');
                setActiveSubject('ALL');
                setActiveChapter('ALL');
                setActiveType('ALL');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map(mat => {
              const isBookmarked = studentProfile.bookmarks.includes(mat.id);
              const badge = getTypeBadge(mat.type);

              return (
                <div
                  key={mat.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-5">
                    {/* Top Tag Row */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 text-[11px] font-bold bg-blue-100 text-blue-800 rounded">
                          Class {mat.classLevel}
                        </span>
                        <span className={`px-2 py-0.5 text-[10px] font-semibold rounded border ${badge.color}`}>
                          {badge.label}
                        </span>
                      </div>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          toggleBookmark(mat.id);
                        }}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isBookmarked ? 'text-amber-500 bg-amber-50' : 'text-slate-400 hover:text-slate-600'
                        }`}
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark this note'}
                      >
                        {isBookmarked ? <BookmarkCheck className="w-4 h-4 fill-amber-500" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>

                    <h3 
                      onClick={() => setActiveReaderMaterial(mat)}
                      className="font-bold text-slate-900 text-base mb-1.5 group-hover:text-blue-600 cursor-pointer transition-colors"
                    >
                      {mat.title}
                    </h3>
                    <p className="text-xs font-semibold text-blue-600 mb-2">
                      {mat.chapterTitle}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
                      {mat.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {mat.tags.map(t => (
                        <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action footer */}
                  <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadChapterPDF(mat);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 transition-colors cursor-pointer shadow-2xs"
                      title={`Download ${mat.downloadableFileName || 'Chapter PDF'}`}
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Download PDF</span>
                    </button>
                    <button
                      onClick={() => setActiveReaderMaterial(mat)}
                      className="flex items-center gap-1 font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      <span>Read Notes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Interactive Document Reader Modal */}
      {activeReaderMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
          <div className={`relative w-full ${isNotesDrawerOpen ? 'max-w-6xl' : 'max-w-4xl'} bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[92vh] transition-all`}>
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs font-bold bg-blue-500 text-white rounded">
                  Class {activeReaderMaterial.classLevel}
                </span>
                <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                  {activeReaderMaterial.chapterTitle}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => downloadChapterPDF(activeReaderMaterial)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs cursor-pointer"
                  title="Download / Print Chapter PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => handleShare(activeReaderMaterial)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Share Link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setActiveReaderMaterial(null);
                    if (onClearInitialMaterial) onClearInitialMaterial();
                  }}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Annotation & Sticky Notes Toolbar */}
            <AnnotationToolbar
              activeColor={activeHighlightColor}
              onColorChange={setActiveHighlightColor}
              isHighlightMode={isHighlightMode}
              onToggleHighlightMode={() => setIsHighlightMode(!isHighlightMode)}
              stickyNotesCount={currentStickyNotes.length}
              highlightsCount={currentHighlights.length}
              onOpenNewNoteModal={() => {
                setIsNotesDrawerOpen(true);
              }}
              onToggleNotesDrawer={() => setIsNotesDrawerOpen(!isNotesDrawerOpen)}
              isNotesDrawerOpen={isNotesDrawerOpen}
              onClearAllAnnotations={clearAllAnnotations}
            />

            {/* Modal Body & Sticky Notes Drawer Flex */}
            <div className="flex-1 flex overflow-hidden">
              {/* Scrollable Content Body */}
              <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800">
                {showShareNotification && (
                  <div className="p-2 text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-center font-medium">
                    ✓ Material link copied to your clipboard!
                  </div>
                )}

                {/* Title & Metadata */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    {activeReaderMaterial.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
                    <span>Author: <strong className="text-slate-700">{activeReaderMaterial.author}</strong></span>
                    <span>•</span>
                    <span>Published: {activeReaderMaterial.uploadedDate}</span>
                    <span>•</span>
                    <span>Est. Read: {activeReaderMaterial.readTimeMinutes} mins</span>
                    {currentHighlights.length > 0 && (
                      <span className="text-amber-600 font-semibold">• {currentHighlights.length} Highlight{currentHighlights.length === 1 ? '' : 's'}</span>
                    )}
                    {currentStickyNotes.length > 0 && (
                      <span className="text-blue-600 font-semibold">• {currentStickyNotes.length} Note{currentStickyNotes.length === 1 ? '' : 's'}</span>
                    )}
                  </div>
                </div>

                {/* Download / Practice bar */}
                <div className="p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50/40 border border-blue-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-blue-950">
                    <span className="font-extrabold text-blue-900 text-sm flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>CBSESkillEducation Aligned Chapter Resource</span>
                    </span>
                    <p className="text-blue-700/90 text-xs mt-0.5">
                      Download complete chapter PDF notes with diagrams, definitions, and CBSE board solutions.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => downloadChapterPDF(activeReaderMaterial)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Chapter PDF</span>
                    </button>
                    {onStartQuizWithChapter && (
                      <button
                        onClick={() => {
                          onStartQuizWithChapter(
                            activeReaderMaterial.classLevel,
                            activeReaderMaterial.subjectId,
                            activeReaderMaterial.chapterId
                          );
                          setActiveReaderMaterial(null);
                        }}
                        className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shrink-0 shadow-xs cursor-pointer"
                      >
                        <HelpCircle className="w-4 h-4" />
                        <span>Chapter Quiz</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Code Snippet Playground (if available) */}
                {activeReaderMaterial.codeSnippet && (
                  <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 shadow-md">
                    <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400 uppercase">
                        Code Snippet ({activeReaderMaterial.codeSnippet.language})
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setCodeRunOutputVisible(!codeRunOutputVisible)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                        >
                          <Play className="w-3 h-3" />
                          <span>{codeRunOutputVisible ? 'Hide Output' : 'Simulate Run'}</span>
                        </button>
                        <button
                          onClick={() => handleCopyCode(activeReaderMaterial.codeSnippet!.code)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
                        >
                          {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                        </button>
                      </div>
                    </div>
                    <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed text-blue-200">
                      <code>{activeReaderMaterial.codeSnippet.code}</code>
                    </pre>
                    {codeRunOutputVisible && activeReaderMaterial.codeSnippet.output && (
                      <div className="p-3 bg-slate-900 border-t border-slate-800 text-xs font-mono">
                        <span className="text-[10px] text-emerald-400 font-bold block mb-1">
                          CONSOLE OUTPUT:
                        </span>
                        <pre className="text-emerald-300 whitespace-pre-wrap">
                          {activeReaderMaterial.codeSnippet.output}
                        </pre>
                      </div>
                    )}
                  </div>
                )}

                {/* Interactive Main Content Body with Line Highlighting & Sticky Notes */}
                <div className="border-t border-slate-100 pt-4 space-y-3">
                  {isHighlightMode && (
                    <div className="p-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs flex items-center justify-between">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Highlighter className="w-4 h-4 text-amber-600" />
                        <span>Highlighter is ON: Click any passage or line to toggle highlight in {COLOR_CLASSES[activeHighlightColor].name}.</span>
                      </span>
                      <button
                        onClick={() => setIsHighlightMode(false)}
                        className="text-amber-800 hover:text-amber-950 font-bold underline text-[11px]"
                      >
                        Done
                      </button>
                    </div>
                  )}

                  {activeReaderMaterial.content.split('\n\n').map((paragraphText, pIdx) => {
                    const highlight = currentHighlights.find(h => h.paragraphIndex === pIdx);
                    const colorMeta = highlight ? COLOR_CLASSES[highlight.color] : null;
                    const paragraphNotes = currentStickyNotes.filter(n => n.paragraphIndex === pIdx);

                    return (
                      <div
                        key={pIdx}
                        className={`relative group rounded-xl p-3 transition-all border ${
                          highlight
                            ? `${colorMeta?.bg} ${colorMeta?.border} shadow-2xs`
                            : 'border-transparent hover:border-slate-200 hover:bg-slate-50/70'
                        }`}
                      >
                        {/* Hover Quick Action Buttons */}
                        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-lg border border-slate-200 shadow-xs z-10">
                          <button
                            onClick={() => toggleHighlightLine(pIdx, paragraphText)}
                            className={`flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded transition-colors ${
                              highlight ? 'text-red-600 hover:bg-red-50' : 'text-slate-700 hover:text-amber-700 hover:bg-amber-50'
                            }`}
                            title={highlight ? 'Remove highlight' : `Highlight in ${COLOR_CLASSES[activeHighlightColor].name}`}
                          >
                            <Highlighter className="w-3 h-3 text-amber-500" />
                            <span>{highlight ? 'Unhighlight' : 'Highlight'}</span>
                          </button>

                          <span className="text-slate-300">|</span>

                          <button
                            onClick={() => {
                              setInlineNoteTargetParagraph(inlineNoteTargetParagraph === pIdx ? null : pIdx);
                            }}
                            className="flex items-center gap-1 text-[10px] font-bold text-slate-700 hover:text-amber-800 hover:bg-amber-50 px-1.5 py-0.5 rounded transition-colors"
                            title="Attach sticky note here"
                          >
                            <StickyNoteIcon className="w-3 h-3 text-yellow-500" />
                            <span>Note</span>
                          </button>
                        </div>

                        {/* Text Paragraph */}
                        <p
                          onClick={() => {
                            if (isHighlightMode) {
                              toggleHighlightLine(pIdx, paragraphText);
                            }
                          }}
                          className={`text-sm leading-relaxed whitespace-pre-line ${
                            isHighlightMode ? 'cursor-pointer hover:opacity-90 select-none' : ''
                          }`}
                        >
                          {paragraphText}
                        </p>

                        {/* Inline Note Creation Box */}
                        {inlineNoteTargetParagraph === pIdx && (
                          <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-300 shadow-xs space-y-2 animate-in fade-in">
                            <div className="flex items-center justify-between text-xs text-amber-950 font-bold">
                              <span className="flex items-center gap-1">
                                <StickyNoteIcon className="w-3.5 h-3.5 text-amber-600" />
                                Add note to this section:
                              </span>
                              <button
                                onClick={() => setInlineNoteTargetParagraph(null)}
                                className="text-amber-700 hover:text-amber-950 p-0.5"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <textarea
                              value={inlineNoteText}
                              onChange={e => setInlineNoteText(e.target.value)}
                              placeholder="Type your study note or formula reminder here..."
                              rows={2}
                              className="w-full text-xs p-2.5 rounded-lg bg-white border border-amber-200 text-slate-900 focus:outline-hidden focus:border-amber-500 resize-none"
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => setInlineNoteTargetParagraph(null)}
                                className="px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => {
                                  if (inlineNoteText.trim()) {
                                    addStickyNote(inlineNoteText.trim(), activeHighlightColor, pIdx);
                                    setInlineNoteText('');
                                    setInlineNoteTargetParagraph(null);
                                  }
                                }}
                                disabled={!inlineNoteText.trim()}
                                className="px-3 py-1 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                              >
                                Save Note
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Paragraph's Attached Sticky Notes */}
                        {paragraphNotes.length > 0 && (
                          <div className="mt-2.5 flex flex-wrap gap-2">
                            {paragraphNotes.map(pn => (
                              <div
                                key={pn.id}
                                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs shadow-2xs ${COLOR_CLASSES[pn.color].bg} ${COLOR_CLASSES[pn.color].border}`}
                              >
                                <StickyNoteIcon className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                                <span className="font-semibold text-slate-800">{pn.text}</span>
                                <button
                                  onClick={() => deleteStickyNote(pn.id)}
                                  className="text-slate-400 hover:text-red-600 ml-1 p-0.5"
                                  title="Delete note"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Important Board Questions Section */}
                {activeReaderMaterial.keyQuestions && activeReaderMaterial.keyQuestions.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-slate-200 space-y-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      <h3 className="text-lg font-bold text-slate-900">
                        Important Board Examination Questions & Model Answers
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {activeReaderMaterial.keyQuestions.map((kq, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-2">
                          <div className="flex items-start justify-between gap-3">
                            <p className="font-semibold text-slate-900 text-sm">
                              Q{idx + 1}. {kq.question}
                            </p>
                            <span className="px-2 py-0.5 text-[11px] font-bold bg-amber-200 text-amber-900 rounded shrink-0">
                              {kq.marks} Marks
                            </span>
                          </div>
                          <div className="text-xs text-slate-700 leading-relaxed pl-3 border-l-2 border-amber-400">
                            <strong className="text-slate-900">Model Answer:</strong> {kq.answer}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Collapsible Sticky Notes Drawer */}
              <StickyNotesDrawer
                notes={currentStickyNotes}
                isOpen={isNotesDrawerOpen}
                onClose={() => setIsNotesDrawerOpen(false)}
                onDeleteNote={deleteStickyNote}
                onAddNote={(text, color) => addStickyNote(text, color)}
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
              <div className="flex items-center gap-3">
                <span>Curated by Mr. Zakir Hussain • CBSE Information Technology</span>
                {(currentHighlights.length > 0 || currentStickyNotes.length > 0) && (
                  <span className="text-slate-400 hidden sm:inline">
                    • Annotations automatically saved to your browser
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  setActiveReaderMaterial(null);
                  if (onClearInitialMaterial) onClearInitialMaterial();
                }}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-semibold cursor-pointer"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Chapter PDF Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-bold">Upload Chapter PDF Document</span>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 sm:p-6">
              <ChapterPdfUploader 
                onSuccess={() => setIsUploadModalOpen(false)} 
                defaultClass={activeClass === 'ALL' ? 'X' : activeClass}
                defaultSubject={activeSubject === 'ALL' ? 'it-402' : activeSubject}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
