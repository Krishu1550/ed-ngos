'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

export default function NewBlogPost() {
  const user= useSelector((state:RootState)=>state.user)
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    category: 'Engineering',
    excerpt: '',
    content: '',
    author: user?.email || '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    readTime: 5,
    emoji: '💡',
    featured: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (res.ok) router.push('/admin/blog')
    else alert('Error publishing post')
  }

  return (
    <AdminLayout >
      <div className="p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-black mb-8 uppercase tracking-tighter">Draft New Article</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem]">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <label className="text-[10px] uppercase font-mono text-slate-500 mb-2 block">Article Title</label>
              <input 
                required
                className="w-full bg-black border border-white/10 p-4 rounded-xl focus:border-[var(--accent)] outline-none"
                placeholder="The Future of Frugal Innovation..."
                onChange={e => setFormData({...formData, title: e.target.value})} 
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-mono text-slate-500 mb-2 block">Category</label>
              <select 
                className="w-full bg-black border border-white/10 p-4 rounded-xl outline-none"
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option>Engineering</option>
                <option>Startup</option>
                <option>Case Study</option>
                <option>Community</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
             <div className="col-span-1">
              <label className="text-[10px] uppercase font-mono text-slate-500 mb-2 block">Icon Emoji</label>
              <input 
                className="w-full bg-black border border-white/10 p-4 rounded-xl outline-none"
                placeholder="💡"
                onChange={e => setFormData({...formData, emoji: e.target.value})} 
              />
            </div>
            <div className="col-span-1">
              <label className="text-[10px] uppercase font-mono text-slate-500 mb-2 block">Read Time (Min)</label>
              <input 
                type="number"
                className="w-full bg-black border border-white/10 p-4 rounded-xl outline-none"
                defaultValue={5}
                onChange={e => setFormData({...formData, readTime: parseInt(e.target.value)})} 
              />
            </div>
            <div className="col-span-1 flex items-end pb-4">
               <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded border-white/10 bg-black checked:bg-[var(--accent)]"
                    onChange={e => setFormData({...formData, featured: e.target.checked})}
                  />
                  <span className="text-[10px] uppercase font-mono text-slate-400 group-hover:text-[var(--accent)] transition-colors">Mark as Featured</span>
               </label>
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-mono text-slate-500 mb-2 block">Short Excerpt (SEO)</label>
            <textarea 
              required
              rows={2}
              className="w-full bg-black border border-white/10 p-4 rounded-xl outline-none"
              placeholder="A brief summary for the preview card..."
              onChange={e => setFormData({...formData, excerpt: e.target.value})} 
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-mono text-slate-500 mb-2 block">Main Content (Markdown Supported)</label>
            <textarea 
              required
              rows={12}
              className="w-full bg-black border border-white/10 p-4 rounded-xl outline-none font-serif text-lg"
              placeholder="Write your story here..."
              onChange={e => setFormData({...formData, content: e.target.value})} 
            />
          </div>

          <button type="submit" className="w-full py-5 bg-[var(--accent)] text-black font-black rounded-2xl hover:scale-[1.01] transition-transform shadow-xl shadow-[var(--accent)]/10">
            PUBLISH TO BLOG →
          </button>
        </form>
      </div>
    </AdminLayout>
  )
}