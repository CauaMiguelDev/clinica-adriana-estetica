import type { Metadata } from "next";
import { Investment } from "@/components/sections/Investment";

export const metadata: Metadata = {
  title: "Preços",
  description:
    "Valores dos procedimentos do Espaço Cuide-se Bem em Ceilândia, Brasília. Sem surpresa: o orçamento fechado sai na avaliação.",
};

export default function PrecosPage() {
  return (
    <div className="pt-[--header-h]">
      <Investment />
    </div>
  );
}
