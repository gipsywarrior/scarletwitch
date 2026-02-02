// Zarina Milenov - Efectos Magicos
document.addEventListener('DOMContentLoaded', function() {
    const ficha = document.getElementById('ficha');
    let isTransmuted = false;
    let isTransmuting = false;

    // Crear particulas flotantes magicas
    createMagicParticles();

    function createMagicParticles() {
        // Numero de particulas
        const particleCount = 12;

        // Agregar keyframes dinamicamente
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes floatParticleUp {
                0% {
                    opacity: 0;
                    transform: translateY(0) scale(0.3);
                }
                15% {
                    opacity: 1;
                    transform: translateY(-10px) scale(1);
                }
                50% {
                    opacity: 0.8;
                    transform: translateY(-40px) scale(0.9);
                }
                85% {
                    opacity: 0.3;
                    transform: translateY(-70px) scale(0.6);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-90px) scale(0.3);
                }
            }
        `;
        document.head.appendChild(style);

        for (let i = 0; i < particleCount; i++) {
            createFloatingParticle();
        }
    }

    function createFloatingParticle() {
        const particle = document.createElement('div');
        particle.className = 'magic-particle';

        const size = Math.random() * 5 + 3;
        const delay = Math.random() * 5;
        const duration = Math.random() * 3 + 4;

        // Distribucion uniforme en todo el ancho (0-100%)
        const posX = Math.random() * 100;
        // Posicion vertical aleatoria
        const posY = Math.random() * 100;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${posX}%;
            top: ${posY}%;
            animation: floatParticleUp ${duration}s ease-in-out ${delay}s infinite;
        `;

        ficha.appendChild(particle);
        return particle;
    }

    // Transmutacion permanente al primer toque/hover
    // Usamos mouseenter pero la transicion completa por JS, no depende del mouse
    ficha.addEventListener('mouseenter', triggerTransmutation);
    ficha.addEventListener('touchstart', triggerTransmutation);

    function triggerTransmutation() {
        if (isTransmuted || isTransmuting) return;

        isTransmuting = true;

        // Agregar clase para animacion del anillo
        ficha.classList.add('transmuting');

        // Despues de la animacion, marcar como transmutado permanentemente
        setTimeout(() => {
            isTransmuting = false;
            isTransmuted = true;
            ficha.classList.remove('transmuting');
            ficha.classList.add('transmuted');
        }, 1300);
    }

    // Click para efecto de ondulacion (solo onda roja, sin orbe blanco)
    ficha.addEventListener('click', function(e) {
        const rect = ficha.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border: 2px solid rgba(216, 31, 56, 0.8);
            background: transparent;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 20;
            animation: clickRipple 0.8s ease-out forwards;
        `;

        if (!document.querySelector('#ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.textContent = `
                @keyframes clickRipple {
                    0% {
                        width: 0;
                        height: 0;
                        opacity: 1;
                    }
                    100% {
                        width: 300px;
                        height: 300px;
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        ficha.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
    });

    console.log('Zarina Milenov - Ficha activada');
});
