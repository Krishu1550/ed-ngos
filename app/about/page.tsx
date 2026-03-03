import Head from 'next/head'
import Link from 'next/link'

export default function About() {
  return (
    <>
      <Head><title>About – ISE | Institute of Student Engineering</title></Head>
      
      <div className="pt-5 bg-black text-white selection:bg-[var(--accent)] selection:text-black">
        
        {/* --- HERO SECTION --- */}
        <section className="relative overflow-hidden py-24 lg:py-32">
          <div className="container px-6 mx-auto relative z-10">
            <div className="grid lg:grid-cols-5 gap-16 items-center">
              
              <div className="lg:col-span-3 space-y-8">
                <div>
                  <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-[var(--accent)] text-[var(--accent)] mb-6">
                    Established 2016
                  </span>
                  <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                    Where Engineers Become <span className="text-[var(--accent)]">Entrepreneurs</span>
                  </h1>
                </div>
                
                <div className="space-y-6 max-w-2xl">
                  <p className="text-lg text-slate-400 leading-relaxed font-light">
                    ISE (Institute of Student Engineering) is a registered Non-profit (No. 391, 2016) founded on March 3rd, 2016. We believe entrepreneurship isn’t a fancy concept—it’s the phenomenon of solving real challenges to create productivity.
                  </p>
                  <p className="text-base text-slate-500 leading-relaxed italic border-l-2 border-[var(--accent)] pl-6">
                    "A book gives you information, but our programs let you step into the shoes of the need. That is how you truly learn."
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <Link href="/programs" className="bg-[var(--accent)] text-black px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform">
                    View Programs
                  </Link>
                  <Link href="/blog" className="px-8 py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-semibold">
                    Our Stories
                  </Link>
                </div>
              </div>

              {/* Floating Stats Visual */}
              <div className="lg:col-span-2 relative h-[400px] hidden lg:block">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-[12rem] font-black text-white/[0.03]">ISE</span>
                </div>
                {/* Dynamic Card 1 */}
                <div className="absolute top-0 right-15 p-6 bg-orange-700 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl animate-bounce-slow">
                   <div className="text-3xl mb-2">🏫</div>
                   <div className="text-2xl font-black">10,000+</div>
                   <div className="text-xs uppercase tracking-widest text-slate-400">PUPIL REACHED</div>
                </div>
                  {/* Dynamic Card 1 */}
                <div className="absolute top-30 left-40 p-6 bg-white/7 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl animate-bounce-slow">
                   <div className="text-3xl mb-2">🏫</div>
                   <div className="text-2xl font-black">50+</div>
                   <div className="text-xs uppercase tracking-widest text-slate-400">Sections</div>
                </div>
               
                          {/* Dynamic Card 2 */}
                <div className="absolute bottom-10 left-0 p-6 bg-blue-500 text-black rounded-3xl shadow-2xl rotate-[-3deg]">
                   <div className="text-3xl mb-2">👥</div>
                   <div className="text-2xl font-black">4,000+</div>
                   <div className="text-xs uppercase tracking-widest font-bold">Members</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- VISION & MISSION (Grid 3-Column) --- */}
        <section className="py-20 bg-gradient-to-b from-black to-slate-900/50">
          <div className="container px-6 mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-10 rounded-4xl border border-white/5 bg-white/[0.02] hover:border-[var(--accent)]/30 transition-colors">
                <div className="text-[var(--accent)] text-xs font-mono tracking-widest mb-6 uppercase">The Vision</div>
                <h3 className="text-2xl font-bold mb-4">Realize Potential</h3>
                <p className="text-slate-400 font-light leading-loose">To make every individual realize their inherent potential through action and impact.</p>
              </div>
              <div className="p-10 rounded-4xl border border-white/5 bg-white/[0.02] hover:border-[var(--accent)]/30 transition-colors">
                <div className="text-[var(--accent)] text-xs font-mono tracking-widest mb-6 uppercase">The Mission</div>
                <h3 className="text-2xl font-bold mb-4">Beyond Academics</h3>
                <p className="text-slate-400 font-light leading-loose">Providing a platform to build abilities like soft skills, communication, and entrepreneurial grit.</p>
              </div>
              <div className="p-10 rounded-4xl border border-white/5 bg-white/[0.02] hover:border-[var(--accent)]/30 transition-colors">
                <div className="text-[var(--accent)] text-xs font-mono tracking-widest mb-6 uppercase">The Goal</div>
                <h3 className="text-2xl font-bold mb-4">Capitalize Ideas</h3>
                <p className="text-slate-400 font-light leading-loose">Create an efficient pipeline where students serve the need and capitalize on their innovation.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- THE CORE VALUES (Alternating Layout) --- */}
        <section className="py-24">
          <div className="container px-6 mx-auto">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="lg:w-1/2">
                <h2 className="text-4xl font-black mb-10 leading-tight">The Uniqueness <br/>of our DNA</h2>
                <div className="space-y-4">
                  {[
                    { t: 'Frugal Innovation', d: 'Constraints breed creativity. We do more with less.', i: '🔩' },
                    { t: 'Network Access', d: 'Connecting you to a growth-oriented entrepreneurial ecosystem.', i: '🌐' },
                    { t: 'Active Experimentation', d: 'Fail fast, learn faster. Iteration is our engine.', i: '🧪' }
                  ].map((val) => (
                    <div key={val.t} className="flex gap-6 p-6 rounded-2xl hover:bg-white/5 transition-colors group">
                      <div className="h-12 w-12 shrink-0 rounded-xl bg-white/5 flex items-center justify-center text-xl group-hover:bg-[var(--accent)]/20 transition-colors">
                        {val.i}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{val.t}</h4>
                        <p className="text-slate-400 text-sm mt-1">{val.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 bg-slate-800/20 p-12 rounded-[3rem] border border-white/5 relative">
                <div className="absolute -top-6 -right-6 h-32 w-32 bg-[var(--accent)]/10 blur-3xl rounded-full" />
                <h3 className="text-2xl font-bold mb-6 text-[var(--accent)]">What makes us different?</h3>
                <p className="text-lg leading-relaxed text-slate-300 font-light">
                  Most organizations teach from the top down. We work from the ground up. The "budding stage" of our organization ensures that every individual gets hands-on knowledge of every aspect of development, communication, and execution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- LEADERSHIP --- */}
        <section className="py-24 border-t border-white/5">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-4">Leadership Team</h2>
              <p className="text-slate-500 uppercase tracking-widest text-xs">Architects of the ISE Movement</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: 'Dr. Amit Verma', role: 'Founder & Director', e: '👨‍🔬' },
                { name: 'Prof. Sunita Rao', role: 'Academic Director', e: '👩‍🏫' },
                { name: 'Karthik Nair', role: 'Head of Programs', e: '👨‍💼' },
                { name: 'Divya Krishnan', role: 'Student Affairs', e: '👩‍💻' },
              ].map(person => (
                <div key={person.name} className="group text-center">
                  <div className="w-24 h-24 bg-white/5 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500 border border-white/10 group-hover:border-[var(--accent)]/50">
                    {person.e}
                  </div>
                  <h4 className="font-bold">{person.name}</h4>
                  <p className="text-xs text-slate-500 mt-1 uppercase tracking-tighter">{person.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}