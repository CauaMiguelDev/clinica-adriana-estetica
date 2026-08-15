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
  HelpCircle,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { FAQ as ITEMS, CLINIC, waLink } from "@/lib/data";

const iconMap: Record<string, typeof Sparkles> = {
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
    <section id="faq" className="section-pad relative bg-sand">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <HelpCircle size={14} /> Dúvidas frequentes
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
            Perguntas <span className="text-terracotta-dark">frequentes</span>
          </h2>
          <p className="mt-4 text-muted">
            Atendimento, pagamento e segurança — o que mais nos perguntam.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            const Icon = iconMap[item.icon || "sparkles"] || Sparkles;
            const panelId = `faq-panel-${i}`;

            return (
              <Reveal key={item.q} variant="up" index={i}>
                <div
                  className={`overflow-hidden rounded-card border bg-surface transition-colors duration-300 ${
                    isOpen ? "border-olive/40 shadow-soft" : "border-line"
                  }`}
                >
                  <h3>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex w-full items-center gap-4 p-5 text-left"
                    >
                      <span
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${
                          isOpen
                            ? "bg-olive text-white"
                            : "bg-olive/10 text-olive"
                        }`}
                      >
                        <Icon size={20} />
                      </span>

                      <span className="flex-1 font-display text-base font-semibold leading-snug">
                        {item.q}
                      </span>

                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-olive/10 text-olive"
                        aria-hidden
                      >
                        <Plus size={16} />
                      </motion.span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:pl-[4.75rem]">
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

        <Reveal className="mt-10 text-center">
          <p className="text-sm text-muted">
            Ficou com outra dúvida?{" "}
            <a
              href={waLink(
                `Olá! Tenho uma dúvida sobre os atendimentos da ${CLINIC.name}.`
              )}
              target="_blank"
              rel="noopener"
              className="font-semibold text-olive-dark hover:underline"
            >
              Pergunte no WhatsApp
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
