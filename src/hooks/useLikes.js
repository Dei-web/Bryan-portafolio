import { useEffect, useState } from 'react'

const LS_KEY = 'brxan-likes'

export default function useLikes() {
  const [liked, setLiked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY)) || {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(liked))
  }, [liked])

  const toggle = (id) => setLiked((prev) => ({ ...prev, [id]: !prev[id] }))

  return { liked, toggle }
}
