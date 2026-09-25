"use client";

import Image from "next/image";
import { Building2, Heart, Sparkles, LayoutGrid } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { CLINIC_PHOTOS, STATS } from "@/lib/data";

/**
 * Sem foto do espaço, o bloco mostra o que as fotos iam provar: os três
 * adjetivos que mais aparecem nas avaliações do Google ("acolhedor, limpo e
 * organizado" — ver TESTIMONIALS). Com a primeira foto preenchida em
 * CLINIC_PHOTOS, a grade de fotos volta sozinha.
 */
const QUALITIES = [
  { icon: Heart, title: "Acolhedor", text: "Um ambiente calmo, pensado para você relaxar do começo ao fim." },
  { icon: Sparkles, title: "Limpo", text: "Protocolos de higiene rigorosos e material descartável." },
  { icon: LayoutGrid, title: "Organizado", text: "Cada atendimento no seu horário, com tudo preparado." },
];

export function About() {
  const photos = CLINIC_PHOTOS.filter((p) => p.src);

  return (
    <section id="sobre" className="section-pad relative bg-sand">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <Building2 size={14} /> A clínica
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
            Um espaço para você{" "}
            <span className="text-terracotta-dark">se sentir em casa</span>
          </h2>
          <p className="mt-4 text-muted">
            O Espaço Cuide-se Bem nasceu para unir tecnologia de ponta,
            profissionais especializadas e um ambiente acolhedor. Nossa missão é
            elevar a autoestima de cada cliente com tratamentos seguros,
            personalizados e resultados que encantam.
          </p>
        </Reveal>

        {/* Números */}
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-panel border border-line bg-line lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} variant="rise" index={i} className="h-full">
              <div className="flex h-full flex-col items-center justify-center bg-surface px-4 py-7 text-center">
                <p className="font-display text-3xl font-semibold text-olive-dark sm:text-4xl">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1.5 text-sm text-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* O espaço */}
        <Reveal className="mt-16">
          <h3 className="text-center font-display text-2xl font-semibold">
            Conheça o nosso espaço
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm text-muted">
            Acolhedor, limpo e organizado — é o que mais aparece nas avaliações
            de quem já veio.
          </p>
        </Reveal>

        {photos.length === 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {QUALITIES.map((q, i) => (
              <Reveal key={q.title} variant="rise" index={i} className="h-full">
                <div className="flex h-full flex-col items-center rounded-panel border border-line bg-surface px-6 py-9 text-center shadow-soft">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-terracotta/10 text-terracotta-dark">
                    <q.icon size={24} />
                  </span>
                  <p className="mt-5 font-display text-2xl font-semibold">{q.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{q.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          /* As colunas derivam em camadas diferentes: é o que transforma uma
             grade parada em profundidade. `items-start` porque as camadas
             deslocam e um `stretch` brigaria com o transform. */
          <div className="mt-8 grid items-start gap-5 sm:grid-cols-3">
            {photos.map((photo, i) => (
              <Reveal key={photo.label} variant="rise" index={i}>
                <Parallax layer={(["front", "back", "mid"] as const)[i % 3]}>
                  <figure className="group overflow-hidden rounded-panel border border-line shadow-soft">
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={photo.src}
                        alt={`${photo.label} do Espaço Cuide-se Bem`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                    <figcaption className="bg-surface px-4 py-3 text-sm font-medium">
                      {photo.label}
                    </figcaption>
                  </figure>
                </Parallax>
              </Reveal>
            ))}
          </div>
        )}

        {/* Os valores saíram daqui: agora são a seção ValuesStory, logo abaixo
            nesta mesma página, com o painel fixo. */}
      </div>
    </section>
  );
}
