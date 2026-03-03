'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminLayout from '@/components/AdminLayout'
import { Program } from '@/utils/InterfaceType'

export default function AdminPrograms({ user }: { user: any }) {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/program')
      .then(res => res.json())
      .then(data => {
        setPrograms(Array.isArray(data) ? data : [])
        setLoading(false)
      })
  }, [])

  const deleteProgram = async (id: string) => {
    if (!confirm('Are you sure you want to delete this program?')) return
    await fetch(`/api/program/${id}`, { method: 'DELETE' })
    setPrograms(programs.filter((p: any) => p._id !== id))
  }

  return (
    <AdminLayout user={{
        name: user?.name || 'Admin',
        email: user?.email || '',
        role: user?.role || 'admin'
    }}>
      <div className="p-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase">Programs</h1>
            <p className="text-slate-500 font-mono text-xs mt-2 uppercase tracking-widest">Manage Workshops & Bootcamps</p>
          </div>
          <Link href="/admin/program/new" className="px-6 py-3 bg-[var(--accent)] text-black font-bold rounded-xl hover:scale-105 transition-transform">
            + New Program
          </Link>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] text-[10px] uppercase tracking-[0.2em] text-slate-500">
              <tr>
                <th className="p-6">Program</th>
                <th className="p-6">Type</th>
                <th className="p-6">Stats</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {programs.map((p: any) => (
                <tr key={p._id} className="hover:bg-white/[0.01] transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{p.emoji}</span>
                      <div>
                        <div className="font-bold">{p.title}</div>
                        <div className="text-xs text-slate-500">{p.date}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase">{p.type}</span>
                  </td>
                  <td className="p-6 text-sm font-mono">
                    <span className="text-[var(--accent)]">{p.enrolled}</span> / {p.seats} Seats
                  </td>
                  <td className="p-6 text-right space-x-4">
                    <button onClick={() => deleteProgram(p._id)} className="text-red-500 hover:text-red-400 text-xs font-bold uppercase tracking-widest">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}