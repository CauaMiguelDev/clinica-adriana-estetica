"use client";

import { BadgeCheck, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { CLINIC } from "@/lib/data";

const ITEMS = [
  {
    icon: BadgeCheck,
    title: "Profissionais certificadas",
    text: "Equipe especializada e qualificada",
  },
  {
    icon: ShieldCheck,
    title: "Segurança em 1º lugar",
    text: "Protocolos rigorosos e material descartável",
  },
  {
    icon: Sparkles,
    title: "+5.000 atendimentos",
    text: "Experiência que gera confiança",
  },
  {
    icon: Star,
    title: `Nota ${CLINIC.rating.toFixed(1).replace(".", ",")} no Google`,
    text: `Avaliação real de ${CLINIC.reviews}+ clientes`,
  },
];

export function TrustBar() {
  return (
    <section aria-label="Diferenciais da clínica" className="relative pb-4">
      <div className="container-page">
        <div className="grid gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} variant="up" index={i} className="h-full">
              <div className="flex h-full items-center gap-4 bg-surface p-5 sm:p-6">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-olive/10 text-olive">
                  <item.icon size={20} />
                </span>
                <div>
                  <p className="font-display text-base font-semibold leading-tight">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-sm text-muted">{item.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
