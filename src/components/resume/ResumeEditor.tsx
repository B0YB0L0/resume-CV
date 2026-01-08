import { Resume } from '@/types/resume';
import { PersonalInfoEditor } from './editors/PersonalInfoEditor';
import { ExperienceEditor } from './editors/ExperienceEditor';
import { EducationEditor } from './editors/EducationEditor';
import { SkillsEditor } from './editors/SkillsEditor';
import { ProjectsEditor } from './editors/ProjectsEditor';
import { TemplateSelector } from './TemplateSelector';
import { ThemeEditor } from './ThemeEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  FolderOpen,
  Palette
} from 'lucide-react';

interface ResumeEditorProps {
  resume: Resume;
}

export function ResumeEditor({ resume }: ResumeEditorProps) {
  return (
    <div className="p-6">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="w-full mb-6 bg-card border border-border p-1">
          <TabsTrigger value="content" className="flex-1">Content</TabsTrigger>
          <TabsTrigger value="design" className="flex-1">Design</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-6">
          {/* Personal Info */}
          <EditorSection 
            icon={User} 
            title="Personal Information"
            description="Basic details and contact information"
          >
            <PersonalInfoEditor personalInfo={resume.personalInfo} />
          </EditorSection>
          
          {/* Experience */}
          <EditorSection 
            icon={Briefcase} 
            title="Work Experience"
            description="Your professional history"
          >
            <ExperienceEditor experiences={resume.experiences} />
          </EditorSection>
          
          {/* Education */}
          <EditorSection 
            icon={GraduationCap} 
            title="Education"
            description="Academic background"
          >
            <EducationEditor education={resume.education} />
          </EditorSection>
          
          {/* Skills */}
          <EditorSection 
            icon={Wrench} 
            title="Skills"
            description="Technical and soft skills"
          >
            <SkillsEditor skills={resume.skills} />
          </EditorSection>
          
          {/* Projects */}
          <EditorSection 
            icon={FolderOpen} 
            title="Projects"
            description="Notable work and side projects"
          >
            <ProjectsEditor projects={resume.projects} />
          </EditorSection>
        </TabsContent>
        
        <TabsContent value="design" className="space-y-6">
          {/* Template Selection */}
          <EditorSection 
            icon={Palette} 
            title="Template"
            description="Choose your resume layout"
          >
            <TemplateSelector 
              selectedTemplate={resume.template} 
            />
          </EditorSection>
          
          {/* Theme Customization */}
          <EditorSection 
            icon={Palette} 
            title="Theme"
            description="Customize colors and fonts"
          >
            <ThemeEditor theme={resume.theme} />
          </EditorSection>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface EditorSectionProps {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}

function EditorSection({ icon: Icon, title, description, children }: EditorSectionProps) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-display font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}
