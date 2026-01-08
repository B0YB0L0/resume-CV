import { Resume } from '@/types/resume';

interface ClassicTemplateProps {
  resume: Resume;
}

export function ClassicTemplate({ resume }: ClassicTemplateProps) {
  const { personalInfo, experiences, education, skills, projects, theme } = resume;
  
  const getFontFamily = () => {
    switch (theme.fontFamily) {
      case 'inter': return 'Inter, sans-serif';
      case 'georgia': return 'Georgia, serif';
      case 'roboto': return 'Roboto, sans-serif';
      case 'merriweather': return 'Merriweather, serif';
      default: return 'Georgia, serif';
    }
  };

  const getFontSize = () => {
    switch (theme.fontSize) {
      case 'small': return { base: '11px', name: '24px', title: '13px', section: '14px' };
      case 'medium': return { base: '12px', name: '28px', title: '14px', section: '15px' };
      case 'large': return { base: '13px', name: '30px', title: '15px', section: '16px' };
      default: return { base: '12px', name: '28px', title: '14px', section: '15px' };
    }
  };

  const getSpacing = () => {
    switch (theme.spacing) {
      case 'compact': return { section: '16px', item: '10px' };
      case 'comfortable': return { section: '24px', item: '14px' };
      case 'spacious': return { section: '32px', item: '18px' };
      default: return { section: '24px', item: '14px' };
    }
  };

  const fonts = getFontSize();
  const spacing = getSpacing();

  const formatDate = (date: string) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
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
        lineHeight: '1.6',
      }}
    >
      {/* Header - Centered */}
      <div style={{ textAlign: 'center', marginBottom: spacing.section }}>
        <h1 
          style={{ 
            fontSize: fonts.name, 
            fontWeight: 700, 
            color: '#111827',
            marginBottom: '4px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}
        >
          {personalInfo.fullName}
        </h1>
        <p 
          style={{ 
            fontSize: fonts.title, 
            color: '#4b5563',
            marginBottom: '12px',
            fontStyle: 'italic',
          }}
        >
          {personalInfo.jobTitle}
        </p>
        
        {/* Contact info - centered */}
        <div style={{ fontSize: '11px', color: '#6b7280' }}>
          {[
            personalInfo.email,
            personalInfo.phone,
            personalInfo.location,
            personalInfo.website,
          ].filter(Boolean).join(' • ')}
        </div>
      </div>

      {/* Horizontal line */}
      <div style={{ height: '2px', background: '#111827', marginBottom: spacing.section }} />

      {/* Summary */}
      {personalInfo.summary && (
        <div style={{ marginBottom: spacing.section }}>
          <h2 
            style={{ 
              fontSize: fonts.section, 
              fontWeight: 700, 
              color: '#111827',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Professional Summary
          </h2>
          <p style={{ color: '#4b5563', textAlign: 'justify' }}>{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div style={{ marginBottom: spacing.section }}>
          <h2 
            style={{ 
              fontSize: fonts.section, 
              fontWeight: 700, 
              color: '#111827',
              marginBottom: spacing.item,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderBottom: '1px solid #d1d5db',
              paddingBottom: '4px',
            }}
          >
            Professional Experience
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.item }}>
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <h3 style={{ fontWeight: 700, color: '#111827' }}>{exp.role}</h3>
                  <p style={{ color: '#6b7280', fontSize: '11px', fontStyle: 'italic' }}>
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </p>
                </div>
                <p style={{ color: '#4b5563', fontStyle: 'italic', marginBottom: '4px' }}>{exp.company}</p>
                
                {exp.description && (
                  <p style={{ color: '#4b5563', marginBottom: '4px' }}>{exp.description}</p>
                )}
                
                {exp.achievements.length > 0 && (
                  <ul style={{ paddingLeft: '20px', color: '#4b5563', margin: 0 }}>
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
              fontWeight: 700, 
              color: '#111827',
              marginBottom: spacing.item,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderBottom: '1px solid #d1d5db',
              paddingBottom: '4px',
            }}
          >
            Education
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.item }}>
            {education.map((edu) => (
              <div key={edu.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontWeight: 700, color: '#111827' }}>
                      {edu.degree} in {edu.field}
                    </h3>
                    <p style={{ color: '#4b5563', fontStyle: 'italic' }}>{edu.institution}</p>
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '11px', fontStyle: 'italic' }}>
                    {formatDate(edu.endDate)}
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
              fontWeight: 700, 
              color: '#111827',
              marginBottom: spacing.item,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderBottom: '1px solid #d1d5db',
              paddingBottom: '4px',
            }}
          >
            Skills
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <p key={category} style={{ color: '#4b5563' }}>
                <strong>{category}:</strong> {categorySkills.map(s => s.name).join(', ')}
              </p>
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
              fontWeight: 700, 
              color: '#111827',
              marginBottom: spacing.item,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderBottom: '1px solid #d1d5db',
              paddingBottom: '4px',
            }}
          >
            Notable Projects
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.item }}>
            {projects.map((project) => (
              <div key={project.id}>
                <h3 style={{ fontWeight: 700, color: '#111827' }}>{project.title}</h3>
                {project.description && (
                  <p style={{ color: '#4b5563', marginTop: '2px' }}>{project.description}</p>
                )}
                {project.technologies.length > 0 && (
                  <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '4px', fontStyle: 'italic' }}>
                    Technologies: {project.technologies.join(', ')}
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
