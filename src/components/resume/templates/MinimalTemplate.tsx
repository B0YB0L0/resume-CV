import { Resume } from '@/types/resume';

interface MinimalTemplateProps {
  resume: Resume;
}

export function MinimalTemplate({ resume }: MinimalTemplateProps) {
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
      case 'small': return { base: '11px', name: '20px', section: '11px' };
      case 'medium': return { base: '12px', name: '24px', section: '12px' };
      case 'large': return { base: '13px', name: '26px', section: '13px' };
      default: return { base: '12px', name: '24px', section: '12px' };
    }
  };

  const getSpacing = () => {
    switch (theme.spacing) {
      case 'compact': return { section: '14px', item: '8px' };
      case 'comfortable': return { section: '20px', item: '10px' };
      case 'spacious': return { section: '26px', item: '14px' };
      default: return { section: '20px', item: '10px' };
    }
  };

  const fonts = getFontSize();
  const spacing = getSpacing();
  const accentColor = theme.primaryColor;

  const formatDate = (date: string) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric' });
  };

  return (
    <div 
      style={{ 
        fontFamily: getFontFamily(), 
        fontSize: fonts.base,
        color: '#374151',
        lineHeight: '1.5',
      }}
    >
      {/* Header - Minimal */}
      <div style={{ marginBottom: spacing.section }}>
        <h1 
          style={{ 
            fontSize: fonts.name, 
            fontWeight: 600, 
            color: '#111827',
            marginBottom: '2px',
          }}
        >
          {personalInfo.fullName}
        </h1>
        <p style={{ fontSize: '11px', color: '#6b7280' }}>
          {[
            personalInfo.jobTitle,
            personalInfo.location,
            personalInfo.email,
            personalInfo.phone,
          ].filter(Boolean).join(' · ')}
        </p>
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
              marginBottom: spacing.item,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
            }}
          >
            Experience
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.item }}>
            {experiences.map((exp) => (
              <div key={exp.id} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '16px' }}>
                <p style={{ fontSize: '11px', color: '#9ca3af' }}>
                  {formatDate(exp.startDate)}–{exp.current ? 'Now' : formatDate(exp.endDate)}
                </p>
                <div>
                  <p style={{ fontWeight: 500, color: '#111827' }}>
                    {exp.role}, <span style={{ fontWeight: 400 }}>{exp.company}</span>
                  </p>
                  {exp.achievements.length > 0 && (
                    <ul style={{ paddingLeft: '16px', margin: '4px 0 0', color: '#4b5563' }}>
                      {exp.achievements.filter(a => a).slice(0, 2).map((a, idx) => (
                        <li key={idx}>{a}</li>
                      ))}
                    </ul>
                  )}
                </div>
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
              marginBottom: spacing.item,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
            }}
          >
            Education
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.item }}>
            {education.map((edu) => (
              <div key={edu.id} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '16px' }}>
                <p style={{ fontSize: '11px', color: '#9ca3af' }}>
                  {formatDate(edu.endDate)}
                </p>
                <p style={{ color: '#111827' }}>
                  <span style={{ fontWeight: 500 }}>{edu.degree}</span> in {edu.field}, {edu.institution}
                </p>
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
              marginBottom: spacing.item,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
            }}
          >
            Skills
          </h2>
          
          <p style={{ color: '#4b5563' }}>
            {skills.map(s => s.name).join(' · ')}
          </p>
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
              marginBottom: spacing.item,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
            }}
          >
            Projects
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.item }}>
            {projects.map((project) => (
              <div key={project.id}>
                <p style={{ fontWeight: 500, color: '#111827' }}>{project.title}</p>
                {project.description && (
                  <p style={{ color: '#4b5563', fontSize: '11px' }}>{project.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
