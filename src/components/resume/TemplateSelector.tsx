import { Resume } from '@/types/resume';
import { useResumeStore } from '@/store/resumeStore';
import { cn } from '@/lib/utils';

interface TemplateSelectorProps {
  selectedTemplate: Resume['template'];
}

const templates = [
  {
    id: 'modern' as const,
    name: 'Modern',
    description: 'Clean and contemporary design perfect for tech roles',
  },
  {
    id: 'classic' as const,
    name: 'Classic',
    description: 'Traditional layout ideal for corporate positions',
  },
  {
    id: 'minimal' as const,
    name: 'Minimal',
    description: 'Sleek and simple for a sophisticated look',
  },
];

export function TemplateSelector({ selectedTemplate }: TemplateSelectorProps) {
  const updateTemplate = useResumeStore((state) => state.updateTemplate);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => updateTemplate(template.id)}
          className={cn(
            "p-4 rounded-xl border-2 transition-all text-left",
            selectedTemplate === template.id
              ? "border-accent bg-accent/5"
              : "border-border hover:border-accent/50"
          )}
        >
          {/* Template preview */}
          <div className="aspect-[3/4] bg-muted rounded-lg mb-3 p-2">
            <div className="h-full bg-white rounded shadow-sm p-2 space-y-2">
              <div className="space-y-0.5">
                <div className="h-2 w-12 bg-primary/70 rounded" />
                <div className="h-1 w-8 bg-accent/50 rounded" />
              </div>
              <div className="h-px bg-border" />
              <div className="space-y-0.5">
                <div className="h-1 w-full bg-muted rounded" />
                <div className="h-1 w-4/5 bg-muted rounded" />
                <div className="h-1 w-3/4 bg-muted rounded" />
              </div>
            </div>
          </div>
          
          <h4 className="font-display font-semibold text-sm">{template.name}</h4>
          <p className="text-xs text-muted-foreground">{template.description}</p>
        </button>
      ))}
    </div>
  );
}
