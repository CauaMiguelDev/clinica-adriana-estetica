"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { TESTIMONIALS, CLINIC, googleReviewLink } from "@/lib/data";

const AUTOPLAY_MS = 11000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(0);

  // Progresso 0→1 do card atual; aciona a barra E o avanço pela MESMA fonte,
  // então a barra e a troca nunca ficam dessincronizadas.
  const progress = useMotionValue(0);

  const go = useCallback((d: number) => {
    setDir(d);
    setIndex((i) => (i + d + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  const goTo = useCallback((i: number) => {
    setIndex((cur) => {
      setDir(i > cur ? 1 : -1);
      return i;
    });
  }, []);

  // Um único loop por card: reinicia a cada troca (cada card recebe o tempo
  // completo). Avança sempre — sem pausa automática.
  useEffect(() => {
    let elapsed = 0;
    let last = performance.now();
    let raf = 0;
    progress.set(0);

    const tick = (now: number) => {
      // Limita o delta para que voltar à aba (após ela ficar oculta) não
      // acumule todo o tempo de uma vez e pule um card.
      const dt = Math.min(now - last, 100);
      last = now;
      elapsed += dt;
      const p = elapsed / AUTOPLAY_MS;
      progress.set(p < 1 ? p : 1);
      if (p >= 1) {
        go(1);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, go, progress]);

  const t = TESTIMONIALS[index];

  return (
    <section id="depoimentos" className="section-pad relative">
      <div className="container-luxe">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center"><Quote size={14} /> Depoimentos</span>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-5xl">
            Quem se cuida, <span className="text-gradient-gold italic">recomenda</span>
          </h2>
          <div className="mt-4 inline-flex items-center gap-2 text-muted">
            <span className="flex text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </span>
            Nota {CLINIC.rating.toFixed(1)} · +{CLINIC.reviews} avaliações no Google
          </div>
        </Reveal>

        <div className="relative mx-auto mt-12 max-w-3xl">
          {/* Camada de arraste (swipe) separada da animação de conteúdo:
              o arraste usa o eixo X e a transição usa opacidade/escala,
              evitando conflito que travava o card anterior. */}
          <motion.div
            className="relative grid min-h-[16rem] cursor-grab items-stretch touch-pan-y active:cursor-grabbing"
            drag="x"
            dragDirectionLock
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) go(1);
              else if (info.offset.x > 70) go(-1);
            }}
          >
            <AnimatePresence custom={dir}>
              <motion.figure
                key={index}
                custom={dir}
                initial={{ opacity: 0, y: 22, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -22, scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="glass pointer-events-none col-start-1 row-start-1 flex flex-col items-center justify-center rounded-[2rem] p-6 text-center shadow-luxe sm:p-12"
              >
                <Quote className="text-gold/40" size={36} />
                <blockquote className="mt-4 font-display text-lg italic sm:text-2xl">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className={`grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br ${t.accent} font-display text-lg text-white`}>
                    {t.initial}
                  </span>
                  <div className="text-left">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-gold">{t.treatment}</p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </motion.div>

          {/* Barra de progresso — ligada à MESMA fonte do avanço (motion value) */}
          <div className="mx-auto mt-6 h-1 w-44 overflow-hidden rounded-full bg-line/60">
            <motion.div
              className="h-full w-full origin-left rounded-full bg-gold-grad"
              style={{ scaleX: progress }}
            />
          </div>

          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              aria-label="Anterior"
              className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Depoimento ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-7 bg-gold" : "w-2 bg-line"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Próximo"
              className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Convite para o cliente avaliar a clínica direto no Google */}
          <Reveal className="mt-10 flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-muted">
              Foi nossa cliente? Conte como foi a sua experiência:
            </p>
            <a
              href={googleReviewLink()}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full bg-gold-grad px-6 py-3 text-sm font-semibold text-[#1b140a] shadow-luxe transition-transform hover:scale-105"
            >
              <Star size={16} fill="currentColor" /> Avaliar no Google
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
