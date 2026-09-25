import type { Config } from "tailwindcss";

/**
 * Sistema de design — Espaço Cuide-se Bem.
 * Os valores das cores vivem em `globals.css` (:root) como triplets RGB,
 * para que o Tailwind possa aplicar opacidade (`bg-olive/10`) sobre eles.
 * Documentação completa e regras de uso: DESIGN.md
 */
const rgb = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  // `hover:` só onde há hover de verdade. Sem isto, no celular o toque deixa o
  // botão preso no estado de hover (preenchimento subido) até tocar fora.
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      colors: {
        // --- Neutros terrosos ---
        bg: rgb("--bg"),
        surface: rgb("--surface"),
        sand: rgb("--sand"),
        fg: rgb("--fg"),
        muted: rgb("--muted"),
        line: rgb("--line"),

        // --- Cor de ação ---
        olive: {
          DEFAULT: rgb("--olive"),
          dark: rgb("--olive-dark"),
          light: rgb("--olive-light"),
        },
        // --- Secundária / destaque de título ---
        terracotta: {
          DEFAULT: rgb("--terracotta"),
          dark: rgb("--terracotta-dark"),
          light: rgb("--terracotta-light"),
        },
        // --- Acento raro: selos e detalhes. NUNCA texto corrido (2,2:1). ---
        gold: {
          DEFAULT: rgb("--gold"),
          dark: rgb("--gold-dark"),
        },
      },

      // Borda padrão do projeto — substitui o antigo seletor global `* {}`.
      borderColor: { DEFAULT: rgb("--line") },

      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },

      // Três raios, não seis.
      borderRadius: {
        card: "1.25rem", // cards, botões grandes
        panel: "2rem", // painéis, imagens, blocos de destaque
      },

      backgroundImage: {
        "olive-grad": "linear-gradient(135deg, #74805E, #63704F 55%, #4A5539)",
        "terracotta-grad": "linear-gradient(135deg, #B06B4E, #9A5C42 55%, #7E4832)",
        "sand-fade": "linear-gradient(180deg, #FFFFFF 0%, #FAF6F0 60%, #F4EDE4 100%)",
      },

      // Sombras quentes e discretas — nunca preto puro.
      boxShadow: {
        soft: "0 1px 2px rgba(46,42,36,0.04), 0 8px 24px -12px rgba(46,42,36,0.10)",
        lift: "0 2px 4px rgba(46,42,36,0.05), 0 20px 40px -20px rgba(46,42,36,0.16)",
      },

      // Transição padrão do site: mais longa e com a mesma expo-out das
      // entradas. Quem escreve só `transition` já ganha o hover macio; o 150ms
      // linear-ish do Tailwind era o que fazia os botões "estalarem".
      transitionDuration: { DEFAULT: "500ms", 400: "400ms", 600: "600ms", 800: "800ms", 1200: "1200ms" },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.22, 1, 0.36, 1)",
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },

      keyframes: {
        // Onda do clique: parte do ponto tocado e se dissolve.
        wave: {
          from: { transform: "translate(-50%,-50%) scale(1)", opacity: "0.25" },
          to: { transform: "translate(-50%,-50%) scale(26)", opacity: "0" },
        },
        // Respiração do gradiente de fundo — só transform, nunca background.
        breathe: {
          "0%,100%": { transform: "scale(1)", opacity: "0.85" },
          "50%": { transform: "scale(1.08)", opacity: "1" },
        },
        // Faixa de serviços do Hero: a lista vem duplicada, então -50% fecha
        // o laço sem emenda.
        marquee: {
          from: { transform: "translate3d(0,0,0)" },
          to: { transform: "translate3d(-50%,0,0)" },
        },
        // Flutuação das fotos do Hero e dos selos. Amplitude pequena de propósito.
        float: {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-10px,0)" },
        },
      },
      animation: {
        wave: "wave 700ms cubic-bezier(0.22,1,0.36,1) forwards",
        marquee: "marquee 40s linear infinite",
        float: "float 7s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        breathe: "breathe 19s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
