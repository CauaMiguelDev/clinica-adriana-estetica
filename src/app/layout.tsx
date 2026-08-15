import type { Metadata, Viewport } from "next";
import { Fraunces, Karla } from "next/font/google";
import "./globals.css";
import { CLINIC } from "@/lib/data";

// Títulos: serifada com personalidade. Leitura: humanista, calorosa e legível.
// 5 pesos no total (antes eram 10) — ver DESIGN.md.
const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-display",
  display: "swap",
});

const sans = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clinicaadrianaestetica.com.br"),
  title: {
    default: `${CLINIC.name} | Estética & Beleza de Alto Padrão em Brasília`,
    template: `%s | ${CLINIC.name}`,
  },
  description:
    "Clínica de estética e beleza premium em Ceilândia, Brasília. Massoterapia, estética facial e corporal, harmonização e tratamentos avançados com tecnologia de ponta.",
  keywords: [
    "clínica de estética Brasília",
    "harmonização facial Ceilândia",
    "drenagem linfática",
    "limpeza de pele",
    "estética avançada",
  ],
  openGraph: {
    title: CLINIC.name,
    description: "Estética & beleza de alto padrão em Brasília.",
    type: "website",
    locale: "pt_BR",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#63704F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
