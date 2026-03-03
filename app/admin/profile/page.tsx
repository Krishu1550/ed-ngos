'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminLayout from '@/components/AdminLayout'
import { Profile } from '@/utils/InterfaceType' 

export default function AdminProfiles() {
  
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        setProfiles(Array.isArray(data) ? data : [])
        setLoading(false)
      })
  }, [])

  const deleteProfile = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user profile?')) return
    await fetch(`/api/profile/${id}`, { method: 'DELETE' })
    setProfiles(profiles.filter((p: any) => p._id !== id))
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tighter uppercase">Digital CVs</h1>
          <p className="text-slate-500 font-mono text-xs mt-2 uppercase tracking-widest">Manage Member Profiles & Portfolios</p>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] text-[10px] uppercase tracking-[0.2em] text-slate-500">
              <tr>
                <th className="p-6">Member</th>
                <th className="p-6">College / Dept</th>
                <th className="p-6">Visibility</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {profiles.map((p: any) => (
                <tr key={p._id} className="hover:bg-white/[0.01] transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-yellow-500 flex items-center justify-center text-black font-black text-xs uppercase">
                        {p.full_name?.substring(0, 2)}
                      </div>
                      <div>
                        <div className="font-bold">{p.full_name}</div>
                        <div className="text-xs text-slate-500">{p.headline || 'Student Engineer'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="text-sm">{p.college}</div>
                    <div className="text-[10px] text-slate-500 uppercase">{p.department}</div>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${p.is_public ? 'bg-green-500/10 text-green-500' : 'bg-slate-500/10 text-slate-500'}`}>
                      {p.is_public ? 'Public' : 'Private'}
                    </span>
                  </td>
                  <td className="p-6 text-right space-x-6">
                    <Link href={`/profile/${p.slug}`} target="_blank" className="text-[var(--accent)] hover:underline text-xs font-bold uppercase tracking-widest">View CV</Link>
                    <button onClick={() => deleteProfile(p._id)} className="text-red-500 hover:text-red-400 text-xs font-bold uppercase tracking-widest">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && profiles.length === 0 && (
            <div className="p-20 text-center text-slate-600 font-mono text-xs uppercase tracking-widest">No profiles registered yet.</div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}