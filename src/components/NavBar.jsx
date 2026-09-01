import { Link } from 'react-router-dom'
import { CONTACTO } from '../data/data'

const LINKS = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'contacto', label: 'Contacto' },
]

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          <img src="/imagenes/logo-ghost-app.png" alt="Logo brxan.art" />
          <span>brxan.art</span>
        </Link>
        <div className="nav-links">
          {LINKS.map((l) => (
            <Link key={l.id} to={`/#${l.id}`}>
              {l.label}
            </Link>
          ))}
          <Link to="/admin" className="btn btn-small">
            Admin
          </Link>
          <a className="btn btn-small" href={CONTACTO.whatsapp.url} target="_blank" rel="noreferrer">
            Hablemos
          </a>
        </div>
      </div>
    </nav>
  )
}
