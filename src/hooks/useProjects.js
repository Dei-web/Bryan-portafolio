import { useState, useEffect } from 'react'
import { api } from './useApi'

export default function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    setLoading(true)
    api('/projects')
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [refresh])

  return { projects, loading, refreshProjects: () => setRefresh((r) => r + 1) }
}
