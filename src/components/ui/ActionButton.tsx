"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MAGNET, MS, SPRING } from "@/lib/motion";

// Definidos no módulo, não dentro do componente: `motion()` cria um componente
// novo a cada chamada, e recriá-lo por render desmontaria o botão a cada quadro.
const MotionLink = motion.create(Link);
const MotionA = motion.a;
const MotionButton = motion.button;

/**
 * Botão de ação com resposta ao clique.
 *
 * Um site "vivo" que não confirma o toque parece quebrado no celular, onde não
 * existe hover para dar a pista. A onda parte do ponto tocado e é feita só com
 * `transform` e `opacity`.
 *
 * ## Hover
 *
 * Duas camadas, ambas só `transform`, ambas em 600ms com a expo-out do site:
 *
 * 1. **Preenchimento líquido** — uma elipse maior que o botão sobe por baixo.
 *    Enquanto sobe, a borda curva atravessa o rótulo; parada, cobre tudo. Troca
 *    de `background-color` seria um pisca de cor; aqui a cor *entra*.
 * 2. **Rótulo que rola** — o texto sai por cima e uma cópia entra por baixo.
 *    A cópia é `aria-hidden`: leitor de tela ouve o rótulo uma vez.
 *
 * O `hover:` do Tailwind só vale onde existe hover de verdade
 * (`hoverOnlyWhenSupported` na config) — no toque o estado não gruda depois do
 * dedo sair.
 *
 * Renderiza `<a>` quando recebe `href` e `<button>` caso contrário — os CTAs
 * do site são links, os filtros e o acordeão são botões.
 */

type Variant = "solid" | "outline" | "ghost" | "light" | "glass";

const BASE =
  "group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full text-sm font-semibold transition-[color,border-color,box-shadow] duration-600 active:scale-[0.98]";

const STYLES: Record<Variant, string> = {
  solid: "bg-olive text-white shadow-soft hover:shadow-lift",
  outline:
    "border border-terracotta/50 text-terracotta-dark hover:border-terracotta hover:text-white",
  ghost:
    "border border-line bg-surface text-muted hover:border-olive/40 hover:text-olive-dark",
  light: "bg-white text-olive-dark shadow-soft hover:shadow-lift",
  /** Secundário sobre fundo escuro (rodapé). */
  glass: "border border-white/25 bg-white/5 text-white hover:border-white hover:text-olive-dark",
};

/**
 * Tamanho separado da variante: sobrescrever `px-7` com um `px-5` vindo de
 * `className` depende da ordem das regras no CSS gerado, não da ordem das
 * classes no atributo — funciona por sorte até o dia em que não funciona.
 */
const SIZES = {
  md: "px-7 py-3.5",
  sm: "px-5 py-2.5",
} as const;

/** Cor da elipse que sobe no hover, por variante. */
const FILL: Record<Variant, string> = {
  solid: "bg-olive-dark",
  outline: "bg-terracotta",
  ghost: "bg-olive/10",
  light: "bg-sand",
  glass: "bg-white",
};

interface Props {
  children: React.ReactNode;
  variant?: Variant;
  size?: keyof typeof SIZES;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  "aria-label"?: string;
}

export function ActionButton({
  children,
  variant = "solid",
  size,
  href,
  className = "",
  onClick,
  ...rest
}: Props) {
  const [waves, setWaves] = useState<{ id: number; x: number; y: number }[]>([]);
  const nextId = useRef(0);
  const box = useRef<HTMLElement>(null);

  // Ímã: o botão desliza alguns pixels na direção do cursor. Mesma mecânica do
  // TiltCard — motionValue cru entra, spring sai, e só ponteiro fino dispara.
  // O `x`/`y` é transform, então o MotionConfig da raiz já o anula em
  // prefers-reduced-motion; não precisa de guarda própria.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = SPRING.soft;
  const x = useSpring(useTransform(mx, [-0.5, 0.5], [-MAGNET.maxPx, MAGNET.maxPx]), spring);
  const y = useSpring(useTransform(my, [-0.5, 0.5], [-MAGNET.maxPx, MAGNET.maxPx]), spring);

  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  const magnet = {
    ref: box as React.Ref<never>,
    style: { x, y },
    onPointerMove: onMove,
    onPointerLeave: onLeave,
  };

  function handleClick(e: React.MouseEvent) {
    const r = e.currentTarget.getBoundingClientRect();
    const id = nextId.current++;
    setWaves((w) => [...w, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
    window.setTimeout(
      () => setWaves((w) => w.filter((v) => v.id !== id)),
      MS.enter
    );
    onClick?.(e);
  }

  const inner = (
    <>
      <span
        aria-hidden
        className={`pointer-events-none absolute -inset-x-[15%] top-full -z-10 h-[220%] rounded-[50%] transition-transform duration-600 group-hover:-translate-y-[62%] ${FILL[variant]}`}
      />
      <span className="relative block overflow-hidden py-0.5">
        <span className="flex items-center justify-center gap-2 transition-transform duration-600 group-hover:-translate-y-[120%]">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 flex translate-y-[120%] items-center justify-center gap-2 transition-transform duration-600 group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
      {waves.map((w) => (
        <span
          key={w.id}
          aria-hidden
          className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current opacity-25 animate-wave"
          style={{ left: w.x, top: w.y }}
        />
      ))}
    </>
  );

  // `ghost` nasceu menor; os outros, no tamanho de CTA.
  const pad = SIZES[size ?? (variant === "ghost" ? "sm" : "md")];
  const cls = `${BASE} ${STYLES[variant]} ${pad} ${className}`;

  // Rota interna vai por `next/link`: um `<a>` cru recarregaria a página
  // inteira e mataria a transição de entrada do template. Externos (WhatsApp,
  // Instagram) e âncoras continuam em `<a>`.
  if (href?.startsWith("/")) {
    return (
      <MotionLink href={href} className={cls} onClick={handleClick} {...magnet} {...rest}>
        {inner}
      </MotionLink>
    );
  }

  return href ? (
    <MotionA href={href} className={cls} onClick={handleClick} {...magnet} {...rest}>
      {inner}
    </MotionA>
  ) : (
    <MotionButton className={cls} onClick={handleClick} {...magnet} {...rest}>
      {inner}
    </MotionButton>
  );
}
