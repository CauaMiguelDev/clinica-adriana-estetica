"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Target,
  ArrowRight,
  ScanFace,
  PersonStanding,
  Zap,
  HandHeart,
  Gem,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { PICK_CATEGORY } from "@/components/sections/Services";
import {
  PROCEDURES,
  CATEGORIES,
  CLINIC,
  waLink,
  type Category,
} from "@/lib/data";

type Filter = "Todos" | Category;
const FILTERS: Filter[] = ["Todos", ...CATEGORIES];

const CATEGORY_ICON: Record<Category, typeof ScanFace> = {
  Facial: ScanFace,
  Corporal: PersonStanding,
  "Harmonização Facial": Gem,
  Massoterapia: HandHeart,
  "Estética Avançada": Zap,
};

const PAGE = 12;

export function Procedures() {
  const [active, setActive] = useState<Filter>("Todos");
  const [visibleCount, setVisibleCount] = useState(PAGE);

  // Os cartões da seção Serviços escolhem a categoria daqui.
  // A âncora do link cuida da rolagem; este evento só aplica o filtro.
  useEffect(() => {
    const onPick = (e: Event) =>
      setActive((e as CustomEvent<Category>).detail ?? "Todos");
    window.addEventListener(PICK_CATEGORY, onPick);
    return () => window.removeEventListener(PICK_CATEGORY, onPick);
  }, []);

  useEffect(() => setVisibleCount(PAGE), [active]);

  const list =
    active === "Todos"
      ? PROCEDURES
      : PROCEDURES.filter((p) => p.category === active);
  const visibleList = list.slice(0, visibleCount);

  return (
    <section id="procedimentos" className="section-pad relative">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <Sparkles size={14} /> Catálogo completo
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
            Todos os <span className="text-terracotta-dark">procedimentos</span>
          </h2>
          <p className="mt-4 text-muted">
            {PROCEDURES.length} tratamentos conduzidos pelas nossas
            especialistas.
          </p>
        </Reveal>

        {/* Filtro único, por categoria. */}
        <Reveal delay={0.08}>
          {/* Botões de alternância, não abas: não existe tabpanel por trás
              deles, então `aria-pressed` descreve melhor do que role="tab". */}
          <div
            role="group"
            aria-label="Filtrar por categoria"
            className="mt-10 flex flex-wrap justify-center gap-2.5"
          >
            {FILTERS.map((f) => {
              const isActive = active === f;
              return (
                <button
                  key={f}
                  aria-pressed={isActive}
                  onClick={() => setActive(f)}
                  className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? "border-olive bg-olive text-white"
                      : "border-line bg-surface text-muted hover:border-olive/40 hover:text-olive-dark"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.div
          layout
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visibleList.map((p) => {
              const Icon = CATEGORY_ICON[p.category];
              return (
                <motion.article
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group flex h-full flex-col rounded-card border border-line bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-olive/30 hover:shadow-lift"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-olive/10 text-olive transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <Icon size={19} />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                      {p.category}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-semibold leading-snug">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-sm text-olive-dark">{p.pro}</p>

                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {p.description}
                  </p>

                  <ul className="mt-4 space-y-1.5">
                    {p.benefits.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-sm text-fg"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-olive-light"
                          aria-hidden
                        />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-line pt-4 text-xs text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={14} className="text-olive" /> {p.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Target size={14} className="text-olive" /> {p.indication}
                    </span>
                  </div>

                  <div className="mt-auto pt-5">
                    <a
                      href={waLink(
                        `Olá! Tenho interesse no procedimento "${p.name}" (${p.pro}) na ${CLINIC.name}. Poderia me passar mais informações?`
                      )}
                      target="_blank"
                      rel="noopener"
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-olive/50 py-2.5 text-sm font-semibold text-olive-dark transition-colors duration-300 hover:border-olive hover:bg-olive hover:text-white active:scale-[0.98]"
                    >
                      Agendar <ArrowRight size={15} />
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {list.length > visibleCount && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setVisibleCount((n) => n + PAGE)}
              className="rounded-full border border-olive/50 px-6 py-3 text-sm font-semibold text-olive-dark transition-colors duration-300 hover:border-olive hover:bg-olive hover:text-white"
            >
              Ver mais {Math.min(PAGE, list.length - visibleCount)} procedimentos
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
