import type { Metadata } from "next";
import { SampleBoard } from "./SampleBoard";

/**
 * Guia vivo do sistema de design — /amostra
 *
 * Serve para julgar o movimento isolado do conteúdo, e depois fica como
 * referência: qualquer ajuste de linguagem de animação aparece aqui primeiro.
 * Fora do índice dos buscadores: não é página do site.
 */
export const metadata: Metadata = {
  title: "Amostra do sistema de design",
  robots: { index: false, follow: false },
};

export default function AmostraPage() {
  return <SampleBoard />;
}
