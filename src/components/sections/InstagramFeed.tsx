"use client";

import Image from "next/image";
import { Instagram, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { CLINIC, INSTAGRAM_POSTS } from "@/lib/data";

export function InstagramFeed() {
  return (
    <section id="instagram" className="section-pad relative">
      <div className="container-luxe">
        <Reveal className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <span className="eyebrow"><Instagram size={14} /> Acompanhe nosso dia a dia</span>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-5xl">
              Siga no <span className="text-gradient-gold italic">Instagram</span>
            </h2>
            <p className="mt-3 max-w-md text-sm text-muted">
              Resultados reais, bastidores e novidades. Veja por que nossas
              clientes confiam no nosso trabalho.
            </p>
          </div>
          <a
            href={CLINIC.instagram}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full bg-gold-grad px-6 py-3 text-sm font-semibold text-[#1b140a] shadow-luxe transition-transform hover:scale-105"
          >
            <Instagram size={18} /> {CLINIC.instagramHandle}
          </a>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5">
          {INSTAGRAM_POSTS.map((post, i) => (
            <Reveal key={post.image} delay={i * 0.06}>
              <a
                href={CLINIC.instagram}
                target="_blank"
                rel="noopener"
                aria-label={`Ver no Instagram: ${post.caption}`}
                className="group relative block aspect-square overflow-hidden rounded-2xl border border-line shadow-luxe"
              >
                <Image
                  src={post.image}
                  alt={post.caption}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/55 px-3 text-center opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <Instagram size={26} className="text-gold-light" />
                  <span className="text-xs font-medium text-white sm:text-sm">
                    {post.caption}
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <a
            href={CLINIC.instagram}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-all hover:gap-2.5"
          >
            Ver todas as publicações <ArrowUpRight size={15} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
