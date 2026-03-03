import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative bg-black text-white border-t border-white/5 pt-20 pb-10">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent opacity-30" />
      
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="font-head font-black text-2xl tracking-tighter mb-6 block group">
              ISE<span className="text-[var(--accent)] group-hover:animate-pulse">.</span>
            </Link>
            <p className="text-slate-400 font-light leading-relaxed max-w-sm mb-6">
              Institute of Student Engineering — A Non-Profit (Reg No. 391) empowering frugal innovators to solve real-world challenges through entrepreneurial grit.
            </p>
            <div className="flex gap-4">
              {/* Social Placeholders */}
              {['LinkedIn', 'Twitter', 'Instagram'].map(platform => (
                <a key={platform} href="#" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] uppercase font-bold tracking-tighter hover:bg-[var(--accent)] hover:text-black transition-all">
                  {platform[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {[
            {
              title: 'Platform',
              links: [{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Programs', href: '/programs' }, { label: 'Blog', href: '/blog' }]
            },
            {
              title: 'Community',
              links: [{ label: 'Student Sections', href: '#' }, { label: 'Mentors', href: '#' }, { label: 'Alumni', href: '#' }]
            },
            {
              title: 'Legal',
              links: [{ label: 'Privacy Policy', href: '#' }, { label: 'Terms of Use', href: '#' }, { label: 'Contact', href: '#' }]
            }
          ].map(col => (
            <div key={col.title} className="col-span-1">
              <h5 className="text-[var(--accent)] text-xs font-mono tracking-widest uppercase mb-6">{col.title}</h5>
              <ul className="space-y-4">
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-slate-500 hover:text-white transition-colors text-sm font-light">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
              © 2026 Institute of Student Engineering
            </p>
            <p className="text-[10px] text-slate-700 uppercase tracking-tighter">
              Regd No. 391 of 2016, AP Registration Act 2001
            </p>
          </div>
          
          <div className="px-4 py-2 rounded-full bg-white/[0.02] border border-white/5">
            <p className="text-[10px] text-slate-400 font-light tracking-wide">
              Built with <span className="text-[var(--accent)]">Passion</span> for the next generation of engineers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}