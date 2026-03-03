'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

// Updated navItems to match your singular API/Folder structure where necessary
const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/program', label: 'Programs', icon: '🗓' }, // Matches your folder: program
  { href: '/admin/blog', label: 'Blog Posts', icon: '✍️' },    // Matches your folder: blog
  { href: '/admin/profile', label: 'Profiles', icon: '👥' }, // Matches your folder: profile
  { href: '/admin/enrollments', label: 'Enrollments', icon: '📋' },
]


export default function AdminLayout({ children}: {
  children:ReactNode
}) {
  const pathname = usePathname() // New App Router hook for active states
  const user = useSelector((state: RootState) => state.user);

  console.log(user);

  // Authorization Guard
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex  items-center justify-center bg-black text-white ">
        <div className="text-center p-10 border border-white/10 rounded-[2rem] bg-white/[0.02] backdrop-blur-xl">
          <div className="text-6xl mb-6">🚫</div>
          <h2 className="text-3xl font-black tracking-tighter mb-3">Admin Access Required</h2>
          <p className="text-slate-400 font-mono text-xs uppercase tracking-widest mb-8">
            Please log in with an authorized account.
          </p>
          <Link href="/" className="px-8 py-3 bg-[var(--accent)] text-black font-bold rounded-xl hover:scale-105 transition-transform inline-block">
            Return to Safety
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-black text-white pt-5">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 flex-shrink-0 sticky top-0 h-screen overflow-y-auto bg-black pt-10 px-4">
        <div className="mb-10 px-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-2">Internal Systems</div>
          <div className="text-2xl font-black tracking-tighter text-[var(--accent)]">ISE ADMIN</div>
        </div>

        <nav className="space-y-2">
          {navItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
                  isActive 
                    ? 'bg-[var(--accent)] text-black shadow-[0_0_20px_rgba(232,255,71,0.2)]' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* User Footer */}
        <div className="absolute bottom-8 left-4 right-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Identity</div>
          <div className="font-black text-sm mt-1 truncate">{user.email}</div>
          <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded-md bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-bold uppercase tracking-tighter border border-[var(--accent)]/20">
            Authorized Admin
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-h-screen overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}