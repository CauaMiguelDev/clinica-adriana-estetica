"use client";

import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { ScanFace, PersonStanding, HandHeart, ArrowRight, LayoutGrid } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { PHOTOS, PROCEDURES, type Category } from "@/lib/data";

/**
 * Amostra do catálogo na home: três áreas, não as cinco.
 *
 * A home existe para dar o primeiro impacto e mandar a pessoa adiante — o
 * catálogo inteiro mora em `/servicos`. As contagens saem de `PROCEDURES`,
 * então nunca desencontram do catálogo real.
 */
const PICKS: {
  category: Category;
  icon: typeof ScanFace;
  blurb: string;
  photo: StaticImageData;
  alt: string;
}[] = [
  {
    category: "Facial",
    icon: ScanFace,
    blurb: "Limpeza de pele, peelings e design de sobrancelhas.",
    photo: PHOTOS.facial,
    alt: "Cliente com máscara facial durante o tratamento",
  },
  {
    category: "Corporal",
    icon: PersonStanding,
    blurb: "Modelagem, firmeza, estrias e gordura localizada.",
    photo: PHOTOS.drenagem,
    alt: "Dreno modeladora no abdômen",
  },
  {
    category: "Massoterapia",
    icon: HandHeart,
    blurb: "Drenagem, liberação muscular e massagem relaxante.",
    photo: PHOTOS.sala,
    alt: "Sala de atendimento da clínica, com maca e almofadas",
  },
];

export function ServicesTeaser() {
  return (
    <section id="servicos" className="section-pad relative bg-bg">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <LayoutGrid size={14} /> O que fazemos
          </span>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.01em] sm:text-5xl">
            Cuidado para o corpo{" "}
            <span className="font-normal italic text-terracotta-dark">e para a mente</span>
          </h2>
          <p className="mt-4 text-muted">
            {PROCEDURES.length} procedimentos em cinco áreas de atendimento.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PICKS.map((area, i) => {
            const list = PROCEDURES.filter((p) => p.category === area.category);
            const Icon = area.icon;

            return (
              <Reveal key={area.category} variant="rise" index={i} className="h-full">
                <TiltCard className="h-full">
                  <Link
                    href="/servicos"
                    className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface shadow-soft transition-[transform,box-shadow,border-color] duration-600 hover:-translate-y-1.5 hover:border-olive/30 hover:shadow-lift"
                  >
                    {/* Foto real do Instagram. Alta o bastante para dar cara ao
                        card, baixa o bastante para não pedir nitidez que a foto
                        de origem não tem. */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={area.photo}
                        alt={area.alt}
                        fill
                        placeholder="blur"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                        className="object-cover transition-transform duration-1200 group-hover:scale-[1.07]"
                      />
                      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-fg/45 via-fg/5 to-transparent" />
                      <span className="absolute bottom-4 left-5 rounded-full bg-surface/90 px-3 py-1 text-xs font-semibold text-olive-dark backdrop-blur">
                        {list.length} {list.length === 1 ? "procedimento" : "procedimentos"}
                      </span>
                    </div>

                    <div className="relative flex flex-1 flex-col p-6 pt-8 sm:p-7 sm:pt-9">
                      <span className="absolute -top-6 right-6 grid h-12 w-12 place-items-center rounded-2xl border-4 border-surface bg-olive text-white shadow-soft transition-transform duration-800 group-hover:-rotate-[10deg] group-hover:scale-110">
                        <Icon size={20} />
                      </span>

                      <h3 className="font-display text-2xl font-semibold">
                        {area.category}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {area.blurb}
                      </p>

                      <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-olive-dark">
                        <span className="link-line">Ver tratamentos</span>
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-olive/10 transition-[background-color,color,transform] duration-600 group-hover:translate-x-1 group-hover:bg-olive group-hover:text-white">
                          <ArrowRight size={14} />
                        </span>
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        <Reveal variant="rise" index={PICKS.length} className="mt-10 text-center">
          <Link
            href="/servicos"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-olive-dark underline-offset-4 hover:underline"
          >
            Ver todas as cinco áreas
            <ArrowRight
              size={16}
              className="transition-transform duration-500 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
