"use client";

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Navigation,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { CLINIC, waLink } from "@/lib/data";

const mapsSearch = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${CLINIC.name} ${CLINIC.address}`
)}`;

const ITEMS = [
  {
    icon: MapPin,
    label: "Endereço",
    value: CLINIC.address,
    href: mapsSearch,
  },
  {
    icon: Phone,
    label: "Telefone e WhatsApp",
    value: CLINIC.phoneDisplay,
    href: waLink(`Olá! Gostaria de falar com a ${CLINIC.name}.`),
  },
  {
    icon: Mail,
    label: "E-mail",
    value: CLINIC.email,
    href: `mailto:${CLINIC.email}`,
  },
  { icon: Clock, label: "Horário", value: CLINIC.hours, href: undefined },
];

export function Contact() {
  return (
    <section id="contato" className="section-pad relative bg-sand">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <Navigation size={14} /> Onde estamos
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
            Venha nos <span className="text-terracotta-dark">visitar</span>
          </h2>
          <p className="mt-4 text-muted">
            Estamos em Ceilândia Norte, com estacionamento público na porta.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.25fr]">
          <Reveal>
            <div className="flex h-full flex-col rounded-panel border border-line bg-surface p-6 shadow-soft sm:p-8">
              <ul className="space-y-2">
                {ITEMS.map((c) => {
                  const inner = (
                    <>
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-olive/10 text-olive transition-colors duration-300 group-hover:bg-olive group-hover:text-white">
                        <c.icon size={20} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm text-muted">{c.label}</p>
                        <p className="break-words font-medium transition-colors duration-300 group-hover:text-olive-dark">
                          {c.value}
                        </p>
                      </div>
                    </>
                  );
                  return (
                    <li key={c.label}>
                      {c.href ? (
                        <a
                          href={c.href}
                          target="_blank"
                          rel="noopener"
                          className="group flex items-start gap-4 rounded-xl p-2.5 transition-colors hover:bg-sand"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="group flex items-start gap-4 p-2.5">
                          {inner}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row">
                <a
                  href={waLink(
                    `Olá! Gostaria de mais informações sobre a ${CLINIC.name}.`
                  )}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-olive px-6 py-3 text-sm font-semibold text-white shadow-soft transition-colors duration-300 hover:bg-olive-dark hover:shadow-lift active:scale-[0.98]"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
                <a
                  href={mapsSearch}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-olive/50 px-6 py-3 text-sm font-semibold text-olive-dark transition-colors duration-300 hover:border-olive hover:bg-olive hover:text-white"
                >
                  <Navigation size={16} /> Como chegar
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full overflow-hidden rounded-panel border border-line shadow-soft">
              <iframe
                title={`Localização do ${CLINIC.name}`}
                src={CLINIC.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[360px] w-full lg:h-full lg:min-h-[440px]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
