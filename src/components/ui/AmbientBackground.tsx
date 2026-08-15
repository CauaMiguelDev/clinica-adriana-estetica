import type { CSSProperties } from "react";

type BeamStyle = CSSProperties & { "--rot"?: string };

// Feixes de luz (god rays) — posição/ângulo definidos por feixe
const BEAMS: BeamStyle[] = [
  { left: "8%", width: "16vw", "--rot": "16deg", animationDelay: "-2s", opacity: 0.7 },
  { left: "30%", width: "22vw", "--rot": "12deg", animationDelay: "-6s" },
  { left: "55%", width: "14vw", "--rot": "18deg", animationDelay: "-9s", opacity: 0.65 },
  { left: "74%", width: "24vw", "--rot": "13deg", animationDelay: "-4s" },
];

/**
 * Fundo ambiente fixo: base quente, brilhos radiais, feixes de luz e
 * uma leve textura granulada. Ajustado por tema (mais presente no claro).
 */
export function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden>
      <div className="ambient-glow" />
      <div className="ambient-beams">
        {BEAMS.map((s, i) => (
          <span key={i} className="ambient-beam" style={s} />
        ))}
      </div>
      <div className="ambient-grain" />
    </div>
  );
}
