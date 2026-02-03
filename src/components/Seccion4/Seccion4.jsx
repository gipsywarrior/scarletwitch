import esquinaSupIzq from '../../assets/svg/rojo/Frame 4 - Esquina superior izquierda.svg'
import './Seccion4.css'

function Seccion4({ historial }) {
  const renderItem = (item) => {
    const { action, expStr, curStr, link } = item;
    
    const parts = [];
    parts.push(`${action}.`);
    
    if (expStr && expStr !== "0") {
      const num = expStr.replace(/[^\d+-]/g, '');
      parts.push(<b key="exp">{num} experiencia</b>);
    }
    
    if (curStr && curStr !== "0") {
      const num = parseInt(curStr.replace(/[^\d-]/g, '')) || 0;
      const absNum = Math.abs(num);
      const label = absNum === 1 ? 'divisa' : 'divisas';
      let type = '';
      if (curStr.includes('DB')) type = 'bronce';
      else if (curStr.includes('DP')) type = 'plata';
      else if (curStr.includes('DO')) type = 'oro';
      
      const prefix = num > 0 ? '+' : (num < 0 ? '-' : '');
      const formattedCur = `${prefix}${absNum} ${label} de ${type}`;

      if (parts.length > 1) parts.push(" y ");
      parts.push(<b key="cur">{formattedCur}</b>);
    }

    const content = (
      <>
        {parts.map((p, i) => {
          if (i === 0) return p;
          if (p === " y ") return p;
          if (i === 1) return <span key={i}> {p}</span>;
          if (typeof p !== 'string' && parts[i-1] !== " y ") {
             return <span key={i}>. {p}</span>;
          }
          return p;
        })}
        {parts.length > 1 && parts[parts.length-1] !== " y " ? '.' : ''}
      </>
    );

    if (link && link !== "0") {
      return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="link-historial">
          {content}
        </a>
      );
    }

    return content;
  };

  return (
    <div className="seccion seccion-4">
      <div className="historial">
        <img src={esquinaSupIzq} className="esquina-4 sup-izq" alt="" />
        <img src={esquinaSupIzq} className="esquina-4 sup-der" alt="" />
        <img src={esquinaSupIzq} className="esquina-4 inf-izq" alt="" />
        <img src={esquinaSupIzq} className="esquina-4 inf-der" alt="" />
        
        <div className="contenido-historial">
          <div className="texto-historial">
            {historial.map((item, index) => (
              <div key={index} className="item-historial">
                <div className="fecha-historial">{item.date}</div>
                <div className="detalle-historial">
                  {renderItem(item)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Seccion4
