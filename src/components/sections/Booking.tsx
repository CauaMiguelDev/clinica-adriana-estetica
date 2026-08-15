"use client";

import { useState } from "react";
import {
  MessageCircle,
  Phone,
  Instagram,
  CalendarCheck,
  Send,
  Clock,
  MapPin,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { CLINIC, CATEGORIES, PROCEDURES, waLink } from "@/lib/data";

/**
 * Agendamento — o objetivo nº 2 do site, logo depois de conhecer os serviços.
 *
 * O formulário não tem back-end: ele monta uma mensagem de WhatsApp já
 * preenchida e abre a conversa. Nada é armazenado nem enviado a terceiros.
 */

const CHANNELS = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    detail: "Resposta mais rápida",
    value: CLINIC.phoneDisplay,
    href: waLink(`Olá! Gostaria de agendar um horário no ${CLINIC.name}.`),
    primary: true,
  },
  {
    icon: Phone,
    title: "Telefone",
    detail: CLINIC.hours,
    value: CLINIC.phoneDisplay,
    href: `tel:+${CLINIC.whatsapp}`,
    primary: false,
  },
  {
    icon: Instagram,
    title: "Instagram",
    detail: "Bastidores e novidades",
    value: CLINIC.instagramHandle,
    href: CLINIC.instagram,
    primary: false,
  },
];

export function Booking() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [procedure, setProcedure] = useState("");
  const [note, setNote] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const wanted = procedure || "uma avaliação";
    const message =
      `Olá! Meu nome é ${name.trim()} e gostaria de agendar ${wanted} no ${CLINIC.name}.` +
      `\nMeu telefone: ${phone.trim()}.` +
      (note.trim() ? `\n${note.trim()}` : "");
    window.open(waLink(message), "_blank", "noopener");
  }

  const field =
    "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-fg placeholder:text-muted/70 transition-colors focus:border-olive";
  const label = "block text-sm font-medium text-fg";

  return (
    <section id="agendar" className="section-pad relative">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <CalendarCheck size={14} /> Agendamento
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
            Marque o seu <span className="text-terracotta-dark">horário</span>
          </h2>
          <p className="mt-4 text-muted">
            Fale com a gente pelo canal que preferir, ou preencha e a conversa
            já abre pronta no WhatsApp.
          </p>
        </Reveal>

        {/* Canais diretos */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {CHANNELS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06} className="h-full">
              <a
                href={c.href}
                target={c.href.startsWith("tel:") ? undefined : "_blank"}
                rel="noopener"
                className={`group flex h-full flex-col gap-1 rounded-card border p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
                  c.primary
                    ? "border-olive bg-olive text-white"
                    : "border-line bg-surface hover:border-olive/30"
                }`}
              >
                <span
                  className={`grid h-11 w-11 place-items-center rounded-xl ${
                    c.primary ? "bg-white/15 text-white" : "bg-olive/10 text-olive"
                  }`}
                >
                  <c.icon size={20} />
                </span>
                <span className="mt-4 font-display text-lg font-semibold">
                  {c.title}
                </span>
                <span
                  className={`text-sm ${c.primary ? "text-white/80" : "text-muted"}`}
                >
                  {c.detail}
                </span>
                <span
                  className={`mt-2 text-sm font-semibold ${
                    c.primary ? "text-white" : "text-olive-dark"
                  }`}
                >
                  {c.value}
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Formulário + informações práticas */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <form
              onSubmit={handleSubmit}
              className="rounded-panel border border-line bg-surface p-6 shadow-soft sm:p-8"
            >
              <h3 className="font-display text-xl font-semibold">
                Prefere que a gente entre em contato?
              </h3>
              <p className="mt-1.5 text-sm text-muted">
                Preencha e a mensagem abre pronta no WhatsApp — você só confere
                e envia.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className={label} htmlFor="bk-name">
                    Seu nome
                  </label>
                  <input
                    id="bk-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Como podemos te chamar?"
                    className={field}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className={label} htmlFor="bk-phone">
                    Seu WhatsApp
                  </label>
                  <input
                    id="bk-phone"
                    required
                    type="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(61) 90000-0000"
                    className={field}
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className={label} htmlFor="bk-proc">
                    O que você procura{" "}
                    <span className="font-normal text-muted">(opcional)</span>
                  </label>
                  <select
                    id="bk-proc"
                    value={procedure}
                    onChange={(e) => setProcedure(e.target.value)}
                    className={field}
                  >
                    <option value="">Ainda não sei — quero uma avaliação</option>
                    {CATEGORIES.map((cat) => (
                      <optgroup key={cat} label={cat}>
                        {PROCEDURES.filter((p) => p.category === cat).map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className={label} htmlFor="bk-note">
                    Alguma observação{" "}
                    <span className="font-normal text-muted">(opcional)</span>
                  </label>
                  <textarea
                    id="bk-note"
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Melhor dia e horário, dúvidas…"
                    className={`${field} resize-y`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-olive px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-colors duration-300 hover:bg-olive-dark hover:shadow-lift active:scale-[0.98]"
              >
                <Send size={16} /> Abrir conversa no WhatsApp
              </button>

              <p className="mt-3 text-center text-xs text-muted">
                Nada é enviado ou guardado por este site — a mensagem abre no
                seu WhatsApp para você revisar antes de mandar.
              </p>
            </form>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col gap-5 rounded-panel border border-line bg-sand p-6 sm:p-8">
              <h3 className="font-display text-xl font-semibold">
                Antes de vir
              </h3>

              <div className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-olive/10 text-olive">
                  <Clock size={20} />
                </span>
                <div>
                  <p className="font-medium">Horário</p>
                  <p className="text-sm text-muted">{CLINIC.hours}</p>
                  <p className="mt-1 text-sm text-muted">
                    Atendemos com agendamento prévio, para garantir o seu
                    horário só para você.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-olive/10 text-olive">
                  <MapPin size={20} />
                </span>
                <div className="min-w-0">
                  <p className="font-medium">Onde estamos</p>
                  <p className="break-words text-sm text-muted">
                    {CLINIC.address}
                  </p>
                  <a
                    href="#contato"
                    className="mt-1 inline-block text-sm font-semibold text-olive-dark hover:underline"
                  >
                    Ver no mapa
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-olive/10 text-olive">
                  <CalendarCheck size={20} />
                </span>
                <div>
                  <p className="font-medium">Avaliação primeiro</p>
                  <p className="text-sm text-muted">
                    A avaliação facial ou corporal com nossas especialistas é o
                    que define o protocolo certo para o seu caso.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
