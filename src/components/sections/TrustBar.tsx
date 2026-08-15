"use client";

import { BadgeCheck, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { CLINIC } from "@/lib/data";

const ITEMS = [
  { icon: BadgeCheck, title: "Profissionais certificadas", text: "Equipe especializada e qualificada" },
  { icon: ShieldCheck, title: "Segurança em 1º lugar", text: "Protocolos rigorosos e materiais descartáveis" },
  { icon: Sparkles, title: "+5.000 atendimentos", text: "Experiência que gera confiança" },
  { icon: Star, title: `Nota ${CLINIC.rating.toFixed(1).replace(".", ",")} no Google`, text: `Avaliação real de ${CLINIC.reviews}+ clientes` },
];

export function TrustBar() {
  return (
    <section aria-label="Diferenciais da clínica" className="relative py-8">
      <div className="container-luxe">
        <div className="glass grid grid-cols-1 gap-px overflow-hidden rounded-3xl shadow-luxe sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="flex h-full items-center gap-4 p-5 sm:p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gold/15 text-gold">
                  <item.icon size={22} />
                </span>
                <div>
                  <p className="font-display text-base font-semibold leading-tight">{item.title}</p>
                  <p className="mt-0.5 text-xs text-muted">{item.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
