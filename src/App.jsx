import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Seccion1 from './components/Seccion1/Seccion1'
import Seccion2 from './components/Seccion2/Seccion2'
import Seccion3 from './components/Seccion3/Seccion3'
import Seccion4 from './components/Seccion4/Seccion4'
import ResumenOculto from './components/ResumenOculto/ResumenOculto'
import useDynamicData from './hooks/useDynamicData'

function FichaPrincipal({ bitacora, historial, stats }) {
  return (
    <div className="contenedor-principal">
      <div className="ficha">
        <Seccion1 />
        <Seccion2 stats={stats} />
        <Seccion3 bitacora={bitacora} />
        <Seccion4 historial={historial} />
      </div>
    </div>
  )
}

function App() {
  const { bitacora, historial, stats } = useDynamicData();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FichaPrincipal bitacora={bitacora} historial={historial} stats={stats} />} />
        <Route path="/registro" element={<ResumenOculto stats={stats} />} />
      </Routes>
    </Router>
  )
}

export default App
