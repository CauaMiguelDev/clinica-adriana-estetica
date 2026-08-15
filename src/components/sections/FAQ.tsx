"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CalendarRange, 
  ShieldCheck, 
  Video, 
  CreditCard, 
  Users, 
  Sparkles, 
  Clock, 
  MapPin,
  Plus,
  HelpCircle
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { FAQ as ITEMS } from "@/lib/data";

const iconMap: Record<string, any> = {
  calendar: CalendarRange,
  shield: ShieldCheck,
  video: Video,
  card: CreditCard,
  users: Users,
  sparkles: Sparkles,
  clock: Clock,
  mapPin: MapPin,
};

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-pad relative bg-surface/40">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl" />

      <div className="container-luxe">
        <Reveal className="text-center">
          <span className="eyebrow justify-center"><HelpCircle size={14} /> Dúvidas frequentes</span>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-5xl leading-normal py-2">
            Perguntas <span className="text-gradient-gold italic px-1">frequentes</span>
          </h2>
          <p className="mt-4 text-muted max-w-md mx-auto leading-relaxed">
            Esclareça suas dúvidas sobre nossos atendimentos, facilidades de pagamento e segurança.
          </p>
        </Reveal>

        {/* Grade de 2 colunas no desktop para preenchimento de tela luxuoso */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 items-start">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            const Icon = iconMap[item.icon || "sparkles"] || Sparkles;
            return (
              <Reveal key={item.q} delay={i * 0.05}>
                <div className={`overflow-hidden rounded-3xl border transition-all duration-300 ${
                  isOpen 
                    ? "border-gold/40 bg-surface/30 shadow-glow scale-[1.01]" 
                    : "border-line bg-bg/50 hover:border-gold/20"
                }`}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left group outline-none"
                  >
                    <div className="flex items-center gap-4">
                      {/* Ícone customizado à esquerda */}
                      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-all duration-300 ${
                        isOpen ? "bg-gold text-[#1b140a] shadow-glow" : "bg-gold/10 text-gold group-hover:bg-gold/20"
                      }`}>
                        <Icon size={20} />
                      </span>
                      <span className="font-display text-base font-semibold leading-snug">{item.q}</span>
                    </div>
                    {/* Botão mais/menos */}
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors ${
                        isOpen ? "bg-gold/20 text-gold" : "bg-gold/10 text-gold group-hover:bg-gold/25"
                      }`}
                    >
                      <Plus size={16} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="px-5 pb-5 text-sm text-muted leading-relaxed pl-5 sm:pl-[4.25rem]">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
