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
};

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
  },
];

export function AmbientShapes({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLSpanElement | null)[]>([]);
  const [onScreen, setOnScreen] = useState(true);
  const [count, setCount] = useState(BLOBS.length);

  useEffect(() => {
    setCount(window.matchMedia("(max-width: 768px)").matches ? 2 : 3);

    const host = hostRef.current;
    if (!host) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), {
      threshold: 0,
    });
    io.observe(host);
    return () => io.disconnect();
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
      node.style.transform = `translate3d(${x}vw, ${y}vh, 0)`;
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
    </div>
  );
}
