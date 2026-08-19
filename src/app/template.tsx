"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DUR, EASE } from "@/lib/motion";

/**
 * Transição de entrada de cada rota.
 *
 * Fica em `template.tsx` e não em `layout.tsx` de propósito: o template é a
 * única parte do App Router que remonta a cada navegação. O layout persiste —
 * é o que mantém o fundo animado rodando e a navbar parada durante a troca.
 *
 * Só a **entrada** anima. Animar a saída exigiria segurar a navegação do
 * router até o fim da animação; o custo não paga o ganho, e a entrada com
 * desfoque já resolve o "pisca e troca".
 *
 * O `y` é anulado sozinho pelo `MotionConfig reducedMotion="user"` da raiz. O
 * desfoque é `filter`, que aquele ajuste não alcança — por isso o corte
 * explícito aqui.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const calm = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: calm ? "none" : "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "none" }}
      transition={{ duration: calm ? DUR.state : DUR.enter, ease: EASE.enter }}
    >
      {children}
    </motion.div>
  );
}
