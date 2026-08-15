"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { DUR, TILT } from "@/lib/motion";

/**
 * Card com inclinação 3D seguindo o cursor.
 *
 * O tilt máximo é 6°: o suficiente para dar profundidade, pouco o bastante
 * para o texto não distorcer nem ficar difícil de ler em ângulo.
 *
 * Só reage a ponteiro fino (mouse). Em telas de toque não existe hover, e
 * aplicar isso ao toque faria o card tremer sob o dedo.
 */
export function TiltCard({
  children,
  className = "",
  /** Intensidade relativa: 1 = os 6° padrão. */
  strength = 1,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 150, damping: 18, mass: 0.5 };
  const max = TILT.maxDeg * strength;
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <div style={{ perspective: TILT.perspective }} className={className}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        transition={{ duration: DUR.settle }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
