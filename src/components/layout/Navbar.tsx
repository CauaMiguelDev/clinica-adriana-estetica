"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { GoldButton } from "@/components/ui/GoldButton";
import { Logo } from "@/components/ui/Logo";
import { CLINIC, waLink } from "@/lib/data";

const LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#equipe", label: "Equipe" },
  { href: "#procedimentos", label: "Procedimentos" },
  { href: "#resultados", label: "Resultados" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: destaca no menu a seção que está no meio da tela.
  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));

    const onScroll = () => {
      const line = window.scrollY + window.innerHeight * 0.35;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= line) current = `#${id}`;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-bg/85 py-3 shadow-luxe backdrop-blur-xl"
          : "border-b border-transparent py-5"
      }`}
    >
      <nav className="container-luxe flex w-full items-center justify-between gap-4">
        <a href="#inicio" aria-label={CLINIC.name}>
          <Logo />
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? "true" : undefined}
                className={`group relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                  isActive ? "text-gold" : "text-muted hover:text-fg"
                }`}
              >
                {l.label}
                <span
                  className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-gold-grad transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Alternar tema"
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg transition-colors hover:border-gold hover:text-gold"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <GoldButton
            href={waLink(`Olá! Gostaria de agendar um horário no ${CLINIC.name}.`)}
            target="_blank"
            rel="noopener"
            className="hidden sm:inline-flex"
          >
            Agendar
          </GoldButton>
          <button
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-line lg:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>
    </header>

      {/* Menu mobile — FORA do <header> para não ser afetado pelo backdrop-blur,
          que quebraria o position:fixed do overlay/drawer */}
      <AnimatePresence>
        {open && (
          <div className="lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              style={{ backgroundColor: "rgb(var(--surface))" }}
              className="fixed right-0 top-0 z-[95] flex h-full w-[80%] max-w-sm flex-col gap-2 border-l border-line p-8 shadow-luxe"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
                className="mb-6 grid h-10 w-10 place-items-center self-end rounded-full border border-line"
              >
                <X size={20} />
              </button>
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-lg transition-colors hover:bg-gold/10 hover:text-gold"
                >
                  {l.label}
                </a>
              ))}
              <GoldButton
                href={waLink(
                  `Olá! Gostaria de agendar um horário na ${CLINIC.name}.`
                )}
                className="mt-4"
              >
                Agendar pelo WhatsApp
              </GoldButton>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
