import React, { forwardRef } from 'react';
import { ResumeData } from '../types/resume';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

interface ResumeProps {
  data: ResumeData;
}

export const Resume = forwardRef<HTMLDivElement, ResumeProps>(({ data }, ref) => {
  return (
    <div ref={ref} className="mx-auto p-4 bg-white shadow rounded" style={{ maxWidth: '900px' }}>
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="display-4 fw-bold">{data.name}</h1>
        <h2 className="h3 text-secondary mb-3">{data.title}</h2>
        <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
          <div className="d-flex align-items-center gap-1">
            <Mail size={16} />
            <span>{data.contact.email}</span>
          </div>
          <div className="d-flex align-items-center gap-1">
            <Phone size={16} />
            <span>{data.contact.phone}</span>
          </div>
          <div className="d-flex align-items-center gap-1">
            <MapPin size={16} />
            <span>{data.contact.location}</span>
          </div>
          {data.contact.linkedin && (
            <a href={`https://${data.contact.linkedin}`} className="d-flex align-items-center gap-1 text-decoration-none">
              <Linkedin size={16} />
              <span>LinkedIn</span>
            </a>
          )}
          {data.contact.github && (
            <a href={`https://${data.contact.github}`} className="d-flex align-items-center gap-1 text-decoration-none">
              <Github size={16} />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="mb-4">
        <h3 className="h4 border-bottom pb-2 mb-3">Summary</h3>
        <p className="text-secondary">{data.summary}</p>
      </div>

      {/* Experience */}
      <div className="mb-4">
        <h3 className="h4 border-bottom pb-2 mb-3">Experience</h3>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h4 className="h5 fw-bold mb-1">{exp.company}</h4>
                <p className="text-secondary mb-2">{exp.position}</p>
              </div>
              <p className="text-secondary">{exp.startDate} - {exp.endDate}</p>
            </div>
            <ul className="list-unstyled ps-3">
              {exp.description.map((desc, i) => (
                <li key={i} className="mb-1">• {desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="mb-4">
        <h3 className="h4 border-bottom pb-2 mb-3">Education</h3>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-3">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h4 className="h5 fw-bold mb-1">{edu.school}</h4>
                <p className="text-secondary mb-0">{edu.degree} in {edu.field}</p>
              </div>
              <p className="text-secondary">{edu.startDate} - {edu.endDate}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div>
        <h3 className="h4 border-bottom pb-2 mb-3">Skills</h3>
        <div className="row">
          {data.skills.map((skill, index) => (
            <div key={index} className="col-md-6 mb-3">
              <h4 className="h6 fw-bold mb-2">{skill.category}</h4>
              <p className="text-secondary">{skill.items.join(", ")}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});