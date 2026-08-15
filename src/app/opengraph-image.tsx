import { ImageResponse } from "next/og";
import { CLINIC } from "@/lib/data";

/**
 * Prévia do link (WhatsApp, Instagram, Google, redes).
 *
 * Montada a partir dos dados reais da clínica — não depende de foto, então já
 * funciona antes de as fotos chegarem.
 *
 * A Fraunces vai como arquivo no repositório: o ImageResponse não enxerga as
 * fontes do next/font, e sem embutir o .ttf o Satori cai num sans genérico sem
 * emitir aviso nenhum.
 */

// O carregador node do @vercel/og monta um file:// inválido no Windows e quebra
// o build; o edge usa outro caminho de carregamento e funciona nos dois SOs.
export const runtime = "edge";

export const alt = `${CLINIC.name} — estética e bem-estar em Ceilândia, Brasília`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  // A Fraunces vai embutida no bundle: sem ela o Satori cai num sans genérico
  // sem avisar, e a peça perde justamente a serifada que é a marca.
  const fraunces = await fetch(
    new URL("./Fraunces-SemiBold.ttf", import.meta.url)
  ).then((r) => r.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #FFFFFF 0%, #FAF6F0 55%, #F0E6D6 100%)",
          padding: "72px 80px",
          fontFamily: "Fraunces",
        }}
      >
        {/* Marca */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "#63704F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="44" height="44" viewBox="0 0 64 64" fill="#FAF6F0">
              <path d="M32 11c3.7 7.4 3.7 18.6 0 31.2-3.7-12.6-3.7-23.8 0-31.2Z" />
              <path d="M32 42.2C23.4 39 17.1 31 15.7 21.2c8.8 2.7 14.7 9.6 16.3 21Z" />
              <path d="M32 42.2c8.6-3.2 14.9-11.2 16.3-21-8.8 2.7-14.7 9.6-16.3 21Z" />
              <path d="M31.4 45.8C20.5 46.3 10.3 40.8 5.3 30.7c10.8-1.1 20.7 4.6 26.1 15.1Z" />
              <path d="M32.6 45.8c10.9.5 21.1-5 26.1-15.1-10.8-1.1-20.7 4.6-26.1 15.1Z" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 20,
                letterSpacing: 6,
                color: "#63704F",
                fontWeight: 600,
              }}
            >
              ESPAÇO
            </span>
            <span style={{ fontSize: 40, color: "#2E2A24", fontWeight: 600 }}>
              Cuide-se Bem
            </span>
          </div>
        </div>

        {/* Promessa */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {/* Dois spans irmãos com gap de layout, em vez de um espaço no texto:
              o Satori apara espaço no fim de nó de texto e o U+00A0 depende de
              o subset da fonte ter o glifo. Gap não depende de nenhum dos dois. */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              // columnGap explícito: o Satori ignora o atalho `gap: "0 20px"`
              // em silêncio, e os dois spans encostam.
              columnGap: 20,
              fontSize: 68,
              lineHeight: 1.15,
              maxWidth: 1010,
            }}
          >
            <span style={{ color: "#2E2A24" }}>Um tempo para</span>
            <span style={{ color: "#7E4832" }}>cuidar de você</span>
          </div>
          <span
            style={{
              fontSize: 30,
              color: "#6B6156",
              maxWidth: 900,
            }}
          >
            Estética facial e corporal, harmonização e massoterapia com
            profissionais certificadas.
          </span>
        </div>

        {/* Rodapé prático */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontSize: 25,
            color: "#2E2A24",
            borderTop: "2px solid #E4DACE",
            paddingTop: 28,
          }}
        >
          <span>Ceilândia · Brasília — DF</span>
          <span style={{ color: "#E4DACE" }}>|</span>
          <span>{CLINIC.phoneDisplay}</span>
          <span style={{ color: "#E4DACE" }}>|</span>
          <span style={{ color: "#63704F", fontWeight: 700 }}>
            {CLINIC.hours}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Fraunces", data: fraunces, style: "normal", weight: 600 }],
    }
  );
}
