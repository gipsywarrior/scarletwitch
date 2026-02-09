import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './Historia.css';
import espSupIzq from '../../assets/svg/historia/esquina-sup-izq.svg';
import espInfIzq from '../../assets/svg/historia/esquina-inf-izq.svg';
import encabezadoSvg from '../../assets/svg/historia/encabezado.svg';

import NeonParticles from '../NeonParticles/NeonParticles';

function Historia() {
    const { id } = useParams();
    const [content, setContent] = useState({ title: '', body: '', audioFile: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHoveringHeader, setIsHoveringHeader] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        setIsPlaying(false); // Reset music when story changes
        
        const baseUrl = import.meta.env.BASE_URL;
        const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
        
        const fileName = id.endsWith('.txt') ? id : `${id}.txt`;
        const filePath = `${cleanBaseUrl}/assets/historias/${fileName}`;

        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Historia no encontrada');
                }
                return response.text();
            })
            .then(text => {
                const rawLines = text.split('\n');
                const lines = [...rawLines];
                while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
                    lines.pop();
                }
                
                const audioFile = lines.length > 0 ? lines.pop().trim() : null;
                const title = lines[0] || 'Sin Título';
                const body = lines.slice(1).join('\n');
                
                setContent({ title, body, audioFile });
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching story:", err);
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    // Handle play/pause via ref
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Audio play failed:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    const isCapitulo1 = id && (id.toLowerCase() === 'capitulo1' || id.toLowerCase() === 'capitulo1.txt');

    if (loading) return <div className="historia-container"><div className="loading">Cargando historia...</div></div>;
    
    if (error) return (
        <div className="historia-container">
            <div className="error-message">
                <h2>Error</h2>
                <p>No se pudo cargar la historia: {id}</p>
                <p>{error}</p>
                <p style={{fontSize: '14px', marginTop: '10px'}}>Asegúrate de que el archivo existe en public/assets/historias/</p>
            </div>
        </div>
    );

    const baseUrl = import.meta.env.BASE_URL;
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

    return (
        <div className="historia-container">
            {isCapitulo1 && (
                <div className="encabezado-container">
                    <NeonParticles count={40} />
                    <img src={encabezadoSvg} className="encabezado-svg" alt="Encabezado" />
                </div>
            )}
            
            <div 
                className="historia-content"
                onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const y = e.clientY - rect.top;
                    setIsHoveringHeader(y >= 0 && y <= 350);
                }}
                onMouseLeave={() => setIsHoveringHeader(false)}
            >
                {content.audioFile && (
                    <div className={`musica-nav ${isHoveringHeader ? 'visible' : ''}`}>
                        <button 
                            className={`musica-button ${isPlaying ? 'playing' : ''}`}
                            onClick={() => setIsPlaying(!isPlaying)}
                        >
                            <span className="icon">{isPlaying ? '⏸' : '▶'}</span>
                            <span className="text">Ambientar</span>
                        </button>
                    </div>
                )}

                {content.audioFile && (
                    <audio
                        ref={audioRef}
                        src={`${cleanBaseUrl}/assets/music/${content.audioFile}`}
                    />
                )}

                <div className="esquinas-container">
                    <div className="fila-esquinas superior">
                        <img src={espSupIzq} className="esquina-historia esq-sup-izq" alt="" />
                        <img src={espSupIzq} className="esquina-historia esq-sup-der" alt="" />
                    </div>
                    <div className="fila-esquinas inferior">
                        <img src={espInfIzq} className="esquina-historia esq-inf-izq" alt="" />
                        <img src={espInfIzq} className="esquina-historia esq-inf-der" alt="" />
                    </div>
                </div>

                <h1 className="titulo-historia">{content.title}</h1>
                
                <div className="historia-texto">
                    {content.body}
                </div>
            </div>
        </div>
    );
}

export default Historia;
