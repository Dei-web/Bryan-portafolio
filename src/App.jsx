import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { AdminProvider } from './context/AdminContext'
import NavBar from './components/NavBar'
import Landing from './components/Landing'
import ProjectPage from './components/ProjectPage'
import FooterBar from './components/FooterBar'
import Admin from './components/Admin'

function ScrollReset() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollReset />
      <AdminProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/proyecto/:id" element={<ProjectPage />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="*" element={<Landing />} />
        </Routes>
        <FooterBar />
      </AdminProvider>
    </BrowserRouter>
  )
}
