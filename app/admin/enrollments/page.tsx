'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { Enrollment } from '@/utils/InterfaceType'

export default function AdminEnrollments() {

  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)
  let fetehData = () => { };

  useEffect(() => {
    // This fetches from your (upcoming) enrollment API
    fetehData = async () => {
      try {
        const res = await fetch('/api/enrollment')
        if (!res.ok) throw new Error('Failed to fetch');
        const data: Enrollment[] = await res.json();
        setEnrollments(data);
      }
      catch (error: any) {
        console.error(error);
        setEnrollments([])
      }

    }
    fetehData()


  }, [])

  const handleDelete = async (enrollmentId: string, programId: string) => {
    if (!confirm("Are you sure you want to remove this student? This will free up one seat.")) return;

    try {
      const res = await fetch(`/api/enrollment?id=${enrollmentId}&programId=${programId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        // Update local state to remove the row immediately
        setEnrollments((prev) => prev.filter((e) => e.id !== enrollmentId));
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Failed to delete");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }

  };





  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tighter uppercase">Enrollments</h1>
          <p className="text-slate-500 font-mono text-xs mt-2 uppercase tracking-widest">Tracking Student Participation</p>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] text-[10px] uppercase tracking-[0.2em] text-slate-500">
              <tr>
                <th className="p-6">Student Name</th>
                <th className="p-6">Program / Event</th>
                <th className="p-6">Date Enrolled</th>
                <th className="p-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {enrollments.map((e: any) => (
                <tr key={e._id} className="hover:bg-white/[0.01]">
                  <td className="p-6 font-bold">{e.userName}</td>
                  <td className="p-6">
                    <div className="text-sm">{e.programTitle}</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-tighter">ID: {e.programId.slice(-6)}</div>
                  </td>
                  <td className="p-6 text-xs font-mono text-slate-400">
                    {new Date(e.enrolledAt).toLocaleDateString()}
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-[10px] font-bold uppercase">
                      {e.status}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <button
                      onClick={() => handleDelete(e._id, e.programId)}
                      className="text-red-500 hover:text-red-400 p-2 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && enrollments.length === 0 && (
            <div className="p-20 text-center text-slate-600 font-mono text-xs uppercase tracking-widest">No active enrollments found.</div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}