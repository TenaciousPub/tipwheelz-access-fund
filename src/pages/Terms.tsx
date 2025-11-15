import { ParticleBackground } from "@/components/ParticleBackground";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleBackground />
      <main className="relative z-10">
        <div className="container max-w-4xl mx-auto px-4 py-16">
          <Link to="/">
            <Button variant="ghost" className="mb-8 -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-8 md:p-12 shadow-elegant">
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground mb-12">
              Effective date: November 13, 2025
            </p>

            <div className="prose prose-invert max-w-none space-y-8">
              <p className="text-foreground/90">
                Welcome to Mr Wheelz ("we," "us," "our"). By using mrwheelz.com and any related services (collectively, the "Site"), you agree to these Terms. If you don't agree, don't use the Site.
              </p>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-3">1) Who may use the Site</h2>
                <p className="text-foreground/80">
                  You must be at least 13 (or the age required by your country) and able to form a contract. If you use the Site on behalf of an organization, you confirm you're authorized to bind it.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-3">2) What we do</h2>
                <p className="text-foreground/80">
                  Mr Wheelz lets supporters send tips (one-time or recurring), buy digital perks, and access creator content and updates.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-3">3) Payments, subscriptions, refunds</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Processors</h3>
                    <p className="text-foreground/80">
                      We use third-party payment processors (e.g., Stripe and PayPal). We don't store full card details. Their terms apply in addition to ours.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Tips</h3>
                    <p className="text-foreground/80">
                      Tips are voluntary payments to support the creator. Tips are non-refundable, except in case of a confirmed billing error (e.g., duplicate charge).
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Subscriptions</h3>
                    <p className="text-foreground/80">
                      If you start a monthly plan, you authorize recurring charges until you cancel. You can cancel anytime (takes effect at the end of the current billing period). No partial refunds for unused time.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Taxes</h3>
                    <p className="text-foreground/80">
                      Where required, applicable taxes may be collected.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-3">4) Perks and downloads</h2>
                <p className="text-foreground/80">
                  We may offer digital perks (e.g., PDFs, ZIP files, links). Perks are as-is, for personal, non-commercial use, and may change over time. Access can require a valid email and completed payment.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-3">5) Your account & info</h2>
                <p className="text-foreground/80">
                  If you create an account or provide info, you promise it's accurate and you'll keep it current. Protect your login. You're responsible for activity under your credentials.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-3">6) Acceptable use</h2>
                <p className="text-foreground/80">
                  Don't: (a) break laws; (b) try to hack, scrape, or disrupt the Site; (c) infringe copyright, trademark, privacy, or publicity rights; (d) upload malware or abusive content; (e) harass others; (f) misrepresent payments or chargebacks.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-3">7) Comments and submissions</h2>
                <p className="text-foreground/80">
                  If you post or submit content (e.g., comments, messages), you grant us a worldwide, non-exclusive, royalty-free license to host, display, and share it for operating and promoting the Site. You're responsible for what you post. We may remove content at our discretion.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-3">8) Intellectual property</h2>
                <p className="text-foreground/80">
                  All Site content (text, graphics, logos, videos, code) is owned by us or our licensors and protected by law. Except for your personal, non-commercial use of the Site and purchased perks, no license is granted. Don't copy, sell, or exploit our content without permission.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-3">9) Accessibility</h2>
                <p className="text-foreground/80">
                  We aim for an accessible experience and welcome feedback at{" "}
                  <a href="mailto:hey@mrwheelz.com" className="text-primary hover:text-primary/80 transition-colors">
                    hey@mrwheelz.com
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-3">10) Third-party links & services</h2>
                <p className="text-foreground/80">
                  The Site may link to third-party websites or services. We're not responsible for them. Use at your own risk and review their terms and privacy policies.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-3">11) No professional advice</h2>
                <p className="text-foreground/80">
                  Content is for information and entertainment. It's not medical, legal, financial, or technical advice. Always consult a qualified professional for your situation.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-3">12) Disclaimers</h2>
                <p className="text-foreground/80">
                  The Site and perks are provided "as is" and "as available." We disclaim all warranties (express or implied), including merchantability, fitness for a particular purpose, and non-infringement. We don't guarantee the Site will be uninterrupted, secure, or error-free.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-3">13) Limitation of liability</h2>
                <p className="text-foreground/80">
                  To the maximum extent allowed by law, we won't be liable for indirect, incidental, special, consequential, or punitive damages; lost profits, data, or goodwill; or damages exceeding the greater of (a) $100 or (b) the amounts you paid to us in the 3 months before the claim. Some places don't allow certain limits—those limits apply only where allowed.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-3">14) Indemnification</h2>
                <p className="text-foreground/80">
                  You'll defend and indemnify us (and our owners, employees, and partners) from claims, damages, and costs arising out of your use of the Site, your content, or your violation of these Terms or laws.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-3">15) Termination</h2>
                <p className="text-foreground/80">
                  We may suspend or terminate access at any time, with or without notice, including for suspected violations. You can stop using the Site at any time. Sections that by nature should survive (e.g., IP, payments, disclaimers, liability limits) will survive termination.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-3">16) Changes to the Terms</h2>
                <p className="text-foreground/80">
                  We may update these Terms. When we do, we'll change the "Effective date" above. Continued use means you accept the updated Terms.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-3">17) Governing law; venue</h2>
                <p className="text-foreground/80">
                  These Terms are governed by the laws of the State of California, without regard to conflict-of-law rules. Courts located in Sacramento County, California will have exclusive jurisdiction, except that either party may seek injunctive relief in any court of competent jurisdiction.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-3">18) Dispute resolution; no class actions</h2>
                <p className="text-foreground/80">
                  Before filing a lawsuit, both sides agree to try to resolve disputes informally for 30 days after written notice. Class actions and class arbitrations are not allowed. Claims must be brought individually.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-3">19) Contact</h2>
                <p className="text-foreground/80">
                  Questions about these Terms or billing issues:{" "}
                  <a href="mailto:hey@mrwheelz.com" className="text-primary hover:text-primary/80 transition-colors">
                    hey@mrwheelz.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Terms;