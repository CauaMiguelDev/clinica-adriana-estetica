"use client";

import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { GoldButton } from "@/components/ui/GoldButton";
import { CLINIC, waLink } from "@/lib/data";

export function Contact() {
  return (
    <section id="contato" className="section-pad relative">
      <div className="container-luxe grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <span className="eyebrow"><MapPin size={14} /> Contato & localização</span>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-5xl">
            Venha nos <span className="text-gradient-gold italic">visitar</span>
          </h2>
          <p className="mt-4 text-muted">
            Estamos prontas para cuidar de você. Fale com a gente ou agende sua
            visita.
          </p>

          <ul className="mt-8 space-y-3">
            {[
              { icon: MapPin, label: "Endereço", value: CLINIC.address, href: CLINIC.mapsEmbed.replace("&output=embed", "").replace("/maps?q=", "/maps/search/?api=1&query=") },
              { icon: Phone, label: "Telefone / WhatsApp", value: CLINIC.phoneDisplay, href: waLink(`Olá! Gostaria de falar com a ${CLINIC.name}.`) },
              { icon: Mail, label: "E-mail", value: CLINIC.email, href: `mailto:${CLINIC.email}` },
              { icon: Clock, label: "Horário", value: CLINIC.hours, href: undefined },
            ].map((c) => {
              const Inner = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold transition-all duration-300 group-hover:scale-110 group-hover:bg-gold group-hover:text-[#1b140a]">
                    <c.icon size={20} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm text-muted">{c.label}</p>
                    <p className="break-words font-medium transition-colors duration-300 group-hover:text-gold">{c.value}</p>
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
                      className="group flex items-start gap-4 rounded-2xl p-2 transition-colors hover:bg-gold/5"
                    >
                      {Inner}
                    </a>
                  ) : (
                    <div className="group flex items-start gap-4 rounded-2xl p-2">{Inner}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <GoldButton
              href={waLink(`Olá! Gostaria de mais informações sobre a ${CLINIC.name}.`)}
              target="_blank"
              rel="noopener"
            >
              <MessageCircle size={16} /> WhatsApp
            </GoldButton>
            <GoldButton href={CLINIC.instagram} target="_blank" rel="noopener" variant="outline">
              <Instagram size={16} /> Instagram
            </GoldButton>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-[2rem] border border-line shadow-luxe">
            <iframe
              title="Localização do Espaço Cuide-se Bem"
              src={CLINIC.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[320px] w-full sm:h-[460px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
