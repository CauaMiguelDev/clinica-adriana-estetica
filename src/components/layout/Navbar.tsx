"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { MessageCircle, Instagram, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ActionButton } from "@/components/ui/ActionButton";
import { Aurora } from "@/components/ui/Aurora";
import { CLINIC, waLink } from "@/lib/data";
import { DUR, EASE, SPRING } from "@/lib/motion";
import { lockScroll } from "@/lib/smooth";

/**
 * ## Estrutura
 *
 * Os links estão em dois grupos porque respondem a perguntas diferentes, e
 * misturá-los numa fileira só era o que fazia o menu parecer uma lista de
 * arquivos. **O que a clínica faz** (Serviços, Preços, Resultados) é o que
 * decide a compra; **quem é a clínica** (A Clínica, Blog, Contato) é o que
 * sustenta a confiança depois.
 *
 * No desktop o primeiro grupo fica em destaque e o segundo entra mais discreto,
 * depois de um separador — os seis cabem sem virar fileira de arquivos porque o
 * peso visual já diz qual grupo importa. No toque, os dois grupos ganham rótulo.
 *
 * `Contato` fica no segundo grupo de propósito. O botão de agendar já é a ação,
 * e ter os dois com o mesmo peso dividia o clique entre um caminho rápido
 * (WhatsApp) e um lento (formulário) sem dizer qual era qual.
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

const BOOK = waLink(`Olá! Gostaria de agendar um horário no ${CLINIC.name}.`);

export function Navbar() {
  const [open, setOpen] = useState(false);
  /** Esconde ao descer, devolve ao subir. */
  const [hidden, setHidden] = useState(false);
  /** Só depois de sair do topo o painel ganha fundo e borda. */
  const [floating, setFloating] = useState(false);
  /** Link sob o cursor — a pílula segue ele e volta à página ativa ao sair. */
  const [hovered, setHovered] = useState<string | null>(null);
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

  // Trocou de rota: o drawer fecha sozinho (o link já fecha, mas o voltar do
  // navegador não passa por ele).
  useEffect(() => setOpen(false), [pathname]);

  // Drawer aberto: Esc fecha e o corpo para de rolar por baixo do overlay.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    // Segura desktop e Android. O Safari iOS ignora isto no scroll por toque —
    // lá quem trava é o `touch-action: none` do overlay e o `overscroll-contain`
    // do drawer, logo abaixo. O Lenis precisa de trava própria: ele rola pela
    // roda do mouse sem passar pelo `overflow` do body.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lockScroll(true);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      lockScroll(false);
    };
  }, [open]);

  // Com o menu aberto o cabeçalho não pode fugir: o botão de fechar mora nele.
  const away = hidden && !open;
  const all = [...PRIMARY, ...SECONDARY];
  const current = all.find((l) => pathname === l.href)?.href ?? null;
  const pill = hovered ?? current;

  return (
    <>
      {/* O cabeçalho é um painel flutuante, não uma barra colada no topo. A
          barra de ponta a ponta corta a página em dois e obriga a competir com
          o conteúdo por contraste; o painel respeita a margem do
          `.container-page`. */}
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-transform duration-800 ${
          away ? "-translate-y-[130%]" : "translate-y-0"
        }`}
      >
        <div className="container-page pt-3 sm:pt-4">
          <nav
            aria-label="Principal"
            className={`flex items-center justify-between gap-4 rounded-full py-2 pl-3 pr-2 transition-[background-color,border-color,box-shadow,padding] duration-800 sm:pl-4 ${
              floating || open
                ? "border border-line/80 bg-bg/75 shadow-lift backdrop-blur-xl backdrop-saturate-150"
                : "border border-transparent"
            }`}
          >
            <Link href="/" aria-label={CLINIC.name} className="group shrink-0 pl-1">
              <Logo />
            </Link>

            <div
              className="hidden items-center lg:flex"
              onPointerLeave={() => setHovered(null)}
            >
              {PRIMARY.map((l) => (
                <NavLink
                  key={l.href}
                  {...l}
                  active={pathname === l.href}
                  pill={pill === l.href}
                  onHover={setHovered}
                />
              ))}
              <span aria-hidden className="mx-2 h-4 w-px bg-line" />
              {SECONDARY.map((l) => (
                <NavLink
                  key={l.href}
                  {...l}
                  quiet
                  active={pathname === l.href}
                  pill={pill === l.href}
                  onHover={setHovered}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <ActionButton
                href={BOOK}
                target="_blank"
                rel="noopener"
                size="sm"
                className="hidden sm:inline-flex"
              >
                <MessageCircle size={15} /> Agendar
              </ActionButton>
              <MenuToggle open={open} onToggle={() => setOpen((o) => !o)} />
            </div>
          </nav>
        </div>
      </header>

      {/* Menu de toque — FORA do <header> para não ser afetado pelo
          backdrop-blur, que quebraria o position:fixed do overlay/drawer. O
          cabeçalho fica por cima (z-[100]) e o botão que abriu é o mesmo que
          fecha — o X nasce do hambúrguer, no mesmo lugar. */}
      <AnimatePresence>
        {open && (
          <div className="lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DUR.state }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[90] touch-none bg-fg/40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ clipPath: "inset(0 0 100% 0 round 0 0 2rem 2rem)" }}
              animate={{ clipPath: "inset(0 0 0% 0 round 0 0 2rem 2rem)" }}
              exit={{ clipPath: "inset(0 0 100% 0 round 0 0 2rem 2rem)" }}
              transition={{ duration: DUR.enter, ease: EASE.enter }}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-x-0 top-0 z-[95] flex max-h-[100svh] flex-col overflow-y-auto overscroll-contain rounded-b-panel bg-bg px-5 pb-8 pt-28 shadow-lift sm:px-8"
            >
              <Aurora />

              {/* ponytail: aria-modal + foco no primeiro link, sem armadilha de
                  foco. São 6 links; se o drawer ganhar formulário, aí sim
                  prender o Tab. */}
              <motion.div
                variants={list}
                initial="hidden"
                animate="show"
                className="relative grid gap-8 sm:grid-cols-2"
              >
                <DrawerGroup title="Tratamentos" links={PRIMARY} start={0} pathname={pathname} />
                <DrawerGroup title="A clínica" links={SECONDARY} start={PRIMARY.length} pathname={pathname} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: DUR.enter, ease: EASE.enter }}
                className="relative mt-10 flex flex-col gap-3 sm:flex-row"
              >
                <ActionButton href={BOOK} target="_blank" rel="noopener" className="w-full sm:w-auto">
                  <MessageCircle size={16} /> Agendar pelo WhatsApp
                </ActionButton>
                <ActionButton
                  href={CLINIC.instagram}
                  target="_blank"
                  rel="noopener"
                  variant="ghost"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  <Instagram size={16} /> {CLINIC.instagramHandle}
                </ActionButton>
              </motion.div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Hambúrguer que vira X. Duas barras só — a do meio de um hambúrguer de três
 * é a que some, e animar o sumiço dela é o que faz a troca parecer engasgada.
 */
function MenuToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label={open ? "Fechar menu" : "Abrir menu"}
      aria-expanded={open}
      className="group relative grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/80 transition-colors hover:border-olive/40 lg:hidden"
    >
      <span className="relative block h-3 w-5">
        <span
          className={`absolute left-0 h-[1.5px] w-full rounded-full bg-fg transition-transform duration-600 ${
            open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
          }`}
        />
        <span
          className={`absolute left-0 h-[1.5px] rounded-full bg-fg transition-[transform,width] duration-600 ${
            open ? "top-1/2 w-full -translate-y-1/2 -rotate-45" : "bottom-0 w-3/5 group-hover:w-full"
          }`}
        />
      </span>
    </button>
  );
}

/**
 * Link do desktop. A pílula é **uma só** (`layoutId`) e desliza até o link sob
 * o cursor; sem cursor, repousa na página atual. Uma pílula por link, acendendo
 * e apagando, lia como pisca-pisca — deslizando, o olho acompanha.
 */
function NavLink({
  href,
  label,
  active,
  pill,
  quiet = false,
  onHover,
}: {
  href: string;
  label: string;
  active: boolean;
  pill: boolean;
  quiet?: boolean;
  onHover: (href: string) => void;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      onPointerEnter={() => onHover(href)}
      onFocus={() => onHover(href)}
      className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-400 ${
        active
          ? "font-semibold text-olive-dark"
          : quiet
            ? "text-muted hover:text-fg"
            : "text-fg/80 hover:text-fg"
      }`}
    >
      {pill && (
        <motion.span
          layoutId="nav-pill"
          transition={SPRING.pill}
          className={`absolute inset-0 -z-10 rounded-full ${active ? "bg-olive/[0.12]" : "bg-fg/[0.06]"}`}
        />
      )}
      {label}
    </Link>
  );
}

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
};

const row: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.enter, ease: EASE.enter } },
};

function DrawerGroup({
  title,
  links,
  start,
  pathname,
}: {
  title: string;
  links: typeof PRIMARY;
  start: number;
  pathname: string;
}) {
  return (
    <div>
      <motion.p variants={row} className="eyebrow mb-3">
        {title}
      </motion.p>
      <ul className="divide-y divide-line border-y border-line">
        {links.map((l, i) => {
          const active = pathname === l.href;
          return (
            <motion.li key={l.href} variants={row}>
              <Link
                href={l.href}
                autoFocus={start + i === 0}
                aria-current={active ? "page" : undefined}
                className={`group flex items-baseline gap-4 py-4 font-display text-3xl transition-colors duration-400 ${
                  active ? "text-olive-dark" : "hover:text-terracotta-dark"
                }`}
              >
                <span className="font-sans text-xs tabular-nums text-muted">
                  {String(start + i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 transition-transform duration-600 group-hover:translate-x-2">
                  {l.label}
                </span>
                <ArrowUpRight
                  size={20}
                  className="self-center text-muted opacity-0 transition-[opacity,transform] duration-600 group-hover:rotate-45 group-hover:opacity-100"
                />
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
