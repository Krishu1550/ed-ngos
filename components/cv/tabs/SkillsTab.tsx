import { useState } from 'react';
import { X } from 'lucide-react';
import { Profile } from '@/utils/InterfaceType';
import { TabComponentProps } from '@/app/profile/page';

export default function SkillsTab({ profile, u, remArr }
  :
 TabComponentProps
) {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim()) {
      u('skills', [...(profile.skills || []), newSkill.trim()]);
      setNewSkill('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">Add Skill</label>
        <div className="flex gap-3">
          <input
            className="flex-1 bg-white/15 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-white/40 outline-none transition-all placeholder:text-white/20"
            value={newSkill}
            onChange={e => setNewSkill(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addSkill()}
            placeholder="e.g. Python, React, Machine Learning..."
          />
          <button
            onClick={addSkill}
            className="px-6 bg-white text-black rounded-xl font-black text-sm hover:bg-white/90 transition-all"
          >
            +
          </button>
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">Your Skills ({profile.skills?.length || 0})</label>
        {profile.skills?.length === 0 && (
          <p className="text-white/20 text-sm py-4">No skills yet. Add some above.</p>
        )}
        <div className="flex flex-wrap gap-2">
          {profile.skills?.map((s:any, i:number ) => (
            <span key={i} className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white font-medium">
              {s}
              <button onClick={() => remArr('skills', i)} className="text-white/30 hover:text-red-400 transition-colors">
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}