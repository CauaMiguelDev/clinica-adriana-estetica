"use client";

import { useState } from "react";
import {
  ScanFace,
  HandHeart,
  Gem,
  ArrowRight,
  MessageCircle,
  Clock,
  Check,
} from "lucide-react";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { ActionButton } from "@/components/ui/ActionButton";
import { AmbientShapes } from "@/components/ui/AmbientShapes";
import { DUR, EASE, STAGGER, TILT, PARALLAX, AMBIENT } from "@/lib/motion";

const CORES = [
  { nome: "bg", hex: "#FAF6F0", uso: "fundo da página" },
  { nome: "surface", hex: "#FFFFFF", uso: "cards" },
  { nome: "sand", hex: "#F4EDE4", uso: "faixas alternadas" },
  { nome: "fg", hex: "#2E2A24", uso: "texto principal" },
  { nome: "muted", hex: "#6B6156", uso: "texto de apoio" },
  { nome: "line", hex: "#E4DACE", uso: "bordas" },
  { nome: "olive", hex: "#63704F", uso: "cor de ação" },
  { nome: "terracotta", hex: "#9A5C42", uso: "secundária, destaque" },
  { nome: "gold", hex: "#C9A35E", uso: "acento raro, nunca texto" },
];

const CARDS = [
  { icon: ScanFace, titulo: "Facial", texto: "Limpeza de pele, peelings e design de sobrancelhas." },
  { icon: HandHeart, titulo: "Massoterapia", texto: "Drenagem, liberação muscular e massagem relaxante." },
  { icon: Gem, titulo: "Harmonização", texto: "Botox, preenchimento labial e equilíbrio das proporções." },
];

function Bloco({
  titulo,
  nota,
  children,
}: {
  titulo: string;
  nota: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-12">
      <Reveal variant="up">
        <h2 className="font-display text-2xl font-semibold">{titulo}</h2>
        <p className="mt-1.5 max-w-2xl text-sm text-muted">{nota}</p>
      </Reveal>
      <div className="mt-7">{children}</div>
    </section>
  );
}

