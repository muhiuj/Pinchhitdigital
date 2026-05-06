import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "#how-it-works", label: "Process" },
  { href: "#what-we-build", label: "Services" },
  { href: "#benefits", label: "Benefits" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-200 bg-cream-50/90 backdrop-blur-md backdrop-saturate-150">
      <nav className="mx-auto flex max-w-[1320px] items-center gap-6 px-6 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Pinch Hit Digital — Home">
          <Image src="/phd-logo.png" alt="" width={28} height={28} priority />
          <span className="hidden h-5 w-px bg-teal-400 sm:inline-block" />
          <span className="font-display text-[13px] font-extrabold uppercase tracking-[0.14em] text-ink-900">
            Pinch Hit Digital
          </span>
        </Link>

        <div className="ml-6 hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-700 transition-colors hover:text-ink-900"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-4">
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.04em] text-ink-500 xl:inline">
            DFW · Dallas / Fort Worth
          </span>
          <a
            href="https://cal.com/jeremy-muhiu-7gtclu/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-3 font-display text-[12px] font-bold uppercase tracking-[0.08em] text-cream-50 transition-colors hover:bg-sun-400 hover:text-ink-900"
          >
            Book a 30-min call
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
