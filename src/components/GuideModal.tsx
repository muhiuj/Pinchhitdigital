"use client";

import { useEffect, useRef, useState } from "react";

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  guideName: string;
  fileName: string;
}

type Status = "idle" | "loading" | "success" | "error";

export default function GuideModal({
  isOpen,
  onClose,
  guideName,
  fileName,
}: GuideModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  // Reset form state whenever the modal opens for a new guide, and lock
  // body scroll while open so the background doesn't shift under the overlay.
  useEffect(() => {
    if (!isOpen) return;

    setName("");
    setEmail("");
    setStatus("idle");
    setErrorMessage("");

    // Auto-focus the name input on open for keyboard users.
    const focusTimer = setTimeout(() => nameInputRef.current?.focus(), 50);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/guide-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, guideName, fileName }),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data: { url?: string } = await response.json();
      const downloadUrl = data.url ?? `/guides/${fileName}`;

      // Trigger the download via a temporary anchor element so the browser
      // saves the PDF instead of navigating away from the page.
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setStatus("success");
      setTimeout(onClose, 2000);
    } catch (error) {
      console.error("Guide download submit failed:", error);
      setStatus("error");
      setErrorMessage("Something went wrong — please try again.");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-modal-heading"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        // Stop bubbling so clicks inside the card don't dismiss it.
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
      >
        <div className="flex items-start justify-between">
          <h2
            id="guide-modal-heading"
            className="font-display text-xl font-extrabold text-ink-900"
          >
            Get Your Free Guide
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 -mt-2 cursor-pointer rounded-md p-2 text-ink-500 transition-colors hover:bg-ink-50 hover:text-ink-900"
          >
            ×
          </button>
        </div>

        {status === "success" ? (
          <p className="mt-6 text-center text-base font-medium text-teal-700">
            ✓ Your download is starting!
          </p>
        ) : (
          <>
            <p className="mb-6 mt-2 text-sm text-ink-500">
              Where should we send your access? You&rsquo;ll also get
              occasional tips for restaurant operators.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                ref={nameInputRef}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                disabled={status === "loading"}
                className="mb-3 w-full rounded-lg border border-ink-200 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:opacity-60"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={status === "loading"}
                className="mb-3 w-full rounded-lg border border-ink-200 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-2 w-full cursor-pointer rounded-lg bg-ink-900 px-6 py-3 font-display text-sm font-bold text-white transition-colors hover:bg-ink-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? "Sending..." : "Send my guide"}
              </button>

              {status === "error" && (
                <p className="mt-3 text-center text-sm text-coral">
                  {errorMessage}
                </p>
              )}

              <p className="mt-3 text-center text-xs text-ink-400">
                No spam. Unsubscribe any time.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
