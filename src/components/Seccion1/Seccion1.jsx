import frame1Rojo from '../../assets/svg/rojo/Frame 1.svg'
import frame1Blanco from '../../assets/svg/blanco/Frame 1.svg'
import scarletPng from '../../assets/images/scarletwitch.png'
import glowyeyesPng from '../../assets/images/glowyeyes.png'
import './Seccion1.css'

function Seccion1({ isTransmuted }) {

  return (
    <div className={`seccion seccion-1 ${isTransmuted ? 'transmuted' : ''}`}>
      <div className="marco-final-container">
        <div className="imagen-fondo">
          {/* Static image as base */}
          <img src={scarletPng} className="base-image" alt="" />
          
          {/* Glow Overlay */}
          <img 
            src={glowyeyesPng} 
            className="glow-overlay" 
            alt="" 
          />
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
