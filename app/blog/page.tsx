'use client'

import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Post } from '../../utils/InterfaceType'

// Reusing your Marquee for consistency
function Marquee() {
  const items = [
    'Success Stories', 'Tech Deep Dives', 'Startup Lessons',
    'Founder Interviews', 'Frugal Hacks', 'Community Updates'
  ]
  return (
    <div className="overflow-hidden border-y border-white/5 py-4 bg-black/50 backdrop-blur-sm">
      <div className="flex w-max animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="px-10 text-[10px] font-bold tracking-[0.2em] uppercase whitespace-nowrap border-r border-white/10 text-slate-500 last:border-r-0">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}


export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]
  );
  const [filter, setFilter] = useState('All');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const categories = ['All', ...new Set(posts.map(p => p.category))];
  const filtered = filter === 'All' ? posts : posts.filter(p => p.category === filter);

  useEffect(() => {

    const fetchData = async () => {
      try 
      {

        const res = await fetch('/api/blog'); // Ensure path starts with /api/
        if (!res.ok) throw new Error('Failed to fetch');
        const data:Post[]= await res.json();
        setPosts(data);

      }
      catch (err: any) {
        alert(err)
        setPosts([
          {
            id: 1,
            title: "Building World-Class Tech on a Student Budget",
            category: "Innovation",
            excerpt: "How to leverage open-source tools and frugal engineering to build MVP products that scale.",
            author: "Arjun Mehta",
            date: "Oct 24, 2025",
            readTime: 5,
            emoji: "🚀",
            featured: true
          },
          {
            id: 2,
            title: "The Design Thinking Roadmap",
            category: "Design",
            excerpt: "A step-by-step guide to identifying core user problems before touching a single line of code.",
            author: "Sarah Chen",
            date: "Oct 20, 2025",
            readTime: 4,
            emoji: "🎨"
          }
        ])
      }
    }

    fetchData();
  }, [])

  return (
    <div className="bg-black text-white min-h-screen">
      <Head><title>Insights – ISE</title></Head>

      {/* --- HERO --- */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(232,255,71,0.05)_0%,transparent_50%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-[var(--accent)]" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--accent)]">The ISE Journal</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8">
            Ideas Worth <br />
            <span className="text-[var(--accent)]">Sharing.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-lg leading-relaxed font-light">
            Deep dives into frugal innovation, student startups, and the engineering mindset.
          </p>
        </div>
      </section>

      <Marquee />

      <section className="py-24">
        <div className="container mx-auto px-6">
          {/* Category Filter */}
          <div className="flex gap-3 flex-wrap mb-16">
            {categories.map(c => (
              <button
                key={c+"id"}
                onClick={() => setFilter(c)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all border ${filter === c
                  ? 'bg-[var(--accent)] border-[var(--accent)] text-black'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/30'
                  }`}
              >
                {c?c:"Innovation"}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((b, i) => {
              const isFeatured = b.featured && i === 0;
              return (
                <div
                  key={i+"id"}
                  onClick={() => setSelectedPost(b)}
                  className={`group relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-[var(--accent)]/50 transition-all hover:-translate-y-2 cursor-pointer ${isFeatured ? 'lg:col-span-2 flex flex-col md:flex-row gap-8 items-center' : ''
                    }`}
                >
                  <div className={`shrink-0 flex items-center justify-center rounded-3xl bg-white/[0.03] ${isFeatured ? 'w-full md:w-64 h-64 text-7xl' : 'w-full h-48 text-5xl mb-8'}`}>
                    {b.emoji}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-mono text-[var(--accent)] tracking-widest uppercase">{b.category}</span>
                      <span className="text-white/20">•</span>
                      <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">{b.readTime} MIN READ</span>
                    </div>
                    <h3 className={`font-black leading-tight mb-4 group-hover:text-[var(--accent)] transition-colors ${isFeatured ? 'text-4xl' : 'text-xl'}`}>
                      {b.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-2">{b.excerpt}</p>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-black font-black text-[10px]">
                        {b.author?.at(0)}
                      </div>
                      <div className="text-[10px] uppercase tracking-widest">
                        <div className="font-bold text-white">{b.author}</div>
                        <div className="text-slate-500 mt-0.5">{b.date}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* --- SUBMIT CTA --- */}
      <section className="pb-32 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white/[0.03] border border-white/10 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
              Got a Story to <span className="text-[var(--accent)]">Tell?</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto font-light leading-relaxed mb-10">
              We're looking for case studies on frugal engineering, startup post-mortems, and campus innovation stories.
            </p>
            <button className="px-10 py-4 bg-white text-black font-black rounded-xl hover:scale-105 transition-transform">
              Submit Article →
            </button>
          </div>
        </div>
      </section>

      {/* --- ARTICLE MODAL --- */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
          onClick={(e) => e.target === e.currentTarget && setSelectedPost(null)}
        >
          <div className="bg-slate-900 border border-white/10 rounded-[3rem] w-full max-w-3xl max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-300">
            <div className="h-64 flex items-center justify-center text-8xl bg-white/[0.02] border-b border-white/5">
              {selectedPost.emoji}
            </div>
            <div className="p-8 md:p-16">
              <button onClick={() => setSelectedPost(null)} className="text-[10px] font-mono tracking-widest text-slate-500 hover:text-[var(--accent)] mb-8 uppercase">← Back to Feed</button>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">{selectedPost.title}</h2>
              <div className="flex gap-6 mb-12 pb-12 border-b border-white/5">
                <div className="text-[10px] font-mono uppercase tracking-widest"><span className="text-slate-500">By</span> {selectedPost.author}</div>
                <div className="text-[10px] font-mono uppercase tracking-widest"><span className="text-slate-500">In</span> {selectedPost.category}</div>
              </div>
              <div className="space-y-6 text-slate-300 leading-relaxed font-light">
                <p className="text-xl text-white font-normal italic">{selectedPost.excerpt}</p>
                <p className='break-all' >{selectedPost.content}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}