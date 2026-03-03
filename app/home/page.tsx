'use client'

import Link from 'next/link'

function Marquee() {
  const items = [
    'Frugal Innovation', 'Student Entrepreneurship', 'Design Thinking',
    'Prototyping', 'Social Impact', 'Lean Startup', 'Engineering for All', 'Build. Launch. Learn.'
  ]

  return (
    <div className="overflow-hidden border-y border-white/5 py-4 bg-black/50 backdrop-blur-sm">
      <div className="flex w-max animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="px-10 text-[10px] font-bold tracking-[0.2em] uppercase whitespace-nowrap border-r border-white/10 text-slate-500 last:border-r-0"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function HeroAnimation() {
  const nodes = [
    { id: 'core', x: 50, y: 50, r: 72, label: 'ISE', color: 'var(--accent)', textColor: '#fff', delay: '0s', pulse: true },
    { id: 'cv', x: 50, y: 14, r: 40, label: 'CV Builder', color: '#FF3333', textColor: '#fff', delay: '0.15s', pulse: false },
    { id: 'blog', x: 82, y: 32, r: 40, label: 'Blog', color: '#a78bfa', textColor: '#fff', delay: '0.3s', pulse: false },
    { id: 'programs', x: 82, y: 68, r: 40, label: 'Programs', color: '#4ade80', textColor: '#fff', delay: '0.45s', pulse: false },
    { id: 'community', x: 50, y: 86, r: 40, label: 'Network', color: '#FF7733', textColor: '#fff', delay: '0.6s', pulse: false },
    { id: 'innovation', x: 18, y: 68, r: 40, label: 'Frugal', color: '#f472b6', textColor: '#fff', delay: '0.75s', pulse: false },
    { id: 'startup', x: 18, y: 32, r: 40, label: 'Startup', color: '#fb923c', textColor: '#fff', delay: '0.9s', pulse: false },
  ]

  const edges = [
    ['core', 'cv'], ['core', 'blog'], ['core', 'programs'],
    ['core', 'community'], ['core', 'innovation'], ['core', 'startup'],
  ]

  const getNode = (id: string) => nodes.find(n => n.id === id)!
  const px = (p: number) => (p / 100) * 500
  const py = (p: number) => (p / 100) * 500

  return (
    <div className="relative w-full max-w-[480px] aspect-square select-none">
      <svg viewBox="0 0 500 500" className="w-full h-full overflow-visible">
        <defs>
          <style>{`
            .edge-line { stroke-dasharray: 6 6; animation: dashMove 2s linear infinite; }
            @keyframes dashMove { to { stroke-dashoffset: -24; } }
            .node-group { animation: floatNode 4s ease-in-out infinite; }
            @keyframes floatNode { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
            .pulse-ring { animation: pulseRing 3s ease-out infinite; }
            @keyframes pulseRing { 0% { r: 60; opacity: 0.8; } 100% { r: 100; opacity: 0; } }
          `}</style>
        </defs>

        {edges.map(([a, b]) => {
          const na = getNode(a), nb = getNode(b)
          return (
            <line key={`${a}-${b}`} className="edge-line" x1={px(na.x)} y1={py(na.y)} x2={px(nb.x)} y2={py(nb.y)} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          )
        })}

        {nodes.map((node) => (
          <g key={node.id} className="node-group" style={{ animationDelay: node.delay }}>
            {node.pulse && <circle className="pulse-ring" cx={px(node.x)} cy={py(node.y)} r={node.r} fill="none" stroke={node.color} strokeWidth="1" />}
            <circle cx={px(node.x)} cy={py(node.y)} r={node.r} fill={node.color} opacity={node.pulse ? 1 : 0.8} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <text x={px(node.x)} y={py(node.y)} textAnchor="middle" dominantBaseline="middle" fill={node.textColor} fontSize={node.pulse ? 16 : 12} fontWeight="900">{node.label}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

export default function Home() {
  return (
    <div className="bg-black text-white">
      {/* --- HERO --- */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(232,255,71,0.05)_0%,transparent_50%)]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            <div className="lg:col-span-3 space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="h-px w-10 bg-[var(--accent)]" />
                   <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--accent)]">Engineers with Grit</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter">
                  Engineer the <br/>
                  <span className="text-[var(--accent)]">Future.</span><br/>
                  Build with Purpose.
                </h1>
              </div>

              <p className="text-xl text-slate-400 max-w-lg leading-relaxed font-light">
                We empower student engineers to master frugal innovation—transforming constraints into high-impact solutions.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/profile" className="px-8 py-4 bg-[var(--accent)] text-black font-black rounded-xl hover:scale-105 transition-transform">
                  Create Digital CV →
                </Link>
                <Link href="/about" className="px-8 py-4 border border-white/10 rounded-xl font-bold hover:bg-white/5 transition-colors">
                  Learn About ISE
                </Link>
              </div>
            </div>

            <div className="lg:col-span-2 hidden lg:flex items-center ">
              <HeroAnimation />
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* --- STATS OVERLAP --- */}
      <section className="relative pt-24 pb-12">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-slate-900 to-black" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center">
             <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-10 w-full max-w-5xl shadow-2xl overflow-hidden">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-white/5">
                  {[['5,000+', 'PUPIL REACHED'], ['2,000+', 'CANDIDATES PARTICIPATED'], ['8+', 'Project'], ['12', 'Years']].map(([n, l]) => (
                    <div key={l} className="text-center first:pl-0 pl-4">
                      <div className="text-4xl font-black text-[var(--accent)] mb-1">{n}</div>
                      <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{l}</div>
                    </div>
                  ))}
                </div>
             </div>
             <p className="mt-12 text-slate-500 font-mono text-xs uppercase tracking-[0.4em]">The Network Behind The Innovation</p>
          </div>
        </div>
      </section>

      {/* --- FEATURES --- */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🎓', title: 'Digital CV Builder', desc: 'Professional templates for modern engineering roles.', color: 'var(--accent)', num: '01' },
              { icon: '🗓', title: 'Workshops', desc: 'Bootcamps, summits, and hands-on maker intensives.', color: '#4ade80', num: '02' },
              { icon: '✍️', title: 'Innovation Blog', desc: 'Learn from student startup journeys and case studies.', color: '#a78bfa', num: '03' },
              { icon: '🤝', title: 'Member Network', desc: 'Access 50+ college sections and alumni mentors.', color: '#60a5fa', num: '04' },
            ].map(f => (
              <div key={f.title} className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-[var(--accent)]/50 transition-all hover:-translate-y-2">
                 <div className="text-4xl mb-6">{f.icon}</div>
                 <h3 className="text-lg font-bold mb-3">{f.title}</h3>
                 <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                 <div className="mt-8 text-[10px] font-mono text-[var(--accent)] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">EXPLORE CORE →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="pb-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-br from-slate-900 to-black border border-white/10 rounded-[3rem] p-16 md:p-24 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/5 blur-[100px] rounded-full" />
             <div className="relative z-10 space-y-8">
               <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
                 Ready to Build Your <br/><span className="text-[var(--accent)]">Engineering Legacy?</span>
               </h2>
               <p className="text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
                 Create your account today and join a national movement of student innovators. No high budgets needed—just high-level ideas.
               </p>
               <button className="px-12 py-5 bg-[var(--accent)] text-black font-black rounded-2xl hover:scale-105 transition-transform">
                 Get Started — It's Free
               </button>
             </div>
          </div>
        </div>
      </section>
    </div>
  )
}