'use client'

import { useState } from 'react'

interface ServiceStatus {
  name: string
  status: 'up' | 'down'
  detail?: string
}

const services: ServiceStatus[] = [
  { name: 'VPS Hetzner', status: 'up', detail: 'IP 76.13.46.73' },
  { name: 'PostgreSQL', status: 'up', detail: 'Host 172.16.4.2:5432' },
  { name: 'Next.js App', status: 'up', detail: 'https://upline-dashboard.vercel.app' },
  { name: 'Flowise AI', status: 'up', detail: 'Flow ID: upline-atlas-v1' },
  { name: 'Vercel Dashboard', status: 'up', detail: 'Branch: main' },
  { name: 'Auth NextAuth', status: 'up', detail: 'JWT + Credentials' },
]

function StatusDot({ status }: { status: 'up' | 'down' }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: status === 'up' ? '#4ade80' : '#f87171',
        boxShadow: status === 'up' ? '0 0 6px #4ade80' : '0 0 6px #f87171',
      }}
    />
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#252018', border: '1px solid #3A3020', borderRadius: '12px', padding: '20px' }}>
      <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#C8B48E', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</h3>
      {children}
    </div>
  )
}

export default function AdminSystem() {
  const [testResult, setTestResult] = useState<string | null>(null)
  const [testing, setTesting] = useState(false)

  const handleTestPostgres = async () => {
    setTesting(true)
    setTestResult(null)
    try {
      const res = await fetch('/api/admin/stats')
      if (res.ok) {
        setTestResult('OK — Connexion PostgreSQL fonctionnelle')
      } else {
        setTestResult('Erreur — ' + res.status + ' ' + res.statusText)
      }
    } catch (err: any) {
      setTestResult('Erreur — ' + (err.message || 'Connexion échouée'))
    }
    setTesting(false)
  }

  return (
    <div>
      <h1 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', color: '#FFFFFF' }}>Système & Infrastructure</h1>

      {/* Cards détaillées */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <Card title="VPS">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#C8B48E', fontSize: '13px' }}>IP</span>
              <span style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: '500' }}>76.13.46.73</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#C8B48E', fontSize: '13px' }}>RAM</span>
              <span style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: '500' }}>16 GB</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#C8B48E', fontSize: '13px' }}>OS</span>
              <span style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: '500' }}>Ubuntu 22.04</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
              <span style={{ color: '#C8B48E', fontSize: '13px' }}>Statut</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4ade80', fontSize: '13px', fontWeight: '600' }}><StatusDot status="up" /> En ligne</span>
            </div>
          </div>
        </Card>

        <Card title="PostgreSQL">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#C8B48E', fontSize: '13px' }}>Host</span>
              <span style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: '500' }}>172.16.4.2</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#C8B48E', fontSize: '13px' }}>Port</span>
              <span style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: '500' }}>5432</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#C8B48E', fontSize: '13px' }}>Database</span>
              <span style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: '500' }}>ZhnKpovqAtFoNZtW</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
              <span style={{ color: '#C8B48E', fontSize: '13px' }}>Statut</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4ade80', fontSize: '13px', fontWeight: '600' }}><StatusDot status="up" /> Connecté</span>
            </div>
          </div>
        </Card>

        <Card title="Flowise AI">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#C8B48E', fontSize: '13px' }}>URL</span>
              <span style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: '500' }}>http://172.16.4.2:3001</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#C8B48E', fontSize: '13px' }}>Flow ID</span>
              <span style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: '500' }}>upline-atlas-v1</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
              <span style={{ color: '#C8B48E', fontSize: '13px' }}>Statut</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4ade80', fontSize: '13px', fontWeight: '600' }}><StatusDot status="up" /> Actif</span>
            </div>
          </div>
        </Card>

        <Card title="Vercel">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#C8B48E', fontSize: '13px' }}>Dashboard</span>
              <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer" style={{ color: '#E2B84A', fontSize: '13px', fontWeight: '500', textDecoration: 'none' }}>Ouvrir →</a>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#C8B48E', fontSize: '13px' }}>Branch</span>
              <span style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: '500' }}>main</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
              <span style={{ color: '#C8B48E', fontSize: '13px' }}>Statut</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4ade80', fontSize: '13px', fontWeight: '600' }}><StatusDot status="up" /> Déployé</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Bouton test connexion */}
      <div style={{ marginBottom: '24px' }}>
        <button
          onClick={handleTestPostgres}
          disabled={testing}
          style={{
            background: testing ? '#3A3020' : '#E2B84A',
            color: testing ? '#C8B48E' : '#161410',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: testing ? 'not-allowed' : 'pointer',
            transition: 'opacity 0.2s',
          }}
        >
          {testing ? 'Test en cours...' : 'Tester la connexion PostgreSQL'}
        </button>
        {testResult && (
          <div style={{
            marginTop: '12px',
            padding: '10px 16px',
            borderRadius: '8px',
            background: testResult.startsWith('OK') ? '#1a3a1a' : '#3a1a1a',
            color: testResult.startsWith('OK') ? '#4ade80' : '#f87171',
            fontSize: '13px',
            fontWeight: '500',
            display: 'inline-block',
          }}>
            {testResult}
          </div>
        )}
      </div>

      {/* Liste de tous les services */}
      <div style={{ background: '#252018', border: '1px solid #3A3020', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #3A3020' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#FFFFFF' }}>État des services</h2>
        </div>
        <div>
          {services.map((svc, idx) => (
            <div
              key={svc.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 20px',
                borderBottom: idx < services.length - 1 ? '1px solid #3A3020' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <StatusDot status={svc.status} />
                <div>
                  <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '500' }}>{svc.name}</div>
                  {svc.detail && <div style={{ color: '#C8B48E', fontSize: '12px', marginTop: '2px' }}>{svc.detail}</div>}
                </div>
              </div>
              <span style={{
                fontSize: '12px',
                fontWeight: '700',
                padding: '2px 10px',
                borderRadius: '4px',
                background: svc.status === 'up' ? '#1a3a1a' : '#3a1a1a',
                color: svc.status === 'up' ? '#4ade80' : '#f87171',
                textTransform: 'uppercase',
              }}>
                {svc.status === 'up' ? 'Opérationnel' : 'Hors ligne'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
