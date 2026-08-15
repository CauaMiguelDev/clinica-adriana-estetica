"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  /** raio do brilho em px */
  size?: number;
  /** cor do brilho (rgba) */
  color?: string;
}

/**
 * Envolve um card e desenha um brilho dourado radial que segue o cursor.
 * O overlay herda o arredondamento do card e não captura cliques.
 */
export function Spotlight({
  children,
  className = "",
  size = 380,
  color = "rgba(201,163,94,0.18)",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const background = useMotionTemplate`radial-gradient(${size}px circle at ${mx}px ${my}px, ${color}, transparent 65%)`;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  }
  function onLeave() {
    mx.set(-9999);
    my.set(-9999);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group/spot relative ${className}`}
    >
      <motion.span
        aria-hidden
        style={{ background }}
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
      />
      {children}
    </div>
  );
}
