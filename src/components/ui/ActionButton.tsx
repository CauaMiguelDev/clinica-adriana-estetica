"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MAGNET, MS } from "@/lib/motion";

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
 * Renderiza `<a>` quando recebe `href` e `<button>` caso contrário — os CTAs
 * do site são links, os filtros e o acordeão são botões.
 */

type Variant = "solid" | "outline" | "ghost";

const BASE =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full text-sm font-semibold transition-[background-color,border-color,color,box-shadow] active:scale-[0.98]";

const STYLES: Record<Variant, string> = {
  solid:
    "bg-olive px-7 py-3.5 text-white shadow-soft hover:bg-olive-dark hover:shadow-lift",
  outline:
    "border border-terracotta/50 px-7 py-3.5 text-terracotta-dark hover:border-terracotta hover:bg-terracotta hover:text-white",
  ghost:
    "border border-line bg-surface px-5 py-2.5 text-muted hover:border-olive/40 hover:text-olive-dark",
};

interface Props {
  children: React.ReactNode;
  variant?: Variant;
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
  const spring = { stiffness: 260, damping: 20, mass: 0.4 };
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
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
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

  const cls = `${BASE} ${STYLES[variant]} ${className}`;

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