export function SampleBoard() {
  const [chip, setChip] = useState("Facial");
  const [aberto, setAberto] = useState(true);

  return (
    <div className="relative min-h-screen">
      <AmbientShapes className="fixed" />

      <main className="container-page relative z-10 py-16">
        <Reveal variant="rise">
          <p className="eyebrow">Fase 2 · sistema de movimento</p>
          <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
            Amostra do{" "}
            <span className="text-terracotta-dark">sistema de design</span>
          </h1>
          <p className="mt-4 max-w-2xl text-muted">
            Julgue aqui o <strong>rumo do movimento</strong> antes de eu espalhar
            pela página inteira. Passe o mouse nos cards, clique nos botões e
            repare no fundo — as formas se movem, devagar.
          </p>
        </Reveal>

        <Bloco
          titulo="Paleta"
          nota="Inalterada — os 12 pares de contraste medidos passam AA. O dourado nunca é texto (2,2:1)."
        >
          <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {CORES.map((c) => (
              <div
                key={c.nome}
                className="overflow-hidden rounded-card border border-line bg-surface shadow-soft"
              >
                <div className="h-16 w-full" style={{ background: c.hex }} />
                <div className="p-3">
                  <p className="font-mono text-xs font-semibold">{c.nome}</p>
                  <p className="font-mono text-[11px] text-muted">{c.hex}</p>
                  <p className="mt-1 text-[11px] text-muted">{c.uso}</p>
                </div>
              </div>
            ))}
          </RevealGroup>
        </Bloco>

        <Bloco
          titulo="Cards com profundidade"
          nota={`Tilt de no máximo ${TILT.maxDeg}° seguindo o cursor, perspectiva ${TILT.perspective}px. Só com mouse — em tela de toque o card tremeria sob o dedo.`}
        >
          <div className="grid gap-5 sm:grid-cols-3">
            {CARDS.map((c, i) => (
              <Reveal key={c.titulo} variant="rise" index={i} className="h-full">
                <TiltCard className="h-full">
                  <div className="group flex h-full flex-col rounded-card border border-line bg-surface p-6 shadow-soft transition-shadow duration-300 hover:shadow-lift">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-olive/10 text-olive transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <c.icon size={22} />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-semibold">
                      {c.titulo}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{c.texto}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-olive-dark">
                      Ver procedimentos
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Bloco>

        <Bloco
          titulo="Botões"
          nota="Clique e repare na onda saindo do ponto tocado. No celular não existe hover — sem essa confirmação o botão parece quebrado."
        >
          <div className="flex flex-wrap items-center gap-4">
            <ActionButton>
              <MessageCircle size={16} /> Agendar pelo WhatsApp
            </ActionButton>
            <ActionButton variant="outline">
              Ver serviços <ArrowRight size={16} />
            </ActionButton>
            <ActionButton variant="ghost">Saber mais</ActionButton>
          </div>
        </Bloco>

        <Bloco
          titulo="Chips de filtro"
          nota="Troca de estado em 320ms. É o filtro do catálogo."
        >
          <div className="flex flex-wrap gap-2.5">
            {["Todos", "Facial", "Corporal", "Massoterapia"].map((f) => (
              <button
                key={f}
                onClick={() => setChip(f)}
                aria-pressed={chip === f}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-300 ${
                  chip === f
                    ? "border-olive bg-olive text-white"
                    : "border-line bg-surface text-muted hover:border-olive/40 hover:text-olive-dark"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Bloco>

        <Bloco
          titulo="Campo de formulário e foco"
          nota="Navegue com Tab: o contorno de foco é uma regra única em globals.css e vale para todo elemento focável do site."
        >
          <div className="grid max-w-xl gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium" htmlFor="a-nome">
                Seu nome
              </label>
              <input
                id="a-nome"
                placeholder="Como podemos te chamar?"
                className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm transition-colors placeholder:text-muted/70 focus:border-olive"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium" htmlFor="a-tel">
                Seu WhatsApp
              </label>
              <input
                id="a-tel"
                type="tel"
                placeholder="(61) 90000-0000"
                className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm transition-colors placeholder:text-muted/70 focus:border-olive"
              />
            </div>
          </div>
        </Bloco>

        <Bloco
          titulo="Acordeão"
          nota="Abertura em 320ms com a curva de estado. É o comportamento da seção de dúvidas."
        >
          <div className="max-w-2xl overflow-hidden rounded-card border border-line bg-surface">
            <button
              onClick={() => setAberto((v) => !v)}
              aria-expanded={aberto}
              className="flex w-full items-center gap-4 p-5 text-left"
            >
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${
                  aberto ? "bg-olive text-white" : "bg-olive/10 text-olive"
                }`}
              >
                <Clock size={20} />
              </span>
              <span className="flex-1 font-display font-semibold">
                Quais os horários de atendimento?
              </span>
              <span
                className={`text-olive transition-transform duration-300 ${aberto ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300"
              style={{ gridTemplateRows: aberto ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:pl-[4.75rem]">
                  Funcionamos de Segunda a Sábado, das 09h às 20h, sempre com
                  agendamento prévio.
                </p>
              </div>
            </div>
          </div>
        </Bloco>

        <Bloco
          titulo="A linguagem, em números"
          nota="Tudo isto vive em src/lib/motion.ts. Nenhum componente digita esses valores à mão."
        >
          <div className="max-w-2xl overflow-x-auto rounded-card border border-line bg-surface">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-line">
                {[
                  ["Micro (hover, foco, clique)", `${DUR.micro * 1000}ms`],
                  ["Troca de estado", `${DUR.state * 1000}ms`],
                  ["Entrada ao rolar", `${DUR.enter * 1000}ms`],
                  ["Curva de entrada", `cubic-bezier(${EASE.enter.join(", ")})`],
                  ["Cascata", `${STAGGER.step * 1000}ms · teto de ${STAGGER.max}`],
                  ["Tilt máximo", `${TILT.maxDeg}°`],
                  [
                    "Parallax (fundo / meio / frente)",
                    `${PARALLAX.back} / ${PARALLAX.mid} / ${PARALLAX.front}`,
                  ],
                  [
                    "Ciclos de ambiente",
                    `${AMBIENT.fast}s · ${AMBIENT.medium}s · ${AMBIENT.slow}s`,
                  ],
                ].map(([k, v]) => (
                  <tr key={k}>
                    <td className="px-5 py-3 text-muted">{k}</td>
                    <td className="px-5 py-3 text-right font-mono text-xs">
                      {v}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Bloco>

        <Bloco
          titulo="Movimento reduzido"
          nota="Ative prefers-reduced-motion no sistema e recarregue: o fundo congela num quadro, as transições somem, e todo o conteúdo continua visível e legível."
        >
          <div className="flex max-w-2xl gap-3 rounded-card border border-line bg-sand p-5">
            <Check size={18} className="mt-0.5 shrink-0 text-olive" />
            <p className="text-sm text-muted">
              É versão calma, não versão quebrada. Parallax e movimento de fundo
              causam desconforto vestibular real em parte das pessoas — aqui isso
              é requisito funcional, não detalhe.
            </p>
          </div>
        </Bloco>
      </main>
    </div>
  );
}
