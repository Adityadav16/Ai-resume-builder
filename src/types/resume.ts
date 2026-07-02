export interface PersonalInfo {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    github: string;
    linkedin: string;
    summary: string;
}

export interface Experience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    bulletPoints: string[];
}

export interface Education {
    id: string;
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    score: string;
}

export interface Project {
    id: string;
    name: string;
    role: string;
    description: string;
    technologies: string[];
    url: string;
}

export interface Skill {
    id: string;
    name: string;
    category: string; // e.g. "Languages", "Frontend", "Skills"
}

export interface ResumeData {
    personalInfo: PersonalInfo;
    experiences: Experience[];
    educations: Education[];
    projects: Project[];
    skills: Skill[];
    certifications: string[];
}

export type TemplateType = 'modern-tech' | 'executive-corporate' | 'minimalist' | 'creative-glass';

export interface ResumeStyleConfig {
    template: TemplateType;
    primaryColor: string; // HSL Hue value as string like "262"
    fontSize: 'sm' | 'md' | 'lg';
    fontFamily: 'sans' | 'serif' | 'mono';
    spacing: 'compact' | 'normal' | 'loose';
}
