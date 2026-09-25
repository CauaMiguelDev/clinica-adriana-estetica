import type { Metadata } from "next";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Testimonials } from "@/components/sections/Testimonials";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { RESULTS } from "@/lib/data";

const hasPhotos = RESULTS.some((r) => r.before && r.after);

export const metadata: Metadata = {
  title: "Resultados",
  description: `${hasPhotos ? "Antes e depois reais, depoimentos" : "Depoimentos"} de clientes e o dia a dia da clínica no Instagram do Espaço Cuide-se Bem.`,
};

export default function ResultadosPage() {
  return (
    <div className="pt-[--header-h]">
      <BeforeAfter />
      <Testimonials />
      <InstagramFeed />
    </div>
  );
}
