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

      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
