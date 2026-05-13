'use client'
import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])
  return (
    <button
      onClick={() => setDark(!dark)}
      className="w-9 h-9 rounded-lg bg-[#2A2318] hover:bg-[#3d3420] flex items-center justify-center text-[#6A5A3A] hover:text-white transition-all"
    >
      {dark ? <Sun size={16} strokeWidth={1.8} /> : <Moon size={16} strokeWidth={1.8} />}
    </button>
  )
}
