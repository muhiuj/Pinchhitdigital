import Link from "next/link";

export default function CateringPage() {
  return (
    <section className="flex min-h-[90vh] items-center bg-ink-900">
      <div className="mx-auto w-full max-w-5xl px-6 py-20 text-center">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-sun-400">
          Catering Lead Recovery · Dallas–Fort Worth
        </p>

        <h1 className="mt-6 font-display text-3xl font-extrabold tracking-[-0.02em] text-cream-50 sm:text-4xl md:text-5xl">
          Stop Losing Catering Revenue.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-cream-100/85 sm:text-xl">
          DFW restaurant operators miss 20–40% of catering inquiries. We fix
          that — in 2 weeks, without touching your POS.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/audit"
            className="inline-flex items-center gap-2.5 rounded-full bg-sun-400 px-6 py-4 font-display text-[13px] font-bold tracking-[0.04em] text-ink-900 transition-colors hover:bg-sun-300"
          >
            Get your free audit <span>→</span>
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 border-b border-cream-50/40 px-2 py-4 font-display text-[13px] font-semibold tracking-[0.02em] text-cream-50 transition-colors hover:border-cream-50"
          >
            See how it works
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-cream-50/15 pt-10 sm:grid-cols-3">
          <div>
            <div className="font-display text-3xl font-extrabold tracking-[-0.04em] text-sun-400 sm:text-4xl">
              &lt; 1 hr
            </div>
            <div className="mt-2 text-sm text-cream-100/80">
              guaranteed response on every inquiry
            </div>
          </div>
          <div>
            <div className="font-display text-3xl font-extrabold tracking-[-0.04em] text-sun-400 sm:text-4xl">
              2 weeks
            </div>
            <div className="mt-2 text-sm text-cream-100/80">
              from contract to live system
            </div>
          </div>
          <div>
            <div className="font-display text-3xl font-extrabold tracking-[-0.04em] text-sun-400 sm:text-4xl">
              0
            </div>
            <div className="mt-2 text-sm text-cream-100/80">
              required changes to your existing POS
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
