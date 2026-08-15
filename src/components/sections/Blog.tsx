"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Check, Plus, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { BLOG, CLINIC, waLink } from "@/lib/data";

export function Blog() {
  const [active, setActive] = useState(0); // primeiro card aberto por padrão

  const springTransition = {
    type: "spring",
    stiffness: 80,
    damping: 20,
    mass: 0.8,
  };

  return (
    <section id="blog" className="section-pad relative">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl" />

      <div className="container-luxe">
        <Reveal className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <span className="eyebrow">Blog de estética</span>
            <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl leading-normal py-2">
              Dicas & <span className="text-gradient-gold italic px-1">novidades</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted">
            Toque em um card para ver as dicas e benefícios de cada procedimento
            com nossas especialistas.
          </p>
        </Reveal>

        {/* Accordion: clique expande o card e recolhe os demais */}
        <div className="mt-12 flex flex-col gap-4 lg:h-[38rem] lg:flex-row">
          {BLOG.map((post, i) => {
            const isActive = active === i;
            return (
              <motion.article
                layout
                key={post.title}
                role="button"
                tabIndex={0}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
                aria-expanded={isActive}
                transition={springTransition}
                className={`group relative flex min-h-[17rem] cursor-pointer flex-col justify-end overflow-hidden rounded-3xl border outline-none transition-[border-color,box-shadow,transform] duration-500 focus-visible:ring-2 focus-visible:ring-gold/60 lg:min-h-0 ${
                  isActive
                    ? "border-gold/40 shadow-glow lg:flex-[3.5]"
                    : "border-line hover:border-gold/60 hover:shadow-glow-gold hover:-translate-y-1.5 lg:flex-[1]"
                }`}
              >
                {/* Imagem de fundo */}
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className={`object-cover transition-all duration-700 ${
                    isActive 
                      ? "brightness-95 contrast-100 scale-100" 
                      : "brightness-[0.6] contrast-[0.85] group-hover:brightness-[0.8] group-hover:contrast-100 group-hover:scale-105"
                  }`}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10 transition-opacity duration-500 group-hover:from-black/90" />

                {/* Conteúdo */}
                <div className="relative z-10 grid grid-cols-1 grid-rows-1 p-5 sm:p-6 w-full h-full items-end overflow-hidden">
                  
                  {/* CONTEÚDO ATIVO (Exibido na horizontal completa) */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      x: isActive ? 0 : -20,
                    }}
                    transition={springTransition}
                    style={{
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    className={`col-start-1 row-start-1 flex flex-col w-full ${
                      isActive ? "relative" : "absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-gold/20 bg-black/65 px-3 py-1 text-[10px] font-medium text-gold-light backdrop-blur">
                        {post.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[11px] text-white/70">
                        <Clock size={12} className="text-gold" /> {post.readTime} de leitura
                      </span>
                    </div>
                    
                    <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-white">
                      {post.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-white/80">
                      {post.excerpt}
                    </p>

                    <div className="mt-4 rounded-2xl border border-white/15 bg-black/40 p-4 backdrop-blur">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold-light">
                        Dicas & Benefícios:
                      </span>
                      <ul className="mt-2 space-y-1.5">
                        {post.tips.map((tip) => (
                          <li key={tip} className="flex items-start gap-2 text-xs text-white/90">
                            <Check size={13} className="mt-0.5 shrink-0 text-gold" />
                            <span className="leading-tight">{tip}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/10 pt-3 text-[11px]">
                        <span className="text-white/60">Procedimento</span>
                        <span className="font-semibold text-gold-light">{post.relatedPro}</span>
                      </div>
                    </div>

                    {/* Botão de Agendamento via WhatsApp */}
                    <a
                      href={waLink(
                        `Olá! Li o artigo "${post.title}" no blog do ${CLINIC.name} e gostaria de agendar o procedimento relacionado "${post.relatedPro}".`
                      )}
                      target="_blank"
                      rel="noopener"
                      className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-full bg-gold-grad py-2.5 px-4 text-xs font-semibold text-[#1b140a] transition-all hover:shadow-glow"
                    >
                      <span>Saber Mais</span>
                      <ArrowRight size={13} />
                    </a>
                  </motion.div>

                  {/* CONTEÚDO INATIVO (Ajustado dinamicamente para desktop ou mobile) */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isActive ? 0 : 1,
                      x: isActive ? 20 : 0,
                    }}
                    transition={springTransition}
                    style={{
                      pointerEvents: isActive ? "none" : "auto",
                    }}
                    className={`col-start-1 row-start-1 flex flex-col w-full ${
                      isActive
                        ? "absolute inset-x-5 top-5 bottom-5 sm:inset-x-6 sm:top-6 sm:bottom-6"
                        : "relative h-full justify-end"
                    }`}
                  >
                    {/* Mobile & Tablet: Título horizontal simples */}
                    <div className="flex flex-col w-full lg:hidden">
                      <span className="rounded-full border border-gold/20 bg-black/65 px-3 py-1 text-[10px] font-medium text-gold-light backdrop-blur self-start">
                        {post.category}
                      </span>
                      <h3 className="mt-2.5 font-display text-base font-semibold leading-snug text-white">
                        {post.title}
                      </h3>
                      <motion.span
                        animate={{
                          scale: [1, 1.05, 1],
                          boxShadow: [
                            "0 0 0 0px rgba(212, 175, 55, 0)",
                            "0 0 8px 1px rgba(212, 175, 55, 0.3)",
                            "0 0 0 0px rgba(212, 175, 55, 0)"
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="mt-3.5 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 text-xs font-semibold text-gold-light backdrop-blur self-start transition-colors duration-300 group-hover:bg-gold group-hover:text-black group-hover:border-gold"
                      >
                        <span>Tocar para abrir</span>
                        <Plus size={13} className="transition-transform duration-300 group-hover:rotate-90" />
                      </motion.span>
                    </div>

                    {/* Desktop: Visual vertical (Book Spine) para instigar o clique */}
                    <div className="hidden lg:flex flex-col items-center justify-between h-full py-4 w-full">
                      <span className="rounded-full border border-gold/20 bg-black/65 px-2.5 py-1 text-[9px] font-medium text-gold-light backdrop-blur uppercase tracking-wider">
                        {post.category.split(" ")[0]}
                      </span>

                      <span 
                        className="font-display text-base font-semibold text-white/70 tracking-wide select-none rotate-180 my-4 max-h-[16rem] overflow-hidden text-ellipsis whitespace-nowrap group-hover:text-gold-light transition-colors duration-300"
                        style={{ writingMode: "vertical-rl" }}
                      >
                        {post.title}
                      </span>

                      <div className="flex flex-col items-center gap-2">
                        <motion.span
                          animate={{
                            scale: [1, 1.1, 1],
                            boxShadow: [
                              "0 0 0 0px rgba(212, 175, 55, 0)",
                              "0 0 10px 2px rgba(212, 175, 55, 0.4)",
                              "0 0 0 0px rgba(212, 175, 55, 0)"
                            ]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="inline-flex items-center justify-center bg-gold/15 p-2 rounded-full border border-gold/40 text-gold-light transition-all duration-300 group-hover:bg-gold group-hover:text-black group-hover:scale-110"
                        >
                          <Plus size={14} className="transition-transform duration-300 group-hover:rotate-90" />
                        </motion.span>
                        <span className="text-[10px] font-bold text-gold uppercase tracking-wider group-hover:text-gold-light transition-colors duration-300">
                          Abrir
                        </span>
                      </div>
                    </div>
                  </motion.div>

                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
