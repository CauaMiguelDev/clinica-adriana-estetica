"use client";

import Link from "next/link";
import { Star, ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ActionButton } from "@/components/ui/ActionButton";
import { CLINIC, RESULTS, TESTIMONIALS, waLink } from "@/lib/data";

/**
 * Prova social na home, em uma dobra só.
 *
 * O antes/depois e a grade de depoimentos ficam em `/resultados`: aqui entram
 * a nota do Google e dois depoimentos curtos, que é o que sustenta o CTA sem
 * transformar a home num scroll longo de novo.
 */
export function ResultsTeaser() {
  // Os dois mais curtos: cabem no cartão sem virar parede de texto.
  const picks = [...TESTIMONIALS]
    .sort((a, b) => a.text.length - b.text.length)
    .slice(0, 2);

  return (
    <section id="resultados" className="section-pad relative bg-sand">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <Sparkles size={14} /> Quem já passou por aqui
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
            Nota {CLINIC.rating.toFixed(1)}{" "}
            <span className="text-terracotta-dark">no Google</span>
          </h2>
          <p className="mt-4 text-muted">
            {CLINIC.reviews} avaliações de quem já sentou na nossa maca.
          </p>
          <div
            className="mt-4 flex justify-center gap-1 text-terracotta-dark"
            aria-label={`Nota ${CLINIC.rating} de 5`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} fill="currentColor" aria-hidden />
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {picks.map((t, i) => (
            <Reveal key={t.name} variant="rise" index={i} className="h-full">
              <figure className="flex h-full flex-col rounded-card border border-line bg-surface p-6 shadow-soft sm:p-7">
                <blockquote className="flex-1 text-sm leading-relaxed text-fg break-words">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-olive/10 font-display font-semibold text-olive-dark">
                    {t.initial}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">
                      {t.name}
                    </span>
                    <span className="block truncate text-xs text-muted">
                      {t.treatment}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal
          variant="rise"
          index={picks.length}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <ActionButton
            href={waLink(
              `Olá! Gostaria de agendar um horário no ${CLINIC.name}.`
            )}
            target="_blank"
            rel="noopener"
          >
            <MessageCircle size={16} /> Agendar pelo WhatsApp
          </ActionButton>
          <Link
            href="/resultados"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-olive-dark underline-offset-4 hover:underline"
          >
            {/* O antes e depois só existe com fotos; sem elas, /resultados
                abre nos depoimentos. */}
            {RESULTS.some((r) => r.before && r.after)
              ? "Ver antes e depois"
              : "Ver todos os depoimentos"}
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
