import React, { useMemo } from 'react';
import './NeonParticles.css';

const NeonParticles = ({ count = 12 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 90 + 5}%`,
      top: `${Math.random() * 90 + 5}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${4 + Math.random() * 3}s`,
      size: `${3 + Math.random() * 5}px`,
    }));
  }, [count]);

  return (
    <div className="neon-particles-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="neon-particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animation: `floatParticle ${p.duration} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default NeonParticles;
