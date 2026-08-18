"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { DUR, EASE, SHIFT, stagger } from "@/lib/motion";

/**
 * Entrada ao rolar.
 *
 * Antes havia uma única animação (fade + subida de 36px) repetida 35 vezes na
 * página; com movimento em toda parte, isso lê como template. Agora há
 * variantes e cascata de verdade.
 *
 * O `prefers-reduced-motion` vem do `<Motion>` na raiz (`MotionConfig
 * reducedMotion="user"`), não daqui — e não vem do Framer sozinho, que ignora
 * a preferência até alguém ligar. Com ele ativo, sobra só a opacidade: o
 * conteúdo aparece inteiro, sem os 24px de deslocamento.
 */

type Variant = "fade" | "up" | "down" | "left" | "right" | "rise";

const from: Record<Variant, { opacity: number; x?: number; y?: number; scale?: number }> = {
  fade: { opacity: 0 },
  up: { opacity: 0, y: SHIFT.normal },
  down: { opacity: 0, y: -SHIFT.normal },
  left: { opacity: 0, x: -SHIFT.normal },
  right: { opacity: 0, x: SHIFT.normal },
  rise: { opacity: 0, y: SHIFT.small, scale: 0.96 },
};

interface RevealProps {
  children: React.ReactNode;
  /** Direção/estilo da entrada. `rise` combina subida curta com escala. */
  variant?: Variant;
  /** Atraso em segundos. Prefira `index` para cascatas. */
  delay?: number;
  /** Posição na cascata — calcula o atraso pela escala padrão. */
  index?: number;
  className?: string;
}

export function Reveal({
  children,
  variant = "up",
  delay,
  index,
  className,
}: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const wait = delay ?? (index !== undefined ? stagger(index) : 0);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={from[variant]}
      animate={inView ? { opacity: 1, x: 0, y: 0, scale: 1 } : undefined}
      transition={{ duration: DUR.enter, delay: wait, ease: EASE.enter }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Cascata para listas: envolve a grade e os filhos entram em sequência, sem
 * precisar passar `index` item a item.
 */
export function RevealGroup({
  children,
  className,
  variant = "rise",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
  };
  const item: Variants = {
    hidden: from[variant],
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: DUR.enter, ease: EASE.enter },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : undefined}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={item} className="h-full">
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
