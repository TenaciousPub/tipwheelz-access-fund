import { Mail } from "lucide-react";

const socialLinks = [
  { name: "TikTok", url: "https://tiktok.com/@mr.wheelz88", handle: "@mr.wheelz88" },
  { name: "Instagram", url: "https://instagram.com/mrwheelz2025", handle: "@mrwheelz2025" },
  { name: "YouTube", url: "https://youtube.com/@mrwheelz", handle: "Mr. Wheelz" },
  { name: "X", url: "https://x.com/mrwheelz88", handle: "@mrwheelz88" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/30 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-display text-2xl text-foreground mb-2">TipWheelz</h3>
            <p className="text-sm text-muted-foreground">Comedy, advocacy, access.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={`Follow on ${link.name}`}
              >
                <span className="text-sm font-medium">{link.name}</span>
                <span className="text-xs block">{link.handle}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Mail className="w-4 h-4" aria-hidden="true" />
          <a
            href="mailto:hey@tipwheelz.com"
            className="text-sm hover:text-primary transition-colors"
          >
            hey@tipwheelz.com
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <a href="/wall-of-thanks" className="hover:text-primary transition-colors">Wall of Thanks</a>
          <a href="/terms" className="hover:text-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Refunds</a>
        </div>

        <p className="text-center text-xs text-muted-foreground max-w-2xl mx-auto">
          By tipping you agree to our Terms. Tips are non-refundable unless there's a billing error.
          <br />
          If a door tries to suplex me, your tip buys the slow-mo.
        </p>
      </div>
    </footer>
  );
};
