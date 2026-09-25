"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { scrollToTop } from "@/lib/smooth";

/**
 * Voltar ao topo. O progresso de leitura já é mostrado pela barra do topo
 * (ScrollProgress) — aqui basta o botão.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      tabIndex={visible ? 0 : -1}
      className={`group fixed bottom-5 left-5 z-40 grid h-12 w-12 place-items-center rounded-full border border-line bg-surface text-olive-dark shadow-soft transition-all duration-500 hover:border-olive hover:shadow-lift sm:bottom-6 sm:left-6 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp
        size={18}
        className="transition-transform duration-500 group-hover:-translate-y-0.5"
      />
    </button>
  );
}
