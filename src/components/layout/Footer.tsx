"use client";

import { Instagram, Phone, Mail, MapPin, Clock } from "lucide-react";
import { LotusMark } from "@/components/ui/Logo";
import { CLINIC, waLink } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-surface/50">
      <div className="container-luxe grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-grad text-[#1b140a]">
              <LotusMark className="h-6 w-6" />
            </span>
            <span className="font-display text-xl font-semibold">{CLINIC.name}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted">
            Estética e beleza de alto padrão em Brasília. Cuidado, tecnologia e
            bem-estar em cada detalhe.
          </p>
          <div className="mt-5 flex gap-3">
            <a href={CLINIC.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="flex items-center gap-2 rounded-full border border-line px-4 transition-colors hover:border-gold hover:text-gold">
              <Instagram size={18} />
              <span className="text-sm">{CLINIC.instagramHandle}</span>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg">Links rápidos</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li><a href="#sobre" className="hover:text-gold">Sobre a clínica</a></li>
            <li><a href="#equipe" className="hover:text-gold">Equipe</a></li>
            <li><a href={waLink(`Olá! Gostaria de agendar um horário no ${CLINIC.name}.`)} target="_blank" rel="noopener" className="hover:text-gold">Agendamento</a></li>
            <li><a href="#blog" className="hover:text-gold">Blog</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg">Contato</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-gold" /><span className="break-words">{CLINIC.address}</span></li>
            <li className="flex gap-2"><Phone size={16} className="mt-0.5 shrink-0 text-gold" /><span className="break-words">{CLINIC.phoneDisplay}</span></li>
            <li className="flex gap-2"><Mail size={16} className="mt-0.5 shrink-0 text-gold" /><span className="min-w-0 break-words">{CLINIC.email}</span></li>
            <li className="flex gap-2"><Clock size={16} className="mt-0.5 shrink-0 text-gold" /><span className="break-words">{CLINIC.hours}</span></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg">Newsletter</h4>
          <p className="mt-4 text-sm text-muted">
            Receba dicas de beleza e promoções exclusivas.
          </p>
          {/* TODO: integrar com serviço de e-mail (Mailchimp/Brevo) */}
          <form
            className="mt-4 flex flex-col gap-2 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Seu e-mail"
              className="w-full rounded-full border border-line bg-bg px-4 py-2.5 text-sm outline-none focus:border-gold"
            />
            <button className="rounded-full bg-gold-grad px-5 py-2.5 text-sm font-semibold text-[#1b140a] transition-transform hover:scale-105">
              Assinar
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-line py-6">
        <div className="container-luxe flex flex-col items-center justify-between gap-3 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {CLINIC.name}. Todos os direitos reservados.</p>
          <p>CNPJ 00.000.000/0001-00 · Política de Privacidade · LGPD</p>
        </div>
      </div>
    </footer>
  );
}
