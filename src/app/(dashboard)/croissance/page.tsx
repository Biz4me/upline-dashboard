'use client'
export default function CroissancePage() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 28px 60px' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 4, fontFamily: 'var(--font-title)' }}>
          Croissance
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
          Communauté · Succès · Parrainage
        </p>
      </div>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 40, textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🏆</div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>En cours de développement</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Communauté, Succès et Parrainage seront fusionnés ici</p>
      </div>
    </div>
  )
}
