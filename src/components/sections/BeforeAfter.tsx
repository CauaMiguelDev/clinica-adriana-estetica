"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const PAIRS = [
  {
    label: "Dreno Modeladora",
    pro: "Dra. Adriana",
    before:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80",
    after:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Limpeza de Pele",
    pro: "Dra. Adrielhe",
    before:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=900&q=80",
    after:
      "https://images.unsplash.com/photo-1648203276014-20f97ba1f817?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Microagulhamento",
    pro: "Dra. Angélica",
    before:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=900&q=80",
    after:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Harmonização Facial",
    pro: "Dra. Shay",
    before:
      "https://images.unsplash.com/photo-1674867373999-6ba05e654684?auto=format&fit=crop&w=900&q=80",
    after:
      "https://images.unsplash.com/photo-1544717304-a2db4a7b16ee?auto=format&fit=crop&w=900&q=80",
  },
];

function Comparator({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, p)));
  };

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-3xl shadow-luxe"
      onMouseMove={(e) => dragging.current && update(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchMove={(e) => update(e.touches[0].clientX)}
    >
      <Image src={after} alt="Depois" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
      <span className="absolute right-3 top-3 z-10 rounded-full bg-gold-grad px-3 py-1 text-xs font-semibold text-[#1b140a]">
        Depois
      </span>

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image src={before} alt="Antes" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
        <span className="absolute left-3 top-3 z-10 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
          Antes
        </span>
      </div>

      <div
        className="absolute inset-y-0 z-20 w-1 -translate-x-1/2 bg-gold"
        style={{ left: `${pos}%` }}
      >
        <button
          aria-label="Arraste para comparar"
          onMouseDown={() => (dragging.current = true)}
          onTouchStart={() => (dragging.current = true)}
          className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-gold-grad text-[#1b140a] shadow-glow"
        >
          <MoveHorizontal size={20} />
        </button>
      </div>
    </div>
  );
}

export function BeforeAfter() {
  return (
    <section id="resultados" className="section-pad relative bg-surface/40">
      <div className="container-luxe">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center"><MoveHorizontal size={14} /> Antes & Depois</span>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-5xl leading-normal py-2">
            Resultados que <span className="text-gradient-gold italic px-1">falam por si</span>
          </h2>
          <p className="mt-4 text-muted">
            Arraste o controle para revelar a transformação.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:gap-14 lg:grid-cols-2">
          {PAIRS.map((pair, i) => (
            <Reveal key={pair.label} delay={i * 0.1}>
              <div className="group relative rounded-[2rem] border border-line bg-surface/30 p-4 sm:p-5 transition-all duration-300 hover:border-gold/30 hover:shadow-glow">
                <Comparator before={pair.before} after={pair.after} />
                <div className="mt-5 flex items-center justify-between gap-4 px-1">
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-semibold text-fg">{pair.label}</h3>
                    <p className="text-xs text-muted mt-0.5">Resultado Real</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block rounded-full bg-gold/15 border border-gold/30 px-3 py-1 text-xs font-semibold text-gold-light">
                      {pair.pro}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted">
          *Imagens ilustrativas. Resultados variam conforme cada cliente.
        </p>
      </div>
    </section>
  );
}
