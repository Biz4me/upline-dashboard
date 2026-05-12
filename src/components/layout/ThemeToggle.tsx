'use client'

import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [dark])

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded-lg bg-[#2A2A2A] text-white hover:bg-[#3A3A3A] transition-colors"
      aria-label="Basculer le thème"
    >
      {dark ? '🌙' : '☀️'}
    </button>
  )
}
