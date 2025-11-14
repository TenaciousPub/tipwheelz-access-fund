import { Card, CardContent } from "@/components/ui/card";
import { Eye, MapPin, TrendingUp, Megaphone } from "lucide-react";

const wins = [
  {
    icon: Eye,
    stat: "250k views",
    title: "Curb Cut Lake",
    quote: "Finally someone calling this out with actual humor!",
  },
  {
    icon: MapPin,
    stat: "Fixed",
    title: "City fixed ramp at 16th & J",
    quote: "Sent them the video and they actually did something.",
  },
  {
    icon: TrendingUp,
    stat: "Trending",
    title: "Elevator Part 2",
    quote: "I've watched this 10 times and sent it to my entire building.",
  },
  {
    icon: Megaphone,
    stat: "Coverage",
    title: "Zip-tie protests",
    quote: "More effective than a thousand accessibility reports.",
  },
];

export const SocialProof = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-6xl text-center mb-12 text-foreground">
          Recent wins
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wins.map((win, index) => {
            const Icon = win.icon;
            return (
              <Card
                key={index}
                className="bg-card border-border hover:border-secondary/50 transition-all hover:shadow-card"
              >
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-secondary" aria-hidden="true" />
                    </div>
                    <span className="font-display text-lg text-secondary">{win.stat}</span>
                  </div>
                  <h3 className="font-semibold text-foreground">{win.title}</h3>
                  <p className="text-sm text-muted-foreground italic">"{win.quote}"</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
