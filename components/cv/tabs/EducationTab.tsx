import { Profile } from '@/utils/InterfaceType';
import { Plus, Trash2 } from 'lucide-react';

export default function EducationTab({ profile, u, addArr, updArr, remArr }
    :
    {
        profile: Profile,
        u: (field: string, value: any) => void,
        addArr: (field: string, value: any) => void,
        updArr: (field: string, index: number, value: any) => void,
        remArr: (field: string, index: number) => void,
    }
) {
  const input = "w-full bg-white/15 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-white/40 outline-none transition-all placeholder:text-white/20";
  const label = "block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
        <h4 className="col-span-full text-xs font-bold text-white/50 uppercase tracking-widest">Primary Institution</h4>
        <div>
          <label className={label}>College / University</label>
          <input className={input} value={profile.college} onChange={e => u('college', e.target.value)} placeholder="MIT" />
        </div>
        <div>
          <label className={label}>Department</label>
          <input className={input} value={profile.department} onChange={e => u('department', e.target.value)} placeholder="Computer Science" />
        </div>
        <div>
          <label className={label}>Year of Study</label>
          <input className={input} value={profile.year_of_study} onChange={e => u('year_of_study', e.target.value)} placeholder="3rd Year" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Additional Education</span>
          <button
            onClick={() => addArr('education', { institution: '', degree: '', field: '', start_year: '', end_year: '' })}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white hover:bg-white/10 transition-all"
          >
            <Plus size={12} /> Add
          </button>
        </div>
        {profile.education?.map((edu:any, i:number) => (
          <div key={i} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl grid grid-cols-2 gap-4 relative">
            <button onClick={() => remArr('education', i)} className="absolute top-4 right-4 text-white/20 hover:text-red-400 transition-colors">
              <Trash2 size={14} />
            </button>
            <div className="col-span-full">
              <label className={label}>Institution</label>
              <input className={input} value={edu.institution} onChange={e => updArr('education', i, { institution: e.target.value })} placeholder="University Name" />
            </div>
            <div>
              <label className={label}>Degree</label>
              <input className={input} value={edu.degree} onChange={e => updArr('education', i, { degree: e.target.value })} placeholder="B.Sc." />
            </div>
            <div>
              <label className={label}>Field</label>
              <input className={input} value={edu.field} onChange={e => updArr('education', i, { field: e.target.value })} placeholder="Engineering" />
            </div>
            <div>
              <label className={label}>Start Year</label>
              <input className={input} value={edu.start_year} onChange={e => updArr('education', i, { start_year: e.target.value })} placeholder="2020" />
            </div>
            <div>
              <label className={label}>End Year</label>
              <input className={input} value={edu.end_year} onChange={e => updArr('education', i, { end_year: e.target.value })} placeholder="2024" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}