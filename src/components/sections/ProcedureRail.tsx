"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Clock, ArrowRight, Sparkles } from "lucide-react";
import { PROCEDURES } from "@/lib/data";

/**
 * A sequência "scrubbed": o progresso do scroll vira translação horizontal.
 *
 * ## Como funciona
 *
 * A seção externa é alta (`h-[300vh]`); dentro dela, um painel `sticky` de uma
 * tela de altura fica preso enquanto a página rola por baixo. `useScroll`
 * devolve 0→1 conforme a seção atravessa a viewport, e esse número vira o `x`
 * do trilho. O resultado é que rolar para baixo empurra os cartões para a
 * esquerda: o movimento é do dedo, não de um temporizador.
 *
 * ## As duas armadilhas
 *
 * 1. **A largura da janela não é a largura do trilho.** O deslocamento é dado
 *    em `%` do próprio trilho, não em pixels, senão a conta quebra em toda
 *    largura de tela que não seja a que eu testei. `-100% + 100vw` para o
 *    último cartão parar rente à borda direita.
 *
 * 2. **`h-[300vh]` sequestra o scroll de quem não quer.** Com movimento
 *    reduzido, a seção vira uma grade vertical comum — sem altura falsa, sem
 *    sticky, sem scrub. Não é a mesma coisa "mais lenta": é outra coisa.
 */

// Um recorte, não o catálogo: o trilho é vitrine, e o catálogo com filtros
// vem logo abaixo na mesma página.
const RAIL = PROCEDURES.slice(0, 8);

export function ProcedureRail() {
  const calm = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });

  // Começa em 2% para o primeiro cartão não nascer colado na borda.
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "calc(-100% + 96vw)"]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (calm) {
    return (
      <section id="trilho" className="section-pad relative bg-sand">
        <div className="container-page">
          <Header />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {RAIL.map((p) => (
              <Card key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="trilho"
      ref={track}
      className="relative h-[300vh] bg-sand"
      aria-label="Procedimentos em destaque"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-16">
        <div className="container-page">
          <Header />
        </div>

        <motion.div style={{ x }} className="mt-10 flex gap-5 will-change-transform">
          {RAIL.map((p) => (
            <div key={p.id} className="w-[78vw] shrink-0 sm:w-[46vw] lg:w-[30vw]">
              <Card p={p} />
            </div>
          ))}
        </motion.div>

        {/* Barra de progresso: sem ela, uma seção que prende o scroll parece
            travada em vez de intencional. */}
        <div className="container-page mt-10">
          <div className="h-1 w-full overflow-hidden rounded-full bg-line">
            <motion.div
              style={{ width: progress }}
              className="h-full rounded-full bg-olive"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="eyebrow justify-center">
        <Sparkles size={14} /> Em destaque
      </span>
      <h2 className="mt-4 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.01em] sm:text-5xl">
        Role para percorrer{" "}
        <span className="font-normal italic text-terracotta-dark">os procedimentos</span>
      </h2>
    </div>
  );
}

function Card({ p }: { p: (typeof PROCEDURES)[number] }) {
  return (
    <article className="flex h-full min-h-[19rem] flex-col rounded-card border border-line bg-surface p-6 shadow-soft sm:p-7">
      <span className="eyebrow">{p.category}</span>
      <h3 className="mt-3 font-display text-xl font-semibold break-words">
        {p.name}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted break-words">
        {p.description}
      </p>
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-5 text-sm">
        <span className="inline-flex items-center gap-1.5 text-muted">
          <Clock size={14} /> {p.duration}
        </span>
        <a
          href="#procedimentos"
          className="group inline-flex items-center gap-1.5 font-semibold text-olive-dark hover:underline"
        >
          No catálogo
          <ArrowRight
            size={14}
            className="transition-transform duration-500 group-hover:translate-x-1"
          />
        </a>
      </div>
    </article>
  );
}
