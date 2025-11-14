import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export const Hero = () => {
  const scrollToTips = () => {
    document.getElementById("tip-options")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-foreground leading-none">
          Fuel the jokes.
          <br />
          <span className="text-primary">Fund the fight.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Comedy about access that actually moves the needle.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
          <Button
            size="lg"
            onClick={scrollToTips}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-6 shadow-glow transition-all hover:shadow-[0_0_40px_hsl(169_43%_52%_/_0.5)] hover:scale-105"
          >
            Buy me a coffee
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToTips}
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold text-lg px-8 py-6 transition-all hover:scale-105"
          >
            Join the Mr. Wheelz Crew
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-4">
          <Lock className="w-4 h-4" aria-hidden="true" />
          <span>Secure checkout via Stripe & PayPal</span>
        </div>

        <p className="text-sm text-muted-foreground max-w-xl mx-auto pt-2">
          Tips = more videos, captions, ride costs, and gear.
        </p>

        <div className="pt-4">
          <a 
            href="/wall-of-thanks" 
            className="text-sm text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
          >
            See who's fueling the fight →
          </a>
        </div>
      </div>
    </section>
  );
};
