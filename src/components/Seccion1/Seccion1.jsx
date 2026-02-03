import { useState, useEffect } from 'react'
import frame1Rojo from '../../assets/svg/rojo/Frame 1.svg'
import frame1Blanco from '../../assets/svg/blanco/Frame 1.svg'
import scarletGif from '../../assets/images/scarletwitch.gif'
import scarletPng from '../../assets/images/scarletwitch.png'
import './Seccion1.css'

function Seccion1({ isTransmuted }) {
  const [gifTrigger, setGifTrigger] = useState(null)

  useEffect(() => {
    if (isTransmuted && !gifTrigger) {
      // Use a timestamp to force the GIF to start from frame 1
      setGifTrigger(`${scarletGif}?t=${Date.now()}`)
    }
  }, [isTransmuted, gifTrigger])

  return (
    <div className={`seccion seccion-1 ${isTransmuted ? 'transmuted' : ''}`}>
      <div className="marco-final-container">
        <div className="imagen-fondo">
          {/* Static image as base (optional, depends on if they want it gone or not) */}
          {!isTransmuted && <img src={scarletPng} className="base-image" alt="" />}
          
          {/* GIF Overlay */}
          {gifTrigger && (
            <img 
              src={gifTrigger} 
              className="gif-overlay" 
              alt="" 
            />
          )}
        </div>
        <div className="magic-ring"></div>
        <img src={frame1Rojo} className="svg-rojo-base" alt="Frame 1 Rojo Base" />
        <img src={frame1Rojo} className="svg-rojo" alt="Frame 1 Rojo" />
        <div className="neon-layer">
          <img src={frame1Blanco} className="svg-neon" alt="Frame 1 Blanco" />
        </div>
      </div>
    </div>
  )
}

export default Seccion1
