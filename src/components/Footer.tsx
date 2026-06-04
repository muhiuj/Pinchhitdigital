import Image from "next/image";

// Rendered globally from src/app/layout.tsx so every route gets the same
// footer (previously only the homepage had one). NAP — name, area, contact
// email + booking link — stays in sync with the JSON-LD in src/lib/schema.ts
// so search engines see one consistent business identity across the site.

type LinkItem = { href: string; label: string };

const siteLinks: LinkItem[] = [
  { href: "/#how-it-works", label: "Process" },
  { href: "/#what-we-build", label: "Services" },
  { href: "/#benefits", label: "Benefits" },
  { href: "/#about", label: "About" },
  { href: "/#faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/guides", label: "Free Guides" },
];

// Per option (b): jeremy.muhiu@ is the founder/direct contact; info@ stays
// as the general inbox alias. Both shown so visitors can choose, and cal.com
// surfaces the booking flow without forcing them back to the nav.
type ContactItem = {
  label: string;
  href: string;
  external?: boolean;
};

const contactItems: ContactItem[] = [
  { label: "Email Jeremy", href: "mailto:jeremy.muhiu@pinchhitdigital.com" },
  { label: "General inbox", href: "mailto:info@pinchhitdigital.com" },
  {
    label: "Book a 30-min call",
    href: "https://cal.com/jeremy-muhiu-7gtclu/30min",
    external: true,
  },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Plans", href: "/plans" },
];

const dfwLines = [
  "Dallas · Fort Worth",
  "Plano · Frisco · McKinney",
  "Arlington · Irving",
  "Carrollton · Grapevine",
];

export function Footer() {
  return (
    <footer className="bg-ink-900 px-6 pt-16 pb-8 md:px-8">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/phd-logo.png"
              alt="Pinch Hit Digital"
              width={40}
              height={40}
              className="mb-3"
            />
            <p className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-teal-400">
              Pinch Hit Digital
            </p>
            <p className="max-w-[28ch] font-sans text-sm leading-relaxed text-white/50">
              Digital consulting for small business. Website, workflows, and
              automation — built for the people who run things in Dallas, Fort
              Worth, and the DFW Metroplex.
            </p>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-wider text-white/30">
              Site
            </p>
            <ul className="space-y-3">
              {siteLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-wider text-white/30">
              Get in touch
            </p>
            <ul className="space-y-3">
              {contactItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="font-sans text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-wider text-white/30">
              DFW &amp; Nearby
            </p>
            <ul className="space-y-3">
              {dfwLines.map((line) => (
                <li key={line} className="font-sans text-sm text-white/40">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 md:flex-row">
          <p className="font-mono text-xs uppercase tracking-wider text-white/25">
            © 2026 Pinch Hit Digital · Dallas/Fort Worth, TX · All rights
            reserved
          </p>
          <p className="font-mono text-xs uppercase tracking-wider text-white/25">
            info@pinchhitdigital.com
          </p>
        </div>
      </div>
    </footer>
  );
}
