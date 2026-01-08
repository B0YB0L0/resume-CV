import { Skill } from '@/types/resume';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Plus, Trash2, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SkillsEditorProps {
  skills: Skill[];
}

export function SkillsEditor({ skills }: SkillsEditorProps) {
  const { addSkill, updateSkill, deleteSkill } = useResumeStore();

  // Group skills by category
  const categories = [...new Set(skills.map(s => s.category))];

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 1: return 'Beginner';
      case 2: return 'Basic';
      case 3: return 'Intermediate';
      case 4: return 'Advanced';
      case 5: return 'Expert';
      default: return 'Intermediate';
    }
  };

  return (
    <div className="space-y-6">
      {/* Skills by category */}
      {categories.map((category) => (
        <div key={category} className="space-y-3">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-sm text-muted-foreground">{category}</h4>
            <div className="h-px flex-1 bg-border" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {skills
              .filter(s => s.category === category)
              .map((skill) => (
                <Badge 
                  key={skill.id} 
                  variant="secondary"
                  className="gap-1.5 py-1.5 px-3 group"
                >
                  <span>{skill.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({getLevelLabel(skill.level)})
                  </span>
                  <button
                    onClick={() => deleteSkill(skill.id)}
                    className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
          </div>
        </div>
      ))}

      {/* Add/Edit skill form */}
      <div className="border border-dashed border-border rounded-lg p-4 space-y-4">
        <p className="text-sm font-medium">Quick Add Skill</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Skill Name</Label>
            <Input
              id="new-skill-name"
              placeholder="e.g., React"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Category</Label>
            <Input
              id="new-skill-category"
              placeholder="e.g., Frontend"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Proficiency</Label>
            <div className="pt-2">
              <Slider
                id="new-skill-level"
                defaultValue={[3]}
                min={1}
                max={5}
                step={1}
              />
            </div>
          </div>
        </div>
        
        <Button 
          onClick={() => {
            const nameInput = document.getElementById('new-skill-name') as HTMLInputElement;
            const categoryInput = document.getElementById('new-skill-category') as HTMLInputElement;
            const name = nameInput?.value;
            const category = categoryInput?.value || 'General';
            
            if (name) {
              addSkill();
              // Get the newly added skill and update it
              const store = useResumeStore.getState();
              const lastSkill = store.activeResume?.skills[store.activeResume.skills.length - 1];
              if (lastSkill) {
                updateSkill(lastSkill.id, { name, category });
              }
              nameInput.value = '';
              categoryInput.value = '';
            }
          }} 
          variant="outline" 
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {/* Individual skill editing */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">All Skills</p>
        {skills.map((skill) => (
          <div key={skill.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
            <Input
              value={skill.name}
              onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
              className="flex-1"
            />
            <Input
              value={skill.category}
              onChange={(e) => updateSkill(skill.id, { category: e.target.value })}
              className="w-32"
            />
            <div className="w-24">
              <Slider
                value={[skill.level]}
                onValueChange={(value) => updateSkill(skill.id, { level: value[0] })}
                min={1}
                max={5}
                step={1}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteSkill(skill.id)}
              className="shrink-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
