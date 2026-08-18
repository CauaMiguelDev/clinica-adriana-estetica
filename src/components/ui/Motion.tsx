"use client";

import { MotionConfig } from "framer-motion";

/**
 * Liga o `prefers-reduced-motion` do sistema ao Framer Motion.
 *
 * O Framer **não** respeita a preferência sozinho — é opt-in. E como ele anima
 * por rAF em estilo inline, o bloco `@media (prefers-reduced-motion)` do
 * `globals.css` também não o alcança: aquele bloco só zera transições e
 * animações de CSS.
 *
 * Sem isto, com movimento reduzido ligado, toda entrada ao rolar continuava
 * deslizando 24px igual ao normal — a promessa do DESIGN.md ("versão calma,
 * não versão quebrada") valia só para o CSS e para a cena 3D.
 *
 * `reducedMotion="user"` faz o Framer anular transform e escala e manter
 * apenas a opacidade. O conteúdo aparece inteiro, sem deslocamento.
 *
 * Fica na raiz de propósito: um único ponto cobre `Reveal`, `RevealGroup`,
 * `Hero`, `TiltCard` e `ActionButton` juntos.
 */
export function Motion({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
