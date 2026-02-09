import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import Seccion1 from './components/Seccion1/Seccion1'
import Seccion2 from './components/Seccion2/Seccion2'
import Seccion3 from './components/Seccion3/Seccion3'
import Seccion4 from './components/Seccion4/Seccion4'
import ResumenOculto from './components/ResumenOculto/ResumenOculto'
import useDynamicData from './hooks/useDynamicData'
import NeonParticles from './components/NeonParticles/NeonParticles'
import Historia from './components/Historia/Historia'

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function FichaPrincipal({ bitacora, historial, stats }) {
  const [isTransmuted, setIsTransmuted] = useState(false);

  return (
    <div className="contenedor-principal">
      <div 
        className={`ficha ${isTransmuted ? 'transmuted' : 'not-transmuted'}`}
        onMouseEnter={() => !isTransmuted && setIsTransmuted(true)}
      >
        <NeonParticles count={80} />
        <Seccion1 isTransmuted={isTransmuted} />
        <Seccion2 stats={stats} isTransmuted={isTransmuted} />
        <Seccion3 bitacora={bitacora} stats={stats} isTransmuted={isTransmuted} />
        <Seccion4 historial={historial} isTransmuted={isTransmuted} />
      </div>
    </div>
  )
}

function App() {
  const { bitacora, historial, stats } = useDynamicData();

  useEffect(() => {
    // Force scroll to top when data is loaded to avoid layout shift issues on reload
    window.scrollTo(0, 0);
  }, [stats]);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<FichaPrincipal bitacora={bitacora} historial={historial} stats={stats} />} />
        <Route path="/registro" element={<ResumenOculto stats={stats} />} />
        <Route path="/historias/:id" element={<Historia />} />
      </Routes>
    </Router>
  )
}

export default App
