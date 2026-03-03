'use client';
import { useState, useEffect } from 'react';
import CVPreview from '../../components/cv/CVPreview';
import TemplateSelector from '../../components/cv/TemplateSelector';
import PersonalTab from '../../components/cv/tabs/PersonalTab';
import EducationTab from '../../components/cv/tabs/EducationTab';
import ExperienceTab from '../../components/cv/tabs/ExperienceTab';
import SkillsTab from '../../components/cv/tabs/SkillsTab';
import MoreTab from '../../components/cv/tabs/MoreTab';
import { Eye, Pencil, Check, Loader2 } from 'lucide-react';
import { Profile } from '../../utils/InterfaceType';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

export interface TabComponentProps {
  profile: Profile;
  u: <K extends keyof Profile>(field: K, value: Profile[K]) => void;
  addArr: <K extends keyof Profile>(field: K, item: any) => void;
  updArr: <K extends keyof Profile>(field: K, idx: number, changes: any) => void;
  remArr: <K extends keyof Profile>(field: K, idx: number) => void;
}
const TABS = [
  { id: 'personal', label: '👤 Personal' },
  { id: 'education', label: '🎓 Education' },
  { id: 'experience', label: '💼 Experience' },
  { id: 'skills', label: '⚡ Skills' },
  { id: 'more', label: '🏆 More' },
];

const EMPTY_PROFILE: Profile = {
  _id: "",
  full_name: '', headline: '', email:'', phone: '', location: '',
  college: '', department: '', year_of_study: '',
  linkedin_url: '', github_url: '', portfolio_url: '', photo_url: '',
  summary: '', skills: [], education: [], experience: [],
  projects: [], certifications: [], achievements: [], languages: [],
  cv_template: 'modern', is_public: true
};

