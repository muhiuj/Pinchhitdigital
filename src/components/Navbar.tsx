"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";
import { useEffect, useRef, useState } from "react";
import { INDUSTRY_NAV } from "@/lib/industries";

// Top nav, 2026-08 pivot: Industries dropdown (one entry per vertical, data
// from src/lib/industries.ts) plus the destination pages. `highlight` draws
// the one-shot rainbow attention ring (globals.css: .phd-rainbow-ring) —
// currently Case Studies, the launch asset. The booking CTA now captures
// cta_click {section: "nav"} (it was untracked before the pivot).
const navLinks = [
  { href: "/case-studies", label: "Case Studies", highlight: true },
  { href: "/blog", label: "Blog" },
  { href: "/#about", label: "About" },
  { href: "/build-it-live", label: "Webinars" },
];

const CAL_URL = "https://cal.com/jeremy-muhiu-7gtclu/30min";

function captureNavCta() {
  try {
    posthog.capture("cta_click", { section: "nav" });
  } catch {
    /* no-op */
  }
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const close = () => {
    setOpen(false);
    setIndustriesOpen(false);
  };

  // Lock body scroll + close on Esc while the mobile menu is open. Effect
  // re-runs whenever `open` changes; cleanup restores the original overflow.
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

  // Close the desktop dropdown on outside click or Esc.
  useEffect(() => {
    if (!industriesOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setIndustriesOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndustriesOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [industriesOpen]);

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
          {/* Industries dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setIndustriesOpen((o) => !o)}
              aria-expanded={industriesOpen}
              aria-haspopup="true"
              className={`${desktopLinkClass} inline-flex items-center gap-1.5`}
            >
              Industries
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={`transition-transform duration-200 ${
                  industriesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {industriesOpen ? (
              <div className="absolute left-0 top-full mt-3 min-w-[240px] rounded-xl border border-ink-200 bg-cream-50 p-2 shadow-lg">
                {INDUSTRY_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className="block rounded-lg px-3.5 py-2.5 font-display text-[13px] font-semibold text-ink-900 transition-colors hover:bg-ink-100"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {navLinks.map((link) => {
            const cls = link.highlight
              ? `${desktopLinkClass} phd-rainbow-ring -mx-1 px-3 py-1.5`
              : desktopLinkClass;
            return (
              <Link key={link.href} href={link.href} className={cls}>
                {link.label}
              </Link>
            );
          })}
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
            onClick={captureNavCta}
            className="group hidden items-center gap-2 rounded-full bg-ink-900 px-4 py-3 font-display text-[12px] font-bold uppercase tracking-[0.08em] text-cream-50 transition-colors hover:bg-sun-400 hover:text-ink-900 lg:inline-flex"
          >
            Book a demo
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
              onClick={() => {
                captureNavCta();
                close();
              }}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-4 font-display text-sm font-bold uppercase tracking-[0.08em] text-cream-50 transition-colors hover:bg-sun-400 hover:text-ink-900"
            >
              Book a demo
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </a>

            {/* Industries group, then the flat links. The menu mounts on
                open, so a highlighted link replays its ring each open. */}
            <div className="mt-6 border-t border-ink-200 pt-4">
              <p className="px-2 pb-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-500">
                Industries
              </p>
              {INDUSTRY_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className={`${mobileLinkClass} pl-4`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-4 space-y-1 border-t border-ink-200 pt-4">
              {navLinks.map((link) => {
                const cls = link.highlight
                  ? `${mobileLinkClass} phd-rainbow-ring px-4`
                  : mobileLinkClass;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className={cls}
                  >
                    {link.label}
                  </Link>
                );
              })}
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
