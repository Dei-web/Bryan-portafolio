import { useState, useEffect, useCallback } from 'react'
import { api } from './useApi'

export default function useComments(projectId, imageIndex) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchComments = useCallback(async () => {
    setLoading(true)
    try {
      const q = new URLSearchParams({ projectId })
      if (imageIndex !== '') q.set('imageIndex', imageIndex)
      const data = await api(`/comments?${q}`)
      setComments(data)
    } catch {
      setComments([])
    }
    setLoading(false)
  }, [projectId, imageIndex])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const addComment = async (author, text) => {
    const c = await api('/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ project_id: projectId, image_index: imageIndex, author, text }),
    })
    setComments((prev) => [...prev, c])
  }

  return { comments, loading, addComment }
}
