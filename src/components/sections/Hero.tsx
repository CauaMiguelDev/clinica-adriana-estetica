"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Star, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { GoldButton } from "@/components/ui/GoldButton";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { CLINIC, STATS, waLink } from "@/lib/data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  // Parallax 3D sutil na foto: acompanha o cursor.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), {
    stiffness: 150,
    damping: 18,
  });

  function onPhotoMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onPhotoLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 sm:pt-32"
    >
      {/* atmosfera de fundo */}
      <div className="absolute inset-0 bg-radial-fade" />
      <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-rose/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-10 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

      <div className="container-luxe relative z-10 w-full">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* ---- Texto ---- */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.span variants={item} className="eyebrow">
              <Sparkles size={14} /> Estética &amp; Beleza de Alto Padrão
            </motion.span>

            <motion.h1
              variants={item}
              className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.05] sm:text-6xl lg:text-7xl"
            >
              Revele a sua{" "}
              <span className="text-gradient-gold animate-gradient bg-[length:200%_auto] italic px-1">
                melhor versão
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-lg text-base text-muted sm:text-lg"
            >
              Tecnologia, elegância e cuidado em um só lugar. Tratamentos faciais,
              corporais e harmonização conduzidos por especialistas, em Brasília.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <GoldButton href={waLink(`Olá! Gostaria de agendar um horário no ${CLINIC.name}.`)} target="_blank" rel="noopener" className="w-full justify-center sm:w-auto">
                Agendar Consulta <ArrowRight size={16} />
              </GoldButton>
              <GoldButton href="#resultados" variant="outline" className="w-full justify-center sm:w-auto">
                Ver Resultados
              </GoldButton>
            </motion.div>

            {/* avaliações */}
            <motion.div variants={item} className="mt-9 flex items-center gap-4">
              <div className="flex -space-x-3">
                {["from-emerald-400 to-teal-600", "from-rose-400 to-pink-600", "from-amber-400 to-yellow-600", "from-violet-400 to-purple-600"].map(
                  (g, i) => (
                    <span
                      key={i}
                      className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${g} text-sm font-semibold text-white ring-2 ring-bg`}
                    >
                      {["A", "M", "C", "J"][i]}
                    </span>
                  )
                )}
              </div>
              <div>
                <div className="flex items-center gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                  <span className="ml-1 text-sm font-semibold text-fg">
                    {CLINIC.rating.toFixed(1)}
                  </span>
                </div>
                <p className="text-xs text-muted">
                  +{CLINIC.reviews} avaliações no Google
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ---- Visual (foto premium emoldurada) ---- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1200 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            {/* glow + anel decorativo */}
            <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gold/15 blur-3xl" />
            <div className="absolute -right-6 -top-6 hidden h-28 w-28 animate-spin-slow rounded-full border border-dashed border-gold/40 sm:block" />

            <motion.div
              onMouseMove={onPhotoMove}
              onMouseLeave={onPhotoLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative h-[420px] overflow-hidden rounded-[2.5rem] border border-gold/20 shadow-luxe sm:h-[520px] lg:h-[600px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=85"
                alt="Tratamento estético de alto padrão"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* leve gradiente para integrar com o fundo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

              {/* selo flutuante: avaliação */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute left-4 top-4 flex items-center gap-2 rounded-2xl glass px-3.5 py-2 shadow-luxe sm:left-5 sm:top-5"
              >
                <span className="flex text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                </span>
                <span className="text-xs font-semibold">{CLINIC.rating.toFixed(1)} · Google</span>
              </motion.div>

              {/* selo flutuante: confiança */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4.5 }}
                className="absolute bottom-4 right-4 flex items-center gap-3 rounded-2xl glass px-4 py-3 shadow-luxe sm:bottom-5 sm:right-5"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gold/20 text-gold">
                  <ShieldCheck size={18} />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold">Profissionais</p>
                  <p className="text-xs text-muted">certificadas</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* ---- Faixa de estatísticas (limpa, sem sobreposição) ---- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-line/40 shadow-luxe sm:mt-16 lg:grid-cols-4"
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              variants={item}
              className="group/stat flex flex-col items-center justify-center bg-bg/80 px-4 py-6 text-center backdrop-blur transition-colors duration-300 hover:bg-gold/5 sm:py-8"
            >
              <p className="font-display text-3xl font-semibold text-gradient-gold sm:text-4xl lg:text-5xl">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1.5 text-xs text-muted sm:text-sm">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
