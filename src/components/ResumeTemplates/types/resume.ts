export interface Skill {
  category: string;
  items: string[];
}

export interface SubSection {
  title: string;
  description: string;
  date?: string;
  details?: string[];
}

export interface Section {
  title: string;
  description: string;
  "sub-sections": SubSection[];
}

export interface ResumeData {
  name: string;
  title: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
  };
  skills: Skill[];
  summary: Section;
  experience: Section;
  education: Section;
  otherSections?: Section[];
}

export interface ResumeOptions {
  titles: string[];
  summaries: string[];
  experiences: SubSection[];
  skills: Skill[];
}