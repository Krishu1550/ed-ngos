'use client'
import Head from 'next/head'
import Link from 'next/link'
import { useParams } from "next/navigation"
import { useState, useEffect } from 'react'
import { Globe, ArrowRight, Loader2, Copy, CheckCircle2 } from 'lucide-react'
import { Profile } from '@/utils/InterfaceType'
// Mock API and Component - Replace with your actual imports
// import { profilesApi } from '../../lib/db' 
import CVPreview  from '@/components/cv/CVPreview'

export default function PublicCV() {
  const params = useParams()
  const { slug } = params 
  const [profile, setProfile] = useState<Profile|null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!slug) return
    const fetchData=async()=>{
    console.log(slug);
    const res= await fetch(`/api/profile/${slug}`);
    const data:Profile= await res.json();
    setProfile(data);
    console.log("Data"+ JSON.stringify(data));
    console.log('Fetching profile for slug:', slug)
    }
    setLoading(false);
    fetchData();
  }, [slug])

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-white/20 mb-4" size={32} />
        <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">Retrieving Profile</p>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <Head><title>Not Found – ISE</title></Head>
        <div className="max-w-md w-full text-center space-y-6">
          <div className="h-16 w-16 bg-white/5 rounded-3xl flex items-center justify-center mx-auto border border-white/10">
            <Globe className="text-white/20" size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tighter italic">Profile Offline.</h2>
            <p className="text-white/40 text-sm">This digital legacy is either private or does not exist.</p>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-2xl font-bold text-xs hover:scale-105 transition-transform">
            Go to ISE Home <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      <Head>
        <title>{profile.full_name} | Digital CV</title>
        <meta name="description" content={profile.summary} />
      </Head>

      {/* --- FLOATING NAVIGATION --- */}
      <nav className="fixed right-2  top-20 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-40">
        <div className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-[2rem] px-6 py-3 flex items-center justify-between shadow-2xl">
      
          <div className="flex items-center gap-2">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-400 border border-white/10 text-[10px] font-bold uppercase tracking-widest transition-colors hover:bg-blue-600 "
            >
              {copied ? (
                <><CheckCircle2 size={14} className="text-green-400" /> Copied</>
              ) : (
                <><Copy size={14} /> Share</>
              )}
            </button>
        
          </div>
        </div>
      </nav>

      {/* --- CONTENT AREA --- */}
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Document Container */}
          <div className="relative group">
            {/* Ambient Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-b from-white/10 to-transparent rounded-[2.5rem] blur-2xl opacity-20" />
            
            <div className="relative bg-white rounded-[2rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)]">
              {/* This is your actual CV Template Component */}
              <div className="min-h-[1000px]">
                 <CVPreview profile={profile} template={profile.cv_template || 'modern'} />
              
              </div>
            </div>
          </div>

          {/* Footer Branding */}
          <div className="mt-16 text-center space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/[0.03] border border-white/5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30"> Verified Digital Identity via ISE </span>
            </div>
            
            <div className="pt-4">
              <h3 className="text-xl font-bold mb-4 italic">Ready to make your mark?</h3>
              <Link 
                href="/profile" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5"
              >
                Create Your Digital CV <ArrowRight size={18} />
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}