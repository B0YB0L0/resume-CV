import { Resume } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface ModernTemplateProps {
  resume: Resume;
}

export function ModernTemplate({ resume }: ModernTemplateProps) {
  const { personalInfo, experiences, education, skills, projects, theme } = resume;
  
  const getFontFamily = () => {
    switch (theme.fontFamily) {
      case 'inter': return 'Inter, sans-serif';
      case 'georgia': return 'Georgia, serif';
      case 'roboto': return 'Roboto, sans-serif';
      case 'merriweather': return 'Merriweather, serif';
      default: return 'Inter, sans-serif';
    }
  };

  const getFontSize = () => {
    switch (theme.fontSize) {
      case 'small': return { base: '11px', name: '22px', title: '13px', section: '12px' };
      case 'medium': return { base: '12px', name: '26px', title: '14px', section: '13px' };
      case 'large': return { base: '13px', name: '28px', title: '15px', section: '14px' };
      default: return { base: '12px', name: '26px', title: '14px', section: '13px' };
    }
  };

  const getSpacing = () => {
    switch (theme.spacing) {
      case 'compact': return { section: '12px', item: '8px' };
      case 'comfortable': return { section: '20px', item: '12px' };
      case 'spacious': return { section: '28px', item: '16px' };
      default: return { section: '20px', item: '12px' };
    }
  };

  const fonts = getFontSize();
  const spacing = getSpacing();
  const accentColor = theme.primaryColor;

  const formatDate = (date: string) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div 
      style={{ 
        fontFamily: getFontFamily(), 
        fontSize: fonts.base,
        color: '#1f2937',
        lineHeight: '1.5',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: spacing.section }}>
        <h1 
          style={{ 
            fontSize: fonts.name, 
            fontWeight: 700, 
            color: accentColor,
            marginBottom: '4px',
          }}
        >
          {personalInfo.fullName}
        </h1>
        <p 
          style={{ 
            fontSize: fonts.title, 
            color: '#6b7280',
            marginBottom: '8px',
          }}
        >
          {personalInfo.jobTitle}
        </p>
        
        {/* Contact info */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '11px', color: '#6b7280' }}>
          {personalInfo.email && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Mail size={12} />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Phone size={12} />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={12} />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Globe size={12} />
              {personalInfo.website}
            </span>
          )}
          {personalInfo.linkedin && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Linkedin size={12} />
              {personalInfo.linkedin.replace('linkedin.com/in/', '')}
            </span>
          )}
          {personalInfo.github && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Github size={12} />
              {personalInfo.github.replace('github.com/', '')}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div style={{ marginBottom: spacing.section }}>
          <p style={{ color: '#4b5563' }}>{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div style={{ marginBottom: spacing.section }}>
          <h2 
            style={{ 
              fontSize: fonts.section, 
              fontWeight: 600, 
              color: accentColor,
              borderBottom: `2px solid ${accentColor}`,
              paddingBottom: '4px',
              marginBottom: spacing.item,
            }}
          >
            Experience
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.item }}>
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontWeight: 600, color: '#1f2937' }}>{exp.role}</h3>
                    <p style={{ color: '#6b7280' }}>{exp.company}</p>
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '11px', whiteSpace: 'nowrap' }}>
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </p>
                </div>
                
                {exp.description && (
                  <p style={{ color: '#4b5563', marginTop: '4px' }}>{exp.description}</p>
                )}
                
                {exp.achievements.length > 0 && (
                  <ul style={{ marginTop: '4px', paddingLeft: '16px', color: '#4b5563' }}>
                    {exp.achievements.filter(a => a).map((achievement, idx) => (
                      <li key={idx} style={{ marginBottom: '2px' }}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginBottom: spacing.section }}>
          <h2 
            style={{ 
              fontSize: fonts.section, 
              fontWeight: 600, 
              color: accentColor,
              borderBottom: `2px solid ${accentColor}`,
              paddingBottom: '4px',
              marginBottom: spacing.item,
            }}
          >
            Education
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.item }}>
            {education.map((edu) => (
              <div key={edu.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontWeight: 600, color: '#1f2937' }}>
                      {edu.degree} in {edu.field}
                    </h3>
                    <p style={{ color: '#6b7280' }}>{edu.institution}</p>
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '11px', whiteSpace: 'nowrap' }}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                </div>
                {edu.description && (
                  <p style={{ color: '#4b5563', marginTop: '4px' }}>{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ marginBottom: spacing.section }}>
          <h2 
            style={{ 
              fontSize: fonts.section, 
              fontWeight: 600, 
              color: accentColor,
              borderBottom: `2px solid ${accentColor}`,
              paddingBottom: '4px',
              marginBottom: spacing.item,
            }}
          >
            Skills
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category}>
                <span style={{ fontWeight: 600, color: '#374151' }}>{category}: </span>
                <span style={{ color: '#4b5563' }}>
                  {categorySkills.map(s => s.name).join(', ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <h2 
            style={{ 
              fontSize: fonts.section, 
              fontWeight: 600, 
              color: accentColor,
              borderBottom: `2px solid ${accentColor}`,
              paddingBottom: '4px',
              marginBottom: spacing.item,
            }}
          >
            Projects
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.item }}>
            {projects.map((project) => (
              <div key={project.id}>
                <h3 style={{ fontWeight: 600, color: '#1f2937' }}>{project.title}</h3>
                {project.description && (
                  <p style={{ color: '#4b5563', marginTop: '2px' }}>{project.description}</p>
                )}
                {project.technologies.length > 0 && (
                  <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '4px' }}>
                    <span style={{ fontWeight: 500 }}>Tech: </span>
                    {project.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
