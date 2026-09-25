import type { Metadata, Viewport } from "next";
import { Fraunces, Karla } from "next/font/google";
import "./globals.css";
import { Motion } from "@/components/ui/Motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { PageTexture } from "@/components/ui/Contours";
import { WhatsappFloat } from "@/components/ui/WhatsappFloat";
import { BackToTop } from "@/components/ui/BackToTop";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import "lenis/dist/lenis.css";
import { CLINIC } from "@/lib/data";

// Títulos: serifada com personalidade. Leitura: humanista, calorosa e legível.
// 5 pesos no total (antes eram 10) — ver DESIGN.md.
const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600"],
  // Itálico só no 400: é o da palavra de destaque dos títulos ("cuidar").
  style: ["normal", "italic"],
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
  // Origem de onde o site é realmente servido: define o URL absoluto da imagem
  // de prévia (og:image). Hoje é o GitHub Pages; ao migrar para o domínio próprio,
  // troque aqui (ou passe NEXT_PUBLIC_SITE_ORIGIN). O basePath do repo o Next
  // acrescenta sozinho no caminho da imagem.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://cauamigueldev.github.io"
  ),
  title: {
    default: `${CLINIC.name} | Estética e Bem-estar em Ceilândia, Brasília`,
    template: `%s | ${CLINIC.name}`,
  },
  description:
    "Clínica de estética em Ceilândia, Brasília. Estética facial e corporal, harmonização e massoterapia com profissionais certificadas. Agende pelo WhatsApp.",
  keywords: [
    "clínica de estética Ceilândia",
    "estética Brasília",
    "harmonização facial Ceilândia",
    "drenagem linfática Brasília",
    "limpeza de pele Ceilândia",
    "massoterapia Brasília",
  ],
  openGraph: {
    title: `${CLINIC.name} | Estética e Bem-estar em Ceilândia`,
    description:
      "Estética facial e corporal, harmonização e massoterapia com profissionais certificadas, em Ceilândia, Brasília.",
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

// Perfil do negócio para os buscadores. Endereço, telefone, horário e nota
// vêm de CLINIC — se o dado mudar lá, muda aqui junto.
const businessSchema = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: CLINIC.name,
  description:
    "Clínica de estética em Ceilândia, Brasília. Estética facial e corporal, harmonização e massoterapia com profissionais certificadas.",
  telephone: `+${CLINIC.whatsapp}`,
  email: CLINIC.email,
  url: "https://clinicaadrianaestetica.com.br",
  address: {
    "@type": "PostalAddress",
    streetAddress: "QNN 1, Conjunto D, Casa 11",
    addressLocality: "Ceilândia",
    addressRegion: "DF",
    addressCountry: "BR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "20:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: CLINIC.rating,
    reviewCount: CLINIC.reviews,
    bestRating: 5,
  },
  sameAs: [CLINIC.instagram],
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <Motion>
          {/* O shell vive aqui, não nas páginas: `layout` sobrevive à troca de
              rota, então o fundo animado não reinicia e a navbar não pisca.
              Quem remonta a cada rota é o `template.tsx`, e é lá que mora a
              transição de entrada. */}
          <SmoothScroll />
          <PageTexture className="fixed z-0" />
          <ScrollProgress />
          <Navbar />
          {/* z-10 mantém o conteúdo acima do PageTexture, que é fixed z-0. */}
          <main className="relative z-10">{children}</main>
          <Footer />
          <WhatsappFloat />
          <BackToTop />
        </Motion>
        {/* Dados estruturados: sem isto o Google adivinha o que é a página.
            Só campos que a clínica realmente tem — nada inventado. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
      </body>
    </html>
  );
}
