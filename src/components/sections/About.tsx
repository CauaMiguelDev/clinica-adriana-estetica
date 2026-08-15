"use client";

import Image from "next/image";
import {
  ShieldCheck,
  HeartHandshake,
  Gem,
  Leaf,
  Building2,
  ImagePlus,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { CLINIC_PHOTOS, STATS } from "@/lib/data";

const VALUES = [
  { icon: Gem, title: "Excelência", text: "Padrão premium em cada atendimento." },
  { icon: ShieldCheck, title: "Segurança", text: "Protocolos rigorosos e certificados." },
  { icon: HeartHandshake, title: "Acolhimento", text: "Atendimento humano e personalizado." },
  { icon: Leaf, title: "Bem-estar", text: "Cuidado integral do corpo e da mente." },
];

export function About() {
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
            <Reveal key={s.label} delay={i * 0.06} className="h-full">
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

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {CLINIC_PHOTOS.map((photo, i) => (
            <Reveal key={photo.label} delay={i * 0.08}>
              {photo.src ? (
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
              ) : (
                <div className="flex aspect-[4/5] flex-col items-center justify-center gap-3 rounded-panel border border-dashed border-olive/35 bg-surface/60 px-6 text-center">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-olive/10 text-olive">
                    <ImagePlus size={22} />
                  </span>
                  <p className="font-display text-lg font-semibold">
                    {photo.label}
                  </p>
                  <p className="text-sm text-muted">Foto em breve</p>
                </div>
              )}
            </Reveal>
          ))}
        </div>

        {/* Valores */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06} className="h-full">
              <div className="group flex h-full gap-4 rounded-card border border-line bg-surface p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-olive/30 hover:shadow-lift">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-olive/10 text-olive transition-colors duration-300 group-hover:bg-olive group-hover:text-white">
                  <v.icon size={20} />
                </span>
                <div>
                  <h4 className="font-display text-lg font-semibold">
                    {v.title}
                  </h4>
                  <p className="mt-0.5 text-sm text-muted">{v.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
