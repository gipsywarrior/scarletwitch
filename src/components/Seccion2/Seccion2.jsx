import separador from '../../assets/svg/rojo/Frame 2 - Separador.svg'
import esquinaSupIzq from '../../assets/svg/rojo/Frame 2 - Esquina superior izquierda.svg'
import esquinaInfIzq from '../../assets/svg/rojo/Frame 2 - Esquina inferior izquierda.svg'
import './Seccion2.css'

function Seccion2({ stats: dynamicStats }) {
  const { exp, bronce, plata, oro } = dynamicStats;

  return (
    <div className="seccion seccion-2">
      <img src={esquinaSupIzq} className="esquina sup-izq" alt="" />
      <img src={esquinaSupIzq} className="esquina sup-der" alt="" />
      <img src={esquinaInfIzq} className="esquina inf-izq" alt="" />
      <img src={esquinaInfIzq} className="esquina inf-der" alt="" />

      <h2 className="titulo">DATOS BASICOS</h2>
      <img src={separador} className="separador" alt="" />

      <div className="datosbasicos">
        <div className="item-dato">
          <div className="campo">Usuario</div>
          <div className="valor">Deviant</div>
        </div>
        <div className="item-dato">
          <div className="campo">Fecha De Inicio</div>
          <div className="valor">16 / 1 / 2026</div>
        </div>
        <div className="item-dato">
          <div className="campo">Raza</div>
          <div className="valor">Mutante</div>
        </div>
        <div className="item-dato">
          <div className="campo">Edad</div>
          <div className="valor">Joven Adulta</div>
        </div>
        <div className="item-dato">
          <div className="campo">Agrupacion</div>
          <div className="valor">Hermandad De Mutantes</div>
        </div>
        <div className="item-dato">
          <div className="campo">Perfiles</div>
          <div className="valor">Mistico, Combatiente Agil</div>
        </div>
        <div className="item-dato">
          <div className="campo">Experiencia</div>
          <div className="valor">{exp.ganada} / {exp.gastada} / {exp.actual}</div>
        </div>
        <div className="item-dato">
          <div className="campo">Divisas</div>
          <div className="valor">{bronce.actual} / {plata.actual} / {oro.actual}</div>
        </div>
      </div>
    </div>
  )
}

export default Seccion2
