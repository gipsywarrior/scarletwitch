import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


document.addEventListener('mouseover', (e) => {
  const scrollable = e.target.closest('.texto-bitacora, .texto-historial');
  if (scrollable) {
    scrollable.style.setProperty('--scrollbar-thumb-color', '#D81F38');
  }
});

document.addEventListener('mouseout', (e) => {
  const scrollable = e.target.closest('.texto-bitacora, .texto-historial');
  if (scrollable) {
    scrollable.style.removeProperty('--scrollbar-thumb-color');
  }
});
