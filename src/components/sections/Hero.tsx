import { Button } from "@/components/ui/button";
import { Lock, Clock, Calendar, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const Hero = () => {
  const scrollToTips = () => {
    document.getElementById("tip-options")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - CTA */}
          <div className="space-y-8">
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-foreground leading-none">
              Fuel the jokes.
              <br />
              <span className="text-primary">Fund the fight.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground">
              Comedy about access that actually moves the needle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
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

            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4">
              <Lock className="w-4 h-4" aria-hidden="true" />
              <span>Secure checkout via Stripe & PayPal</span>
            </div>

            <p className="text-sm text-muted-foreground">
              Tips = more videos, captions, ride costs, and gear.
            </p>
          </div>

          {/* Right Column - Benefits Card */}
          <div className="lg:block hidden">
            <Card className="bg-card/50 border-border backdrop-blur-sm">
              <CardContent className="p-8 space-y-8">
                <div className="flex gap-4">
                  <Clock className="w-6 h-6 text-primary shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-xl text-foreground mb-2">
                      ONE-TIME OR MONTHLY
                    </h3>
                    <p className="text-muted-foreground">
                      Pick your level. Cancel anytime. Zero guilt.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Calendar className="w-6 h-6 text-primary shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-xl text-foreground mb-2">
                      INSTANT PERKS
                    </h3>
                    <p className="text-muted-foreground">
                      Downloads, shoutouts, and BTS access delivered right away.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Heart className="w-6 h-6 text-primary shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-xl text-foreground mb-2">
                      REAL IMPACT
                    </h3>
                    <p className="text-muted-foreground">
                      Every dollar films, captions, and moves the chair.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-center text-muted-foreground italic">
                    "You fund the jokes. I fund the captions. Together we bully doors."
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 text-center">
              <a 
                href="/wall-of-thanks" 
                className="text-sm text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
              >
                See who's fueling the fight →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
