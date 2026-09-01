import { SERVICIOS } from '../data/data'

export default function Services() {
  return (
    <section id="servicios" className="section-web">
      <div className="container">
        <span className="kicker">Lo que hago</span>
        <h2 className="section-title">Diseño, ilustración y creatividad visual</h2>
        <div className="services-grid">
          {SERVICIOS.map((s) => (
            <article key={s.titulo} className="service">
              <span className="service-emoji" aria-hidden="true">
                {s.emoji}
              </span>
              <h3>{s.titulo}</h3>
              <p>{s.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
