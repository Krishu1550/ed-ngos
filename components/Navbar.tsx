'use client'

import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {UserState} from '@/store/userSlice'
import { logoutUser } from '@/store/userSlice';
import { signOut } from "next-auth/react";

export default function Navbar() {
   const user:UserState = useSelector((state:RootState) => state.user);
   const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const path = usePathname()

  const links = [
    { label: 'Home', href: '/home' },
    { label: 'About', href: '/about' },
    { label: 'Programs', href: '/program' },
    { label: 'Blog', href: '/blog' },
  ]
 const handleLogout = async () => {
    dispatch(logoutUser()); // Clear Redux
    await signOut({ callbackUrl: '/' }); // Clear NextAuth Session
  };

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 border-b border-white/5 bg-black/60 backdrop-blur-xl px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/home" className="font-head font-black text-2xl tracking-tighter no-underline flex-1 flex items-center group">
          <span className="text-white group-hover:text-[var(--accent)] transition-colors">ISE</span>
          <span className="text-[var(--accent)] ml-0.5">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {links.map(({ label, href }) => (
              <Link 
                key={href} 
                href={href} 
                className={`text-xs font-bold uppercase tracking-widest transition-all hover:text-[var(--accent)] ${
                  path === href ? 'text-[var(--accent)]' : 'text-slate-400'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="h-4 w-px bg-white/10" />

          {/* Auth & Profile */}
          <div className="flex items-center gap-4">
            {!user.email ? (
              <>
              <Link href="/auth/sign-in" > <button className="text-xs font-bold text-white hover:text-[var(--accent)] transition-colors">
                  LOGIN
                </button></Link> 
           <Link href="/auth/sign-up"><button className="bg-[var(--accent)] text-black px-5 py-2 rounded-lg text-xs font-black hover:scale-105 transition-transform">
                  JOIN ISE
                </button></Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                {user.role === 'admin' && (
                  <Link 
                    href="/admin" 
                    className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-slate-400 hover:text-[var(--accent)] transition-colors uppercase font-mono"
                  >
                    Admin Area
                  </Link>
                )}
                
                <Link href="/profile" className="relative group">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center text-black font-black text-xs transition-transform group-hover:rotate-6">
                    {user.email?.at(0)?.toUpperCase()}
                  </div>
                  {/* Subtle status dot */}
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full" />
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-slate-500 hover:text-red-400 transition-colors"
                  title="Sign Out"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-black border-b border-white/5 flex flex-col p-6 gap-6 md:hidden animate-in slide-in-from-top-4">
          {links.map(({ label, href }) => (
            <Link 
              key={href} 
              href={href} 
              className="text-lg font-bold text-white"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="h-px bg-white/5 w-full" />
          {!user ? (
            <div className="flex flex-col gap-4">
              <Link href="/auth/sign-in" ><button className="bg-white text-black p-4 rounded-xl font-black">Log In</button></Link>
              <Link href="/auth/sign-up"><button className="bg-[var(--accent)] text-black p-4 rounded-xl font-black">Join ISE</button></Link>
            </div>
          ) : (
            <button 
              onClick={handleLogout}
              className="text-red-400 font-bold text-left"
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </nav>
  )
}