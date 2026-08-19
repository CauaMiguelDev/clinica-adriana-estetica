"use client";

import Link from "next/link";
import { ScanFace, PersonStanding, HandHeart, ArrowRight, LayoutGrid } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { PROCEDURES, type Category } from "@/lib/data";

/**
 * Amostra do catálogo na home: três áreas, não as cinco.
 *
 * A home existe para dar o primeiro impacto e mandar a pessoa adiante — o
 * catálogo inteiro mora em `/servicos`. As contagens saem de `PROCEDURES`,
 * então nunca desencontram do catálogo real.
 */
const PICKS: { category: Category; icon: typeof ScanFace; blurb: string }[] = [
  {
    category: "Facial",
    icon: ScanFace,
    blurb: "Limpeza de pele, peelings e design de sobrancelhas.",
  },
  {
    category: "Corporal",
    icon: PersonStanding,
    blurb: "Modelagem, firmeza, estrias e gordura localizada.",
  },
  {
    category: "Massoterapia",
    icon: HandHeart,
    blurb: "Drenagem, liberação muscular e massagem relaxante.",
  },
];

export function ServicesTeaser() {
  return (
    <section id="servicos" className="section-pad relative">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <LayoutGrid size={14} /> O que fazemos
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
            Cuidado para o corpo{" "}
            <span className="text-terracotta-dark">e para a mente</span>
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
                    className="group flex h-full flex-col rounded-card border border-line bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-olive/30 hover:shadow-lift sm:p-7"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-olive/10 text-olive transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-olive group-hover:text-white">
                      <Icon size={22} />
                    </span>

                    <h3 className="mt-5 font-display text-xl font-semibold">
                      {area.category}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {area.blurb}
                    </p>

                    <span className="mt-auto flex items-center justify-between gap-3 pt-6 text-sm font-semibold text-olive-dark">
                      Ver {list.length}{" "}
                      {list.length === 1 ? "procedimento" : "procedimentos"}
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
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
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
