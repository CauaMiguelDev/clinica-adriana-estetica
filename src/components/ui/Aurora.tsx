"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { useAmbientMotion } from "@/components/ui/useAmbientMotion";

/**
 * Aurora — o fundo próprio do site: campos de cor da paleta que derivam devagar.
 *
 * ## Por que isto não é o `AmbientShapes` de volta
 *
 * O que caiu antes eram blobs com `filter: blur(60px)` a 10% de opacidade:
 * caros (blur custa fill rate a cada quadro) e fracos (sumiam em monitor
 * claro). Aqui a maciez vem do próprio `radial-gradient(closest-side, …)`, que
 * já nasce sem borda — **zero filtro** — e a opacidade é alta o bastante para a
 * cor existir de verdade. É o que dá ao Hero e ao rodapé um fundo com
 * identidade em vez de "branco com textura".
 *
 * ## Orçamento
 *
 * - Só `transform` sai do laço, e o laço é o relógio compartilhado.
 * - Fora da tela, desassina (`useInView`): um rodapé que ninguém está vendo
 *   não gasta quadro.
 * - Grão estático por cima: gradiente largo sem ruído mostra faixas em tela de
 *   8 bits.
 */

type Tone = "light" | "dark";

/**
 * Cada campo: cor, tamanho (em % do contêiner), posição de repouso e a órbita
 * que percorre. Períodos diferentes e primos entre si — com períodos iguais os
 * três andariam em bloco e o olho pega o padrão.
 */
const FIELDS: Record<
  Tone,
  { color: string; size: number; x: number; y: number; ax: number; ay: number; period: number }[]
> = {
  light: [
    { color: "rgb(var(--olive-light) / 0.55)", size: 72, x: -14, y: -20, ax: 6, ay: 5, period: 23 },
    { color: "rgb(var(--terracotta-light) / 0.55)", size: 64, x: 50, y: 28, ax: 7, ay: 6, period: 29 },
    { color: "rgb(var(--gold) / 0.42)", size: 50, x: 34, y: -14, ax: 5, ay: 7, period: 19 },
  ],
  dark: [
    { color: "rgb(var(--olive-light) / 0.45)", size: 75, x: -20, y: -30, ax: 6, ay: 5, period: 23 },
    { color: "rgb(var(--terracotta) / 0.55)", size: 65, x: 55, y: 20, ax: 7, ay: 6, period: 29 },
    { color: "rgb(var(--gold) / 0.28)", size: 45, x: 25, y: 45, ax: 5, ay: 7, period: 19 },
  ],
};

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function Aurora({
  tone = "light",
  className = "",
}: {
  tone?: Tone;
  className?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const blobs = useRef<(HTMLSpanElement | null)[]>([]);
  const visible = useInView(host, { margin: "120px" });
  const fields = FIELDS[tone];

  useAmbientMotion((t) => {
    fields.forEach((f, i) => {
      const node = blobs.current[i];
      if (!node) return;
      const a = (t / f.period) * Math.PI * 2;
      // Lissajous 1:2 — órbita em oito deitado, que não lê como círculo.
      const x = Math.sin(a) * f.ax;
      const y = Math.sin(a * 2 + i) * f.ay;
      const s = 1 + Math.sin(a + i * 2) * 0.06;
      node.style.transform = `translate3d(${x.toFixed(2)}%, ${y.toFixed(2)}%, 0) scale(${s.toFixed(3)})`;
    });
  }, visible);

  return (
    <div
      ref={host}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {fields.map((f, i) => (
        <span
          key={i}
          ref={(n) => {
            blobs.current[i] = n;
          }}
          className="absolute rounded-full will-change-transform"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: `${f.size}%`,
            aspectRatio: "1",
            background: `radial-gradient(closest-side, ${f.color}, transparent)`,
          }}
        />
      ))}
      <span
        className={`absolute inset-0 ${tone === "dark" ? "opacity-[0.08] mix-blend-overlay" : "opacity-[0.05] mix-blend-multiply"}`}
        style={{ backgroundImage: GRAIN, backgroundRepeat: "repeat" }}
      />
    </div>
  );
}
