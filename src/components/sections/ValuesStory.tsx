"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { Gem, ShieldCheck, HeartHandshake, Leaf, Compass } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { DUR, EASE } from "@/lib/motion";

/**
 * Painel fixo à esquerda, texto rolando à direita.
 *
 * O painel gruda por quatro telas enquanto os blocos de texto passam; a cada
 * bloco que chega ao meio da tela, o painel troca. É o formato que dá peso
 * editorial a quatro frases que, empilhadas numa grade, viram só mais quatro
 * caixas.
 *
 * O índice ativo sai de `useMotionValueEvent`, não de `useState` dentro de um
 * `useTransform`: só re-renderiza quando o passo realmente muda, e não a cada
 * quadro de rolagem.
 *
 * Sem `lg` (celular e tablet) e com movimento reduzido, o sticky some e vira
 * uma lista simples. Prender quatro telas de rolagem num celular é hostil, e
 * lá a coluna dupla não caberia de qualquer forma.
 */

const VALUES = [
  {
    icon: Gem,
    title: "Excelência",
    text: "Padrão premium em cada atendimento, do primeiro contato ao retorno.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança",
    text: "Protocolos rigorosos e profissionais certificadas em cada procedimento.",
  },
  {
    icon: HeartHandshake,
    title: "Acolhimento",
    text: "Atendimento humano e personalizado — você não é mais um horário na agenda.",
  },
  {
    icon: Leaf,
    title: "Bem-estar",
    text: "Cuidado integral do corpo e da mente, porque um não anda sem o outro.",
  },
];

export function ValuesStory() {
  const calm = useReducedMotion();
  const host = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: host,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(VALUES.length - 1, Math.floor(v * VALUES.length));
    setActive((prev) => (prev === next ? prev : next));
  });

  return (
    <section id="valores" className="relative bg-sand">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl py-16 text-center sm:py-24">
          <span className="eyebrow justify-center">
            <Compass size={14} /> No que acreditamos
          </span>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.01em] sm:text-5xl">
            Quatro coisas que{" "}
            <span className="font-normal italic text-terracotta-dark">não negociamos</span>
          </h2>
        </Reveal>
      </div>

      {/* Lista simples: celular, tablet e movimento reduzido. */}
      <div className={`container-page pb-16 sm:pb-24 ${calm ? "" : "lg:hidden"}`}>
        <div className="grid gap-5 sm:grid-cols-2">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} variant="rise" index={i} className="h-full">
              <div className="flex h-full flex-col rounded-card border border-line bg-surface p-6 shadow-soft">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-olive/10 text-olive">
                  <v.icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted break-words">
                  {v.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {calm ? null : (
        <div ref={host} className="hidden lg:block">
          <div className="container-page grid grid-cols-[1fr_1fr] gap-16">
            {/* Coluna fixa */}
            <div className="sticky top-0 flex h-screen items-center">
              <div className="w-full rounded-panel border border-line bg-surface p-10 shadow-lift">
                <span className="font-display text-6xl font-semibold text-line">
                  0{active + 1}
                </span>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: DUR.state, ease: EASE.enter }}
                >
                  <span className="mt-6 grid h-14 w-14 place-items-center rounded-2xl bg-olive text-white">
                    {(() => {
                      const Icon = VALUES[active].icon;
                      return <Icon size={26} />;
                    })()}
                  </span>
                  <h3 className="mt-6 font-display text-3xl font-semibold">
                    {VALUES[active].title}
                  </h3>
                </motion.div>

                {/* Trilha de progresso dos quatro passos. */}
                <div className="mt-10 flex gap-2">
                  {VALUES.map((v, i) => (
                    <span
                      key={v.title}
                      className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                        i <= active ? "bg-olive" : "bg-line"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Coluna que rola: uma tela por valor. */}
            <div>
              {VALUES.map((v, i) => (
                <div
                  key={v.title}
                  className="flex h-screen flex-col justify-center"
                >
                  <motion.div
                    initial={{ opacity: 0.25 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ margin: "-35% 0px -35% 0px" }}
                    transition={{ duration: DUR.state, ease: EASE.enter }}
                  >
                    <span className="eyebrow">{`0${i + 1}`}</span>
                    <h3 className="mt-3 font-display text-4xl font-semibold">
                      {v.title}
                    </h3>
                    <p className="mt-5 max-w-md text-lg leading-relaxed text-muted break-words">
                      {v.text}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
