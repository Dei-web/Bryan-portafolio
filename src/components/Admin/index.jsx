import { Routes, Route, Navigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'
import PasswordGate from './PasswordGate'
import AdminLayout from './AdminLayout'
import ProjectList from './ProjectList'
import ProjectForm from './ProjectForm'
import CommentsTab from './CommentsTab'

export default function Admin() {
  const { loggedIn } = useAdmin()
  if (!loggedIn) return <PasswordGate />
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="proyectos" element={<ProjectList />} />
        <Route path="nuevo" element={<ProjectForm />} />
        <Route path="editar/:id" element={<ProjectForm />} />
        <Route path="comentarios" element={<CommentsTab />} />
        <Route index element={<Navigate to="proyectos" replace />} />
      </Route>
    </Routes>
  )
}
