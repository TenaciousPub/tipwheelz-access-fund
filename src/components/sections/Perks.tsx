import { Card, CardContent } from "@/components/ui/card";
import { Gift, Download } from "lucide-react";

const perks = [
  {
    tier: "Backer",
    amount: "$3/mo",
    benefits: ["Name on thank-you wall (optional)", "Monthly behind-the-scenes post"],
  },
  {
    tier: "Crew",
    amount: "$7/mo",
    benefits: ["All Backer perks", "Early script previews", "Blooper reels download link"],
  },
  {
    tier: "Producer",
    amount: "$15/mo",
    benefits: ["All Crew perks", '"Mr. Wheelz Roast Pack" PDF', "Quarterly live Q&A link"],
  },
];

const oneTimePerks = [
  {
    amount: "$25+",
    benefit: '"CapCut Starter SFX" ZIP auto-download',
  },
  {
    amount: "$100",
    benefit: '"Episode Sponsor" on end card (30 days) + shoutout line',
  },
];

export const Perks = () => {
  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Gift className="w-12 h-12 text-primary mx-auto mb-4" aria-hidden="true" />
          <h2 className="font-display text-4xl md:text-6xl text-foreground mb-4">
            Your perks
          </h2>
          <p className="text-muted-foreground">Auto-delivered after checkout</p>
        </div>

        <div className="space-y-12">
          <div>
            <h3 className="font-display text-3xl text-foreground mb-6">Monthly tiers</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {perks.map((perk, index) => (
                <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all">
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h4 className="font-display text-2xl text-primary">{perk.tier}</h4>
                      <p className="text-muted-foreground">{perk.amount}</p>
                    </div>
                    <ul className="space-y-2">
                      {perk.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-3xl text-foreground mb-6">One-time rewards</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {oneTimePerks.map((perk, index) => (
                <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all">
                  <CardContent className="p-6 flex items-center gap-4">
                    <Download className="w-8 h-8 text-secondary flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-display text-xl text-primary">{perk.amount}</p>
                      <p className="text-sm text-foreground">{perk.benefit}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
