import { Project } from '@/types/resume';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, GripVertical, X } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface ProjectsEditorProps {
  projects: Project[];
}

export function ProjectsEditor({ projects }: ProjectsEditorProps) {
  const { addProject, updateProject, deleteProject } = useResumeStore();
  const [expandedId, setExpandedId] = useState<string | null>(projects[0]?.id ?? null);
  const [newTech, setNewTech] = useState<{ [key: string]: string }>({});

  const handleAddTech = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project || !newTech[projectId]?.trim()) return;
    
    updateProject(projectId, { 
      technologies: [...project.technologies, newTech[projectId].trim()] 
    });
    setNewTech({ ...newTech, [projectId]: '' });
  };

  const handleRemoveTech = (projectId: string, index: number) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    updateProject(projectId, { 
      technologies: project.technologies.filter((_, i) => i !== index) 
    });
  };

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div 
          key={project.id} 
          className="border border-border rounded-lg overflow-hidden"
        >
          {/* Header - always visible */}
          <button
            onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
            className="w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left"
          >
            <GripVertical className="w-4 h-4 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{project.title || 'Project Title'}</p>
              <p className="text-sm text-muted-foreground truncate">
                {project.technologies.slice(0, 3).join(', ') || 'No technologies added'}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                deleteProject(project.id);
              }}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </button>
          
          {/* Expanded content */}
          {expandedId === project.id && (
            <div className="p-4 pt-0 space-y-4 border-t border-border">
              <div className="space-y-2">
                <Label>Project Title</Label>
                <Input
                  value={project.title}
                  onChange={(e) => updateProject(project.id, { title: e.target.value })}
                  placeholder="Project Name"
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, { description: e.target.value })}
                  placeholder="Describe what this project does and your role in it..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Technologies</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="gap-1 group">
                      {tech}
                      <button
                        onClick={() => handleRemoveTech(project.id, index)}
                        className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTech[project.id] || ''}
                    onChange={(e) => setNewTech({ ...newTech, [project.id]: e.target.value })}
                    placeholder="Add technology..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTech(project.id);
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={() => handleAddTech(project.id)}
                  >
                    Add
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Live Link</Label>
                  <Input
                    value={project.link}
                    onChange={(e) => updateProject(project.id, { link: e.target.value })}
                    placeholder="https://project.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>GitHub</Label>
                  <Input
                    value={project.github}
                    onChange={(e) => updateProject(project.id, { github: e.target.value })}
                    placeholder="github.com/user/project"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      
      <Button onClick={addProject} variant="outline" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
}
