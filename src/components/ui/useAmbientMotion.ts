"use client";

import { useEffect, useRef } from "react";

/**
 * O relógio compartilhado de todo o movimento perpétuo do site.
 *
 * Existe um único `requestAnimationFrame` para a página inteira, não um por
 * componente: a versão original deste site chegou a dois loops concorrentes
 * (partículas + folhas) e era esse o gargalo no celular. Quem quiser movimento
 * de ambiente assina aqui e recebe o tempo decorrido.
 *
 * O laço só roda enquanto houver assinante e a aba estiver visível, e o tempo
 * não avança enquanto está parado — ao voltar, o movimento continua de onde
 * estava em vez de saltar.
 *
 * Springs do Framer (hover, tilt, drag) não passam por aqui: são transitórias,
 * duram o gesto e param sozinhas. A regra do laço único vale para o que é
 * perpétuo.
 */

type Subscriber = (elapsed: number) => void;

const subscribers = new Set<Subscriber>();
let rafId = 0;
let elapsed = 0;
let last = 0;

function frame(now: number) {
  // Limita o delta para que voltar a uma aba parada não acumule o tempo todo.
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  elapsed += dt;
  // forEach em vez de for..of: o target do tsconfig é ES5 e iterar Set exige
  // downlevelIteration, que não vale mudar por causa de uma linha.
  subscribers.forEach((run) => run(elapsed));
  rafId = requestAnimationFrame(frame);
}

function start() {
  if (rafId || subscribers.size === 0) return;
  if (typeof document !== "undefined" && document.hidden) return;
  last = performance.now();
  rafId = requestAnimationFrame(frame);
}

function stop() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = 0;
}

let visibilityBound = false;
function bindVisibility() {
  if (visibilityBound || typeof document === "undefined") return;
  visibilityBound = true;
  document.addEventListener("visibilitychange", () =>
    document.hidden ? stop() : start()
  );
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Assina o relógio de ambiente.
 *
 * @param onFrame  recebe o tempo decorrido em segundos. Mexa só em `transform`
 *                 e `opacity` aqui dentro — qualquer outra propriedade dispara
 *                 layout a 60fps.
 * @param active   passe `false` (ex.: elemento fora da tela) para desassinar
 *                 sem desmontar o componente.
 */
export function useAmbientMotion(onFrame: Subscriber, active = true) {
  const ref = useRef(onFrame);
  ref.current = onFrame;

  useEffect(() => {
    if (!active) return;

    // Movimento reduzido: desenha um quadro parado e não entra no laço.
    if (prefersReducedMotion()) {
      ref.current(0);
      return;
    }

    bindVisibility();
    const run: Subscriber = (t) => ref.current(t);
    subscribers.add(run);
    start();

    return () => {
      subscribers.delete(run);
      if (subscribers.size === 0) stop();
    };
  }, [active]);
}

/** Quantos laços de rAF existem — usado na verificação de cada fase. */
export function ambientSubscriberCount() {
  return subscribers.size;
}
