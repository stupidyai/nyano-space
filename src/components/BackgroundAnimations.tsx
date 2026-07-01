'use client';

import React, { useEffect, useState } from 'react';

const BackgroundAnimations = () => {
  const [elements, setElements] = useState<any[]>([]);

  useEffect(() => {
    const newElements = [];
    
    // Create Hearts
    for (let i = 0; i < 25; i++) {
      newElements.push({
        id: `heart-${i}`,
        type: 'heart',
        left: `${Math.random() * 100}%`,
        bottom: `-${Math.random() * 20}vh`,
        size: Math.random() * 20 + 10,
        delay: Math.random() * 15,
        duration: Math.random() * 10 + 10,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    // Create Petals
    for (let i = 0; i < 15; i++) {
      newElements.push({
        id: `petal-${i}`,
        type: 'petal',
        left: `${Math.random() * 100}%`,
        bottom: `-${Math.random() * 20}vh`,
        size: Math.random() * 15 + 10,
        delay: Math.random() * 15,
        duration: Math.random() * 12 + 8,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    // Create Orbs
    for (let i = 0; i < 10; i++) {
      newElements.push({
        id: `orb-${i}`,
        type: 'orb',
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 150 + 50,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10,
        opacity: Math.random() * 0.15 + 0.05,
      });
    }

    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el) => (
        el.type === 'orb' ? (
          <div
            key={el.id}
            className="absolute bg-primary/20 rounded-full blur-[60px] animate-pulse-slow"
            style={{
              left: el.left,
              top: el.top,
              width: el.size,
              height: el.size,
              animationDelay: `${el.delay}s`,
              animationDuration: `${el.duration}s`,
              opacity: el.opacity,
            }}
          ></div>
        ) : (
          <div
            key={el.id}
            className="absolute animate-float"
            style={{
              left: el.left,
              bottom: el.bottom,
              width: el.size,
              height: el.size,
              '--delay': `${el.delay}s`,
              '--duration': `${el.duration}s`,
              opacity: el.opacity,
            } as any}
          >
            {el.type === 'heart' ? (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-primary/30"
                style={{ width: '100%', height: '100%' }}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <div
                className="bg-secondary/20 rounded-full"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              ></div>
            )}
          </div>
        )
      ))}
    </div>
  );
};

export default BackgroundAnimations;
