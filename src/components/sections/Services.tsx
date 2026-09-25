"use client";

import {
  ScanFace,
  PersonStanding,
  Zap,
  HandHeart,
  Gem,
  ArrowRight,
  MessageCircle,
  LayoutGrid,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { ActionButton } from "@/components/ui/ActionButton";
import { PROCEDURES, CLINIC, waLink, type Category } from "@/lib/data";

/**
 * Porta de entrada do catálogo: as cinco áreas de atendimento, cada uma
 * mostrando quantos procedimentos tem e três exemplos reais. Clicar leva ao
 * catálogo já filtrado — a âncora faz a rolagem, o evento faz o filtro.
 */

/** A seção Procedimentos escuta este evento para aplicar o filtro. */
export const PICK_CATEGORY = "cse:pick-category";

// As descrições são resumos do que já existe em PROCEDURES — nada é inventado.
const AREAS: { category: Category; icon: typeof ScanFace; blurb: string }[] = [
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
    category: "Harmonização Facial",
    icon: Gem,
    blurb: "Botox, preenchimento labial e equilíbrio das proporções.",
  },
  {
    category: "Massoterapia",
    icon: HandHeart,
    blurb: "Drenagem, liberação muscular e massagem relaxante.",
  },
  {
    category: "Estética Avançada",
    icon: Zap,
    blurb: "Microagulhamento, jato de plasma e rejuvenescimento.",
  },
];

export function Services() {
  return (
    <section id="servicos" className="section-pad relative bg-bg">
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
            Cinco áreas de atendimento. Escolha a sua para ver todos os
            procedimentos.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((area, i) => {
            const list = PROCEDURES.filter((p) => p.category === area.category);
            const Icon = area.icon;

            return (
              <Reveal key={area.category} variant="rise" index={i} className="h-full">
                <TiltCard className="h-full">
                <a
                  href="#procedimentos"
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent(PICK_CATEGORY, { detail: area.category })
                    )
                  }
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

                  <ul className="mt-5 space-y-2 border-t border-line pt-5">
                    {list.slice(0, 3).map((p) => (
                      <li
                        key={p.id}
                        className="flex items-start gap-2.5 text-sm text-fg"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-olive-light"
                          aria-hidden
                        />
                        {p.name}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-auto flex items-center justify-between gap-3 pt-6 text-sm font-semibold text-olive-dark">
                    Ver {list.length}{" "}
                    {list.length === 1 ? "procedimento" : "procedimentos"}
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </a>
                </TiltCard>
              </Reveal>
            );
          })}

          {/* Sexto cartão: para quem não sabe por onde começar. */}
          <Reveal variant="rise" index={AREAS.length} className="h-full">
            <div className="flex h-full flex-col justify-center rounded-card border border-dashed border-olive/40 bg-olive/5 p-6 text-center sm:p-7">
              <h3 className="font-display text-xl font-semibold">
                Não sabe por onde começar?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                A avaliação com nossas especialistas define o protocolo certo
                para você.
              </p>
              <ActionButton
                href={waLink(
                  `Olá! Gostaria de agendar uma avaliação no ${CLINIC.name}.`
                )}
                target="_blank"
                rel="noopener"
                className="mt-6"
              >
                <MessageCircle size={16} /> Agendar avaliação
              </ActionButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
