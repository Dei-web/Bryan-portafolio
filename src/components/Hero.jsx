import { Link } from 'react-router-dom'

const CHIPS = ['Atención al detalle', 'Hecho para inspirar', 'Multitarea', 'Pensamiento estratégico', 'Impulsado por cafeína']

export default function Hero() {
  return (
    <header className="hero container">
      <div className="hero-copy">
        <span className="kicker">Diseño · Ilustración · Arte digital</span>
        <h1>
          Bryan — Diseñador Gráfico & <span className="hl-green">Artista Digital</span>
        </h1>
        <p>
          Creo diseños únicos, ilustraciones personalizadas y contenido visual que destaca. Combino el dibujo, la edición y el diseño gráfico para dar vida a tus ideas.
        </p>
        <div className="hero-ctas">
          <Link className="btn" to="/#proyectos">
            Ver proyectos
          </Link>
          <Link className="btn btn-ghost" to="/#contacto">
            Contáctame
          </Link>
        </div>
        <ul className="chips">
          {CHIPS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
      <div className="hero-art" aria-hidden="true">
        <img src="/imagenes/logo-ghost.png" alt="" />
      </div>
    </header>
  )
}
