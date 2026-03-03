"use client"
import { useState, useEffect } from "react"
import Head from "next/head"
import { User, Program, Toast } from "../../utils/InterfaceType"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
// --- Types ---

// --- Component ---
export default function ProgramsPage() {
  // Replace with your Auth Provider hook (e.g., useAuth() or useSession())

  const user = useSelector((state:RootState)=>state.user)

  const [programs, setPrograms] = useState<Program[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [enrolling, setEnrolling] = useState<Program | null>(null);
  const [enrolledIds, setEnrolledIds] = useState<(string | number)[]>([]);
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    // Mock Data Fetch
    const fetchData = async () => {
      try {
        const res = await fetch('/api/program'); // Ensure path starts with /api/

        if (!res.ok) throw new Error('Failed to fetch');

        const data: Program[] = await res.json();
        setPrograms(data);
      } catch (error) {
        console.error("Error loading programs:", error);

        // Fallback to Mock Data if API fails
        const mockData: Program[] = [
          {
            _id: 1,
            title: 'AI Innovation Workshop',
            type: 'Workshop',
            emoji: '🤖',
            status: 'upcoming',
            seats: 25,
            enrolled: 12,
            date: 'March 15, 2026',
            description: 'Hands-on session building custom GPT agents.',
            location: 'Building 4, Lab A',
            tags: ['AI', 'Tech']
          }
        ];
        setPrograms(mockData);
      }
    }
    const fetchUserEnrollments = async () => {
      if (user.isLoggedIn && user.id) {
        try {
          // Hits your /api/enrollment/[userId]/route.ts
          const res = await fetch(`/api/enrollment/${user.id}`);
          if (res.ok) {
            const data = await res.json();
            // Map the enrollment objects to just an array of IDs
            setEnrolledIds(data.map((e: any) => e.programId));
          }
        } catch (error) {
          console.error("Error fetching user enrollments:", error);
        }
      }
    };
    fetchData();
     fetchUserEnrollments(); 
  }, [user.id]);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

const handleEnroll = async (prog: Program) => {
    // 1. Validation
    console.log(prog);
    if (!user.isLoggedIn || !user.id) {
      showToast('Please sign in to enroll', 'error');
      setEnrolling(null);
      return;
    }

    if (prog.seats - prog.enrolled <= 0) {
      showToast('No seats available', 'error');
      setEnrolling(null);
      return;
    }

    try {
      console.log(prog._id)
      // 2. API Call
      const res = await fetch('/api/enrollment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programId: prog._id,
          userId: user.id,
          userName: user.email,
          programTitle: prog.title
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Enrollment failed');

      // 3. Update Local State
      setEnrolledIds(prev => [...prev, prog._id]);
      setPrograms(prev => prev.map(p =>
        p._id === prog._id ? { ...p, enrolled: p.enrolled + 1 } : p
      ));

      showToast(`Successfully enrolled in ${prog.title}! 🎉`);
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setEnrolling(null);
    }
  };
  
  const types = ['All', 'Workshop', 'Summit', 'Competition', 'Training', 'Bootcamp'];
  const filtered = filter === 'All' ? programs : programs.filter(p => p.type === filter);

  return (
    <>
      <Head><title>Programs & Events – ISE</title></Head>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-20 right-6 z-[100] px-5 py-3 rounded-xl text-sm font-medium shadow-2xl transition-all ${toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-blue-400 text-black'
          }`}>
          {toast.msg}
        </div>
      )}

      <main className="min-h-screen pt-20 bg-[#0a0a0a] text-white">
        {/* Hero Section */}
        <section className="py-20 px-6 border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent">
          <div className="max-w-7xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-4 block">ISE Programs</span>
            <h1 className="text-6xl font-bold tracking-tight mb-6">
              Learning Through <span className="text-blue-400 italic">Doing.</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl">
              From high-intensity bootcamps to global summits. Build your portfolio with real-world challenges.
            </p>
          </div>
        </section>

        {/* Filter & Grid */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-3 overflow-x-auto pb-8 no-scrollbar">
              {types.map(t => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all border ${filter === t ? 'bg-white text-black border-white' : 'bg-transparent text-white/50 border-white/10 hover:border-white/30'
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(p => {
                const isEnrolled = enrolledIds.includes(p._id);
                const pctFull = (p.enrolled / p.seats) * 100;

                return (
                  <div key={p._id+"i"} className="group relative bg-[#121212] border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all">
                    <div className="h-48 bg-white/5 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                      {p.emoji}
                    </div>

                    <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-mono bg-white/10 px-2 py-1 rounded uppercase tracking-tighter">{p.type}</span>
                        <span className="text-xs text-white/40">{p.date}</span>
                      </div>

                      <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-2">{p.description}</p>

                      {/* Capacity Bar */}
                      <div className="space-y-2 mb-8">
                        <div className="flex justify-between text-[10px] font-mono uppercase text-white/30">
                          <span>{p.enrolled} Enrolled</span>
                          <span>{p.seats - p.enrolled} Seats Left</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-1000 ${pctFull > 85 ? 'bg-orange-500' : 'bg-lime-400'}`}
                            style={{ width: `${pctFull}%` }}
                          />
                        </div>
                      </div>

                      {isEnrolled ? (
                        <div className="w-full py-4 text-center text-blue-400 border border-blue-400/20 rounded-2xl text-sm font-bold bg-blue-400/5">
                          ✓ Enrolled
                        </div>
                      ) : (
                        <button
                          onClick={() => setEnrolling(p)}
                          disabled={p.enrolled >= p.seats}
                          className="w-full py-4 bg-white text-black rounded-2xl text-sm font-bold hover:bg-blue-300 transition-colors disabled:opacity-30 disabled:hover:bg-white"
                        >
                          {p.enrolled >= p.seats ? 'Waitlist Only' : 'Enroll Now →'}
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Modal - Confirmation */}
      {enrolling && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <div className="bg-[#121212] border border-white/10 p-10 rounded-[40px] max-w-md w-full shadow-2xl">
            <div className="text-5xl mb-6">{enrolling.emoji}</div>
            <h2 className="text-white text-3xl font-bold mb-2">Join Program?</h2>
            <p className="text-white mb-8">{enrolling.title}</p>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setEnrolling(null)} className="py-4 rounded-2xl border border-white/10 font-bold bg-red-400 hover:bg-red-500 transition-colors">Cancel</button>
              <button onClick={() => handleEnroll(enrolling)} className="py-4 rounded-2xl bg-blue-400 text-black font-bold hover:bg-blue-500 transition-all">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}