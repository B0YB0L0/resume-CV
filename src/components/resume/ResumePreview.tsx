import { Resume } from '@/types/resume';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';

interface ResumePreviewProps {
  resume: Resume;
}

export function ResumePreview({ resume }: ResumePreviewProps) {
  const renderTemplate = () => {
    switch (resume.template) {
      case 'modern':
        return <ModernTemplate resume={resume} />;
      case 'classic':
        return <ClassicTemplate resume={resume} />;
      case 'minimal':
        return <MinimalTemplate resume={resume} />;
      default:
        return <ModernTemplate resume={resume} />;
    }
  };

  return (
    <div className="flex-1 p-8 flex justify-center">
      <div className="w-full max-w-[650px]">
        <div 
          className="resume-paper rounded-lg p-8 bg-white"
          style={{
            aspectRatio: '8.5 / 11',
            minHeight: '800px',
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}
