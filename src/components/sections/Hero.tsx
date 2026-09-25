"use client";

import { useRef } from "react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type Variants,
  type MotionValue,
} from "framer-motion";
import { Star, ArrowRight, MessageCircle, Leaf, Sparkles } from "lucide-react";
import { ActionButton } from "@/components/ui/ActionButton";
import { Contours } from "@/components/ui/Contours";
import { LotusMark } from "@/components/ui/Logo";
import { Aurora } from "@/components/ui/Aurora";
import { CLINIC, PHOTOS, TESTIMONIALS, waLink } from "@/lib/data";
import { AMBIENT, DUR, EASE, STAGGER, SHIFT } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER.step * 1.6, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: SHIFT.normal },
  show: { opacity: 1, y: 0, transition: { duration: DUR.enter, ease: EASE.enter } },
};

/**
 * Título palavra a palavra. Cada palavra sobe de dentro de uma máscara
 * (`overflow-hidden`), então ela *nasce* da linha de base em vez de aparecer
 * flutuando — é a diferença entre título editorial e título de slide.
 */
const words: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};
const word: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE.enter } },
};

/** O que corre na faixa do pé do Hero. Curto de propósito: é ritmo, não menu. */
const MARQUEE = [
  "Limpeza de pele",
  "Drenagem linfática",
  "Harmonização facial",
  "Massagem relaxante",
  "Dreno modeladora",
  "Microagulhamento",
  "Design de sobrancelhas",
  "Liberação muscular",
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Parallax da colagem: ao rolar, cada foto *fica para trás* num ritmo
  // diferente (desloca para baixo). Para cima não: no celular a colagem mora
  // logo abaixo do texto, e subir faria a foto cobrir as avaliações.
  // `useScroll` é passivo — não é laço perpétuo, não passa pelo relógio.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.5 });
  const yBack = useTransform(smooth, [0, 1], [0, 50]);
  const yMid = useTransform(smooth, [0, 1], [0, 110]);
  const yFront = useTransform(smooth, [0, 1], [0, 170]);

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-sand-fade pt-28 sm:pt-32"
    >
      {/* Fundo em três camadas: Aurora (cor), linhas de nível (forma) e o
          próprio gradiente da seção (base). Nenhuma com filtro. */}
      <Aurora />
      <div className="pointer-events-none absolute inset-0 -z-0 select-none">
        <Contours
          tone="olive"
          className="absolute -left-[30vw] -top-[30vh] h-[95vw] w-[95vw] opacity-80 sm:-left-[14vw] sm:h-[62vw] sm:w-[62vw]"
        />
        <Contours
          tone="terracotta"
          period={AMBIENT.medium}
          phase={7}
          className="absolute -bottom-[34vh] -right-[30vw] hidden h-[56vw] w-[56vw] lg:block"
        />
      </div>

      <div className="container-page relative z-10 grid flex-1 items-center gap-12 pb-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 lg:pb-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center lg:text-left"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-olive/20 bg-surface/70 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-olive-dark backdrop-blur sm:text-xs sm:tracking-[0.2em]"
          >
            <Leaf size={13} /> Estética &amp; bem-estar em Ceilândia
          </motion.span>

          <motion.h1
            variants={words}
            className="mt-7 font-display text-[2.9rem] font-semibold leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
          >
            <Line>Um tempo</Line> <Line>para</Line>{" "}
            <span className="relative inline-block">
              <Line className="font-normal italic text-terracotta-dark">cuidar</Line>
              <Underline />
            </span>{" "}
            <Line>de você</Line>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0"
          >
            Tratamentos faciais, corporais, harmonização e massoterapia
            conduzidos por especialistas certificadas, num espaço acolhedor em
            Brasília.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <ActionButton
              href={waLink(`Olá! Gostaria de agendar um horário no ${CLINIC.name}.`)}
              target="_blank"
              rel="noopener"
              className="w-full sm:w-auto"
            >
              <MessageCircle size={16} /> Agendar pelo WhatsApp
            </ActionButton>
            <ActionButton href="/servicos" variant="outline" className="w-full sm:w-auto">
              Ver serviços <ArrowRight size={16} />
            </ActionButton>
          </motion.div>

          <motion.div variants={item} className="mt-9">
            <Link
              href="/resultados"
              className="group inline-flex items-center gap-3 text-sm"
            >
              <span className="flex -space-x-2" aria-hidden>
                {TESTIMONIALS.slice(0, 3).map((t, i) => (
                  <span
                    key={t.name}
                    className="grid h-8 w-8 place-items-center rounded-full border-2 border-bg font-display text-xs font-semibold text-white"
                    style={{ background: ["rgb(var(--olive))", "rgb(var(--terracotta))", "rgb(var(--gold-dark))"][i] }}
                  >
                    {t.initial}
                  </span>
                ))}
              </span>
              <span className="text-left">
                <span className="flex items-center gap-1 text-gold" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                  <span className="ml-1 font-semibold text-fg">
                    {CLINIC.rating.toFixed(1).replace(".", ",")}
                  </span>
                </span>
                <span className="text-muted underline-offset-4 transition-colors group-hover:text-olive-dark group-hover:underline">
                  {CLINIC.reviews}+ avaliações no Google
                </span>
              </span>
            </Link>
          </motion.div>
        </motion.div>

        <Collage yBack={yBack} yMid={yMid} yFront={yFront} />
      </div>

      <Marquee />
    </section>
  );
}

