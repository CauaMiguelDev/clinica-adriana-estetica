"use client";

import { motion } from "framer-motion";
import { DUR, EASE } from "@/lib/motion";

/**
 * Desenha o ícone com a linha, como se estivesse sendo traçado à mão.
 *
 * ## Como
 *
 * Os ícones do lucide são SVG de contorno, então dá para tratar cada traço
 * como uma linha tracejada gigante: `stroke-dasharray: 1` com o comprimento
 * em `pathLength` normalizado, e `stroke-dashoffset` indo de 1 a 0.
 *
 * Quem anima é uma variável CSS (`--draw`) no elemento que envolve o ícone,
 * porque não dá para alcançar os `<path>` de dentro do componente do lucide
 * sem reescrevê-lo. O CSS em `globals.css` liga a variável aos filhos.
 *
 * `pathLength` normalizado (via CSS `stroke-dasharray: 1`) é o detalhe que
 * evita calcular o comprimento real de cada traço em JS — o SVG faz a conta.
 *
 * ## Acessibilidade
 *
 * Com movimento reduzido o Framer não anula `--draw` sozinho (é propriedade
 * custom, não transform), então o valor inicial já é o final. O ícone aparece
 * inteiro, sem traçado.
 */
export function DrawIcon({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.span
      className={`draw-icon ${className}`}
      initial={{ ["--draw" as string]: 1 }}
      whileInView={{ ["--draw" as string]: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: DUR.enter, ease: EASE.enter, delay }}
    >
      {children}
    </motion.span>
  );
}
