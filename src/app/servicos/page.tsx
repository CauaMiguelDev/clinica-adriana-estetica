import type { Metadata } from "next";
import { Services } from "@/components/sections/Services";
import { ProcedureRail } from "@/components/sections/ProcedureRail";
import { Procedures } from "@/components/sections/Procedures";
import { FAQ } from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Serviços e Procedimentos",
  description:
    "Catálogo completo de estética facial, corporal e massoterapia do Espaço Cuide-se Bem, com filtros por área e as dúvidas mais frequentes.",
};

// pt-[--header-h]: o cabeçalho é fixo e o section-pad do mobile (64px) é menor
// que ele (72px) — sem isto o primeiro título encosta na navbar.
export default function ServicosPage() {
  return (
    <div className="pt-[--header-h]">
      <Services />
      <ProcedureRail />
      <Procedures />
      <FAQ />
    </div>
  );
}
