import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { About } from "@/components/sections/About";
import { Team } from "@/components/sections/Team";
import { Procedures } from "@/components/sections/Procedures";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Testimonials } from "@/components/sections/Testimonials";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { Blog } from "@/components/sections/Blog";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";
import { LeavesBackground } from "@/components/ui/LeavesBackground";
import { WhatsappFloat } from "@/components/ui/WhatsappFloat";
import { ChatWidget } from "@/components/ui/ChatWidget";
import { BackToTop } from "@/components/ui/BackToTop";
import { Preloader } from "@/components/ui/Preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <AmbientBackground />
      <ParticlesBackground />
      <LeavesBackground />
      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <TrustBar />
        <About />
        <Team />
        <Procedures />
        <BeforeAfter />
        <InstagramFeed />
        <Testimonials />
        <Blog />
        <FAQ />
        <Contact />
      </main>

      <Footer />
      <WhatsappFloat />
      <ChatWidget />
      <BackToTop />
    </>
  );
}