export default function CVBuilder() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>({ ...EMPTY_PROFILE });
  const [activeTab, setActiveTab] = useState('personal');
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // --- TYPE-SAFE HELPERS ---

  // Update single field
  const u = <K extends keyof Profile>(field: K, value: Profile[K]) =>
    setProfile(p => ({ ...p, [field]: value }));

  // Add item to array field
  const addArr = <K extends keyof Profile>(field: K, item: any) => {
    setProfile(p => {
      const currentArr = Array.isArray(p[field]) ? (p[field] as any[]) : [];
      return { ...p, [field]: [...currentArr, item] };
    });
  };

  // Update specific item in array field
  const updArr = <K extends keyof Profile>(field: K, idx: number, changes: any) =>
    setProfile(p => {
      const arr = [...(p[field] as any[])];
      if (arr[idx]) {
        arr[idx] = { ...arr[idx], ...changes };
      }
      return { ...p, [field]: arr };
    });

  // Remove item from array field
  const remArr = <K extends keyof Profile>(field: K, idx: number) =>
    setProfile(p => ({
      ...p,
      [field]: (p[field] as any[]).filter((_, i) => i !== idx)
    }));


  const validateProfile = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!profile.full_name.trim()) {
      newErrors.full_name = "Full name is required";
    }

    if (!profile.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!profile.headline.trim()) {
      newErrors.headline = "Headline is required";
    }

    if (!profile.summary.trim()) {
      newErrors.summary = "Professional summary is required";
    }

    if (profile.skills.length === 0) {
      newErrors.skills = "Add at least one skill";
    }

    if (profile.education.length === 0) {
      newErrors.education = "Add at least one education entry";
    }

    if (profile.experience.length === 0) {
      newErrors.experience = "Add at least one experience entry";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (saveState === 'saving') return;
    
        // 🔎 Validate before saving
        if (!validateProfile()) {
          alert(JSON.stringify(
            errors));
          setActiveTab('personal'); // optionally jump to first tab
          return;
        }
    
    setSaveState('saving');

    console.log("Saving profile...", profile);
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({

          full_name: profile.full_name,
          headline: profile.headline,
          email: profile.email,
          phone: profile.phone,
          location: profile.location,
          college: profile.college,
          department: profile.department,
          year_of_study: profile.year_of_study,
          linkedin_url: profile.linkedin_url,
          github_url: profile.github_url,
          portfolio_url:profile.portfolio_url,
          photo_url:profile.photo_url,
          summary:profile.summary,
          skills:profile.skills,
          education:profile.education,
          experience:profile.experience,
          projects:profile.projects,
          certifications:profile.certifications,
          achievements:profile.achievements,
          languages: profile.languages,
          cv_template:profile.cv_template
        }),
      });

      if (!res.ok) {

        throw new Error('Failed to fetch');
      }

      const data: Profile = await res.json();

      if (!data) {
        throw new Error("Please check API response.");
      }

      setSaveState('saved');
      router.push(`/profile/${data._id}`);

    } catch (error) {
      console.error("Save failed", error);
      setSaveState('idle');
    } finally {
      setTimeout(() => setSaveState('idle'), 2000);
    }
  };

  const tabProps = { profile, u, addArr, updArr, remArr };

  return (
    <div className="min-h-screen bg-black text-white antialiased selection:bg-white selection:text-black">
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/home" className="font-head font-black text-2xl tracking-tighter no-underline flex items-center group">
              <span className="text-white group-hover:text-[var(--accent)] transition-colors">ISE</span>
              <span className="text-[var(--accent)] ml-0.5">.</span>
            </Link>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 hidden md:block">Builder</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode(v => v === 'edit' ? 'preview' : 'edit')}
              className="flex items-center gap-2 px-4 py-2 text-[11px] font-bold border border-white/10 rounded-xl hover:bg-white/5 transition-all text-white/70"
            >
              {viewMode === 'edit' ? <><Eye size={14} /> Preview</> : <><Pencil size={14} /> Edit</>}
            </button>
            <button
              onClick={handleSave}
              disabled={saveState === 'saving'}
              className="flex items-center gap-2 px-5 py-2 text-[11px] font-bold bg-white text-black rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {saveState === 'saving' ? <Loader2 size={14} className="animate-spin" /> :
                saveState === 'saved' ? <Check size={14} /> : null}
              {saveState === 'idle' ? 'Save Changes' : saveState === 'saving' ? 'Saving...' : 'Saved'}
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-6">
        {viewMode === 'edit' ? (
          <div className="grid lg:grid-cols-[1fr_400px] gap-12">
            <div className="space-y-10">
              <header className="space-y-2">
                <h2 className="text-6xl font-black tracking-tighter leading-[0.9] mb-4">
                  Craft your<br /><span className="text-blue-500 italic">Legacy.</span>
                </h2>
                <p className="text-white/40 text-sm max-w-md font-medium">Build a professional presence that commands attention in the digital landscape.</p>
              </header>

              <div className="flex p-1.5 bg-white/[0.03] border border-white/5 rounded-2xl overflow-x-auto no-scrollbar backdrop-blur-sm">
                {TABS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`flex-1 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all whitespace-nowrap ${activeTab === t.id
                      ? 'bg-white text-black shadow-xl scale-[1.02]'
                      : 'text-white/30 hover:text-white/60'
                      }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="p-8 bg-white/[0.01] border border-white/5 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl">
                {activeTab === 'personal' && <PersonalTab {...tabProps} />}
                {activeTab === 'education' && <EducationTab {...tabProps} />}
                {activeTab === 'experience' && <ExperienceTab {...tabProps} />}
                {activeTab === 'skills' && <SkillsTab {...tabProps} />}
                {activeTab === 'more' && <MoreTab {...tabProps} />}
              </div>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-6">
                <TemplateSelector selected={profile.cv_template} onChange={val => u('cv_template', val)} />

                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-b from-white/20 to-transparent rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
                  <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-[#050505]">
                    <div className="px-5 py-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                      <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em]">Monitor</span>
                      <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/5" />
                        <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                        <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                      </div>
                    </div>
                    <div className="h-[520px] overflow-hidden relative">
                      <div className="origin-top-left scale-[0.44] w-[227%] transition-transform duration-500">
                        <CVPreview profile={profile} template={profile.cv_template} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.4)]">
              <CVPreview profile={profile} template={profile.cv_template} />
            </div>
            <div className="mt-12 flex justify-center gap-6">
              <button
                onClick={() => setViewMode('edit')}
                className="px-10 py-4 border border-white/10 rounded-2xl font-bold text-xs hover:bg-white/5 transition-all text-white/50 hover:text-white"
              >
                Return to Editor
              </button>
              <button className="px-10 py-4 bg-white text-black rounded-2xl font-bold text-xs hover:scale-105 transition-all">
                Download PDF
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}