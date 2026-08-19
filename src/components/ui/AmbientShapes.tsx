"use client";

import { useEffect, useRef, useState } from "react";
import { useAmbientMotion } from "@/components/ui/useAmbientMotion";
import { AMBIENT } from "@/lib/motion";

/**
 * Formas orgânicas flutuando atrás do conteúdo.
 *
 * Blobs grandes e muito desfocados, em oliva e terracota bem diluídos. Cada um
 * percorre uma elipse lenta com período diferente, então o conjunto nunca se
 * repete de forma visível.
 *
 * Orçamento de desempenho, deliberado:
 *  - 3 formas no desktop, 2 no celular;
 *  - `blur` fica no CSS estático e nunca é animado — animar filtro é o caminho
 *    mais curto para derrubar os quadros;
 *  - só `transform` muda por quadro;
 *  - assina o relógio único (não cria rAF próprio) e desassina fora da tela.
 */

type Blob = {
  color: string;
  size: number;
  originX: number;
  originY: number;
  radiusX: number;
  radiusY: number;
  period: number;
  phase: number;
  /** Deslocamento em vh a cada tela rolada. Valores diferentes = profundidade. */
  parallax: number;
};

/**
 * Grão. É um `feTurbulence` estático em data-URI: nunca anima, então custa uma
 * textura e zero quadros. Sem ele os gradientes largos exibem faixas (banding)
 * em telas de 8 bits, que é o que faz um fundo bonito parecer barato.
 */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const BLOBS: Blob[] = [
  {
    color: "rgb(var(--olive) / 0.10)",
    size: 46,
    originX: 12,
    originY: 22,
    radiusX: 5,
    radiusY: 7,
    period: AMBIENT.slow,
    phase: 0,
    parallax: 14,
  },
  {
    color: "rgb(var(--terracotta) / 0.08)",
    size: 38,
    originX: 82,
    originY: 62,
    radiusX: 6,
    radiusY: 5,
    period: AMBIENT.medium,
    phase: 2.1,
    parallax: 8,
  },
  {
    color: "rgb(var(--gold) / 0.07)",
    size: 30,
    originX: 55,
    originY: 88,
    radiusX: 7,
    radiusY: 4,
    period: AMBIENT.fast,
    phase: 4.3,
    parallax: 20,
  },
];

export function AmbientShapes({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLSpanElement | null)[]>([]);
  const [onScreen, setOnScreen] = useState(true);
  const [count, setCount] = useState(BLOBS.length);

  // Lidos no listener, nunca dentro do laço: `scrollY` e `innerHeight` forçam
  // o navegador a recalcular layout, e a 60fps isso é o gargalo.
  const scroll = useRef(0);
  const vh = useRef(1);

  useEffect(() => {
    setCount(window.matchMedia("(max-width: 768px)").matches ? 2 : 3);

    const read = () => {
      scroll.current = window.scrollY;
      vh.current = window.innerHeight || 1;
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);

    const host = hostRef.current;
    const io = host
      ? new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), {
          threshold: 0,
        })
      : null;
    if (host && io) io.observe(host);

    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
      io?.disconnect();
    };
  }, []);

  useAmbientMotion((t) => {
    for (let i = 0; i < count; i++) {
      const b = BLOBS[i];
      const node = nodes.current[i];
      if (!node) continue;
      const a = (t / b.period) * Math.PI * 2 + b.phase;
      // Elipse: eixos com períodos diferentes evitam órbita circular óbvia.
      const x = Math.cos(a) * b.radiusX;
      const y = Math.sin(a * 0.8) * b.radiusY;
      // Parallax: cada forma sobe numa taxa própria conforme a página desce.
      // Como o host é `fixed`, isso lê como profundidade e não como conteúdo.
      const par = -(scroll.current / vh.current) * b.parallax;
      node.style.transform = `translate3d(${x}vw, ${y + par}vh, 0)`;
    }
  }, onScreen);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {BLOBS.slice(0, count).map((b, i) => (
        <span
          key={i}
          ref={(el) => {
            nodes.current[i] = el;
          }}
          className="absolute rounded-full will-change-transform"
          style={{
            width: `${b.size}vw`,
            height: `${b.size}vw`,
            left: `${b.originX}%`,
            top: `${b.originY}%`,
            marginLeft: `-${b.size / 2}vw`,
            marginTop: `-${b.size / 2}vw`,
            background: b.color,
            filter: "blur(60px)",
          }}
        />
      ))}

      {/* Grão por cima dos blobs, abaixo do conteúdo. Estático. */}
      <span
        className="absolute inset-0 opacity-[0.045] mix-blend-multiply"
        style={{ backgroundImage: GRAIN, backgroundRepeat: "repeat" }}
      />
    </div>
  );
}
