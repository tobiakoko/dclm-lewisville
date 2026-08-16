'use client'

import { Share2 } from 'lucide-react'

interface ShareButtonProps {
  title: string
}

export default function ShareButton({ title }: ShareButtonProps) {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:border-[var(--church-red)] hover:text-[var(--church-red)] transition-all shadow-sm"
      onClick={() => {
        // Native share fallback
        if (typeof navigator !== 'undefined' && navigator.share) {
          navigator.share({ title, url: window.location.href })
        }
      }}
    >
      <Share2 size={16} /> Share
    </button>
  )
}