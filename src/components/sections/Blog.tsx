"use client";

import { Clock, Check, ArrowRight, BookOpen } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { BLOG, CLINIC, waLink } from "@/lib/data";

/**
 * Dicas & novidades.
 *
 * Grade simples no lugar do acordeão horizontal de 38rem: ali os cards
 * fechados espremiam o próprio texto, e o conteúdo de três dos quatro artigos
 * ficava invisível.
 */
export function Blog() {
  return (
    <section id="blog" className="section-pad relative bg-bg">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <BookOpen size={14} /> Blog de estética
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
            Dicas &amp; <span className="text-terracotta-dark">novidades</span>
          </h2>
          <p className="mt-4 text-muted">
            O que nossas especialistas explicam sobre cada tratamento.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {BLOG.map((post, i) => (
            <Reveal key={post.title} variant="rise" index={i} className="h-full">
              <article className="flex h-full flex-col rounded-card border border-line bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-olive/30 hover:shadow-lift sm:p-7">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="rounded-full bg-olive/10 px-3 py-1 text-xs font-semibold text-olive-dark">
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                    <Clock size={13} /> {post.readTime} de leitura
                  </span>
                </div>

                <h3 className="mt-4 font-display text-xl font-semibold leading-snug">
                  {post.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>

                <ul className="mt-5 space-y-2 border-t border-line pt-5">
                  {post.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2.5 text-sm">
                      <Check size={15} className="mt-0.5 shrink-0 text-olive" />
                      {tip}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <a
                    href={waLink(
                      `Olá! Li sobre "${post.relatedPro}" no site da ${CLINIC.name} e gostaria de saber mais.`
                    )}
                    target="_blank"
                    rel="noopener"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-olive-dark hover:underline"
                  >
                    Saber mais sobre {post.relatedPro}
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
