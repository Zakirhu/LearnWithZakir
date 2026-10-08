import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  BookOpen, 
  Award, 
  ChevronRight,
  Eye, 
  EyeOff, 
  Filter,
  Upload,
  Trash2,
  Lock
} from 'lucide-react';
import { SEO } from '../SEO';
import { ClassLevel, SubjectId, PYQPaper } from '../../types';
import { useApp } from '../../context/AppContext';
import { PYQPdfUploaderModal } from '../PYQPdfUploaderModal';
import { PYQPdfViewerModal } from '../PYQPdfViewerModal';

export const PYQArchiveView: React.FC = () => {
  const { pyqPapers, deletePYQPaper, currentUser, userRole, openAuthModal } = useApp();

  const [selectedClass, setSelectedClass] = useState<ClassLevel | 'ALL'>('ALL');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // Modals
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [activeViewerPaper, setActiveViewerPaper] = useState<PYQPaper | null>(null);

  // Extract all available years from existing papers
  const availableYears = Array.from(new Set(pyqPapers.map(p => p.year))).sort((a, b) => Number(b) - Number(a));

  const filteredPapers = pyqPapers.filter(item => {
    if (selectedClass !== 'ALL' && item.classLevel !== selectedClass) return false;
    if (selectedYear !== 'ALL' && item.year !== selectedYear) return false;
    return true;
  });

  const toggleSolution = (paperId: string) => {
    setRevealedSolutions(prev => ({ ...prev, [paperId]: !prev[paperId] }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleOpenUpload = () => {
    if (userRole === 'admin' || currentUser?.role === 'admin') {
      setIsUploadModalOpen(true);
    } else {
      openAuthModal('admin', 'Administrator sign-in is required to upload previous year question papers.');
    }
  };

  const handleDownloadPaper = (paper: PYQPaper) => {
    if (paper.pdfDataUrl) {
      const link = document.createElement('a');
      link.href = paper.pdfDataUrl;
      link.download = paper.fileName || `CBSE_Class_${paper.classLevel}_${paper.code}_${paper.year}.pdf`;
      link.click();
    } else {
      setActiveViewerPaper(paper);
    }
  };

  const handleDownloadKey = (paper: PYQPaper) => {
    if (paper.markingSchemePdfUrl) {
      const link = document.createElement('a');
      link.href = paper.markingSchemePdfUrl;
      link.download = paper.markingSchemeFileName || `CBSE_Marking_Scheme_${paper.classLevel}_${paper.code}_${paper.year}.pdf`;
      link.click();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      <SEO
        title="CBSE Past Years Question Papers (PYQ) & Marking Schemes"
        description="Past 5 years CBSE Board Papers with official marking schemes, attached PDFs, and step-marking rubrics for IT 402, IP 065, and Typo 817."
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 print:border print:border-slate-300">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-blue-200 rounded-full text-xs font-semibold border border-white/20">
            <Award className="w-3.5 h-3.5 text-blue-400" />
            <span>Past 5 Years CBSE Board Archive • Official Examiner Marking Guidelines</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Previous Years’ Papers & Official Marking Schemes
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Examine authentic past CBSE board papers and learn how board examiners award step marks (0.5, 1, 2 marks) for code syntax, SQL commands, and theoretical definitions.
          </p>
        </div>

        <div className="flex items-center gap-2.5 print:hidden shrink-0">
          <button
            onClick={handleOpenUpload}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Upload PYQ PDF</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Papers</span>
          </button>
        </div>
      </div>

      {/* Filters Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div className="flex flex-wrap items-center gap-2">
          {/* Class Filter */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            {(['ALL', 'X', 'XII', 'IX', 'XI'] as (ClassLevel | 'ALL')[]).map(cls => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedClass === cls
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cls === 'ALL' ? 'All Classes' : `Class ${cls}`}
              </button>
            ))}
          </div>

          {/* Year Filter */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => setSelectedYear('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedYear === 'ALL'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Years
            </button>
            {availableYears.map(yr => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedYear === yr
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {yr} Board
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-400">
            Showing {filteredPapers.length} Board Question Paper{filteredPapers.length === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      {/* Papers List */}
      <div className="space-y-6">
        {filteredPapers.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No Previous Year Papers found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              No papers match the selected Class or Year filter. Try selecting "All Classes" or upload a new board question paper PDF.
            </p>
            <button
              onClick={handleOpenUpload}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-blue-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload PDF Now</span>
            </button>
          </div>
        ) : (
          filteredPapers.map(paper => {
            const isRevealed = revealedSolutions[paper.id];

            return (
              <div key={paper.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 transition-all hover:border-slate-300">
                
                {/* Paper Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-lg font-bold text-xs bg-blue-100 text-blue-800 font-mono">
                        {paper.year}
                      </span>
                      <span className="font-bold text-sm sm:text-base text-slate-900">
                        Class {paper.classLevel} • {paper.subjectName} ({paper.code})
                      </span>
                      <span className="text-xs text-slate-400">({paper.examType})</span>
                      {paper.pdfDataUrl && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>PDF Attached</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{paper.questionsSummary}</p>
                  </div>

                  <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap shrink-0">
                    <div className="text-right text-xs pr-2 hidden sm:block">
                      <span className="font-mono font-bold text-slate-900">{paper.totalMarks} Marks</span>
                      <span className="text-slate-400 block">{paper.timeHours} Hours</span>
                    </div>

                    {/* View Paper Modal */}
                    <button
                      onClick={() => setActiveViewerPaper(paper)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition-all cursor-pointer border border-blue-200"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View PDF</span>
                    </button>

                    {/* Download Paper PDF */}
                    <button
                      onClick={() => handleDownloadPaper(paper)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
                      title={paper.fileName || 'Download Paper'}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>

                    {/* Download Marking Key if attached */}
                    {paper.markingSchemePdfUrl && (
                      <button
                        onClick={() => handleDownloadKey(paper)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl text-xs font-bold transition-all cursor-pointer border border-purple-200"
                        title="Download Official Marking Scheme PDF"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>Key PDF</span>
                      </button>
                    )}

                    {/* Reveal Official Step Marking */}
                    <button
                      onClick={() => toggleSolution(paper.id)}
                      className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{isRevealed ? 'Hide Rubric' : 'Step Marking'}</span>
                    </button>

                    {/* Admin delete option */}
                    {(userRole === 'admin' || currentUser?.role === 'admin') && (
                      <button
                        onClick={() => {
                          if (confirm(`Delete Previous Year Paper for Class ${paper.classLevel} (${paper.year})?`)) {
                            deletePYQPaper(paper.id);
                          }
                        }}
                        className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete Paper"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Sample Questions & Step-Marking Scheme */}
                {paper.sampleQuestions && paper.sampleQuestions.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Board Questions & Examiner Step-Marking Rubric:
                    </h4>

                    {paper.sampleQuestions.map((sq, sqIdx) => (
                      <div key={sqIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs sm:text-sm font-bold text-slate-900">
                            <span className="text-blue-600 font-mono mr-2">{sq.qNumber}.</span>
                            {sq.question}
                          </p>
                          <span className="text-xs font-bold text-slate-500 font-mono shrink-0">[{sq.marks} Mark{sq.marks > 1 ? 's' : ''}]</span>
                        </div>

                        {/* Revealable Official Marking Scheme */}
                        {isRevealed && (
                          <div className="pt-2 border-t border-slate-200 space-y-2 text-xs animate-in fade-in duration-150">
                            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950">
                              <strong className="block text-emerald-900 mb-0.5">Official Model Answer:</strong>
                              <p className="whitespace-pre-line leading-relaxed text-[11px]">{sq.officialAnswer}</p>
                            </div>
                            <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-200 text-purple-950 text-[10px]">
                              <strong>Examiner Step-Marking Rubric: </strong>
                              <span>{sq.stepMarkingScheme}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

      {/* Upload PYQ PDF Modal */}
      <PYQPdfUploaderModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />

      {/* View Paper PDF / Layout Modal */}
      <PYQPdfViewerModal
        paper={activeViewerPaper}
        onClose={() => setActiveViewerPaper(null)}
      />

    </div>
  );
};
