import { Outlet, NavLink } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

export default function AdminLayout() {
  const { logout } = useAdmin()

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <h2>Panel de administración</h2>
        <button className="btn btn-small btn-ghost" onClick={logout}>
          Cerrar sesión
        </button>
      </header>
      <nav className="admin-tabs">
        <NavLink to="proyectos" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Proyectos
        </NavLink>
        <NavLink to="comentarios" className={({ isActive }) => (isActive ? 'active' : '')}>
          Comentarios
        </NavLink>
      </nav>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  )
}
