"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { CLINIC, waLink } from "@/lib/data";

// Todo link aponta para uma seção que existe — o scrollspy depende disso.
const LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#resultados", label: "Resultados" },
  { href: "#sobre", label: "A Clínica" },
  { href: "#equipe", label: "Equipe" },
  { href: "#faq", label: "Dúvidas" },
  { href: "#contato", label: "Contato" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Drawer aberto: Esc fecha e o corpo para de rolar por baixo do overlay.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    // Segura desktop e Android. O Safari iOS ignora isto no scroll por toque —
    // lá quem trava é o `touch-action: none` do overlay e o `overscroll-contain`
    // do drawer, logo abaixo. Fixar o body seria mais forte, mas exigiria
    // devolver a posição ao fechar, e essa devolução cancela o pulo dos links
    // de âncora do próprio menu.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

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
          ? "border-b border-line bg-bg/85 py-3 shadow-lift backdrop-blur-xl"
          : "border-b border-transparent py-5"
      }`}
    >
      <nav className="container-page flex w-full items-center justify-between gap-4">
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
                className={`group relative rounded-full px-3.5 py-2 text-sm transition-colors duration-200 ${
                  isActive ? "text-olive-dark" : "text-muted hover:text-fg"
                }`}
              >
                {/* Pílula que cresce a partir do centro no hover. */}
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 scale-75 rounded-full bg-olive/10 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100"
                />
                {l.label}
                {/* Sublinhado da seção ativa: desliza da esquerda. */}
                <span
                  aria-hidden
                  className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left rounded-full bg-olive transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={waLink(`Olá! Gostaria de agendar um horário no ${CLINIC.name}.`)}
            target="_blank"
            rel="noopener"
            className="hidden rounded-full bg-olive px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-olive-dark active:scale-[0.98] sm:inline-flex"
          >
            Agendar
          </a>
          <button
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={open}
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
              className="fixed inset-0 z-[90] touch-none bg-fg/50 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              style={{ backgroundColor: "rgb(var(--surface))" }}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed right-0 top-0 z-[95] flex h-full w-[80%] max-w-sm flex-col gap-2 overflow-y-auto overscroll-contain border-l border-line p-8 shadow-lift"
            >
              {/* ponytail: autoFocus + aria-modal, sem armadilha de foco. São 6
                  links; se o drawer ganhar formulário, aí sim prender o Tab. */}
              <button
                autoFocus
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
                  className="rounded-xl px-4 py-3 text-lg transition-colors hover:bg-olive/10 hover:text-olive"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={waLink(
                  `Olá! Gostaria de agendar um horário no ${CLINIC.name}.`
                )}
                target="_blank"
                rel="noopener"
                onClick={() => setOpen(false)}
                className="mt-4 flex items-center justify-center rounded-full bg-olive px-5 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-olive-dark"
              >
                Agendar pelo WhatsApp
              </a>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
