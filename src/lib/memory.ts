import { pool } from './db'

export async function getUserMemory(userId: string): Promise<string> {
  try {
    const result = await pool.query(
      `SELECT cle, valeur, contexte FROM user_memory 
       WHERE user_id = $1 
       AND (expires_at IS NULL OR expires_at > NOW())
       ORDER BY importance DESC, updated_at DESC
       LIMIT 10`,
      [userId]
    )
    
    if (result.rows.length === 0) return ''
    
    let memory = ''
    for (const row of result.rows) {
      if (row.cle === 'profil' && row.valeur) {
        const p = row.valeur
        memory += `Utilisateur : ${p.prenom || ''} ${p.nom || ''} | Société : ${p.societe || 'Non définie'} | Niveau : ${p.niveau || 'Débutant'}\n`
      }
      if (row.cle === 'historique' && row.valeur) {
        const h = row.valeur
        if (h.derniers_echanges?.length > 0) {
          memory += `Historique récent :\n`
          for (const e of h.derniers_echanges.slice(-5)) {
            memory += `- ${e.role === 'user' ? 'Utilisateur' : 'Atlas'}: ${e.content?.substring(0, 100)}...\n`
          }
        }
      }
      if (row.cle === 'resume' && row.contexte) {
        memory += `Résumé : ${row.contexte}\n`
      }
    }
    return memory
  } catch (error) {
    console.error('Memory error:', error)
    return ''
  }
}

export async function saveUserMemory(userId: string, message: string, response: string): Promise<void> {
  try {
    const existing = await pool.query(
      `SELECT valeur FROM user_memory WHERE user_id = $1 AND cle = $2`,
      [userId, 'historique']
    )
    
    let echanges = existing.rows[0]?.valeur?.derniers_echanges || []
    echanges.push({ role: 'user', content: message, at: new Date().toISOString() })
    echanges.push({ role: 'atlas', content: response, at: new Date().toISOString() })
    if (echanges.length > 20) echanges = echanges.slice(-20)
    
    await pool.query(
      `INSERT INTO user_memory (user_id, cle, valeur, categorie, importance)
       VALUES ($1, 'historique', $2::jsonb, 'conversation', 8)
       ON CONFLICT (user_id, cle) DO UPDATE SET valeur = $2::jsonb, updated_at = NOW()`,
      [userId, JSON.stringify({ derniers_echanges: echanges })]
    )
  } catch (error) {
    console.error('Save memory error:', error)
  }
}

export async function initUserMemory(userId: string, prenom: string, nom: string, societe: string, niveau: string): Promise<void> {
  try {
    await pool.query(
      `INSERT INTO user_memory (user_id, cle, valeur, categorie, importance)
       VALUES ($1, 'profil', $2::jsonb, 'identite', 10)
       ON CONFLICT (user_id, cle) DO UPDATE SET valeur = $2::jsonb, updated_at = NOW()`,
      [userId, JSON.stringify({ prenom, nom, societe, niveau })]
    )
  } catch (error) {
    console.error('Init memory error:', error)
  }
}
