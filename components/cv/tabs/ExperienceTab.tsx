import { Profile } from '@/utils/InterfaceType';
import { Plus, Trash2 } from 'lucide-react';

export default function ExperienceTab({ profile, addArr, updArr, remArr }:
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Work Experience</span>
        <button
          onClick={() => addArr('experience', { role: '', company: '', start: '', end: '', description: '' })}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white hover:bg-white/10 transition-all"
        >
          <Plus size={12} /> Add
        </button>
      </div>
      {profile.experience?.length === 0 && (
        <div className="text-center py-12 text-white/20 text-sm">No experience added yet. Click + Add to start.</div>
      )}
      {profile.experience?.map((exp:any, i:number) => (
        <div key={i} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl grid grid-cols-2 gap-4 relative">
          <button onClick={() => remArr('experience', i)} className="absolute top-4 right-4 text-white/20 hover:text-red-400 transition-colors">
            <Trash2 size={14} />
          </button>
          <div>
            <label className={label}>Role</label>
            <input className={input} value={exp.role} onChange={e => updArr('experience', i, { role: e.target.value })} placeholder="Software Engineer" />
          </div>
          <div>
            <label className={label}>Company</label>
            <input className={input} value={exp.company} onChange={e => updArr('experience', i, { company: e.target.value })} placeholder="Google" />
          </div>
          <div>
            <label className={label}>Start</label>
            <input className={input} value={exp.start} onChange={e => updArr('experience', i, { start: e.target.value })} placeholder="Jan 2023" />
          </div>
          <div>
            <label className={label}>End</label>
            <input className={input} value={exp.end} onChange={e => updArr('experience', i, { end: e.target.value })} placeholder="Present" />
          </div>
          <div className="col-span-full">
            <label className={label}>Description</label>
            <textarea className={`${input} min-h-[80px] resize-none`} value={exp.description} onChange={e => updArr('experience', i, { description: e.target.value })} placeholder="What did you build or accomplish?" />
          </div>
        </div>
      ))}
    </div>
  );
}