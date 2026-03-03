import { TabComponentProps } from "@/app/profile/page";
import { Profile } from "@/utils/InterfaceType";

export default function PersonalTab({ profile, u }:
 TabComponentProps
) {
  const input = "w-full bg-white/15 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-white/40 outline-none transition-all placeholder:text-white/20";
  const label = "block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
      <div className="col-span-full">
        <label className={label}>Full Name</label>
        <input className={input} value={profile.full_name} onChange={e => u('full_name', e.target.value)} placeholder="Ada Lovelace"
        
        
        />
      </div>
      <div>
        <label className={label}>Headline</label>
        <input className={input} value={profile.headline} onChange={e => u('headline', e.target.value)} placeholder="Student Engineer | Innovator" />
      </div>
      <div>
        <label className={label}>Email</label>
        <input className={input} value={profile.email} onChange={e => u('email', e.target.value)} placeholder="ada@example.com" />
      </div>
      <div>
        <label className={label}>Phone</label>
        <input className={input} value={profile.phone} onChange={e => u('phone', e.target.value)} placeholder="+1 234 567 890" />
      </div>
      <div>
        <label className={label}>Location</label>
        <input className={input} value={profile.location} onChange={e => u('location', e.target.value)} placeholder="San Francisco, CA" />
      </div>
      <div>
        <label className={label}>LinkedIn URL</label>
        <input className={input} value={profile.linkedin_url} onChange={e => u('linkedin_url', e.target.value)} placeholder="linkedin.com/in/..." />
      </div>
      <div>
        <label className={label}>GitHub URL</label>
        <input className={input} value={profile.github_url} onChange={e => u('github_url', e.target.value)} placeholder="github.com/..." />
      </div>
      <div className="col-span-full">
        <label className={label}>Summary</label>
        <textarea
          className={`${input} min-h-[120px] resize-none`}
          value={profile.summary}
          onChange={e => u('summary', e.target.value)}
          placeholder="A brief professional summary about yourself..."
        />
      </div>
    </div>
  );
}