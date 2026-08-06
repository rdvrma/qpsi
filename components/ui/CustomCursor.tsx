'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  text: string;
  vx: number;
  vy: number;
  scale: number;
}

const QUANTUM_SYMBOLS = [
  '|Ψ⟩',
  '|0⟩',
  '|1⟩',
  '0x9F',
  'Δt=0',
  'H|0⟩',
  'CNOT',
  'U(t)',
  'ψ_gate',
  '|ψ_ref⟩',
  '0x1A',
  'Tr(ρ)',
  'Q-Psi',
];

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const lastPosRef = useRef({ x: -100, y: -100 });
  const particleIdRef = useRef(0);

  useEffect(() => {
    // Only run on desktop devices with hover support & no reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasPointer = window.matchMedia('(pointer: fine)').matches;

    if (prefersReducedMotion || !hasPointer) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      setPosition({ x, y });

      // Calculate distance from last particle spawn
      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Spawn quantum code particle if mouse moved more than 28px
      if (dist > 28) {
        lastPosRef.current = { x, y };
        particleIdRef.current += 1;

        const randomSymbol = QUANTUM_SYMBOLS[Math.floor(Math.random() * QUANTUM_SYMBOLS.length)];
        const newParticle: Particle = {
          id: particleIdRef.current,
          x: x + (Math.random() * 12 - 6),
          y: y + (Math.random() * 12 - 6),
          text: randomSymbol,
          vx: (Math.random() - 0.5) * 20,
          vy: -15 - Math.random() * 25,
          scale: 0.85 + Math.random() * 0.3,
        };

        setParticles((prev) => [...prev.slice(-18), newParticle]);
      }

      const target = e.target as HTMLElement;
      if (target) {
        const isClickable =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button';
        setIsPointer(!!isClickable);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Clean up old particles
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 1100);
    return () => clearTimeout(timer);
  }, [particles]);

  if (!isVisible) return null;

  return (
    <>
      {/* Quantum Particles Stream */}
      <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{
                opacity: 0.85,
                x: p.x,
                y: p.y,
                scale: p.scale,
              }}
              animate={{
                opacity: 0,
                x: p.x + p.vx,
                y: p.y + p.vy,
                scale: p.scale * 0.9,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="absolute font-mono text-[10px] font-bold text-black/70 tracking-widest bg-white/80 border border-black/15 px-1.5 py-0.5 rounded shadow-sm"
              style={{ left: 0, top: 0 }}
            >
              {p.text}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Cursor Ring */}
      <div
        className="pointer-events-none fixed z-50 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x - 12}px, ${position.y - 12}px, 0)`,
        }}
      >
        <div
          className={`w-6 h-6 rounded-full border border-black/50 transition-all duration-150 flex items-center justify-center bg-white/30 backdrop-blur-[1px] shadow-sm ${
            isPointer ? 'scale-150 bg-black/10 border-black' : 'scale-100'
          }`}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-black" />
        </div>
      </div>
    </>
  );
}
