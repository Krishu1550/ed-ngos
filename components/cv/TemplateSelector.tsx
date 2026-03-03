const TEMPLATES = [
  { id: 'modern', name: 'Modern', thumb: '🎨', bg: '#0f172a' },
  { id: 'minimal', name: 'Minimal', thumb: '🧊', bg: '#f8fafc' },
  { id: 'bold', name: 'Bold', thumb: '⚡', bg: '#000000' },
  { id: 'classic', name: 'Classic', thumb: '📄', bg: '#1e3a5f' },
];

export default function TemplateSelector({ selected, onChange }
  :  {
    selected: string,
    onChange: (templateId: string) => void,
  }
) {
  return (
    <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
      <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">Template</h3>
      <div className="grid grid-cols-2 gap-3">
        {TEMPLATES.map(t => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`p-3 rounded-2xl border transition-all duration-200 ${selected === t.id ? 'border-white bg-white/5' : 'border-white/5 bg-white/[0.02] hover:border-white/20'}`}
          >
            <div className="h-12 rounded-lg mb-2 flex items-center justify-center text-xl" style={{ background: t.bg }}>
              {t.thumb}
            </div>
            <div className="text-[10px] font-bold text-center text-white/70">{t.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}