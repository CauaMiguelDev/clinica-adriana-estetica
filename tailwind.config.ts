import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Acentos de luxo (constantes nos dois temas)
        gold: {
          DEFAULT: "#c9a35e",
          light: "#e6c789",
          dark: "#a07f3f",
        },
        champagne: "#f3e6cf",
        rose: "#d98a8a",
        plum: "#3a1f3d",
        // Cores semânticas (mudam com o tema via CSS vars)
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-grad": "linear-gradient(120deg, #e6c789, #c9a35e, #a07f3f)",
        "radial-fade": "radial-gradient(60% 60% at 50% 0%, rgba(201,163,94,0.18), transparent 70%)",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(201,163,94,0.45)",
        "glow-lg": "0 0 80px -10px rgba(201,163,94,0.5)",
        luxe: "0 30px 80px -30px rgba(0,0,0,0.55)",
      },
      keyframes: {
        gradient: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-18px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(200%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
      },
      animation: {
        gradient: "gradient 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s infinite",
        "spin-slow": "spin-slow 18s linear infinite",
        "pulse-ring": "pulse-ring 2.4s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
