import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'

export default function PasswordGate() {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const { login } = useAdmin()

  const onSubmit = async (e) => {
    e.preventDefault()
    setErr('')
    try {
      await login(pw)
    } catch {
      setErr('Contraseña incorrecta')
    }
  }

  return (
    <div className="password-gate">
      <h2>Panel de administración</h2>
      <form onSubmit={onSubmit}>
        <input
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          type="password"
          placeholder="Contraseña"
          autoFocus
        />
        <button type="submit" className="btn">Entrar</button>
        {err && <span className="error">{err}</span>}
      </form>
    </div>
  )
}
