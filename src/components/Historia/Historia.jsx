import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Historia.css';
import espSupIzq from '../../assets/svg/historia/esquina-sup-izq.svg';
import espInfIzq from '../../assets/svg/historia/esquina-inf-izq.svg';
import encabezadoSvg from '../../assets/svg/historia/encabezado.svg';

function Historia() {
    const { id } = useParams();
    const [content, setContent] = useState({ title: '', body: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        
        // Fetch from assets/historias
        const baseUrl = import.meta.env.BASE_URL;
        const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
        
        // Ensure we look for the .txt file
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
                // Split content into title (first line) and body (rest)
                const lines = text.split('\n');
                const title = lines[0] || 'Sin Título';
                const body = lines.slice(1).join('\n');
                
                setContent({ title, body });
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching story:", err);
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

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

    return (
        <div className="historia-container">
            {isCapitulo1 && <img src={encabezadoSvg} className="encabezado-svg" alt="Encabezado" />}
            
            <div className="historia-content">
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
