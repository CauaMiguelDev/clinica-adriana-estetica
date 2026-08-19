"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ArrowRight, MessageCircle, Leaf } from "lucide-react";
import { ActionButton } from "@/components/ui/ActionButton";
import { Contours } from "@/components/ui/Contours";
import { CLINIC, waLink } from "@/lib/data";
import { AMBIENT, DUR, EASE, STAGGER, SHIFT } from "@/lib/motion";

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
      {/* Camada 1 — base em CSS. */}
      <div className="pointer-events-none absolute inset-0 bg-sand-fade" />

      {/* Camada 2 — as linhas de nível, aqui maiores e mais presentes que no
          resto do site: é o Hero que carrega o peso visual da página.

          Não há mais véu de contraste por cima, e não é esquecimento. O véu
          existia porque as pétalas 3D eram massas opacas atrás do título; linha
          de 0.35px não disputa leitura com texto de 60px, e o véu só serviria
          para apagar a textura que acabou de entrar. */}
      <div className="pointer-events-none absolute inset-0 select-none">
        <Contours
          tone="olive"
          className="absolute -left-[22vw] -top-[26vh] h-[92vw] w-[92vw] sm:-left-[10vw] sm:h-[64vw] sm:w-[64vw]"
        />
        <Contours
          tone="terracotta"
          period={AMBIENT.medium}
          phase={7}
          className="absolute -bottom-[30vh] -right-[26vw] h-[80vw] w-[80vw] sm:h-[52vw] sm:w-[52vw]"
        />
      </div>

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