/** Uma palavra (ou grupo) dentro da máscara que a revela. */
function Line({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
      <motion.span variants={word} className={`inline-block ${className}`}>
        {children}
      </motion.span>
    </span>
  );
}

/** Traço de pincel sob "cuidar", desenhado depois que as palavras assentam. */
function Underline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 20"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -bottom-[0.02em] left-0 h-[0.28em] w-full text-gold"
    >
      <motion.path
        d="M3 14 C 40 4, 90 3, 130 8 S 185 14, 197 6"
        fill="none"
        stroke="currentColor"
        strokeWidth={5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.9, duration: 1.1, ease: EASE.enter }}
      />
    </svg>
  );
}

/**
 * Colagem em arcos com fotos reais do Instagram da clínica.
 *
 * O arco (`rounded-t-full`) é a forma de janela de spa — e é o que impede três
 * fotos retangulares de lerem como "grade de banco de imagem". Cada peça entra
 * com uma cortina (`clip-path`) de baixo para cima e com a foto recuando de
 * 1.15 para 1: a foto parece assentar *dentro* da moldura.
 *
 * As fotos são pequenas na origem (ver PHOTOS em data.ts), então nenhuma peça
 * passa de ~340px de largura: acima disso a falta de nitidez apareceria.
 */
function Collage({
  yBack,
  yMid,
  yFront,
}: {
  yBack: MotionValue<number>;
  yMid: MotionValue<number>;
  yFront: MotionValue<number>;
}) {
  return (
    <div className="relative mx-auto h-[25rem] w-full max-w-[26rem] sm:h-[32rem] sm:max-w-[32rem] lg:h-[36rem]">
      <motion.div style={{ y: yBack }} className="absolute right-[4%] top-0 w-[62%]">
        <Frame src={PHOTOS.sala} alt="Sala de atendimento do Espaço Cuide-se Bem" shape="arch" delay={0.35} aspect="aspect-[3/4]" />
      </motion.div>

      <motion.div style={{ y: yMid }} className="absolute bottom-[4%] left-0 w-[46%]">
        <Frame src={PHOTOS.facial} alt="Cliente em tratamento facial com máscara" shape="arch" delay={0.5} aspect="aspect-[4/5]" />
      </motion.div>

      <motion.div style={{ y: yFront }} className="absolute bottom-[10%] right-0 w-[34%]">
        <Frame src={PHOTOS.massagem} alt="Massagem modeladora em atendimento" shape="circle" delay={0.65} aspect="aspect-square" />
      </motion.div>

      {/* Selos flutuantes. `animate-float` é CSS de transform — composto na
          GPU, não toca o relógio de ambiente. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: DUR.enter, ease: EASE.enter }}
        className="absolute left-[2%] top-[14%] sm:left-[4%]"
      >
        <div className="flex animate-float items-center gap-3 rounded-2xl border border-line bg-surface/90 px-4 py-3 shadow-lift backdrop-blur">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-olive-grad text-white">
            <LotusMark className="h-6 w-6" />
          </span>
          <span className="text-left leading-tight">
            <span className="block font-display text-lg font-semibold">+5.000</span>
            <span className="text-xs text-muted">atendimentos</span>
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, duration: DUR.enter, ease: EASE.enter }}
        className="absolute -right-[2%] top-[4%] hidden sm:block"
      >
        <div className="flex animate-float-slow items-center gap-2 rounded-full bg-terracotta-dark px-4 py-2 text-sm font-semibold text-white shadow-lift [animation-delay:-3s]">
          <Sparkles size={15} /> Especialistas certificadas
        </div>
      </motion.div>
    </div>
  );
}

function Frame({
  src,
  alt,
  shape,
  delay,
  aspect,
}: {
  src: StaticImageData;
  alt: string;
  shape: "arch" | "circle";
  delay: number;
  aspect: string;
}) {
  const radius = shape === "arch" ? "rounded-t-full rounded-b-[2rem]" : "rounded-full";
  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{ delay, duration: 1.2, ease: EASE.enter }}
      className={`group relative overflow-hidden border-[5px] border-surface shadow-lift ${radius} ${aspect}`}
    >
      <motion.div
        initial={{ scale: 1.18 }}
        animate={{ scale: 1 }}
        transition={{ delay, duration: 1.6, ease: EASE.enter }}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          placeholder="blur"
          sizes="(max-width: 640px) 60vw, 340px"
          className="object-cover transition-transform duration-1200 group-hover:scale-105"
        />
      </motion.div>
      {/* Véu quente: puxa as três fotos (de câmeras e luzes diferentes) para a
          mesma temperatura da paleta. */}
      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-terracotta/20 via-transparent to-gold/10 mix-blend-multiply" />
    </motion.div>
  );
}

/**
 * Faixa de serviços correndo no pé do Hero. A lista vai duplicada e a
 * animação anda -50%: quando a primeira cópia sai, a segunda está exatamente
 * onde ela começou, e o laço fecha sem emenda. Para no hover — quem quer ler
 * consegue.
 */
function Marquee() {
  return (
    <div className="relative z-10 border-y border-line/80 bg-surface/60 py-4 backdrop-blur-sm">
      <div className="group overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <ul className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <li
              key={i}
              aria-hidden={i >= MARQUEE.length}
              className="flex items-center gap-6 pr-6 font-display text-lg italic text-fg/70 sm:text-xl"
            >
              {m}
              <LotusMark className="h-4 w-4 shrink-0 text-terracotta/60" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
