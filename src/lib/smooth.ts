import type Lenis from "lenis";

/**
 * Ponte para a instância única do Lenis (ver `SmoothScroll`).
 *
 * Módulo e não contexto: quem precisa dela (o drawer do menu, o voltar ao topo)
 * só chama duas funções, e um Provider a mais na raiz re-renderizaria a árvore
 * por nada.
 */
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

/** Trava/destrava a rolagem suave — o drawer aberto não pode rolar a página. */
export function lockScroll(locked: boolean) {
  if (!instance) return;
  if (locked) instance.stop();
  else instance.start();
}

/** Rola até um alvo. Sem Lenis (movimento reduzido), cai no nativo. */
export function scrollToTop() {
  if (instance) instance.scrollTo(0, { duration: 1.4 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}
