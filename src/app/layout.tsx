import type { Metadata, Viewport } from "next";
import { Fraunces, Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CLINIC } from "@/lib/data";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
  themeColor: "#c9a35e",
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
      <head>
        {/* Aplica o tema antes da pintura: claro é o padrão; .dark só se escolhido */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}",
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
