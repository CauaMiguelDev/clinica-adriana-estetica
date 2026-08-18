import type { Metadata, Viewport } from "next";
import { Fraunces, Karla } from "next/font/google";
import "./globals.css";
import { Motion } from "@/components/ui/Motion";
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
        <Motion>{children}</Motion>
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
