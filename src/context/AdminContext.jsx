import { createContext, useContext, useState } from 'react'
import { api } from '../hooks/useApi'

const AdminContext = createContext(null)

export function AdminProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(() => !!sessionStorage.getItem('admin'))
  const [password, setPassword] = useState(() => sessionStorage.getItem('adminPw') || '')

  const login = async (pw) => {
    const r = await api('/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    })
    if (r.ok) {
      sessionStorage.setItem('admin', '1')
      sessionStorage.setItem('adminPw', pw)
      setLoggedIn(true)
      setPassword(pw)
    } else {
      throw new Error('Contraseña incorrecta')
    }
  }

  const logout = () => {
    sessionStorage.removeItem('admin')
    sessionStorage.removeItem('adminPw')
    setLoggedIn(false)
    setPassword('')
  }

  return <AdminContext.Provider value={{ loggedIn, password, login, logout }}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  return useContext(AdminContext)
}

export default AdminContext
