'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminLayout from '@/components/AdminLayout'

export default function AdminDashboard({ user }: { user: any }) {
  const [stats, setStats] = useState({ programs: 0, posts: 0, profiles: 0, enrollments: 0 })
  const [recentUsers, setRecentUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true)

        // Fetching data from your new API routes
        const [progRes, postRes, profRes,profEnroll] = await Promise.all([
          safeFetch('/api/program'),
          safeFetch('/api/blog'),
          safeFetch('/api/profile'),
          safeFetch('/api/enrollment')
        ])

        const programs = await progRes;
        const posts = await postRes;
        const profiles = await profRes;
        const enroll= await profEnroll;
        console.log("PROFILE: " + profiles)
        console.log("POST: " + posts)
        console.log("PROGRAM:" + programs)
        console.log(enroll)

        setStats({
          programs: programs.length || 0,
          posts: posts.length || 0,
          profiles: profiles.length || 0,
          enrollments:enroll.length|| 0 // Logic for enrollments depends on your specific implementation
        })

        // Using profiles as "Recent Users" for this example
        setRecentUsers(profiles.slice(0, 5))

      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

async function safeFetch(url: string) {
  const res = await fetch(url)

  const text = await res.text()
  console.log(`Response from ${url}:`, text)

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }

  try {
    return JSON.parse(text)
  } catch {
    throw new Error(`Invalid JSON from ${url}`)
  }
}



  const statCards = [
    { label: 'Total Programs', value: stats.programs, icon: '🗓', color: 'var(--accent)', href: '/admin/program' },
    { label: 'Blog Posts', value: stats.posts, icon: '✍️', color: '#a78bfa', href: '/admin/blog' },
    { label: 'Digital CVs', value: stats.profiles, icon: '🎓', color: '#34d399', href: '/admin/profile' },
    { label: 'Enrollments', value: stats.enrollments, icon: '📋', color: '#fb923c', href: '/admin/enrollments' },
  ]

  return (
    <>
      <AdminLayout >

        <div className="p-8 bg-black min-h-screen text-white">

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-black tracking-tighter mb-2">Dashboard</h1>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">
              Logged in as {user?.name || 'Admin'}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {statCards.map(s => (
              <Link key={s.label} href={s.href} className="group">
                <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[var(--accent)]/50 transition-all">
                  <div className="text-3xl mb-4">{s.icon}</div>
                  <div className="text-4xl font-black mb-1" style={{ color: s.color }}>
                    {loading ? '...' : s.value}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500">{s.label}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-12">
            <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-slate-500 mb-6">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
              <Link href="/admin/program/new" className="px-6 py-3 bg-[var(--accent)] text-black font-bold rounded-xl text-sm hover:scale-105 transition-transform">
                + Create Program
              </Link>
              <Link href="/admin/blog/new" className="px-6 py-3 bg-white/5 border border-white/10 font-bold rounded-xl text-sm hover:bg-white/10 transition-colors">
                + Write Blog Post
              </Link>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="grid lg:grid-cols-1 gap-8">
            <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold">Recent Profiles</h3>
                <Link href="/admin/profile" className="text-xs font-mono text-[var(--accent)] hover:underline">VIEW ALL →</Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-slate-500">
                      <th className="pb-4 font-bold">Name</th>
                      <th className="pb-4 font-bold">College</th>
                      <th className="pb-4 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {recentUsers.map((profile: any) => (
                      <tr key={profile._id} className="group hover:bg-white/[0.01]">
                        <td className="py-4 text-sm font-bold">{profile.full_name}</td>
                        <td className="py-4 text-sm text-slate-400">{profile.college}</td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${profile.is_public ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                            {profile.is_public ? 'Public' : 'Private'}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {!loading && recentUsers.length === 0 && (
                      <tr><td colSpan={3} className="py-10 text-center text-slate-500 font-mono text-xs">No data found in database</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

      </AdminLayout>
    </>
  )
}