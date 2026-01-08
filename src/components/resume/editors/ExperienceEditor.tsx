import { Experience } from '@/types/resume';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { useState } from 'react';

interface ExperienceEditorProps {
  experiences: Experience[];
}

export function ExperienceEditor({ experiences }: ExperienceEditorProps) {
  const { addExperience, updateExperience, deleteExperience } = useResumeStore();
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id ?? null);

  const handleAchievementChange = (expId: string, index: number, value: string) => {
    const exp = experiences.find(e => e.id === expId);
    if (!exp) return;
    
    const newAchievements = [...exp.achievements];
    newAchievements[index] = value;
    updateExperience(expId, { achievements: newAchievements });
  };

  const addAchievement = (expId: string) => {
    const exp = experiences.find(e => e.id === expId);
    if (!exp) return;
    
    updateExperience(expId, { achievements: [...exp.achievements, ''] });
  };

  const removeAchievement = (expId: string, index: number) => {
    const exp = experiences.find(e => e.id === expId);
    if (!exp) return;
    
    const newAchievements = exp.achievements.filter((_, i) => i !== index);
    updateExperience(expId, { achievements: newAchievements });
  };

  return (
    <div className="space-y-4">
      {experiences.map((exp) => (
        <div 
          key={exp.id} 
          className="border border-border rounded-lg overflow-hidden"
        >
          {/* Header - always visible */}
          <button
            onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
            className="w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left"
          >
            <GripVertical className="w-4 h-4 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{exp.role || 'Job Title'}</p>
              <p className="text-sm text-muted-foreground truncate">{exp.company || 'Company'}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                deleteExperience(exp.id);
              }}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </button>
          
          {/* Expanded content */}
          {expandedId === exp.id && (
            <div className="p-4 pt-0 space-y-4 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                    placeholder="Company Name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Job Title</Label>
                  <Input
                    value={exp.role}
                    onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                    placeholder="Software Engineer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                    disabled={exp.current}
                  />
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onCheckedChange={(checked) => 
                        updateExperience(exp.id, { current: checked as boolean, endDate: '' })
                      }
                    />
                    <Label htmlFor={`current-${exp.id}`} className="text-sm">
                      I currently work here
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                  placeholder="Brief description of your role..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Key Achievements</Label>
                <div className="space-y-2">
                  {exp.achievements.map((achievement, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={achievement}
                        onChange={(e) => handleAchievementChange(exp.id, index, e.target.value)}
                        placeholder="Describe an achievement..."
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAchievement(exp.id, index)}
                        className="shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addAchievement(exp.id)}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Achievement
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      
      <Button onClick={addExperience} variant="outline" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Experience
      </Button>
    </div>
  );
}
