import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { About } from "@/components/sections/About";
import { Team } from "@/components/sections/Team";
import { Services } from "@/components/sections/Services";
import { Procedures } from "@/components/sections/Procedures";
import { Booking } from "@/components/sections/Booking";
import { Investment } from "@/components/sections/Investment";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Testimonials } from "@/components/sections/Testimonials";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { Blog } from "@/components/sections/Blog";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { WhatsappFloat } from "@/components/ui/WhatsappFloat";
import { BackToTop } from "@/components/ui/BackToTop";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />

      {/* Ordem pela prioridade do visitante:
          serviços → agendar → resultados → confiança → contato. */}
      <main className="relative z-10">
        <Hero />
        <TrustBar />
        <Services />
        <Procedures />
        <Booking />
        <BeforeAfter />
        <About />
        <Team />
        <Testimonials />
        <Investment />
        <FAQ />
        <Blog />
        <InstagramFeed />
        <Contact />
      </main>

      <Footer />
      <WhatsappFloat />
      <BackToTop />
    </>
  );
}
