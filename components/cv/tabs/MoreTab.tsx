import { Profile } from '@/utils/InterfaceType';
import { Plus, Trash2 } from 'lucide-react';

export default function MoreTab({ profile, addArr, updArr, remArr }:
  {
    profile: Profile,
    addArr: (field: string, value: any) => void,
    updArr: (field: string, index: number, value: any) => void,
    remArr: (field: string, index: number) => void,
  }

) {
  const input = "w-full bg-white/15 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-white/40 outline-none transition-all placeholder:text-white/20";
  const label = "block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2";

  return (
    <div className="space-y-10">
      {/* Projects */}
      <Section title="Projects" onAdd={() => addArr('projects', { name: '', description: '', tech: '', link: '' })}>
        {profile.projects?.map((proj:any, i:number) => (
          <div key={i} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl grid grid-cols-2 gap-4 relative">
            <button onClick={() => remArr('projects', i)} className="absolute top-4 right-4 text-white/20 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
            <div className="col-span-full">
              <label className={label}>Project Name</label>
              <input className={input} value={proj.name} onChange={e => updArr('projects', i, { name: e.target.value })} placeholder="My Awesome Project" />
            </div>
            <div className="col-span-full">
              <label className={label}>Description</label>
              <textarea className={`${input} min-h-[70px] resize-none`} value={proj.description} onChange={e => updArr('projects', i, { description: e.target.value })} placeholder="What did it do?" />
            </div>
            <div>
              <label className={label}>Tech Stack</label>
              <input className={input} value={proj.tech} onChange={e => updArr('projects', i, { tech: e.target.value })} placeholder="React, Node.js..." />
            </div>
            <div>
              <label className={label}>Link</label>
              <input className={input} value={proj.link} onChange={e => updArr('projects', i, { link: e.target.value })} placeholder="github.com/..." />
            </div>
          </div>
        ))}
      </Section>

      {/* Certifications */}
      <Section title="Certifications" onAdd={() => addArr('certifications', { name: '', issuer: '', year: '' })}>
        {profile.certifications?.map((cert:any, i:number) => (
          <div key={i} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl grid grid-cols-2 gap-4 relative">
            <button onClick={() => remArr('certifications', i)} className="absolute top-4 right-4 text-white/20 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
            <div className="col-span-full">
              <label className={label}>Certificate Name</label>
              <input className={input} value={cert.name} onChange={e => updArr('certifications', i, { name: e.target.value })} placeholder="AWS Certified Developer" />
            </div>
            <div>
              <label className={label}>Issuer</label>
              <input className={input} value={cert.issuer} onChange={e => updArr('certifications', i, { issuer: e.target.value })} placeholder="Amazon" />
            </div>
            <div>
              <label className={label}>Year</label>
              <input className={input} value={cert.year} onChange={e => updArr('certifications', i, { year: e.target.value })} placeholder="2024" />
            </div>
          </div>
        ))}
      </Section>
    </div>
  );
}

function Section({ title, onAdd, children }
  : {
    title: string,
    onAdd: () => void,
    children: React.ReactNode
  }
) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{title}</span>
        <button onClick={onAdd} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white hover:bg-white/10 transition-all">
          <Plus size={12} /> Add
        </button>
      </div>
      {children}
    </div>
  );
}