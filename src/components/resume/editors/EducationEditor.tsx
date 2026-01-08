import { Education } from '@/types/resume';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { useState } from 'react';

interface EducationEditorProps {
  education: Education[];
}

export function EducationEditor({ education }: EducationEditorProps) {
  const { addEducation, updateEducation, deleteEducation } = useResumeStore();
  const [expandedId, setExpandedId] = useState<string | null>(education[0]?.id ?? null);

  return (
    <div className="space-y-4">
      {education.map((edu) => (
        <div 
          key={edu.id} 
          className="border border-border rounded-lg overflow-hidden"
        >
          {/* Header - always visible */}
          <button
            onClick={() => setExpandedId(expandedId === edu.id ? null : edu.id)}
            className="w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left"
          >
            <GripVertical className="w-4 h-4 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{edu.degree || 'Degree'} in {edu.field || 'Field'}</p>
              <p className="text-sm text-muted-foreground truncate">{edu.institution || 'Institution'}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                deleteEducation(edu.id);
              }}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </button>
          
          {/* Expanded content */}
          {expandedId === edu.id && (
            <div className="p-4 pt-0 space-y-4 border-t border-border">
              <div className="space-y-2">
                <Label>Institution</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                  placeholder="University Name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                    placeholder="Bachelor of Science"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Field of Study</Label>
                  <Input
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                    placeholder="Computer Science"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Additional Details</Label>
                <Textarea
                  value={edu.description}
                  onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                  placeholder="GPA, honors, relevant coursework..."
                  rows={2}
                />
              </div>
            </div>
          )}
        </div>
      ))}
      
      <Button onClick={addEducation} variant="outline" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
}
