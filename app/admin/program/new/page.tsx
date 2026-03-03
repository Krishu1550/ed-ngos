'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'

export default function NewProgram() {
  
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    type: 'Workshop',
    status: 'upcoming',
    emoji: '🚀',
    seats: 50,
    enrolled: 0,
    date: '',
    description: '',
    location: 'Main Campus'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/program', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (res.ok) router.push('/admin/program')
    else alert('Failed to create program')
  }

  return (
    <AdminLayout >
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-black mb-8 uppercase tracking-tighter">Create Program</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem]">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="text-[10px] uppercase font-mono text-slate-500 mb-2 block">Program Title</label>
              <input 
                required
                className="w-full bg-black border border-white/10 p-4 rounded-xl focus:border-[var(--accent)] outline-none"
                onChange={e => setFormData({...formData, title: e.target.value})} 
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-mono text-slate-500 mb-2 block">Event Type</label>
              <select 
                className="w-full bg-black border border-white/10 p-4 rounded-xl outline-none"
                onChange={e => setFormData({...formData, type: e.target.value})}
              >
                <option>Workshop</option><option>Summit</option><option>Competition</option><option>Bootcamp</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-mono text-slate-500 mb-2 block">Emoji Icon</label>
              <input 
                className="w-full bg-black border border-white/10 p-4 rounded-xl outline-none"
                placeholder="🚀"
                onChange={e => setFormData({...formData, emoji: e.target.value})} 
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-mono text-slate-500 mb-2 block">Total Seats</label>
              <input 
                type="number"
                className="w-full bg-black border border-white/10 p-4 rounded-xl outline-none"
                onChange={e => setFormData({...formData, seats: parseInt(e.target.value)})} 
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-mono text-slate-500 mb-2 block">Event Date</label>
              <input 
                type="text"
                placeholder="Oct 12, 2026"
                className="w-full bg-black border border-white/10 p-4 rounded-xl outline-none"
                onChange={e => setFormData({...formData, date: e.target.value})} 
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-mono text-slate-500 mb-2 block">Description</label>
            <textarea 
              rows={4}
              className="w-full bg-black border border-white/10 p-4 rounded-xl outline-none"
              onChange={e => setFormData({...formData, description: e.target.value})} 
            />
          </div>

          <button type="submit" className="w-full py-5 bg-[var(--accent)] text-black font-black rounded-2xl hover:scale-[1.02] transition-transform">
            PUBLISH PROGRAM →
          </button>
        </form>
      </div>
    </AdminLayout>
  )
}