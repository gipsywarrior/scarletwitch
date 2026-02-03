import { Link } from 'react-router-dom';
import './ResumenOculto.css';

function ResumenOculto({ stats }) {
  const { exp, bronce, plata, oro } = stats;

  return (
    <div className="resumen-oculto">
      <div className="resumen-container">
        <h1 className="resumen-titulo">REGISTRO DE CUENTAS</h1>
        
        <table className="tabla-resumen">
          <thead>
            <tr>
              <th>Concepto</th>
              <th>Ganado</th>
              <th>Gastado</th>
              <th>Actual</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Experiencia (EXP)</td>
              <td>{exp.ganada}</td>
              <td>{exp.gastada}</td>
              <td className="actual">{exp.actual}</td>
            </tr>
            <tr>
              <td>Bronce (DB)</td>
              <td>{bronce.ganada}</td>
              <td>{bronce.gastada}</td>
              <td className="actual">{bronce.actual}</td>
            </tr>
            <tr>
              <td>Plata (DP)</td>
              <td>{plata.ganada}</td>
              <td>{plata.gastada}</td>
              <td className="actual">{plata.actual}</td>
            </tr>
            <tr>
              <td>Oro (DO)</td>
              <td>{oro.ganada}</td>
              <td>{oro.gastada}</td>
              <td className="actual">{oro.actual}</td>
            </tr>
          </tbody>
        </table>

        <div className="instrucciones">
          <p>Los valores se calculan automáticamente procesando el historial de la ficha.</p>
          <Link to="/" className="boton-volver">Volver a la Ficha</Link>
        </div>
      </div>
    </div>
  );
}

export default ResumenOculto;
