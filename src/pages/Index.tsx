import { ParticleBackground } from "@/components/ParticleBackground";
import { UnderConstruction } from "@/components/UnderConstruction";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleBackground />
      <main className="relative z-10">
        <UnderConstruction />
      </main>
    </div>
  );
};

export default Index;
