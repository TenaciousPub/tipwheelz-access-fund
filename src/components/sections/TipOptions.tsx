import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard } from "lucide-react";

const oneTimeTips = [
  { amount: 5, label: "Coffee", description: "I'll make another video instead of glaring at the elevator." },
  { amount: 10, label: "Cart Corral Crusher", description: "Keeps carts out of the blue stripes." },
  { amount: 25, label: "Door Buster", description: "Funds an episode + SFX pack download." },
  { amount: 50, label: "Production Boost", description: "Captions + transit + caffeine." },
  { amount: 100, label: "Episode Sponsor", description: "End-card shoutout for 30 days." },
];

const monthlyTips = [
  { amount: 3, label: "Backer", description: "Name on the wall + BTS post." },
  { amount: 7, label: "Crew", description: "Early script previews + bloopers ZIP." },
  { amount: 15, label: "Producer", description: "Roast Pack PDF + live Q&A access." },
];

export const TipOptions = () => {
  const [selectedTab, setSelectedTab] = useState<"one-time" | "monthly">("one-time");

  return (
    <section id="tip-options" className="py-20 px-4 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-4xl md:text-6xl text-center mb-12 text-foreground">
          Choose your tip
        </h2>

        <Tabs defaultValue="one-time" onValueChange={(v) => setSelectedTab(v as "one-time" | "monthly")} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-muted">
            <TabsTrigger value="one-time" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              One-Time
            </TabsTrigger>
            <TabsTrigger value="monthly" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Monthly
            </TabsTrigger>
          </TabsList>

          <TabsContent value="one-time" className="space-y-4">
            {oneTimeTips.map((tip) => (
              <Card key={tip.amount} className="bg-card border-border hover:border-primary/50 transition-all">
                <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-display text-3xl text-primary">${tip.amount}</span>
                      <span className="font-semibold text-foreground text-lg">{tip.label}</span>
                    </div>
                    <p className="text-muted-foreground">{tip.description}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <CreditCard className="w-4 h-4 mr-2" aria-hidden="true" />
                      Pay with Card
                    </Button>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      PayPal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            {monthlyTips.map((tip) => (
              <Card key={tip.amount} className="bg-card border-border hover:border-primary/50 transition-all">
                <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-display text-3xl text-primary">${tip.amount}</span>
                      <span className="text-muted-foreground">/month</span>
                      <span className="font-semibold text-foreground text-lg">{tip.label}</span>
                    </div>
                    <p className="text-muted-foreground">{tip.description}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <CreditCard className="w-4 h-4 mr-2" aria-hidden="true" />
                      Subscribe
                    </Button>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      PayPal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Optional note field available at checkout for shoutout names or messages.
        </p>
      </div>
    </section>
  );
};
