"use client";

import { Wallet, ClipboardCheck, MessageCircle, Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { CLINIC, PAYMENT, waLink } from "@/lib/data";

/**
 * Investimento — sem tabela de preços.
 * O valor depende do protocolo, que só sai na avaliação. Em vez de números
 * inventados, esta seção responde o que a pessoa realmente quer saber antes
 * de perguntar: como paga, e como descobre quanto custa o caso dela.
 */
export function Investment() {
  return (
    <section id="investimento" className="section-pad relative">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <Wallet size={14} /> Investimento
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
            Quanto <span className="text-terracotta-dark">custa</span>
          </h2>
          <p className="mt-4 text-muted">
            Cada protocolo é montado para um caso — por isso o valor sai na
            avaliação, e não numa tabela.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-panel border border-line bg-surface p-7 shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-olive/10 text-olive">
                <ClipboardCheck size={22} />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold">
                Como funciona
              </h3>
              <ol className="mt-5 space-y-4">
                {[
                  "Você fala com a gente pelo WhatsApp e conta o que procura.",
                  "A avaliação facial ou corporal mapeia suas necessidades e histórico.",
                  "A especialista indica o protocolo e apresenta o valor, sem compromisso.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-3.5">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-olive text-xs font-semibold text-white">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-muted">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col rounded-panel border border-line bg-sand p-7">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-olive/10 text-olive">
                <Wallet size={22} />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold">
                Formas de pagamento
              </h3>

              <ul className="mt-5 space-y-3.5">
                {PAYMENT.map((p) => (
                  <li key={p.label} className="flex gap-3">
                    <Check size={17} className="mt-0.5 shrink-0 text-olive" />
                    <div>
                      <p className="text-sm font-medium">{p.label}</p>
                      <p className="text-sm text-muted">{p.note}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-7">
                <a
                  href={waLink(
                    `Olá! Gostaria de um orçamento na ${CLINIC.name}.`
                  )}
                  target="_blank"
                  rel="noopener"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-olive py-3.5 text-sm font-semibold text-white shadow-soft transition-colors duration-300 hover:bg-olive-dark hover:shadow-lift active:scale-[0.98]"
                >
                  <MessageCircle size={16} /> Pedir um orçamento
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
