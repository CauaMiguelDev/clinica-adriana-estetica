import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { ValuesStory } from "@/components/sections/ValuesStory";
import { Team } from "@/components/sections/Team";

export const metadata: Metadata = {
  title: "A Clínica",
  description:
    "Quem cuida de você no Espaço Cuide-se Bem: a história da clínica em Ceilândia e as profissionais por trás de cada procedimento.",
};

export default function SobrePage() {
  return (
    <div className="pt-[--header-h]">
      <About />
      <ValuesStory />
      <Team />
    </div>
  );
}
