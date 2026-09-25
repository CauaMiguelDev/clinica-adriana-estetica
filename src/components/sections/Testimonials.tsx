"use client";

import { Star, Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { TESTIMONIALS, CLINIC, googleReviewLink } from "@/lib/data";

/**
 * Depoimentos — as 8 avaliações reais do Google.
 *
 * Grade em colunas CSS no lugar do carrossel: o visitante lê várias de uma vez
 * em vez de esperar 11s por card, e não há nada girando sozinho.
 */
export function Testimonials() {
  return (
    <section id="depoimentos" className="section-pad relative bg-sand">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <Quote size={14} /> Depoimentos
          </span>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.01em] sm:text-5xl">
            Quem se cuida,{" "}
            <span className="font-normal italic text-terracotta-dark">recomenda</span>
          </h2>
          <p className="mt-4 inline-flex flex-wrap items-center justify-center gap-2 text-muted">
            <span className="flex text-gold" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </span>
            Nota {CLINIC.rating.toFixed(1).replace(".", ",")} · {CLINIC.reviews}+
            avaliações no Google
          </p>
        </Reveal>

        {/* columns: cada citação ocupa a altura do próprio texto, sem esticar. */}
        <div className="mt-12 gap-5 sm:columns-2 lg:columns-3">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              className="mb-5 break-inside-avoid rounded-card border border-line bg-surface p-6 shadow-soft"
            >
              <div className="flex text-gold" aria-label="5 de 5 estrelas">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={14} fill="currentColor" aria-hidden />
                ))}
              </div>

              <blockquote className="mt-4 text-sm leading-relaxed text-fg">
                “{t.text}”
              </blockquote>

              <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-base font-semibold ${
                    i % 3 === 0
                      ? "bg-olive/10 text-olive-dark"
                      : i % 3 === 1
                        ? "bg-terracotta/10 text-terracotta-dark"
                        : "bg-gold/15 text-fg"
                  }`}
                  aria-hidden
                >
                  {t.initial}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{t.name}</p>
                  <p className="truncate text-xs text-muted">{t.treatment}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-muted">
            Foi nossa cliente? Conte como foi a sua experiência:
          </p>
          <a
            href={googleReviewLink()}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full border border-olive/50 px-6 py-3 text-sm font-semibold text-olive-dark transition-colors duration-500 hover:border-olive hover:bg-olive hover:text-white"
          >
            <Star size={16} /> Avaliar no Google
          </a>
        </Reveal>
      </div>
    </section>
  );
}
