'use client'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Plus, Clock, Users, Star, BookOpen, UserCheck, X, Check } from 'lucide-react'

type EventType = 'rdv' | 'reunion' | 'evenement' | 'formation' | 'suivi' | 'autre'

interface Event {
  id: number
  title: string
  date: string
  time: string
  type: EventType
  desc?: string
  prospect?: string
}

const EVENT_TYPES: Record<EventType, { label: string; color: string; bg: string; icon: any }> = {
  rdv: { label: 'RDV Prospect', color: '#6D5EF5', bg: 'rgba(109,94,245,0.12)', icon: Users },
  reunion: { label: "Réunion d'info", color: '#22D3EE', bg: 'rgba(34,211,238,0.12)', icon: Users },
  evenement: { label: 'Événement société', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', icon: Star },
  formation: { label: 'Formation', color: '#22C55E', bg: 'rgba(34,197,94,0.12)', icon: BookOpen },
  suivi: { label: 'Suivi filleul', color: '#FF9600', bg: 'rgba(255,150,0,0.12)', icon: UserCheck },
  autre: { label: 'Autre', color: '#94A3B8', bg: 'rgba(148,163,184,0.12)', icon: Clock },
}

const INITIAL_EVENTS: Event[] = [
  { id: 1, title: 'RDV Marie Dupont', date: '2026-05-18', time: '14:00', type: 'rdv', prospect: 'Marie Dupont', desc: 'Préparer objection "c\'est une pyramide"' },
  { id: 2, title: "Réunion d'information", date: '2026-05-19', time: '19:00', type: 'reunion', desc: '3 invités confirmés' },
  { id: 3, title: 'Séminaire Herbalife', date: '2026-05-24', time: '09:00', type: 'evenement', desc: 'Convention régionale — Lyon' },
  { id: 4, title: 'Suivi Jean Martin', date: '2026-05-20', time: '11:00', type: 'suivi', prospect: 'Jean Martin' },
  { id: 5, title: 'Module 2 — Leçon 3', date: '2026-05-16', time: '08:00', type: 'formation', desc: 'La liste de 100 prospects' },
  { id: 6, title: 'RDV Sophie Bernard', date: '2026-05-22', time: '16:30', type: 'rdv', prospect: 'Sophie Bernard' },
]

const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

export default function AgendaPage() {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1)) // Mai 2026
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS)
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate())
  const [showModal, setShowModal] = useState(false)
  const [view, setView] = useState<'mois' | 'liste'>('mois')

  useEffect(() => {
    if (window.innerWidth < 768) setView('liste')
  }, [])

  const [newEvent, setNewEvent] = useState<Partial<Event>>({ type: 'rdv', date: '', time: '', title: '' })

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const startOffset = firstDay === 0 ? 6 : firstDay - 1

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.filter(e => e.date === dateStr)
  }

  const selectedDayEvents = selectedDay ? getEventsForDay(selectedDay) : []
  const selectedDateStr = selectedDay ? `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}` : ''

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) return
    setEvents(prev => [...prev, { ...newEvent, id: Date.now() } as Event])
    setShowModal(false)
    setNewEvent({ type: 'rdv', date: '', time: '', title: '' })
  }

  const upcomingEvents = events
    .filter(e => e.date >= `${year}-${String(month + 1).padStart(2, '0')}-01`)
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
    .slice(0, 10)

  return (
    <div className="page-container overflow-x-fix">
      <div className="page-inner">

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 4, fontFamily: 'var(--font-title)' }}>Mon Agenda</h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Vos rendez-vous, réunions et événements MLM</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {/* Toggle vue */}
          <div style={{ display: 'flex', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 4 }}>
            {(['mois', 'liste'] as const).map(v => (
              <button key={v} onClick={() => setView(v)} style={{ background: view === v ? 'linear-gradient(135deg, #6D5EF5, #22D3EE)' : 'transparent', border: 'none', color: view === v ? 'white' : 'var(--text-secondary)', borderRadius: 7, padding: '7px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer', textTransform: 'capitalize' }}>
                {v === 'mois' ? '📅 Mois' : '📋 Liste'}
              </button>
            ))}
          </div>
          <button onClick={() => setShowModal(true)} style={{ background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', border: 'none', color: 'white', borderRadius: 12, padding: '10px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 12px rgba(109,94,245,0.35)' }}>
            <Plus size={16} /> Ajouter
          </button>
        </div>
      </div>

      {/* Légende types */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {Object.entries(EVENT_TYPES).map(([key, val]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6, background: val.bg, border: `1px solid ${val.color}30`, borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600, color: val.color }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: val.color }} />
            {val.label}
          </div>
        ))}
      </div>

      {view === 'mois' && (
        <div className="grid-auto" style={{ gap: 20 }}>

          {/* Calendrier */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', overflowX: 'auto' }}>
            {/* Nav mois */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
              <button onClick={prevMonth} style={{ background: 'var(--bg-page)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', color: 'var(--text)', display: 'flex', alignItems: 'center' }}>
                <ChevronLeft size={16} />
              </button>
              <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)' }}>
                {MONTHS[month]} {year}
              </div>
              <button onClick={nextMonth} style={{ background: 'var(--bg-page)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', color: 'var(--text)', display: 'flex', alignItems: 'center' }}>
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Jours de la semaine */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid var(--border)' }}>
              {DAYS.map(d => (
                <div key={d} style={{ padding: '10px 0', textAlign: 'center', fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{d}</div>
              ))}
            </div>

            {/* Grille jours */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
              {Array.from({ length: startOffset }).map((_, i) => (
                <div key={`empty-${i}`} style={{ minHeight: 80, borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-page)', opacity: 0.3 }} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const dayEvents = getEventsForDay(day)
                const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
                const isSelected = day === selectedDay

                return (
                  <div
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    style={{
                      minHeight: 80, padding: '6px 8px',
                      borderRight: '1px solid var(--border)',
                      borderBottom: '1px solid var(--border)',
                      cursor: 'pointer',
                      background: isSelected ? 'rgba(109,94,245,0.08)' : 'transparent',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'var(--bg-page)' }}
                    onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent' }}
                  >
                    <div style={{
                      width: 26, height: 26, borderRadius: '50%',
                      background: isToday ? 'linear-gradient(135deg, #6D5EF5, #22D3EE)' : isSelected ? 'rgba(109,94,245,0.15)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: isToday || isSelected ? 800 : 500,
                      color: isToday ? 'white' : isSelected ? '#6D5EF5' : 'var(--text)',
                      marginBottom: 4,
                    }}>
                      {day}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {dayEvents.slice(0, 2).map(ev => (
                        <div key={ev.id} style={{ fontSize: 10, fontWeight: 600, background: EVENT_TYPES[ev.type].bg, color: EVENT_TYPES[ev.type].color, borderRadius: 4, padding: '2px 5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {ev.time} {ev.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>+{dayEvents.length - 2} autre{dayEvents.length - 2 > 1 ? 's' : ''}</div>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Panel jour sélectionné */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 20, height: 'fit-content' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 16 }}>
              {selectedDay ? `${selectedDay} ${MONTHS[month]}` : 'Sélectionne un jour'}
            </div>
            {selectedDayEvents.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>📭</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Aucun événement ce jour</div>
                <button onClick={() => { setNewEvent(prev => ({ ...prev, date: selectedDateStr })); setShowModal(true) }}
                  style={{ marginTop: 12, background: 'rgba(109,94,245,0.1)', border: '1px solid rgba(109,94,245,0.25)', color: '#a78bfa', borderRadius: 10, padding: '8px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                  + Ajouter un événement
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {selectedDayEvents.map(ev => {
                  const t = EVENT_TYPES[ev.type]
                  const Icon = t.icon
                  return (
                    <div key={ev.id} style={{ background: t.bg, border: `1.5px solid ${t.color}30`, borderRadius: 12, padding: '12px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <Icon size={14} color={t.color} />
                        <span style={{ fontSize: 11, fontWeight: 700, color: t.color, textTransform: 'uppercase', letterSpacing: 0.5 }}>{t.label}</span>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 'auto' }}>⏰ {ev.time}</span>
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: ev.desc ? 4 : 0 }}>{ev.title}</div>
                      {ev.desc && <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{ev.desc}</div>}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Vue Liste */}
      {view === 'liste' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {upcomingEvents.length === 0 ? (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 40, textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
              <p style={{ color: 'var(--text-muted)' }}>Aucun événement à venir</p>
            </div>
          ) : (
            upcomingEvents.map(ev => {
              const t = EVENT_TYPES[ev.type]
              const Icon = t.icon
              const [evYear, evMonth, evDay] = ev.date.split('-')
              return (
                <div key={ev.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: t.bg, border: `1.5px solid ${t.color}30`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ fontSize: 16, fontWeight: 900, color: t.color, lineHeight: 1 }}>{evDay}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: t.color, textTransform: 'uppercase' }}>{MONTHS[parseInt(evMonth) - 1].slice(0, 3)}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 150 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{ev.title}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, background: t.bg, color: t.color, padding: '2px 8px', borderRadius: 20 }}>{t.label}</span>
                    </div>
                    {ev.desc && <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{ev.desc}</div>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
                    <Clock size={14} />
                    {ev.time}
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}

      {/* Modal ajout événement */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false) }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: 32, width: '100%', maxWidth: 480, boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)' }}>Nouvel événement</div>
              <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Type */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Type</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {Object.entries(EVENT_TYPES).map(([key, val]) => (
                    <button key={key} onClick={() => setNewEvent(prev => ({ ...prev, type: key as EventType }))}
                      style={{ background: newEvent.type === key ? val.bg : 'var(--bg-page)', border: `1.5px solid ${newEvent.type === key ? val.color : 'var(--border)'}`, color: newEvent.type === key ? val.color : 'var(--text-muted)', borderRadius: 20, padding: '5px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                      {val.label}
                    </button>
                  ))}
                </div>
              </div>
              {/* Titre */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Titre *</div>
                <input value={newEvent.title || ''} onChange={e => setNewEvent(prev => ({ ...prev, title: e.target.value }))} placeholder="Ex: RDV Marie Dupont"
                  style={{ width: '100%', background: 'var(--bg-page)', border: '1.5px solid var(--border)', borderRadius: 10, padding: '11px 14px', fontSize: 14, color: 'var(--text)', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#6D5EF5'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>
              {/* Date + Heure */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Date *</div>
                  <input type="date" value={newEvent.date || ''} onChange={e => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                    style={{ width: '100%', background: 'var(--bg-page)', border: '1.5px solid var(--border)', borderRadius: 10, padding: '11px 14px', fontSize: 14, color: 'var(--text)', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = '#6D5EF5'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Heure *</div>
                  <input type="time" value={newEvent.time || ''} onChange={e => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                    style={{ width: '100%', background: 'var(--bg-page)', border: '1.5px solid var(--border)', borderRadius: 10, padding: '11px 14px', fontSize: 14, color: 'var(--text)', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = '#6D5EF5'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                </div>
              </div>
              {/* Description */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Notes / Description</div>
                <textarea value={newEvent.desc || ''} onChange={e => setNewEvent(prev => ({ ...prev, desc: e.target.value }))} rows={2} placeholder="Détails, points à aborder..."
                  style={{ width: '100%', background: 'var(--bg-page)', border: '1.5px solid var(--border)', borderRadius: 10, padding: '11px 14px', fontSize: 14, color: 'var(--text)', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                  onFocus={e => e.target.style.borderColor = '#6D5EF5'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>
              {/* Boutons */}
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button onClick={() => setShowModal(false)} style={{ flex: 1, background: 'var(--bg-page)', border: '1px solid var(--border)', color: 'var(--text-secondary)', borderRadius: 10, padding: '12px 0', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                  Annuler
                </button>
                <button onClick={addEvent} style={{ flex: 2, background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', border: 'none', color: 'white', borderRadius: 10, padding: '12px 0', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 12px rgba(109,94,245,0.3)' }}>
                  <Check size={16} /> Ajouter l'événement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}
