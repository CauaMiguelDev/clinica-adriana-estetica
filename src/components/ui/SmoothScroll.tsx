"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { prefersReducedMotion, useAmbientMotion } from "@/components/ui/useAmbientMotion";
import { setLenis } from "@/lib/smooth";

/**
 * Rolagem suave (Lenis) — o "peso" que faz a página deslizar em vez de pular
 * de 100 em 100px a cada giro da roda.
 *
 * ## Sem rAF próprio
 *
 * O Lenis normalmente abre o seu `requestAnimationFrame`. Aqui não: ele é
 * criado com `autoRaf: false` e alimentado pelo relógio compartilhado
 * (`useAmbientMotion`), mantendo a regra de um único laço para a página (ver
 * DESIGN.md, "Regras invioláveis de desempenho").
 *
 * ## O que ele não faz
 *
 * - **Toque:** fica nativo (`syncTouch` desligado). A inércia do iOS/Android já
 *   é boa, e sequestrar o dedo é o que faz site "suave" parecer travado.
 * - **Movimento reduzido:** nem é criado. Rolagem com inércia artificial é
 *   exatamente o tipo de movimento que a preferência pede para tirar.
 *
 * O scroll continua sendo o nativo por baixo, então `position: sticky`,
 * `useScroll` do Framer e as âncoras seguem funcionando sem adaptação.
 */
export function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const l = new Lenis({
      autoRaf: false,
      // 1.1s com expo-out: longo o bastante para sentir o deslize, curto o
      // bastante para não parecer que a página responde atrasada.
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: -88 },
    });
    lenis.current = l;
    setLenis(l);

    return () => {
      l.destroy();
      lenis.current = null;
      setLenis(null);
    };
  }, []);

  // Troca de rota: quem rola é o Next (topo, ou a âncora de `/rota#id`). Só
  // interrompe um deslize que estivesse em curso, para ele não continuar
  // empurrando a página nova para onde a antiga ia.
  useEffect(() => {
    const l = lenis.current;
    if (!l) return;
    l.stop();
    l.start();
  }, [pathname]);

  useAmbientMotion((t) => lenis.current?.raf(t * 1000));

  return null;
}
