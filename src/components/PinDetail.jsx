import { useState } from 'react'
import ImageViewer from './ImageViewer'
import InfoPanel from './InfoPanel'

export default function PinDetail({ proyecto, idx, onNav, onClose }) {
  const [imageIndex, setImageIndex] = useState(idx)

  const handleNav = (newIndex) => {
    if (newIndex >= 0 && newIndex < proyecto.images.length) {
      setImageIndex(newIndex)
    }
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <div className="pindetail" onClick={handleClose} role="dialog" aria-modal="true">
      <div className="pindetail-container" onClick={(e) => e.stopPropagation()}>
        <ImageViewer
          src={proyecto.images[imageIndex].url}
          alt={proyecto.images[imageIndex].description}
          index={imageIndex}
          total={proyecto.images.length}
          onNav={handleNav}
          onClose={handleClose}
        />
        <InfoPanel
          proyecto={proyecto}
          idx={idx}
          imageIndex={imageIndex}
        />
      </div>
    </div>
  )
}