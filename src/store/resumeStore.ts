import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  Resume, 
  PersonalInfo, 
  Experience, 
  Education, 
  Skill, 
  Project, 
  Certificate, 
  Language,
  ResumeSection,
  ResumeTheme
} from '@/types/resume';

const generateId = () => Math.random().toString(36).substring(2, 9);

const defaultPersonalInfo: PersonalInfo = {
  fullName: 'Alex Johnson',
  jobTitle: 'Senior Software Engineer',
  email: 'alex.johnson@email.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  website: 'alexjohnson.dev',
  linkedin: 'linkedin.com/in/alexjohnson',
  github: 'github.com/alexjohnson',
  summary: 'Passionate software engineer with 8+ years of experience building scalable web applications. Expertise in React, TypeScript, and Node.js. Led teams of 5+ engineers and delivered products used by millions of users.',
};

const defaultExperiences: Experience[] = [
  {
    id: generateId(),
    company: 'TechCorp Inc.',
    role: 'Senior Software Engineer',
    startDate: '2021-01',
    endDate: '',
    current: true,
    description: 'Leading frontend architecture for enterprise SaaS platform serving 500K+ users.',
    achievements: [
      'Reduced page load time by 40% through performance optimization',
      'Mentored 4 junior developers and established code review practices',
      'Designed and implemented component library used across 3 products',
    ],
  },
  {
    id: generateId(),
    company: 'StartupXYZ',
    role: 'Full Stack Developer',
    startDate: '2018-06',
    endDate: '2020-12',
    current: false,
    description: 'Built core features for B2B marketplace platform from ground up.',
    achievements: [
      'Developed real-time notification system handling 1M+ daily events',
      'Implemented payment integration processing $2M+ monthly transactions',
    ],
  },
];

const defaultEducation: Education[] = [
  {
    id: generateId(),
    institution: 'Stanford University',
    degree: 'Master of Science',
    field: 'Computer Science',
    startDate: '2014-09',
    endDate: '2016-06',
    description: 'Focus on Distributed Systems and Machine Learning',
  },
];

const defaultSkills: Skill[] = [
  { id: generateId(), name: 'React', level: 5, category: 'Frontend' },
  { id: generateId(), name: 'TypeScript', level: 5, category: 'Languages' },
  { id: generateId(), name: 'Node.js', level: 4, category: 'Backend' },
  { id: generateId(), name: 'PostgreSQL', level: 4, category: 'Database' },
  { id: generateId(), name: 'AWS', level: 4, category: 'Cloud' },
  { id: generateId(), name: 'Docker', level: 3, category: 'DevOps' },
];

const defaultProjects: Project[] = [
  {
    id: generateId(),
    title: 'Open Source Component Library',
    description: 'Built a React component library with 2K+ GitHub stars, featuring accessible and customizable UI components.',
    technologies: ['React', 'TypeScript', 'Storybook', 'Jest'],
    link: 'components.dev',
    github: 'github.com/alexjohnson/components',
  },
];

const defaultSections: ResumeSection[] = [
  { id: 'personal', type: 'personal', visible: true, order: 0 },
  { id: 'experience', type: 'experience', visible: true, order: 1 },
  { id: 'education', type: 'education', visible: true, order: 2 },
  { id: 'skills', type: 'skills', visible: true, order: 3 },
  { id: 'projects', type: 'projects', visible: true, order: 4 },
  { id: 'certificates', type: 'certificates', visible: false, order: 5 },
  { id: 'languages', type: 'languages', visible: false, order: 6 },
];

const defaultTheme: ResumeTheme = {
  primaryColor: '#1e293b',
  fontFamily: 'inter',
  fontSize: 'medium',
  spacing: 'comfortable',
};

