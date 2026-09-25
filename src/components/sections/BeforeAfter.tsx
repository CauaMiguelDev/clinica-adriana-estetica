"use client";

import { useState } from "react";
import Image from "next/image";
import { MoveHorizontal, ImagePlus, Images } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { RESULTS, type ResultPair } from "@/lib/data";

/**
 * Antes & Depois.
 *
 * Enquanto um par não tiver as duas fotos preenchidas em `RESULTS`
 * (src/lib/data.ts), mostramos um espaço reservado no lugar do comparador.
 *
 * O controle é um `input[type=range]` nativo, invisível por cima da imagem:
 * arrasto no mouse e no toque, setas do teclado e leitura por leitor de tela
 * vêm prontos do navegador — sem handler de drag próprio.
 */

function Comparator({ pair }: { pair: ResultPair }) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-panel">
      <Image
        src={pair.after}
        alt={`${pair.label} — depois`}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <span className="absolute right-3 top-3 z-10 rounded-full bg-olive px-3 py-1 text-xs font-semibold text-white">
        Depois
      </span>

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={pair.before}
          alt={`${pair.label} — antes`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <span className="absolute left-3 top-3 z-10 rounded-full bg-fg/75 px-3 py-1 text-xs font-semibold text-white">
          Antes
        </span>
      </div>

      {/* Linha e pega — puramente visuais, seguem o valor do range. */}
      <div
        className="pointer-events-none absolute inset-y-0 z-20 w-0.5 -translate-x-1/2 bg-white shadow-lift"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-olive-dark shadow-lift">
          <MoveHorizontal size={20} />
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Comparar antes e depois: ${pair.label}`}
        // touch-pan-y devolve o gesto vertical ao navegador: sem isso o range
        // cobre a imagem inteira e o dedo não consegue rolar a página por cima dela.
        className="absolute inset-0 z-30 h-full w-full cursor-ew-resize touch-pan-y opacity-0"
      />
    </div>
  );
}

function Placeholder({ pair }: { pair: ResultPair }) {
  return (
    <div className="grid aspect-[4/3] w-full place-items-center rounded-panel border border-dashed border-olive/35 bg-sand px-6 text-center">
      <div>
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-olive/10 text-olive">
          <ImagePlus size={24} />
        </span>
        <p className="mt-4 font-display text-lg font-semibold">
          Espaço reservado
        </p>
        <p className="mx-auto mt-1.5 max-w-xs text-sm text-muted">
          As fotos de antes e depois de {pair.label.toLowerCase()} entram aqui.
        </p>
      </div>
    </div>
  );
}

export function BeforeAfter() {
  const anyReady = RESULTS.some((p) => p.before && p.after);

  return (
    <section id="resultados" className="section-pad relative bg-bg">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <Images size={14} /> Antes &amp; Depois
          </span>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.01em] sm:text-5xl">
            Resultados que{" "}
            <span className="font-normal italic text-terracotta-dark">falam por si</span>
          </h2>
          <p className="mt-4 text-muted">
            {anyReady
              ? "Arraste o controle de cada imagem para revelar a transformação."
              : "Estamos reunindo as fotos das nossas clientes, com autorização de cada uma. Em breve, aqui."}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {RESULTS.map((pair, i) => {
            const ready = Boolean(pair.before && pair.after);
            return (
              <Reveal key={pair.label} variant="rise" index={i}>
                <div className="rounded-panel border border-line bg-surface p-4 shadow-soft transition-shadow duration-500 hover:shadow-lift sm:p-5">
                  {ready ? (
                    <Comparator pair={pair} />
                  ) : (
                    <Placeholder pair={pair} />
                  )}

                  <div className="mt-5 flex items-center justify-between gap-4 px-1">
                    <h3 className="font-display text-lg font-semibold">
                      {pair.label}
                    </h3>
                    <span className="rounded-full border border-line bg-sand px-3 py-1 text-xs font-semibold text-olive-dark">
                      {pair.pro}
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {anyReady && (
          <p className="mt-8 text-center text-xs text-muted">
            Fotos publicadas com autorização. Resultados variam conforme cada
            cliente.
          </p>
        )}
      </div>
    </section>
  );
}
