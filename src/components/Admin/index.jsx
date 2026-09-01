import { useAdmin } from '../../context/AdminContext'
import PasswordGate from './PasswordGate'
import AdminLayout from './AdminLayout'
import ProjectList from './ProjectList'
import ProjectForm from './ProjectForm'
import CommentsTab from './CommentsTab'

export default function Admin() {
  const { loggedIn } = useAdmin()
  if (!loggedIn) return <PasswordGate />
  return <AdminLayout />
}
