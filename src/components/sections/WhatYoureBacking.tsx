import { Card, CardContent } from "@/components/ui/card";
import { Video, CheckCircle, Users } from "lucide-react";

const backingItems = [
  {
    icon: Video,
    title: "Punchlines with purpose",
    description: "Short, viral videos calling out everyday access fails.",
  },
  {
    icon: CheckCircle,
    title: "Real-world wins",
    description: "Scripts viewers can reuse to report problems & get fixes.",
  },
  {
    icon: Users,
    title: "Community spotlight",
    description: "Elevating disabled creators & local wins.",
  },
];

export const WhatYoureBacking = () => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-6xl text-center mb-3 text-foreground">
          What you're backing
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Every dollar helps film, edit, caption, and move the chair.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {backingItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className="bg-card border-border hover:border-primary/50 transition-all hover:shadow-card hover:-translate-y-1"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-2xl text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
