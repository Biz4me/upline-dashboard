'use client'
import { createContext, useContext, useState, useEffect } from 'react'

interface SidebarContextType {
  collapsed: boolean
  setCollapsed: (v: boolean) => void
  mobileOpen: boolean
  setMobileOpen: (v: boolean) => void
  isMobile: boolean
  profileMode: boolean
  setProfileMode: (v: boolean) => void
  profileTab: string
  setProfileTab: (v: string) => void
}

const SidebarContext = createContext<SidebarContextType>({
  collapsed: false,
  setCollapsed: () => {},
  mobileOpen: false,
  setMobileOpen: () => {},
  isMobile: false,
  profileMode: false,
  setProfileMode: () => {},
  profileTab: 'profil',
  setProfileTab: () => {},
})

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [profileMode, setProfileMode] = useState(false)
  const [profileTab, setProfileTab] = useState('profil')

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      const tablet = window.innerWidth >= 768 && window.innerWidth < 1024
      setIsMobile(mobile)
      if (tablet) setCollapsed(true)
      if (window.innerWidth >= 1024) setCollapsed(false)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, mobileOpen, setMobileOpen, isMobile, profileMode, setProfileMode, profileTab, setProfileTab }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => useContext(SidebarContext)
