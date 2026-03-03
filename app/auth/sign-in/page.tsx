'use client';

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Lock, Mail, ArrowRight } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
    
      email,
      password,
      callbackUrl: "/profile", // Redirect after successful login
      
    });
    
    if(result?.ok)
    {
      alert(result.status);
    }
  

    setLoading(false);

    if (result?.error) {
      setError("Invalid credentials. Please try again.");
    } else {
      router.push("/profile"); // Or wherever your internal home is
     // router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 selection:bg-white selection:text-black">
      {/* Background Glow Decor */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[400px] space-y-8 relative">
        {/* Logo/Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 bg-white rounded-2xl items-center justify-center mb-4 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <Lock className="text-black" size={24} />
          </div>
          <h1 className="text-4xl font-black tracking-tighter italic">Welcome Back.</h1>
          <p className="text-white/40 text-sm">Continue building your digital legacy.</p>
        </div>

        {/* Form Card */}
        <div className="p-8 bg-white/[0.02] border border-white/10 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold text-center animate-in fade-in zoom-in-95">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="block text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@example.com"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 focus:border-white/40 focus:bg-white/[0.06] outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">
                Security Key
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 focus:border-white/40 focus:bg-white/[0.06] outline-none transition-all text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full bg-white text-black h-14 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-white/30 text-xs font-medium">
              New to the platform?{" "}
              <Link href="/sign-up" className="text-white hover:underline underline-offset-4 decoration-white/30 transition-all">
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center">
          <Link href="/" className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 hover:text-white/60 transition-colors">
            ← Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}