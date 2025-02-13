import { ResumeData } from '../types/resume';

export const resumeData: ResumeData = {
  name: "John Doe",
  title: "Senior Software Engineer",
  contact: {
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe"
  },
  summary: "Experienced software engineer with over 8 years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading high-performing teams.",
  education: [
    {
      school: "University of California, Berkeley",
      degree: "Master of Science",
      field: "Computer Science",
      startDate: "2014",
      endDate: "2016"
    },
    {
      school: "Stanford University",
      degree: "Bachelor of Science",
      field: "Computer Engineering",
      startDate: "2010",
      endDate: "2014"
    }
  ],
  experience: [
    {
      company: "Tech Solutions Inc.",
      position: "Senior Software Engineer",
      startDate: "2020",
      endDate: "Present",
      description: [
        "Led development of microservices architecture serving 1M+ users",
        "Mentored junior developers and conducted code reviews",
        "Implemented CI/CD pipelines reducing deployment time by 60%"
      ]
    },
    {
      company: "Innovation Labs",
      position: "Software Engineer",
      startDate: "2016",
      endDate: "2020",
      description: [
        "Developed and maintained React-based web applications",
        "Optimized database queries improving performance by 40%",
        "Collaborated with UX team to implement responsive designs"
      ]
    }
  ],
  skills: [
    {
      category: "Programming Languages",
      items: ["JavaScript", "TypeScript", "Python", "Java", "SQL"]
    },
    {
      category: "Frameworks & Libraries",
      items: ["React", "Node.js", "Express", "Next.js", "Django"]
    },
    {
      category: "Tools & Technologies",
      items: ["Git", "Docker", "AWS", "MongoDB", "PostgreSQL"]
    }
  ]
};