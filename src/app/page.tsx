import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesTeaser } from "@/components/sections/ServicesTeaser";
import { ResultsTeaser } from "@/components/sections/ResultsTeaser";

/**
 * Home curta de propósito: quatro dobras, uma pergunta respondida por dobra.
 *
 * Quem faz? (Hero) · Dá pra confiar? (TrustBar) · O que fazem? (Serviços) ·
 * Funciona mesmo? (Resultados + CTA). Tudo o que aprofunda mora nas rotas.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesTeaser />
      <ResultsTeaser />
    </>
  );
}
