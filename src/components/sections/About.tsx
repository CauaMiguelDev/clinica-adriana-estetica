"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, HeartHandshake, Gem, Leaf, Building2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const VALUES = [
  { icon: Gem, title: "Excelência", text: "Padrão premium em cada atendimento." },
  { icon: ShieldCheck, title: "Segurança", text: "Protocolos rigorosos e certificados." },
  { icon: HeartHandshake, title: "Acolhimento", text: "Atendimento humano e personalizado." },
  { icon: Leaf, title: "Bem-estar", text: "Cuidado integral do corpo e da mente." },
];

export function About() {
  return (
    <section id="sobre" className="section-pad relative">
      <div className="container-luxe grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="relative h-[340px] w-full overflow-hidden rounded-[2rem] shadow-luxe sm:h-[460px]">
            <Image
              src="https://images.unsplash.com/photo-1687293233752-ec42de2050db?auto=format&fit=crop&w=900&q=80"
              alt="Ambiente da clínica"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -bottom-6 -right-2 rounded-2xl bg-gold-grad px-6 py-4 text-center text-[#1b140a] shadow-glow"
          >
            <p className="font-display text-3xl font-bold">+12</p>
            <p className="text-xs font-medium">anos de experiência</p>
          </motion.div>
          <div className="absolute -left-4 -top-4 h-24 w-24 animate-spin-slow rounded-full border border-dashed border-gold/40" />
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow"><Building2 size={14} /> Sobre a clínica</span>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-5xl leading-normal py-2">
              Um espaço de luxo dedicado à{" "}
              <span className="text-gradient-gold italic px-1">sua beleza</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-muted">
              O Espaço Cuide-se Bem nasceu para unir tecnologia de ponta,
              profissionais especializadas e um ambiente acolhedor. Nossa missão
              é elevar a autoestima de cada cliente com tratamentos seguros,
              personalizados e resultados que encantam.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={0.15 + i * 0.08}>
                <div className="group glass flex gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-glow">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-gold group-hover:text-[#1b140a]">
                    <v.icon size={20} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg transition-colors duration-300 group-hover:text-gold">
                      {v.title}
                    </h3>
                    <p className="text-sm text-muted">{v.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
