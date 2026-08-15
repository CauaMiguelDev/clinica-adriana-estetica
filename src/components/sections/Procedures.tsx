"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Target, ArrowRight, LayoutGrid } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import {
  PROCEDURES,
  CATEGORIES,
  CLINIC,
  waLink,
  type Category,
} from "@/lib/data";

type Filter = "Todos" | Category;
const FILTERS: Filter[] = ["Todos", ...CATEGORIES];
const PROFESSIONALS = ["Todos", "Dra. Adriana", "Dra. Adrielhe", "Dra. Angélica", "Dra. Shay"];

export function Procedures() {
  const [filterType, setFilterType] = useState<"category" | "professional">("category");
  const [activeCategory, setActiveCategory] = useState<string>("Todos");
  const [activeProfessional, setActiveProfessional] = useState<string>("Todos");
  const [visibleCount, setVisibleCount] = useState(6);

  // Reseta a quantidade de itens visíveis ao mudar de filtro
  useEffect(() => {
    setVisibleCount(6);
  }, [filterType, activeCategory, activeProfessional]);

  const list = PROCEDURES.filter((p) => {
    if (filterType === "category") {
      return activeCategory === "Todos" || p.category === activeCategory;
    } else {
      return activeProfessional === "Todos" || p.pro === activeProfessional;
    }
  });

  const visibleList = list.slice(0, visibleCount);

  return (
    <section id="procedimentos" className="section-pad relative">
      <div className="container-luxe">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow"><LayoutGrid size={14} /> Catálogo</span>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-5xl">
            Nossos <span className="text-gradient-gold italic">procedimentos</span>
          </h2>
          <p className="mt-4 text-muted">
            Filtre por categoria e descubra o tratamento ideal para você.
          </p>
        </Reveal>

        {/* Seletor de Tipo de Filtro */}
        <Reveal delay={0.08}>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-full bg-surface/80 p-1 border border-line backdrop-blur">
              <button
                onClick={() => {
                  setFilterType("category");
                  setActiveCategory("Todos");
                }}
                className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  filterType === "category"
                    ? "bg-gold-grad text-[#1b140a]"
                    : "text-muted hover:text-fg"
                }`}
              >
                Por Categoria
              </button>
              <button
                onClick={() => {
                  setFilterType("professional");
                  setActiveProfessional("Todos");
                }}
                className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  filterType === "professional"
                    ? "bg-gold-grad text-[#1b140a]"
                    : "text-muted hover:text-fg"
                }`}
              >
                Por Profissional
              </button>
            </div>
          </div>
        </Reveal>

        {/* Filtros de Categoria ou Profissional */}
        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            {filterType === "category"
              ? FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveCategory(f)}
                    className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                      activeCategory === f
                        ? "border-gold bg-gold-grad text-[#1b140a]"
                        : "border-line text-muted hover:border-gold hover:text-gold"
                    }`}
                  >
                    {f}
                  </button>
                ))
              : PROFESSIONALS.map((pro) => (
                  <button
                    key={pro}
                    onClick={() => setActiveProfessional(pro)}
                    className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                      activeProfessional === pro
                        ? "border-gold bg-gold-grad text-[#1b140a]"
                        : "border-line text-muted hover:border-gold hover:text-gold"
                    }`}
                  >
                    {pro}
                  </button>
                ))}
          </div>
        </Reveal>

        {/* Grade de cartões de procedimentos (2 colunas no mobile) */}
        <motion.div layout className="mt-12 grid gap-3 sm:gap-7 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleList.map((p) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col overflow-hidden rounded-[1.5rem] sm:rounded-3xl border border-line bg-surface/60 shadow-luxe transition-colors duration-300 hover:border-gold/40 hover:shadow-glow"
              >
                <div className="relative h-32 sm:h-52 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute left-2.5 top-2.5 sm:left-3 sm:top-3 rounded-full bg-gold-grad px-2 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-xs font-semibold text-[#1b140a]">
                    {p.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-3 sm:p-6">
                  <h3 className="font-display text-sm sm:text-xl font-semibold leading-tight line-clamp-2 min-h-[2.5rem] sm:min-h-0">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-[10px] sm:text-xs text-gold">{p.pro}</p>
                  <p className="mt-2.5 text-xs sm:text-sm text-muted leading-relaxed hidden sm:block">
                    {p.description}
                  </p>

                  <div className="mt-4 flex-wrap gap-1.5 hidden sm:flex">
                    {p.benefits.map((b) => (
                      <span
                        key={b}
                        className="rounded-full bg-gold/10 px-2.5 py-1 text-xs text-gold-light"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 sm:mt-5 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 text-[10px] sm:text-xs text-muted">
                    <span className="inline-flex items-center gap-1 sm:gap-1.5">
                      <Clock className="text-gold h-3 w-3 sm:h-3.5 sm:w-3.5" /> {p.duration}
                    </span>
                    <span className="inline-flex items-center gap-1 sm:gap-1.5">
                      <Target className="text-gold h-3 w-3 sm:h-3.5 sm:w-3.5" /> {p.indication}
                    </span>
                  </div>

                  <a
                     href={waLink(
                       `Olá! Tenho interesse no procedimento "${p.name}" (${p.pro}) na ${CLINIC.name}. Poderia me passar mais informações?`
                     )}
                    target="_blank"
                    rel="noopener"
                    className="mt-4 sm:mt-6 inline-flex items-center justify-center gap-1 sm:gap-2 rounded-full border border-gold/50 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-gold transition-all hover:bg-gold-grad hover:text-[#1b140a]"
                  >
                    Agendar <ArrowRight className="h-3 w-3 sm:h-[15px] sm:w-[15px]" />
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Botão Carregar Mais */}
        {list.length > visibleCount && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="rounded-full bg-gold-grad px-6 py-2.5 text-sm font-semibold text-[#1b140a] transition-all hover:shadow-glow"
            >
              Carregar mais procedimentos
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

