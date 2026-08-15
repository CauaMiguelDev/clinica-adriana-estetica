"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Ripple {
  x: number;
  y: number;
  id: number;
}

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "solid" | "outline";
  children: React.ReactNode;
}

export function GoldButton({
  variant = "solid",
  children,
  className = "",
  onClick,
  ...rest
}: Props) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const idRef = useRef(0);
  const ref = useRef<HTMLAnchorElement>(null);

  // Efeito magnético: o botão é levemente atraído pelo cursor.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 250, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 250, damping: 18, mass: 0.4 });

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    mx.set(relX * 0.3);
    my.set(relY * 0.4);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = idRef.current++;
    setRipples((r) => [
      ...r,
      { x: e.clientX - rect.left, y: e.clientY - rect.top, id },
    ]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
    onClick?.(e);
  }

  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-[box-shadow,background-color,color] duration-300 active:scale-95";
  const styles =
    variant === "solid"
      ? "bg-gold-grad text-[#1b140a] shadow-glow hover:shadow-glow-lg"
      : "border border-gold/60 text-gold hover:bg-gold/10";

  return (
    <motion.a
      ref={ref}
      style={{ x, y }}
      className={`${base} ${styles} ${className}`}
      onClick={handleClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...(rest as any)}
    >
      <span className="relative z-10 inline-flex items-center gap-2 transition-transform duration-300 group-hover:scale-[1.03]">
        {children}
      </span>
      {/* brilho deslizante */}
      {variant === "solid" && (
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      )}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="animate-ripple pointer-events-none absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </motion.a>
  );
}
