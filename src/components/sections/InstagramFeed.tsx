"use client";

import Image from "next/image";
import { Instagram, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { CLINIC, INSTAGRAM_POSTS } from "@/lib/data";

/**
 * Instagram.
 *
 * Fotos reais do perfil (INSTAGRAM_POSTS em src/lib/data.ts), em grade bento:
 * a primeira ocupa 2×2 e as outras quatro fecham o retângulo — 4 colunas por 2
 * linhas no desktop, 2 colunas no celular, sem buraco em nenhum dos dois.
 * Um post sem foto cai no espaço reservado em vez de uma foto de banco.
 */
export function InstagramFeed() {
  return (
    <section id="instagram" className="section-pad relative bg-bg">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <Instagram size={14} /> Nosso dia a dia
          </span>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.01em] sm:text-5xl">
            Siga no <span className="font-normal italic text-terracotta-dark">Instagram</span>
          </h2>
          <p className="mt-4 text-muted">
            Resultados, bastidores e novidades da clínica.
          </p>
          <a
            href={CLINIC.instagram}
            target="_blank"
            rel="noopener"
            className="group mt-6 inline-flex items-center gap-3 rounded-full border border-line bg-surface py-1.5 pl-1.5 pr-5 text-sm font-semibold shadow-soft transition-[box-shadow,border-color] duration-600 hover:border-olive/40 hover:shadow-lift"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-terracotta-grad text-white transition-transform duration-800 group-hover:rotate-[-12deg] group-hover:scale-110">
              <Instagram size={17} />
            </span>
            {CLINIC.instagramHandle}
          </a>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {INSTAGRAM_POSTS.map((post, i) => (
            <Reveal
              key={post.caption}
              variant="rise"
              index={i}
              className={i === 0 ? "col-span-2 row-span-2" : ""}
            >
              {post.image ? (
                <a
                  href={CLINIC.instagram}
                  target="_blank"
                  rel="noopener"
                  aria-label={`Ver no Instagram: ${post.caption}`}
                  className="group relative block aspect-square overflow-hidden rounded-card border border-line shadow-soft"
                >
                  <Image
                    src={post.image}
                    alt={post.caption}
                    fill
                    placeholder="blur"
                    className="object-cover transition-transform duration-1200 group-hover:scale-[1.06]"
                    sizes={i === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
                  />
                  {/* Legenda sobe de baixo junto com um véu em gradiente: o
                      texto entra, a foto continua visível atrás. */}
                  <span className="absolute inset-0 bg-gradient-to-t from-fg/70 via-fg/10 to-transparent opacity-0 transition-opacity duration-600 group-hover:opacity-100" />
                  <span className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center gap-2 p-4 text-sm font-medium text-white opacity-0 transition-[opacity,transform] duration-600 group-hover:translate-y-0 group-hover:opacity-100">
                    <Instagram size={16} className="shrink-0" />
                    {post.caption}
                  </span>
                </a>
              ) : (
                <div className="grid aspect-square place-items-center rounded-card border border-dashed border-olive/30 bg-surface/60 px-4 text-center">
                  <div>
                    <Instagram
                      size={22}
                      className="mx-auto text-olive/50"
                      aria-hidden
                    />
                    <p className="mt-2 text-xs text-muted">{post.caption}</p>
                  </div>
                </div>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <a
            href={CLINIC.instagram}
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-olive-dark"
          >
            <span className="link-line">Ver todas as publicações</span>
            <ArrowUpRight size={15} className="transition-transform duration-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

        </Reveal>
      </div>
    </section>
  );
}
