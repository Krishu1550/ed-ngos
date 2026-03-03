
export default function CVPreview({ profile, template }: { profile: any, template: string }

) {
  const isModern = template === 'modern';
  const isBold = template === 'bold';
  const isClassic = template === 'classic';

  const accentColor = isBold ? '#fff' : isModern ? '#6366f1' : isClassic ? '#1e3a5f' : '#374151';
  const headerBg = isBold ? '#000' : isModern ? '#0f172a' : isClassic ? '#1e3a5f' : '#f9fafb';
  const headerText = (isBold || isModern) ? '#ffffff' : isClassic ? '#ffffff' : '#111827';

  return (
    <div className="bg-white text-black min-h-[800px] font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div className="p-8" style={{ background: headerBg }}>
        <h1 className="text-3xl font-black tracking-tight uppercase" style={{ color: headerText }}>
          {profile.full_name || 'Your Full Name'}
        </h1>
        <p className="text-sm font-medium mt-1" style={{ color: accentColor }}>
          {profile.headline || 'Professional Headline'}
        </p>
        <div className="flex flex-wrap gap-4 mt-3 text-xs" style={{ color: isBold || isModern ? '#94a3b8' : '#6b7280' }}>
          {profile.email && <span>✉ {profile.email}</span>}
          {profile.phone && <span>☎ {profile.phone}</span>}
          {profile.location && <span>📍 {profile.location}</span>}
          {profile.linkedin_url && <span>LinkedIn</span>}
          {profile.github_url && <span>GitHub</span>}
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Summary */}
        {profile.summary && (
          <Section title="Summary" accent={accentColor}>
            <p className="text-sm text-gray-600 leading-relaxed">{profile.summary}</p>
          </Section>
        )}

        {/* Education */}
        {(profile.college || (profile.education && profile.education.length > 0)) && (
          <Section title="Education" accent={accentColor}>
            {profile.college && (
              <div className="text-sm">
                <p className="font-semibold text-gray-800">{profile.college}</p>
                {profile.department && <p className="text-gray-500">{profile.department}</p>}
                {profile.year_of_study && <p className="text-gray-400 text-xs">{profile.year_of_study}</p>}
              </div>
            )}
            {profile.education?.map((edu: any, i: number) => (
              <div key={i} className="text-sm mt-2">
                <p className="font-semibold text-gray-800">{edu.institution}</p>
                <p className="text-gray-500">{edu.degree} {edu.field && `— ${edu.field}`}</p>
                <p className="text-gray-400 text-xs">{edu.start_year} – {edu.end_year || 'Present'}</p>
              </div>
            ))}
          </Section>
        )}

        {/* Experience */}
        {profile.experience?.length > 0 && (
          <Section title="Experience" accent={accentColor}>
            {profile.experience.map((exp: any, i: number) => (
              <div key={i} className="text-sm mb-3">
                <div className="flex justify-between">
                  <p className="font-semibold text-gray-800">{exp.role}</p>
                  <p className="text-gray-400 text-xs">{exp.start} – {exp.end || 'Present'}</p>
                </div>
                <p className="text-gray-500">{exp.company}</p>
                {exp.description && <p className="text-gray-600 text-xs mt-1">{exp.description}</p>}
              </div>
            ))}
          </Section>
        )}

        {/* Projects */}
        {profile.projects?.length > 0 && (
          <Section title="Projects" accent={accentColor}>
            {profile.projects.map((proj: any, i: number) => (
              <div key={i} className="text-sm mb-3">
                <p className="font-semibold text-gray-800">{proj.name}</p>
                {proj.description && <p className="text-gray-600 text-xs mt-1">{proj.description}</p>}
                {proj.tech && <p className="text-gray-400 text-xs mt-1">Tech: {proj.tech}</p>}
              </div>
            ))}
          </Section>
        )}

        {/* Skills */}
        {profile.skills?.length > 0 && (
          <Section title="Skills" accent={accentColor}>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((s: string, i: number) => (
                <span key={i} className="px-2 py-1 text-xs rounded font-medium" style={{ background: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}30` }}>
                  {s}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Certifications */}
        {profile.certifications?.length > 0 && (
          <Section title="Certifications" accent={accentColor}>
            {profile.certifications.map((cert: any, i: number) => (
              <div key={i} className="text-sm">
                <p className="font-semibold text-gray-800">{cert.name}</p>
                {cert.issuer && <p className="text-gray-500 text-xs">{cert.issuer} {cert.year && `· ${cert.year}`}</p>}
              </div>
            ))}
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ title, accent, children }
  : {
    title: string,
    accent: string,
    children: React.ReactNode
   }
) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <h2 className="text-xs font-black uppercase tracking-widest" style={{ color: accent }}>{title}</h2>
        <div className="flex-1 h-px" style={{ background: `${accent}30` }} />
      </div>
      {children}
    </div>
  );
}   