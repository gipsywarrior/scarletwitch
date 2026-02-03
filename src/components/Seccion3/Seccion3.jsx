import frame3 from '../../assets/svg/rojo/Frame 3.svg'
import StatsPentagram from '../StatsPentagram/StatsPentagram'
import './Seccion3.css'

function Seccion3({ bitacora }) {
  return (
    <div className="seccion seccion-3">
      <h2 className="titulo">BITACORA</h2>

      <div className="marco-bitacora">
        <img src={frame3} className="frame-3" alt="Marco Bitacora" />
        <div className="texto-bitacora">
          <div className="interior-bitacora">
            <StatsPentagram />
            
            {bitacora.map((item, index) => (
              item.isTitle ? (
                <div key={index} className="contenedor-titulo">
                  <div className="barra-lateral"></div>
                  <div className="caja-texto-titulo">{item.text}</div>
                  <div className="barra-lateral"></div>
                </div>
              ) : (
                <p key={index}>{item.text}</p>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Seccion3
