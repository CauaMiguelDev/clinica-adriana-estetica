"use client";

import Image from "next/image";
import { ArrowRight, BadgeCheck, Users, ImagePlus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { TEAM, CLINIC, waLink } from "@/lib/data";

/**
 * Equipe — quem cuida de você.
 *
 * O card mostra só três especialidades por profissional; o catálogo completo
 * já vive na seção Procedimentos e não precisa ser repetido aqui.
 * Sem retrato real, exibimos o monograma — nunca uma pessoa de banco de imagens.
 */
export function Team() {
  return (
    <section id="equipe" className="section-pad relative">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <Users size={14} /> Equipe
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
            Especialistas que{" "}
            <span className="text-terracotta-dark">cuidam de você</span>
          </h2>
          <p className="mt-4 text-muted">
            Quatro profissionais, cada uma com a sua especialidade.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((p, i) => {
            const firstName = p.name.replace(/^Dra\.\s*/, "");
            return (
              <Reveal key={p.id} variant="rise" index={i} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-olive/30 hover:shadow-lift">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        quality={88}
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      // Espaço reservado que se explica, em vez de parecer
                      // imagem quebrada: monograma sólido + rótulo.
                      <div className="flex h-full flex-col items-center justify-center gap-3 border border-dashed border-olive/30 px-4 text-center">
                        <span
                          className="grid h-20 w-20 place-items-center rounded-full bg-olive/10 font-display text-3xl font-semibold text-olive-dark"
                          aria-hidden
                        >
                          {firstName.charAt(0)}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                          <ImagePlus size={13} className="text-olive" />
                          Foto em breve
                        </span>
                        <span className="sr-only">
                          Retrato de {p.name} em breve
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-xl font-semibold">
                      {p.name}
                    </h3>
                    <p className="mt-0.5 text-sm text-olive-dark">{p.role}</p>

                    <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-line bg-sand px-3 py-1 text-xs font-medium text-muted">
                      <BadgeCheck size={13} className="text-olive" />
                      {p.credential}
                    </span>

                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      {p.bio}
                    </p>

                    <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
                      {p.procedures.slice(0, 3).map((s) => (
                        <li
                          key={s}
                          className="flex items-start gap-2.5 text-sm text-fg"
                        >
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-olive-light"
                            aria-hidden
                          />
                          {s}
                        </li>
                      ))}
                    </ul>

                    {p.procedures.length > 3 && (
                      <a
                        href="#procedimentos"
                        className="mt-2.5 text-sm font-medium text-olive-dark hover:underline"
                      >
                        + {p.procedures.length - 3} no catálogo
                      </a>
                    )}

                    <div className="mt-auto pt-5">
                      <a
                        href={waLink(
                          `Olá! Gostaria de agendar um atendimento com a ${p.name} na ${CLINIC.name}.`
                        )}
                        target="_blank"
                        rel="noopener"
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-olive py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-olive-dark active:scale-[0.98]"
                      >
                        Agendar com {firstName} <ArrowRight size={15} />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
