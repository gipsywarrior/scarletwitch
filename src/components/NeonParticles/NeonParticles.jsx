import React, { useMemo } from 'react';
import './NeonParticles.css';

const NeonParticles = ({ count = 60 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `-${Math.random() * 10}s`, 
      duration: `${5 + Math.random() * 5}s`, 
      size: `${2 + Math.random() * 3}px`,
    }));
  }, [count]);

  return (
    <div className="neon-particles-container">
      {particles.map((p, i) => (
        <div
          key={p.id}
          className="neon-particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animation: `${i % 2 === 0 ? 'sparkle' : 'sparkleAlt'} ${p.duration} linear ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default NeonParticles;
