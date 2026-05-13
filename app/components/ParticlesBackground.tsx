"use client";

import { useMemo } from "react";

export default function ParticlesBackground() {

  const particles = useMemo(() => {
    return Array.from({ length: 80 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 8,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.7 + 0.2,
    }));
  }, []);

  const shootingStars = useMemo(() => {
    return Array.from({ length: 10 }).map(() => ({
      top: Math.random() * 70,
      left: Math.random() * 100,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 15,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">

      {particles.map((particle, index) => (
        <span
          key={index}
          className="absolute rounded-full bg-pink-300 animate-float-soft"
          style={{
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {shootingStars.map((star, index) => (
        <span
          key={`star-${index}`}
          className="absolute h-[1px] w-24 bg-gradient-to-r from-transparent via-pink-200 to-transparent opacity-70 animate-shooting-star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

    </div>
  );
}