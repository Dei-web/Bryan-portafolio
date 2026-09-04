import { useState, useRef, useEffect, useCallback } from 'react'

export default function ImageViewer({
  src,
  alt,
  aspectRatio: initialAspectRatio = 1,
  index,
  total,
  onNav,
  onClose
}) {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [loaded, setLoaded] = useState(false)
  const [aspectRatio, setAspectRatio] = useState(initialAspectRatio)


  const imgRef = useRef(null)
  const viewerRef = useRef(null)
  const viewportRef = useRef(null)

  const clampZoom = (z) => Math.max(1, Math.min(4, z))

  const getPanLimits = useCallback(() => {
    const viewport = viewportRef.current
    if (!viewport) return { maxPanX: 0, maxPanY: 0 }

    const viewportRect = viewport.getBoundingClientRect()
    const viewportW = viewportRect.width
    const viewportH = viewportRect.height
    const viewportAR = viewportW / viewportH

    let visualW, visualH
    if (aspectRatio > viewportAR) {
      visualW = viewportW * zoom
      visualH = (viewportW / aspectRatio) * zoom
    } else {
      visualH = viewportH * zoom
      visualW = (viewportH * aspectRatio) * zoom
    }

    const maxPanX = Math.max(0, (visualW - viewportW) / 2)
    const maxPanY = Math.max(0, (visualH - viewportH) / 2)

    // DEBUG LOG
    console.log('[DEBUG getPanLimits]', {
      zoom,
      aspectRatio,
      viewportW,
      viewportH,
      viewportAR,
      visualW,
      visualH,
      maxPanX,
      maxPanY,
      panVisualX: pan.x * zoom,
      panVisualY: pan.y * zoom,
      pan: { x: pan.x, y: pan.y }
    })

    return { maxPanX, maxPanY }
  }, [zoom, aspectRatio])

  const clampPan = useCallback((x, y) => {
    const { maxPanX, maxPanY } = getPanLimits()
    const clampedX = Math.max(-maxPanX, Math.min(maxPanX, x))
    const clampedY = Math.max(-maxPanY, Math.min(maxPanY, y))

    // DEBUG LOG
    console.log('[DEBUG clampPan]', {
      inputX: x,
      inputY: y,
      maxPanX,
      maxPanY,
      clampedX,
      clampedY,
      panVisualX: clampedX * zoom,
      panVisualY: clampedY * zoom
    })

    return { x: clampedX, y: clampedY }
  }, [getPanLimits, zoom])

  const handleWheel = (e) => {
    e.preventDefault()
    const viewport = viewportRef.current
    if (!viewport) return

    const rect = viewport.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2

    const delta = e.deltaY > 0 ? -0.1 : 0.1
    const newZoom = clampZoom(zoom + delta)

    if (newZoom !== zoom) {
      const factor = newZoom / zoom
      const newPanX = pan.x * factor - offsetX * (factor - 1)
      const newPanY = pan.y * factor - offsetY * (factor - 1)

      // DEBUG LOG
      console.log('[DEBUG handleWheel]', {
        oldZoom: zoom,
        newZoom,
        factor,
        offsetX,
        offsetY,
        panBefore: { x: pan.x, y: pan.y },
        newPanX,
        newPanY,
        panVisualXBefore: pan.x * zoom,
        panVisualYBefore: pan.y * zoom
      })

      const clamped = clampPan(newPanX, newPanY)
      setPan(clamped)
      setZoom(newZoom)
    }
  }

  const handleDoubleClick = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  const handleMouseDown = (e) => {
    if (zoom <= 1) return
    e.preventDefault()
    setIsDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const newPanX = e.clientX - dragStart.x
    const newPanY = e.clientY - dragStart.y

    // DEBUG LOG before clamp
    console.log('[DEBUG handleMouseMove raw]', {
      newPanX,
      newPanY,
      dragStart: { x: dragStart.x, y: dragStart.y },
      clientX: e.clientX,
      clientY: e.clientY
    })

    const clamped = clampPan(newPanX, newPanY)

    // DEBUG LOG after clamp
    console.log('[DEBUG handleMouseMove clamped]', {
      clampedX: clamped.x,
      clampedY: clamped.y,
      panVisualX: clamped.x * zoom,
      panVisualY: clamped.y * zoom
    })

    setPan(clamped)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e) => {
  if (window.innerWidth > 700) return
  setTouchStartX(e.touches[0].clientX)
}



  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowLeft' && index > 0) {
      onNav(index - 1)
    } else if (e.key === 'ArrowRight' && index < total - 1) {
      onNav(index + 1)
    } else if (e.key === '+' || e.key === '=') {
      setZoom((z) => clampZoom(z + 0.2))
    } else if (e.key === '-') {
      setZoom((z) => clampZoom(z - 0.2))
    } else if (e.key === '0') {
      setZoom(1)
      setPan({ x: 0, y: 0 })
    }
  }

  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.currentTarget
    if (naturalWidth && naturalHeight) {
      const ar = naturalWidth / naturalHeight
      setAspectRatio(ar)
    }
    setLoaded(true)
  }

  useEffect(() => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
    setLoaded(false)
  }, [src])

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    viewport.addEventListener('wheel', handleWheel, { passive: false })
    return () => viewport.removeEventListener('wheel', handleWheel, { passive: false })
  }, [handleWheel])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleMouseMove, handleMouseUp, handleKeyDown])

  const getCursor = () => {
    if (zoom <= 1) return 'zoom-in'
    if (isDragging) return 'grabbing'
    return 'grab'
  }

  return (
    <div
      ref={viewerRef}
      className="image-viewer"
      style={{ '--img-ar': aspectRatio }}
      onKeyDown={handleKeyDown}
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
    >
      <button
        className="image-viewer-close"
        onClick={onClose}
        aria-label="Cerrar"
      >
        ×
      </button>

      <button
        className="image-viewer-nav prev"
        disabled={index === 0}
        onClick={(e) => { e.stopPropagation(); onNav(index - 1) }}
        aria-label="Imagen anterior"
      >
        ‹
      </button>
      <button
        className="image-viewer-nav next"
        disabled={index === total - 1}
        onClick={(e) => { e.stopPropagation(); onNav(index + 1) }}
        aria-label="Imagen siguiente"
      >
        ›
      </button>
      <span className="image-viewer-counter" aria-hidden="true">
        {index + 1} / {total}
      </span>

<div
  ref={viewportRef}
  className="image-viewer-viewport"
>

        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          onDoubleClick={handleDoubleClick}
          onMouseDown={handleMouseDown}
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            cursor: getCursor(),
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.2s ease'
          }}
        />
      </div>
    </div>
  )
}