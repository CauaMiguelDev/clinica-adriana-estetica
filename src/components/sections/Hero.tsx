"use client";

import { motion } from "framer-motion";
import { Star, ArrowRight, MessageCircle, Leaf } from "lucide-react";
import { WaterScene } from "@/components/ui/WaterScene";
import { CLINIC, waLink } from "@/lib/data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[92svh] items-center overflow-hidden pb-24 pt-32 sm:pt-36"
    >
      {/* Base em CSS (também é o fallback sem WebGL) + superfície d'água 3D. */}
      <div className="pointer-events-none absolute inset-0 bg-sand-fade" />
      <WaterScene className="pointer-events-none absolute inset-x-0 bottom-0 top-1/4 select-none" />

      <div className="container-page relative z-10 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span variants={item} className="eyebrow justify-center">
            <Leaf size={14} /> Estética &amp; bem-estar em Ceilândia
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-4xl font-semibold leading-[1.1] sm:text-6xl"
          >
            Um tempo para{" "}
            <span className="text-terracotta-dark">cuidar de você</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Tratamentos faciais, corporais, harmonização e massoterapia
            conduzidos por especialistas certificadas, num espaço acolhedor em
            Brasília.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href={waLink(
                `Olá! Gostaria de agendar um horário no ${CLINIC.name}.`
              )}
              target="_blank"
              rel="noopener"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-olive px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition-colors duration-300 hover:bg-olive-dark hover:shadow-lift active:scale-[0.98] sm:w-auto"
            >
              <MessageCircle size={16} /> Agendar pelo WhatsApp
            </a>
            <a
              href="#servicos"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-terracotta/50 px-7 py-3.5 text-sm font-semibold text-terracotta-dark transition-colors duration-300 hover:border-terracotta hover:bg-terracotta hover:text-white active:scale-[0.98] sm:w-auto"
            >
              Ver serviços <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* Prova social real, sem decoração inventada. */}
          <motion.a
            variants={item}
            href="#depoimentos"
            className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/80 px-5 py-2.5 text-sm shadow-soft backdrop-blur transition-colors hover:border-olive/40"
          >
            <span className="flex text-gold" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </span>
            <span className="font-semibold">
              {CLINIC.rating.toFixed(1).replace(".", ",")}
            </span>
            <span className="text-muted">
              · {CLINIC.reviews}+ avaliações no Google
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
