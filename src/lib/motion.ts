/**
 * Linguagem de animação do site — a fonte única de durações e curvas.
 *
 * Com movimento em toda a página, valores soltos por componente fazem o
 * conjunto ficar desigual: uma seção com 240ms ao lado de outra com 500ms lê
 * como descuido. Importe daqui em vez de digitar números.
 *
 * Documentação e o porquê de cada valor: DESIGN.md, seção "Movimento".
 */

/** Segundos. Framer trabalha em segundos; o Tailwind, em ms (ver MS). */
export const DUR = {
  /** Hover, foco, clique. Precisa parecer instantâneo. */
  micro: 0.2,
  /** Troca de estado: acordeão abrindo, filtro trocando a grade. */
  state: 0.32,
  /** Entrada ao rolar. Longo o bastante para ser percebido como calmo. */
  enter: 0.7,
  /** Volta do tilt ao repouso quando o cursor sai. */
  settle: 0.4,
} as const;

export const MS = {
  micro: 200,
  state: 320,
  enter: 700,
} as const;

/**
 * Curvas. `enter` é uma expo-out: sai rápido e assenta devagar — é o que dá a
 * sensação orgânica de spa em vez de mecânica.
 */
export const EASE = {
  enter: [0.22, 1, 0.36, 1],
  micro: [0.4, 0, 0.2, 1],
  exit: [0.4, 0, 1, 1],
} as const;

/** Atraso entre irmãos em cascata. Acima de 8 itens o último demora demais. */
export const STAGGER = { step: 0.06, max: 8 } as const;

/** Deslocamento de entrada, em px. */
export const SHIFT = { normal: 24, small: 14 } as const;

/**
 * Parallax: fração da rolagem que cada camada percorre. Valores baixos de
 * propósito — parallax forte causa desconforto vestibular real.
 */
export const PARALLAX = { back: 0.15, mid: 0.08, front: 0.04 } as const;

/** Tilt 3D dos cards. 6° é perceptível sem distorcer o texto. */
export const TILT = { maxDeg: 6, perspective: 900 } as const;

/** Ciclos do movimento de ambiente, em segundos. Lentos a ponto de não distrair. */
export const AMBIENT = { slow: 25, medium: 19, fast: 15 } as const;

/** Atraso em cascata, respeitando o teto. */
export function stagger(index: number) {
  return Math.min(index, STAGGER.max) * STAGGER.step;
}
