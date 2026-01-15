// Zarina Milenov - Efectos Mágicos
document.addEventListener('DOMContentLoaded', function() {
    const svgBox = document.querySelector('.svg-box');
    let isTransmuted = false;

    // Crear partículas flotantes mágicas
    createMagicParticles();

    function createMagicParticles() {
        const particleCount = 12;

        // Añadir keyframes
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% {
                    opacity: 0;
                    transform: translateY(0) scale(0.3);
                }
                20% {
                    opacity: 1;
                    transform: translateY(-15px) scale(1);
                }
                50% {
                    opacity: 0.8;
                    transform: translateY(-30px) scale(0.9);
                }
                80% {
                    opacity: 0.4;
                    transform: translateY(-50px) scale(0.5);
                }
            }
            @keyframes floatParticleFast {
                0% {
                    opacity: 0;
                    transform: translate(0, 0) scale(0.5);
                }
                10% {
                    opacity: 1;
                    transform: translate(var(--dx), var(--dy)) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(calc(var(--dx) * 3), calc(var(--dy) * 3)) scale(0);
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
        const delay = Math.random() * 3;
        const duration = Math.random() * 3 + 4;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 90 + 5}%;
            top: ${Math.random() * 90 + 5}%;
            animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
        `;

        svgBox.appendChild(particle);
        return particle;
    }

    // Transmutación permanente al hacer hover
    svgBox.addEventListener('mouseenter', function() {
        if (!isTransmuted) {
            // Crear explosión de partículas caóticas durante la transición
            createTransitionParticles();

            // Marcar como transmutado después de la animación
            setTimeout(() => {
                isTransmuted = true;
                svgBox.classList.add('transmuted');
            }, 1300);
        }
    });

    // Crear partículas caóticas durante la transición
    function createTransitionParticles() {
        const burstCount = 20;

        for (let i = 0; i < burstCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'magic-particle transition-burst';

            const size = Math.random() * 6 + 3;
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            const dx = (Math.random() - 0.5) * 80;
            const dy = (Math.random() - 0.5) * 80 - 30; // Tendencia hacia arriba
            const delay = Math.random() * 0.4;
            const duration = Math.random() * 0.8 + 0.6;

            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${startX}%;
                top: ${startY}%;
                --dx: ${dx}px;
                --dy: ${dy}px;
                animation: floatParticleFast ${duration}s ease-out ${delay}s forwards;
                z-index: 15;
            `;

            svgBox.appendChild(particle);

            // Remover después de la animación
            setTimeout(() => particle.remove(), (delay + duration) * 1000 + 100);
        }
    }

    // Click para efecto de ondulación
    svgBox.addEventListener('click', function(e) {
        const rect = svgBox.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border: 2px solid rgba(220, 20, 60, 0.8);
            background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 60%);
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

        svgBox.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
    });

    console.log('Scarlet Witch magic activated');
});
