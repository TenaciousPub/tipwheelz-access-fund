import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

type Shoutout = {
  id: string;
  featured_until: string;
  tips: {
    donor_name: string | null;
    amount: number;
    tier_label: string;
    message: string | null;
  };
};

type RecentBacker = {
  donor_name: string | null;
  amount: number;
  tier_label: string;
  created_at: string;
};

export default function WallOfThanks() {
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);
  const [recentBackers, setRecentBackers] = useState<RecentBacker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetch active shoutouts
    const { data: shoutoutsData } = await supabase
      .from("shoutouts")
      .select(`
        id,
        featured_until,
        tips (
          donor_name,
          amount,
          tier_label,
          message
        )
      `)
      .eq("status", "active")
      .gt("featured_until", new Date().toISOString())
      .order("featured_until", { ascending: false });

    if (shoutoutsData) {
      setShoutouts(shoutoutsData);
    }

    // Fetch recent backers (last 20) from secure public view
    const { data: backersData } = await supabase
      .from("public_tips")
      .select("donor_name, amount, tier_label, created_at")
      .order("created_at", { ascending: false })
      .limit(20);

    if (backersData) {
      setRecentBackers(backersData);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link to="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="font-display text-4xl md:text-6xl text-center text-foreground mb-2">
              Wall of Thanks
            </h1>
            <p className="text-center text-muted-foreground text-lg">
              Celebrating the amazing humans who fuel the fight
            </p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="text-center text-muted-foreground py-20">
              Loading...
            </div>
          ) : (
            <>
              {/* Featured Shoutouts Section */}
              {shoutouts.length > 0 && (
                <section className="mb-16">
                  <div className="flex items-center justify-center gap-3 mb-8">
                    <Heart className="w-8 h-8 text-primary animate-pulse" />
                    <h2 className="font-display text-3xl md:text-5xl text-foreground">
                      Episode Sponsors
                    </h2>
                    <Heart className="w-8 h-8 text-primary animate-pulse" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {shoutouts.map((shoutout, index) => (
                      <Card
                        key={shoutout.id}
                        className="bg-card/80 backdrop-blur-sm border-primary/50 hover:border-primary transition-all hover:shadow-glow animate-fade-in hover-scale"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-display text-2xl text-primary mb-1">
                                {shoutout.tips.donor_name || "Anonymous Hero"}
                              </h3>
                              <Badge className="bg-accent/20 text-accent border-accent/50">
                                ${shoutout.tips.amount} • {shoutout.tips.tier_label}
                              </Badge>
                            </div>
                          </div>
                          {shoutout.tips.message && (
                            <p className="text-muted-foreground italic mb-4">
                              "{shoutout.tips.message}"
                            </p>
                          )}
                          <p className="text-sm text-muted-foreground">
                            Featured until {format(new Date(shoutout.featured_until), "MMM d, yyyy")}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {/* Recent Backers Section */}
              <section>
                <h2 className="font-display text-3xl md:text-5xl text-center text-foreground mb-8">
                  Recent Backers
                </h2>
                {recentBackers.length === 0 ? (
                  <Card className="bg-card/80 backdrop-blur-sm border-border">
                    <CardContent className="p-12 text-center">
                      <p className="text-muted-foreground text-lg">
                        Be the first to support Mr Wheelz!
                      </p>
                      <Link to="/#tip-options">
                        <Button className="mt-4 bg-primary hover:bg-primary/90">
                          Support Now
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {recentBackers.map((backer, index) => (
                      <Card
                        key={index}
                        className="bg-card/60 backdrop-blur-sm border-border hover:border-primary/50 transition-all animate-fade-in hover-scale"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <CardContent className="p-4 text-center">
                          <p className="font-semibold text-foreground mb-1 truncate">
                            {backer.donor_name || "Anonymous"}
                          </p>
                          <Badge className="bg-primary/20 text-primary border-primary/50 text-xs">
                            ${backer.amount}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-2">
                            {format(new Date(backer.created_at), "MMM d")}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </section>

              {/* CTA Section */}
              <section className="mt-16 text-center">
                <Card className="bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border-primary/50">
                  <CardContent className="p-12">
                    <h3 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                      Join the Wall
                    </h3>
                    <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
                      Your support keeps the jokes rolling, the captions on, and the fight for accessibility moving forward.
                    </p>
                    <Link to="/#tip-options">
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Heart className="w-5 h-5 mr-2" />
                        Support Mr Wheelz
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
