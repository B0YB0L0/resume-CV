import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ResumeEditor } from '@/components/resume/ResumeEditor';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { useResumeStore } from '@/store/resumeStore';
import { exportToPDF } from '@/utils/pdfExport';
import { toast } from 'sonner';
import { 
  FileText, 
  Download, 
  Share2, 
  ChevronLeft,
  Settings2,
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react';

export default function Builder() {
  const { activeResume, resumes, setActiveResume } = useResumeStore();
  const [showPreview, setShowPreview] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const handleDownloadPDF = async () => {
    if (!activeResume) return;
    
    setIsExporting(true);
    try {
      const filename = `${activeResume.personalInfo.name || 'resume'}_resume.pdf`;
      await exportToPDF('resume-preview', filename);
      toast.success('PDF yuklab olindi!');
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error('PDF yuklashda xatolik yuz berdi');
    } finally {
      setIsExporting(false);
    }
  };

  // Initialize with first resume if none active
  useEffect(() => {
    if (!activeResume && resumes.length > 0) {
      setActiveResume(resumes[0].id);
    }
  }, [activeResume, resumes, setActiveResume]);

  if (!activeResume) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-display font-bold mb-2">Loading...</h2>
          <p className="text-muted-foreground">Preparing your resume editor</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* Header */}
      <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          
          <div className="h-6 w-px bg-border" />
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display font-semibold text-sm">{activeResume.name}</h1>
              <p className="text-xs text-muted-foreground">Editing</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2 md:hidden"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button>
          
          <Button variant="ghost" size="sm" className="gap-2">
            <Settings2 className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="gap-2">
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
          
          <Button 
            variant="hero" 
            size="sm" 
            className="gap-2"
            onClick={handleDownloadPDF}
            disabled={isExporting}
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">{isExporting ? 'Yuklanmoqda...' : 'Download PDF'}</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Panel */}
        <div className={`flex-1 overflow-y-auto ${showPreview ? 'md:max-w-[50%]' : ''}`}>
          <ResumeEditor resume={activeResume} />
        </div>
        
        {/* Preview Panel */}
        <div className={`hidden md:flex flex-1 overflow-y-auto bg-muted/50 border-l border-border ${!showPreview ? 'md:hidden' : ''}`}>
          <ResumePreview resume={activeResume} />
        </div>
      </div>
    </div>
  );
}
