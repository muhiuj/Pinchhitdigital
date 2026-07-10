"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Top-nav kept lean and product-forward: the real destination pages plus one
// About anchor. The homepage-section anchors (Process, Services, Benefits, FAQ)
// live in the footer and on the homepage, so the bar doesn't get crowded.
const navLinks = [
  { href: "/catering-lead-recovery", label: "Catering" },
  { href: "/plans", label: "Plans" },
  { href: "/guides", label: "Guides" },
  { href: "/blog", label: "Blog" },
  { href: "/#about", label: "About" },
];

const CAL_URL = "https://cal.com/jeremy-muhiu-7gtclu/30min";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Lock body scroll + close on Esc while the menu is open. Effect re-runs
  // whenever `open` changes; cleanup restores the original overflow value.
  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const desktopLinkClass =
    "font-display text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-700 transition-colors hover:text-ink-900";

  const mobileLinkClass =
    "block w-full rounded-md px-2 py-3 font-display text-lg font-semibold text-ink-900 transition-colors hover:bg-ink-100";

  return (
    <header className="sticky top-0 z-50 border-b border-ink-200 bg-cream-50/90 backdrop-blur-md backdrop-saturate-150">
      <nav className="mx-auto flex max-w-[1320px] items-center gap-6 px-6 py-4 md:px-8">
        <Link
          href="/"
          onClick={close}
          className="flex items-center gap-2.5"
          aria-label="Pinch Hit Digital home"
        >
          <Image src="/phd-logo.png" alt="" width={28} height={28} priority />
          <span className="hidden h-5 w-px bg-teal-400 sm:inline-block" />
          <span className="font-display text-[13px] font-extrabold uppercase tracking-[0.14em] text-ink-900">
            Pinch Hit Digital
          </span>
        </Link>

        {/* Desktop nav links — hidden below lg */}
        <div className="ml-6 hidden items-center gap-7 lg:flex">
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link key={link.href} href={link.href} className={desktopLinkClass}>
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href} className={desktopLinkClass}>
                {link.label}
              </a>
            ),
          )}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.04em] text-ink-500 xl:inline">
            DFW · Dallas / Fort Worth
          </span>

          {/* Desktop CTA — hidden below lg, replaced by the menu CTA there */}
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-2 rounded-full bg-ink-900 px-4 py-3 font-display text-[12px] font-bold uppercase tracking-[0.08em] text-cream-50 transition-colors hover:bg-sun-400 hover:text-ink-900 lg:inline-flex"
          >
            Book a 30-minute call
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </a>

          {/* Hamburger toggle — only below lg */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="-mr-2 rounded-md p-2 text-ink-900 transition-colors hover:bg-ink-100 lg:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile / tablet menu panel. Absolute-positioned below the sticky
          nav so it overlays page content instead of pushing it down. */}
      {open ? (
        <div
          id="mobile-nav"
          className="absolute left-0 right-0 top-full border-t border-ink-200 bg-cream-50 shadow-lg lg:hidden"
        >
          <div className="mx-auto max-w-[1320px] px-6 py-6 md:px-8">
            {/* Prominent dark CTA at the top of the menu */}
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-4 font-display text-sm font-bold uppercase tracking-[0.08em] text-cream-50 transition-colors hover:bg-sun-400 hover:text-ink-900"
            >
              Book a 30-minute call
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </a>

            {/* Nav links — stacked, big tap targets */}
            <div className="mt-6 space-y-1 border-t border-ink-200 pt-4">
              {navLinks.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className={mobileLinkClass}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className={mobileLinkClass}
                  >
                    {link.label}
                  </a>
                ),
              )}
            </div>

            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.04em] text-ink-500">
              DFW · Dallas / Fort Worth
            </p>
          </div>
        </div>
      ) : null}
    </header>
  );
}
