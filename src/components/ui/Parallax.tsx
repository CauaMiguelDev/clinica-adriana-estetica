"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { PARALLAX } from "@/lib/motion";

/**
 * Camada com parallax na rolagem.
 *
 * Os fatores são baixos de propósito (0.04 a 0.15 da rolagem): parallax forte
 * causa desconforto vestibular real em parte das pessoas. O objetivo é dar
 * profundidade, não chamar atenção para o efeito.
 *
 * Usa `useScroll` do Framer, que já lê a rolagem de forma passiva — não é um
 * laço perpétuo, então não passa pelo relógio de ambiente.
 */
export function Parallax({
  children,
  layer = "mid",
  className = "",
}: {
  children: React.ReactNode;
  layer?: keyof typeof PARALLAX;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Distância total percorrida pela camada, em px, ao atravessar a tela.
  const travel = PARALLAX[layer] * 420;
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [travel, -travel]),
    { stiffness: 90, damping: 24, mass: 0.4 }
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
