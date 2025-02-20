import React, { forwardRef } from 'react';
import { ResumeData, Section } from './types/resume';
import { Link, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import './resumePlain.css';

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <h3 className="resume-section-header">{title}</h3>
);

interface ResumePlainProps {
  data: ResumeData;
  className?: string;
  style?: React.CSSProperties;
  fullScreen?: boolean;
}

const SectionComponent: React.FC<{ section: Section }> = ({ section }) => (
  <div className="resume-section">
    <SectionHeader title={section.title} />
    {section.description && (
      <p className="resume-section-description">{section.description}</p>
    )}
    {section["sub-sections"].map((subSection, subIndex) => (
      <div key={subIndex} className="resume-subsection">
        <div className="resume-subsection-header">
          <div>
            <h4 className="resume-subsection-title">{subSection.title}</h4>
            <p className="resume-subsection-description">{subSection.description}</p>
          </div>
          {subSection.date && (
            <p className="resume-subsection-date">{subSection.date}</p>
          )}
        </div>
        {subSection.details && (
          <ul className="resume-details-list">
            {subSection.details.map((detail, detailIndex) => (
              <li key={detailIndex} className="resume-details-item">{detail}</li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </div>
);

export const ResumePlain = forwardRef<HTMLDivElement, ResumePlainProps>(({ data, className = '', style = {}, fullScreen = false }, ref) => {
  return (
    <div
      ref={ref}
      className={`resume-container ${fullScreen ? 'resume-fullscreen' : ''} ${className}`}
      style={style}
    >
      <div className="resume-header">
        <h1 className="resume-name">{data.name}</h1>
        <h2 className="resume-title">{data.title}</h2>
        <div className="resume-contact-info">
          <div className="resume-contact-item">
            <Mail size={14} />
            <span>{data.contact.email}</span>
          </div>
          <div className="resume-contact-item">
            <Phone size={14} />
            <span>{data.contact.phone}</span>
          </div>
          <div className="resume-contact-item">
            <MapPin size={14} />
            <span>{data.contact.location}</span>
          </div>
          {
            data.contact.website && (
              <div className="resume-contact-item resume-contact-link">
                <a href={`https://${data.contact.website}`} target="_blank" rel="noopener noreferrer">
                  <Link size={14} />
                  <span>https://{data.contact.website}</span>
                </a>
              </div>
            )
          }
          {data.contact.linkedin && (
            <div className="resume-contact-item resume-contact-link">
              <a href={`https://${data.contact.linkedin}`} target="_blank" rel="noopener noreferrer">
                <Linkedin size={14} />
                <span>https://{data.contact.linkedin}</span>
              </a>
            </div>
          )}
          {data.contact.github && (
            <div className="resume-contact-item resume-contact-link">
              <a href={`https://${data.contact.github}`} target="_blank" rel="noopener noreferrer">
                <Github size={14} />
                <span>https://{data.contact.github}</span>
              </a>
            </div>
          )}
        </div>
      </div>

      <SectionComponent section={data.summary} />

      <div className="resume-section">
        <SectionHeader title="Skills" />
        <div className="resume-skills-grid">
          {data.skills.map((skill, index) => (
            <div key={index}>
              <h4 className="resume-skill-category">{skill.category}</h4>
              <p className="resume-skill-items">{skill.items.join(", ")}</p>
            </div>
          ))}
        </div>
      </div>

      <SectionComponent section={data.experience} />
      <SectionComponent section={data.education} />

      {data.otherSections?.map((section, index) => (
        <SectionComponent key={index} section={section} />
      ))}
    </div>
  );
});