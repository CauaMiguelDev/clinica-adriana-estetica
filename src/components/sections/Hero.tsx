"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Star, ArrowRight, MessageCircle, Leaf } from "lucide-react";
import { ActionButton } from "@/components/ui/ActionButton";
import { CLINIC, waLink } from "@/lib/data";
import { DUR, EASE, STAGGER, SHIFT } from "@/lib/motion";

/**
 * A cena 3D entra fora do bundle inicial e sem SSR — three, r3f e drei somam
 * mais que o resto da home junta, e não existe WebGL no servidor.
 *
 * Não há `loading`: a Camada 1 em CSS já está desenhada atrás e é o fallback.
 * Quem não tem WebGL, ou está com movimento reduzido, fica com ela e o Hero
 * continua inteiro.
 */
const PetalScene = dynamic(
  () => import("@/components/ui/PetalScene").then((m) => m.PetalScene),
  { ssr: false }
);

const container = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER.step * 1.6, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: SHIFT.normal },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.enter, ease: EASE.enter },
  },
};

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[94svh] items-center overflow-hidden pb-24 pt-32 sm:pt-36"
    >
      {/* Camada 1 — base em CSS, também o fallback sem WebGL. */}
      <div className="pointer-events-none absolute inset-0 bg-sand-fade" />

      {/* Camada 2 — as pétalas de vidro. Peça de destaque. */}
      <PetalScene className="pointer-events-none absolute inset-0 select-none" />

      {/* Camada 3 — véu que garante o contraste do texto sobre as pétalas. */}
      <div className="pointer-events-none absolute inset-0 bg-bg/45" />

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
            <ActionButton
              href={waLink(
                `Olá! Gostaria de agendar um horário no ${CLINIC.name}.`
              )}
              target="_blank"
              rel="noopener"
              className="w-full sm:w-auto"
            >
              <MessageCircle size={16} /> Agendar pelo WhatsApp
            </ActionButton>
            <ActionButton
              href="/servicos"
              variant="outline"
              className="w-full sm:w-auto"
            >
              Ver serviços <ArrowRight size={16} />
            </ActionButton>
          </motion.div>

          <motion.div variants={item} className="mt-10">
          <Link
            href="/resultados"
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/85 px-5 py-2.5 text-sm shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-olive/40 hover:shadow-lift"
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
          </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
