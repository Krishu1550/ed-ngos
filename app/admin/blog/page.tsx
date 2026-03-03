'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminLayout from '@/components/AdminLayout'
import { Post } from '@/utils/InterfaceType'

export default function AdminBlog() {


  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        setPosts(Array.isArray(data) ? data : [])
        setLoading(false)
      })
  }, [])

  const deletePost = async (id: string) => {
    if (!confirm('Permanently delete this article?')) return
    await fetch(`/api/blog/${id}`, { method: 'DELETE' })
    setPosts(posts.filter((p: any) => p._id !== id))
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase">Innovation Blog</h1>
            <p className="text-slate-500 font-mono text-xs mt-2 uppercase tracking-widest">Editorial Content Management</p>
          </div>
          <Link href="/admin/blog/new" className="px-6 py-3 bg-[var(--accent)] text-black font-bold rounded-xl hover:scale-105 transition-transform">
            + Write Post
          </Link>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] text-[10px] uppercase tracking-[0.2em] text-slate-500">
              <tr>
                <th className="p-6">Article</th>
                <th className="p-6">Category</th>
                <th className="p-6">Reading Time</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {posts.map((p: any) => (
                <tr key={p._id} className="hover:bg-white/[0.01] transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{p.emoji || '✍️'}</span>
                      <div>
                        <div className="font-bold">{p.title}</div>
                        <div className="text-xs text-slate-500">By {p.author} • {p.date}</div>
                      </div>
                      {p.featured && <span className="ml-2 text-[8px] bg-[var(--accent)] text-black px-2 py-0.5 rounded font-black uppercase">Featured</span>}
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="text-xs font-mono text-slate-400">{p.category}</span>
                  </td>
                  <td className="p-6 text-sm">
                    {p.readTime} min read
                  </td>
                  <td className="p-6 text-right space-x-4">
                    <button onClick={() => deletePost(p._id)} className="text-red-500 hover:text-red-400 text-xs font-bold uppercase tracking-widest">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && posts.length === 0 && (
            <div className="p-20 text-center text-slate-600 font-mono text-xs uppercase tracking-widest">No articles found in the archive.</div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
