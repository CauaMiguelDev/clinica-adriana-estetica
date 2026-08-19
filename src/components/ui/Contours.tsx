"use client";

import { useEffect, useRef, useState } from "react";
import { useAmbientMotion } from "@/components/ui/useAmbientMotion";
import { AMBIENT } from "@/lib/motion";

/**
 * Linhas de nível — a textura do site.
 *
 * Substituiu os blobs desfocados que havia aqui antes. O problema deles não era
 * desempenho, era leitura: `blur(60px)` sobre 10% de opacidade não vira
 * atmosfera, vira sujeira na tela, e em monitor mais claro some por completo.
 * Uma linha de 0.35px de traço aparece do mesmo jeito nos dois e **tem forma** —
 * dá para dizer o que é.
 *
 * A referência é curva de nível de mapa topográfico, que é o desenho mais
 * natural que existe para "orgânico sem ser floral": anéis concêntricos que se
 * apertam e se afastam. Serve ao fundo das páginas e ao Hero, que perdeu a cena
 * 3D e precisava de peso visual próprio.
 *
 * ## Orçamento
 *
 * Zero imagens, zero rede: os caminhos são calculados uma vez, na carga do
 * módulo, e viram markup estático. Nenhum filtro — nem `blur`, que era o que
 * custava fill rate no arranjo anterior. Do laço só sai `transform`, e ele é o
 * relógio compartilhado (`useAmbientMotion`), nunca um rAF próprio.
 */

/** Quantos pontos por anel. 64 já lê como curva lisa nesta escala. */
const STEPS = 64;

/**
 * Um anel fechado, com o raio perturbado por dois senos de frequências
 * diferentes. Sem a perturbação o "contorno orgânico" é só uma elipse; com uma
 * frequência só, vira um trevo regular. São duas por isso.
 *
 * Determinístico de propósito: mesma saída no servidor e no cliente, então não
 * há divergência de hidratação — e dá para calibrar o desenho, o que `Math.
 * random` por definição impede.
 */
function ring(radius: number, wobble: number, phase: number) {
  const points: string[] = [];
  for (let i = 0; i < STEPS; i++) {
    const a = (i / STEPS) * Math.PI * 2;
    const r =
      radius *
      (1 +
        wobble * Math.sin(3 * a + phase) +
        wobble * 0.55 * Math.sin(5 * a - phase * 1.7));
    // Achatado em y: anel redondo demais lê como alvo de tiro.
    const x = 50 + r * Math.cos(a);
    const y = 50 + r * Math.sin(a) * 0.74;
    points.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return `M${points.join("L")}Z`;
}

/**
 * Oito anéis. A fase cresce junto com o raio, então as linhas não ficam
 * paralelas — elas se aproximam de um lado e abrem do outro, que é exatamente o
 * que faz um mapa de nível parecer terreno e não uma cebola.
 */
const RINGS = Array.from({ length: 8 }, (_, i) =>
  ring(7 + i * 5.6, 0.06 + i * 0.012, i * 0.9)
);

/**
 * O `viewBox` sobra 6 unidades de cada lado porque o anel externo, no pico da
 * perturbação, passa de 50. Sem a folga o SVG cortaria a curva num corte reto.
 *
 * Conferido para os `RINGS` acima: x vai de 1.3 a 100.6 e y de 9.4 a 82.3, tudo
 * dentro de -6..106. Se mexer no raio ou no `wobble`, refaça a conta — estourar
 * o quadro não dá erro, só corta a linha.
 */
const VIEW_BOX = "-6 -6 112 112";

const TONE = {
  olive: "rgb(var(--olive) / 0.22)",
  terracotta: "rgb(var(--terracotta) / 0.20)",
} as const;

/**
 * Um agrupamento de linhas de nível, girando devagar.
 *
 * A rotação vai no `<div>` e não no `<g>`: transform de elemento HTML é
 * composto na GPU, o atributo `transform` de SVG não necessariamente.
 */
export function Contours({
  className = "",
  tone = "olive",
  period = AMBIENT.slow,
  phase = 0,
}: {
  className?: string;
  tone?: keyof typeof TONE;
  /** Segundos por volta completa. */
  period?: number;
  /** Defasagem em segundos, para dois agrupamentos não girarem em bloco. */
  phase?: number;
}) {
  const host = useRef<HTMLDivElement>(null);

  useAmbientMotion((t) => {
    const node = host.current;
    if (!node) return;
    const deg = (((t + phase) / period) * 360) % 360;
    node.style.transform = `rotate(${deg.toFixed(2)}deg)`;
  });

  return (
    <div
      ref={host}
      aria-hidden
      className={`will-change-transform ${className}`}
    >
      <svg
        viewBox={VIEW_BOX}
        className="h-full w-full"
        fill="none"
        stroke={TONE[tone]}
        strokeWidth={0.35}
      >
        {RINGS.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </svg>
    </div>
  );
}

/**
 * Grão. `feTurbulence` estático em data-URI: custa uma textura e zero quadros.
 * Sem ele os gradientes largos exibem faixas em telas de 8 bits, que é o que faz
 * um fundo bonito parecer barato.
 */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * O fundo de todas as páginas: dois agrupamentos em cantos opostos e o grão.
 *
 * No celular fica **um** agrupamento. Não é orçamento de GPU — dois clusters
 * numa tela de 390px se sobrepõem e o desenho vira rabisco.
 */
export function PageTexture({ className = "" }: { className?: string }) {
  const [dense, setDense] = useState(true);

  useEffect(() => {
    setDense(!window.matchMedia("(max-width: 768px)").matches);
  }, []);

  return (
    <div
      aria-hidden
      className={`pointer-events-none inset-0 overflow-hidden ${className}`}
    >
      <Contours
        tone="olive"
        className="absolute -left-[28vw] -top-[18vh] h-[85vw] w-[85vw] sm:h-[62vw] sm:w-[62vw]"
      />
      {dense && (
        <Contours
          tone="terracotta"
          period={AMBIENT.medium}
          phase={7}
          className="absolute -bottom-[24vh] -right-[22vw] h-[58vw] w-[58vw]"
        />
      )}
      <span
        className="absolute inset-0 opacity-[0.045] mix-blend-multiply"
        style={{ backgroundImage: GRAIN, backgroundRepeat: "repeat" }}
      />
    </div>
  );
}
