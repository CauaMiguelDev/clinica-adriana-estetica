import type { Metadata } from "next";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Testimonials } from "@/components/sections/Testimonials";
import { InstagramFeed } from "@/components/sections/InstagramFeed";

export const metadata: Metadata = {
  title: "Resultados",
  description:
    "Antes e depois reais, depoimentos de clientes e o dia a dia da clínica no Instagram do Espaço Cuide-se Bem.",
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
