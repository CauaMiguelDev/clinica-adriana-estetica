"use client";

import Image from "next/image";
import { ArrowRight, Check, BadgeCheck, Users } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Spotlight";
import { TEAM, CLINIC, waLink } from "@/lib/data";

export function Team() {
  return (
    <section id="equipe" className="section-pad relative bg-surface/40">
      {/* Luz ambiente de fundo */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl" />

      <div className="container-luxe relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow"><Users size={14} /> Equipe profissional</span>
          <h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl leading-normal py-2">
            Especialistas que <span className="text-gradient-gold italic px-1">cuidam de você</span>
          </h2>
          <p className="mt-4 text-muted leading-relaxed pb-2">
            Conheça as profissionais especializadas por trás dos seus resultados de bem-estar.
          </p>
        </Reveal>

        {/* Grade de 2 colunas em telas maiores (md:grid-cols-2) */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {TEAM.map((p, i) => {
            return (
              <Reveal key={p.id} delay={i * 0.08} className="h-full">
                <Spotlight className="h-full rounded-[2.5rem]">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-line bg-surface/40 backdrop-blur-md p-5 sm:p-8 transition-all duration-300 hover:border-gold/30 hover:shadow-glow hover:-translate-y-1">

                  {/* Imagem no topo */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-gold/15 shadow-luxe shrink-0">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      quality={90}
                      className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
                        p.id === "adrielhe" ? "object-top" : "object-center"
                      }`}
                      sizes="(max-width: 768px) 92vw, 540px"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${p.accent} mix-blend-multiply opacity-20`} />
                  </div>

                  {/* Conteúdo do Perfil */}
                  <div className="flex flex-1 flex-col mt-6">
                    {/* Cabeçalho do Perfil */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-line/50 pb-4">
                      <div>
                        <h3 className="font-display text-2xl font-semibold text-gradient-gold">
                          {p.name}
                        </h3>
                        <p className="text-xs font-bold uppercase tracking-wider text-gold-light mt-0.5">
                          {p.role}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
                        <BadgeCheck size={14} /> {p.credential}
                      </span>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-muted leading-relaxed mt-4">
                      {p.bio}
                    </p>
                    
                    {/* Procedimentos */}
                    <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-gold">
                      Procedimentos Realizados:
                    </h4>
                    <div className="mt-3.5 grid gap-x-4 gap-y-2 grid-cols-1 sm:grid-cols-2">
                      {p.procedures.map((s) => (
                        <div key={s} className="flex items-start gap-2 text-sm text-fg/90">
                          <Check size={13} className="shrink-0 text-gold mt-1" />
                          <span className="leading-snug">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Botão de Agendamento (sempre empurrado para o rodapé do card) */}
                  <div className="mt-8 pt-6 border-t border-line/35 shrink-0">
                    <a
                      href={waLink(
                        `Olá! Gostaria de agendar um atendimento com a ${p.name} na ${CLINIC.name}.`
                      )}
                      target="_blank"
                      rel="noopener"
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-grad py-3.5 text-sm font-semibold text-[#1b140a] transition-all duration-300 hover:scale-105 hover:shadow-glow"
                    >
                      Agendar com {p.name.split(" ")[1]} <ArrowRight size={16} />
                    </a>
                  </div>

                </div>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
