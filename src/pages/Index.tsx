import { Hero } from "@/components/sections/Hero";
import { WhatYoureBacking } from "@/components/sections/WhatYoureBacking";
import { TipOptions } from "@/components/sections/TipOptions";
import { Perks } from "@/components/sections/Perks";
import { SocialProof } from "@/components/sections/SocialProof";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { ParticleBackground } from "@/components/ParticleBackground";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleBackground />
      <main className="relative z-10">
        <Hero />
        <WhatYoureBacking />
        <TipOptions />
        <Perks />
        <SocialProof />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
