"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { CLINIC, waLink } from "@/lib/data";

/**
 * ## Estrutura
 *
 * Os links estão em dois grupos porque respondem a perguntas diferentes, e
 * misturá-los numa fileira só era o que fazia o menu parecer uma lista de
 * arquivos. **O que a clínica faz** (Serviços, Preços, Resultados) é o que
 * decide a compra; **quem é a clínica** (A Clínica, Blog, Contato) é o que
 * sustenta a confiança depois.
 *
 * No desktop só o primeiro grupo fica visível — três itens, não cinco. O
 * segundo entra no menu de toque e no rodapé. O `Blog` deixou de ser órfão do
 * rodapé por conta disso: agora existe um lugar onde ele cabe.
 *
 * `Contato` sai da fileira de propósito. O botão de agendar já é a ação, e ter
 * os dois lado a lado dividia o clique entre um caminho rápido (WhatsApp) e um
 * lento (formulário) sem dizer qual era qual.
 */
const PRIMARY = [
  { href: "/servicos", label: "Serviços" },
  { href: "/precos", label: "Preços" },
  { href: "/resultados", label: "Resultados" },
];

const SECONDARY = [
  { href: "/sobre", label: "A Clínica" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  /** Esconde ao descer, devolve ao subir. */
  const [hidden, setHidden] = useState(false);
  /** Só depois de sair do topo o painel ganha fundo e borda. */
  const [floating, setFloating] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;

      setFloating(y > 16);
      // A zona morta de 6px evita que o menu pisque com o repique de rolagem
      // por toque; abaixo de 120px ele nunca some, ou o topo da página ficaria
      // sem cabeçalho justo onde a pessoa acabou de chegar.
      if (Math.abs(dy) > 6) setHidden(dy > 0 && y > 120);

      lastY.current = y;
    };

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

  // Com o menu aberto o cabeçalho não pode fugir: o botão de fechar mora nele.
  const away = hidden && !open;

  return (
    <>
      {/* O cabeçalho é um painel flutuante, não uma barra colada no topo. A
          barra de ponta a ponta corta a página em dois e obriga a competir com
          o conteúdo por contraste; o painel respeita a margem do
          `.container-page` e deixa a textura passar dos lados. */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out ${
          away ? "-translate-y-[130%]" : "translate-y-0"
        }`}
      >
        <div className="container-page pt-3 sm:pt-4">
          <nav
            className={`flex items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-300 sm:px-4 ${
              floating
                ? "border border-line bg-bg/90 shadow-lift backdrop-blur-xl"
                : "border border-transparent"
            }`}
          >
            <Link href="/" aria-label={CLINIC.name} className="shrink-0 pl-1">
              <Logo />
            </Link>

            <div className="hidden items-center gap-1 lg:flex">
              {PRIMARY.map((l) => (
                <NavLink key={l.href} {...l} active={pathname === l.href} />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <a
                href={waLink(
                  `Olá! Gostaria de agendar um horário no ${CLINIC.name}.`
                )}
                target="_blank"
                rel="noopener"
                className="hidden items-center gap-2 rounded-full bg-olive px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-olive-dark active:scale-[0.98] sm:inline-flex"
              >
                <MessageCircle size={15} /> Agendar
              </a>
              <button
                onClick={() => setOpen(true)}
                aria-label="Abrir menu"
                aria-expanded={open}
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/70 lg:hidden"
              >
                <Menu size={20} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Menu de toque — FORA do <header> para não ser afetado pelo
          backdrop-blur, que quebraria o position:fixed do overlay/drawer. */}
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
              className="fixed right-0 top-0 z-[95] flex h-full w-[86%] max-w-sm flex-col overflow-y-auto overscroll-contain border-l border-line p-7 shadow-lift"
            >
              {/* O fechar mora aqui dentro, e não no cabeçalho: o drawer é
                  z-[95] e o cabeçalho z-50, então um X lá em cima ficaria
                  debaixo do próprio painel.

                  ponytail: autoFocus + aria-modal, sem armadilha de foco. São 6
                  links; se o drawer ganhar formulário, aí sim prender o Tab. */}
              <button
                autoFocus
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
                className="mb-6 grid h-10 w-10 shrink-0 place-items-center self-end rounded-full border border-line"
              >
                <X size={20} />
              </button>

              {/* Os mesmos dois grupos da estrutura acima, aqui explícitos: no
                  toque cabe a lista inteira, e sem rótulo ela viraria a fileira
                  de seis itens que o desktop evita. */}
              <DrawerGroup
                title="Tratamentos"
                links={PRIMARY}
                pathname={pathname}
                onNavigate={() => setOpen(false)}
              />
              <DrawerGroup
                title="A clínica"
                links={SECONDARY}
                pathname={pathname}
                onNavigate={() => setOpen(false)}
              />

              <a
                href={waLink(
                  `Olá! Gostaria de agendar um horário no ${CLINIC.name}.`
                )}
                target="_blank"
                rel="noopener"
                onClick={() => setOpen(false)}
                className="mt-auto flex items-center justify-center gap-2 rounded-full bg-olive px-5 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-olive-dark"
              >
                <MessageCircle size={16} /> Agendar pelo WhatsApp
              </a>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Link do desktop. A página atual é marcada por **pílula preenchida**, não mais
 * por um filete embaixo: o filete de 2px sumia sobre a textura de fundo e ficava
 * a um pixel de parecer defeito de renderização.
 */
function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
        active
          ? "bg-olive/10 font-semibold text-olive-dark"
          : "text-muted hover:bg-olive/5 hover:text-fg"
      }`}
    >
      {label}
    </Link>
  );
}

function DrawerGroup({
  title,
  links,
  pathname,
  onNavigate,
}: {
  title: string;
  links: typeof PRIMARY;
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <div className="mb-7">
      <p className="eyebrow mb-2 px-4">{title}</p>
      {links.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`block rounded-xl px-4 py-3 font-display text-xl transition-colors ${
              active
                ? "bg-olive/10 font-semibold text-olive-dark"
                : "hover:bg-olive/10 hover:text-olive"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </div>
  );
}
