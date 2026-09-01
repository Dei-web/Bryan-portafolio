import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from './Hero'
import Services from './Services'
import About from './About'
import ProjectsCovers from './ProjectsCovers'
import Contact from './Contact'

const MARQUEE = 'DISEÑO GRÁFICO ✦ ILUSTRACIÓN ✦ BRANDING  CONTENIDO VISUAL ✦ DIRECCIÓN VISUAL ✦ '

export default function Landing() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [hash])

  return (
    <>
      <Hero />
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>{MARQUEE}</span>
          <span>{MARQUEE}</span>
        </div>
      </div>
      <Services />
      <About />
      <ProjectsCovers />
      <Contact />
    </>
  )
}
