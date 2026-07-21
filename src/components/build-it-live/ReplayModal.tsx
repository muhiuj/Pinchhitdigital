"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { WebinarSession } from "@/lib/webinars";

// Accessible replay popup. The youtube-nocookie iframe is created only when
// this component mounts (i.e. after a banner click), so YouTube ships zero
// bytes on page load. a11y contract: role="dialog" + aria-modal, focus moves
// in on open and returns to the invoker on close, Tab is trapped, Esc and
// backdrop close, body scroll locked while open.

interface ReplayModalProps {
  session: WebinarSession;
  onClose: () => void;
}

export function ReplayModal({ session, onClose }: ReplayModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const invoker = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], iframe, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
      invoker?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Replay: ${session.title}`}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close replay"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/80 backdrop-blur-sm"
        tabIndex={-1}
      />

      <div
        ref={panelRef}
        className="relative z-10 w-full max-w-[960px] rounded-2xl border border-white/10 bg-card p-3 sm:p-4"
      >
        <div className="mb-3 flex items-center justify-between gap-4 px-1">
          <p className="truncate font-display text-[15px] font-bold text-cream-50">
            {session.title}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close replay"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/15 text-cream-50 transition-colors hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${session.youtubeId}?autoplay=1&rel=0`}
            title={`Build It Live replay: ${session.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