const createDefaultResume = (): Resume => ({
  id: generateId(),
  name: 'My Resume',
  template: 'modern',
  theme: defaultTheme,
  sections: defaultSections,
  personalInfo: defaultPersonalInfo,
  experiences: defaultExperiences,
  education: defaultEducation,
  skills: defaultSkills,
  projects: defaultProjects,
  certificates: [],
  languages: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

interface ResumeStore {
  resumes: Resume[];
  activeResumeId: string | null;
  activeResume: Resume | null;
  
  // Resume CRUD
  createResume: () => string;
  deleteResume: (id: string) => void;
  setActiveResume: (id: string) => void;
  duplicateResume: (id: string) => string;
  
  // Update methods
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateTheme: (theme: Partial<ResumeTheme>) => void;
  updateTemplate: (template: Resume['template']) => void;
  updateResumeName: (name: string) => void;
  
  // Section management
  toggleSection: (sectionId: string) => void;
  reorderSections: (sections: ResumeSection[]) => void;
  
  // Experience
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  
  // Education
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  
  // Skills
  addSkill: () => void;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  
  // Projects
  addProject: () => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  // Certificates
  addCertificate: () => void;
  updateCertificate: (id: string, data: Partial<Certificate>) => void;
  deleteCertificate: (id: string) => void;
  
  // Languages
  addLanguage: () => void;
  updateLanguage: (id: string, data: Partial<Language>) => void;
  deleteLanguage: (id: string) => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      resumes: [createDefaultResume()],
      activeResumeId: null,
      activeResume: null,
      
      createResume: () => {
        const newResume = createDefaultResume();
        set((state) => ({
          resumes: [...state.resumes, newResume],
          activeResumeId: newResume.id,
          activeResume: newResume,
        }));
        return newResume.id;
      },
      
      deleteResume: (id) => {
        set((state) => {
          const filtered = state.resumes.filter((r) => r.id !== id);
          const newActive = state.activeResumeId === id 
            ? (filtered[0]?.id ?? null)
            : state.activeResumeId;
          return {
            resumes: filtered,
            activeResumeId: newActive,
            activeResume: filtered.find((r) => r.id === newActive) ?? null,
          };
        });
      },
      
      setActiveResume: (id) => {
        set((state) => ({
          activeResumeId: id,
          activeResume: state.resumes.find((r) => r.id === id) ?? null,
        }));
      },
      
      duplicateResume: (id) => {
        const resume = get().resumes.find((r) => r.id === id);
        if (!resume) return '';
        
        const newResume: Resume = {
          ...JSON.parse(JSON.stringify(resume)),
          id: generateId(),
          name: `${resume.name} (Copy)`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        set((state) => ({
          resumes: [...state.resumes, newResume],
          activeResumeId: newResume.id,
          activeResume: newResume,
        }));
        
        return newResume.id;
      },
      
      updatePersonalInfo: (info) => {
        set((state) => {
          if (!state.activeResume) return state;
          const updated = {
            ...state.activeResume,
            personalInfo: { ...state.activeResume.personalInfo, ...info },
            updatedAt: new Date().toISOString(),
          };
          return {
            resumes: state.resumes.map((r) => r.id === updated.id ? updated : r),
            activeResume: updated,
          };
        });
      },
      
      updateTheme: (theme) => {
        set((state) => {
          if (!state.activeResume) return state;
          const updated = {
            ...state.activeResume,
            theme: { ...state.activeResume.theme, ...theme },
            updatedAt: new Date().toISOString(),
          };
          return {
            resumes: state.resumes.map((r) => r.id === updated.id ? updated : r),
            activeResume: updated,
          };
        });
      },
      
      updateTemplate: (template) => {
        set((state) => {
          if (!state.activeResume) return state;
          const updated = {
            ...state.activeResume,
            template,
            updatedAt: new Date().toISOString(),
          };
          return {
            resumes: state.resumes.map((r) => r.id === updated.id ? updated : r),
            activeResume: updated,
          };
        });
      },
      
      updateResumeName: (name) => {
        set((state) => {
          if (!state.activeResume) return state;
          const updated = {
            ...state.activeResume,
            name,
            updatedAt: new Date().toISOString(),
          };
          return {
            resumes: state.resumes.map((r) => r.id === updated.id ? updated : r),
            activeResume: updated,
          };
        });
      },
      
      toggleSection: (sectionId) => {
        set((state) => {
          if (!state.activeResume) return state;
          const updated = {
            ...state.activeResume,
            sections: state.activeResume.sections.map((s) =>
              s.id === sectionId ? { ...s, visible: !s.visible } : s
            ),
            updatedAt: new Date().toISOString(),
          };
          return {
            resumes: state.resumes.map((r) => r.id === updated.id ? updated : r),
            activeResume: updated,
          };
        });
      },
      
      reorderSections: (sections) => {
        set((state) => {
          if (!state.activeResume) return state;
          const updated = {
            ...state.activeResume,
            sections,
            updatedAt: new Date().toISOString(),
          };
          return {
            resumes: state.resumes.map((r) => r.id === updated.id ? updated : r),
            activeResume: updated,
          };
        });
      },
      
      // Experience methods
      addExperience: () => {
        set((state) => {
          if (!state.activeResume) return state;
          const newExp: Experience = {
            id: generateId(),
            company: 'Company Name',
            role: 'Job Title',
            startDate: '',
            endDate: '',
            current: false,
            description: '',
            achievements: [],
          };
          const updated = {
            ...state.activeResume,
            experiences: [...state.activeResume.experiences, newExp],
            updatedAt: new Date().toISOString(),
          };
          return {
            resumes: state.resumes.map((r) => r.id === updated.id ? updated : r),
            activeResume: updated,
          };
        });
      },
      
      updateExperience: (id, data) => {
        set((state) => {
          if (!state.activeResume) return state;
          const updated = {
            ...state.activeResume,
            experiences: state.activeResume.experiences.map((e) =>
              e.id === id ? { ...e, ...data } : e
            ),
            updatedAt: new Date().toISOString(),
          };
          return {
            resumes: state.resumes.map((r) => r.id === updated.id ? updated : r),
            activeResume: updated,
          };
        });
      },
      
      deleteExperience: (id) => {
        set((state) => {
          if (!state.activeResume) return state;
          const updated = {
            ...state.activeResume,
            experiences: state.activeResume.experiences.filter((e) => e.id !== id),
            updatedAt: new Date().toISOString(),
          };
          return {
            resumes: state.resumes.map((r) => r.id === updated.id ? updated : r),
            activeResume: updated,
          };
        });
      },
      
      // Education methods
      addEducation: () => {
        set((state) => {
          if (!state.activeResume) return state;
          const newEdu: Education = {
            id: generateId(),
            institution: 'University Name',
            degree: 'Degree',
            field: 'Field of Study',
            startDate: '',
            endDate: '',
            description: '',
          };
          const updated = {
            ...state.activeResume,
            education: [...state.activeResume.education, newEdu],
            updatedAt: new Date().toISOString(),
          };
          return {
            resumes: state.resumes.map((r) => r.id === updated.id ? updated : r),
            activeResume: updated,
          };
        });
      },
      
      updateEducation: (id, data) => {
        set((state) => {
          if (!state.activeResume) return state;
          const updated = {
            ...state.activeResume,
            education: state.activeResume.education.map((e) =>
              e.id === id ? { ...e, ...data } : e
            ),
            updatedAt: new Date().toISOString(),
          };
          return {
            resumes: state.resumes.map((r) => r.id === updated.id ? updated : r),
            activeResume: updated,
          };
        });
      },
      
      deleteEducation: (id) => {
        set((state) => {
          if (!state.activeResume) return state;
          const updated = {
            ...state.activeResume,
            education: state.activeResume.education.filter((e) => e.id !== id),
            updatedAt: new Date().toISOString(),
          };
          return {
            resumes: state.resumes.map((r) => r.id === updated.id ? updated : r),
            activeResume: updated,
          };
        });
      },
      
      // Skills methods
      addSkill: () => {
        set((state) => {
          if (!state.activeResume) return state;
          const newSkill: Skill = {
            id: generateId(),
            name: 'New Skill',
            level: 3,
            category: 'General',
          };
          const updated = {
            ...state.activeResume,
            skills: [...state.activeResume.skills, newSkill],
            updatedAt: new Date().toISOString(),
          };
          return {
            resumes: state.resumes.map((r) => r.id === updated.id ? updated : r),
            activeResume: updated,
          };
        });
      },
      
      updateSkill: (id, data) => {
        set((state) => {
          if (!state.activeResume) return state;
          const updated = {
            ...state.activeResume,
            skills: state.activeResume.skills.map((s) =>
              s.id === id ? { ...s, ...data } : s
            ),
            updatedAt: new Date().toISOString(),
          };
          return {
            resumes: state.resumes.map((r) => r.id === updated.id ? updated : r),
            activeResume: updated,
          };
        });
      },
      
      deleteSkill: (id) => {
        set((state) => {
          if (!state.activeResume) return state;
          const updated = {
            ...state.activeResume,
            skills: state.activeResume.skills.filter((s) => s.id !== id),
            updatedAt: new Date().toISOString(),
          };
          return {
            resumes: state.resumes.map((r) => r.id === updated.id ? updated : r),
            activeResume: updated,
          };
        });
      },
      
      // Projects methods
      addProject: () => {
        set((state) => {
          if (!state.activeResume) return state;
          const newProject: Project = {
            id: generateId(),
            title: 'Project Title',
            description: '',
            technologies: [],
            link: '',
            github: '',
          };
          const updated = {
            ...state.activeResume,
            projects: [...state.activeResume.projects, newProject],
            updatedAt: new Date().toISOString(),
          };
          return {
            resumes: state.resumes.map((r) => r.id === updated.id ? updated : r),
            activeResume: updated,
          };
        });
      },
      
      updateProject: (id, data) => {
        set((state) => {
          if (!state.activeResume) return state;
          const updated = {
            ...state.activeResume,
            projects: state.activeResume.projects.map((p) =>
              p.id === id ? { ...p, ...data } : p
            ),
            updatedAt: new Date().toISOString(),
          };
          return {
            resumes: state.resumes.map((r) => r.id === updated.id ? updated : r),
            activeResume: updated,
          };
        });
      },
      
      deleteProject: (id) => {
        set((state) => {
          if (!state.activeResume) return state;
          const updated = {
            ...state.activeResume,
            projects: state.activeResume.projects.filter((p) => p.id !== id),
            updatedAt: new Date().toISOString(),
          };
          return {
            resumes: state.resumes.map((r) => r.id === updated.id ? updated : r),
            activeResume: updated,
          };
        });
      },
      
      // Certificates methods
      addCertificate: () => {
        set((state) => {
          if (!state.activeResume) return state;
          const newCert: Certificate = {
            id: generateId(),
            name: 'Certificate Name',
            issuer: 'Issuing Organization',
            date: '',
            link: '',
          };
          const updated = {
            ...state.activeResume,
            certificates: [...state.activeResume.certificates, newCert],
            updatedAt: new Date().toISOString(),
          };
          return {
            resumes: state.resumes.map((r) => r.id === updated.id ? updated : r),
            activeResume: updated,
          };
        });
      },
      
      updateCertificate: (id, data) => {
        set((state) => {
          if (!state.activeResume) return state;
          const updated = {
            ...state.activeResume,
            certificates: state.activeResume.certificates.map((c) =>
              c.id === id ? { ...c, ...data } : c
            ),
            updatedAt: new Date().toISOString(),
          };
          return {
            resumes: state.resumes.map((r) => r.id === updated.id ? updated : r),
            activeResume: updated,
          };
        });
      },
      
      deleteCertificate: (id) => {
        set((state) => {
          if (!state.activeResume) return state;
          const updated = {
            ...state.activeResume,
            certificates: state.activeResume.certificates.filter((c) => c.id !== id),
            updatedAt: new Date().toISOString(),
          };
          return {
            resumes: state.resumes.map((r) => r.id === updated.id ? updated : r),
            activeResume: updated,
          };
        });
      },
      
      // Languages methods
      addLanguage: () => {
        set((state) => {
          if (!state.activeResume) return state;
          const newLang: Language = {
            id: generateId(),
            name: 'Language',
            proficiency: 'intermediate',
          };
          const updated = {
            ...state.activeResume,
            languages: [...state.activeResume.languages, newLang],
            updatedAt: new Date().toISOString(),
          };
          return {
            resumes: state.resumes.map((r) => r.id === updated.id ? updated : r),
            activeResume: updated,
          };
        });
      },
      
      updateLanguage: (id, data) => {
        set((state) => {
          if (!state.activeResume) return state;
          const updated = {
            ...state.activeResume,
            languages: state.activeResume.languages.map((l) =>
              l.id === id ? { ...l, ...data } : l
            ),
            updatedAt: new Date().toISOString(),
          };
          return {
            resumes: state.resumes.map((r) => r.id === updated.id ? updated : r),
            activeResume: updated,
          };
        });
      },
      
      deleteLanguage: (id) => {
        set((state) => {
          if (!state.activeResume) return state;
          const updated = {
            ...state.activeResume,
            languages: state.activeResume.languages.filter((l) => l.id !== id),
            updatedAt: new Date().toISOString(),
          };
          return {
            resumes: state.resumes.map((r) => r.id === updated.id ? updated : r),
            activeResume: updated,
          };
        });
      },
    }),
    {
      name: 'resume-storage',
      partialize: (state) => ({
        resumes: state.resumes,
        activeResumeId: state.activeResumeId,
      }),
      onRehydrateStorage: () => (state) => {
        if (state && state.activeResumeId) {
          state.activeResume = state.resumes.find(r => r.id === state.activeResumeId) ?? null;
        } else if (state && state.resumes.length > 0) {
          state.activeResumeId = state.resumes[0].id;
          state.activeResume = state.resumes[0];
        }
      },
    }
  )
);
