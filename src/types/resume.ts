export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  github: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'native' | 'fluent' | 'advanced' | 'intermediate' | 'basic';
}

export interface ResumeSection {
  id: string;
  type: 'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'certificates' | 'languages';
  visible: boolean;
  order: number;
}

export interface ResumeTheme {
  primaryColor: string;
  fontFamily: 'inter' | 'georgia' | 'roboto' | 'merriweather';
  fontSize: 'small' | 'medium' | 'large';
  spacing: 'compact' | 'comfortable' | 'spacious';
}

export interface Resume {
  id: string;
  name: string;
  template: 'modern' | 'classic' | 'minimal';
  theme: ResumeTheme;
  sections: ResumeSection[];
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certificates: Certificate[];
  languages: Language[];
  createdAt: string;
  updatedAt: string;
}

export type SectionType = ResumeSection['type'];
