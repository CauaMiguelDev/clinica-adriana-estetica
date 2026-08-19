import type { Metadata } from "next";
import { Blog } from "@/components/sections/Blog";

export const metadata: Metadata = {
  title: "Dicas de Cuidado",
  description:
    "Conteúdo das especialistas do Espaço Cuide-se Bem sobre estética facial, corporal e cuidados entre as sessões.",
};

// Fora do menu por decisão de escopo — chega-se aqui pelo rodapé.
export default function BlogPage() {
  return (
    <div className="pt-[--header-h]">
      <Blog />
    </div>
  );
}
