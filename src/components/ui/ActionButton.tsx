"use client";

import { useRef, useState } from "react";
import { MS } from "@/lib/motion";

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

  return href ? (
    <a href={href} className={cls} onClick={handleClick} {...rest}>
      {inner}
    </a>
  ) : (
    <button className={cls} onClick={handleClick} {...rest}>
      {inner}
    </button>
  );
}
