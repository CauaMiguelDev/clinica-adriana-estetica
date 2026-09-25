"use client";

import Image from "next/image";
import { Instagram, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { CLINIC, INSTAGRAM_POSTS } from "@/lib/data";

/**
 * Instagram.
 *
 * A grade só aparece com posts reais (INSTAGRAM_POSTS em src/lib/data.ts) —
 * fotos de banco como se fossem da clínica seriam enganosas, e uma grade de
 * quadros vazios faz o site parecer inacabado. Sem foto, a seção é só o convite
 * para seguir o perfil, que funciona sempre.
 */
export function InstagramFeed() {
  const posts = INSTAGRAM_POSTS.filter((p) => p.image);

  return (
    <section id="instagram" className="section-pad relative bg-bg">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <Instagram size={14} /> Nosso dia a dia
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
            Siga no <span className="text-terracotta-dark">Instagram</span>
          </h2>
          <p className="mt-4 text-muted">
            Resultados, bastidores e novidades da clínica.
          </p>
          <a
            href={CLINIC.instagram}
            target="_blank"
            rel="noopener"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-olive px-6 py-3 text-sm font-semibold text-white shadow-soft transition-colors duration-300 hover:bg-olive-dark hover:shadow-lift active:scale-[0.98]"
          >
            <Instagram size={17} /> {CLINIC.instagramHandle}
          </a>
        </Reveal>

        {posts.length > 0 && (
          <>
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal key={post.caption} variant="rise" index={i}>
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
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, 33vw"
                    />
                    <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-fg/60 px-3 text-center text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <Instagram size={24} />
                      {post.caption}
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-8 text-center">
              <a
                href={CLINIC.instagram}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-olive-dark transition-all hover:gap-2.5 hover:underline"
              >
                Ver todas as publicações <ArrowUpRight size={15} />
              </a>
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
}
