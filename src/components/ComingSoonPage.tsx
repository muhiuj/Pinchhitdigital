import Image from "next/image";
import Link from "next/link";

interface ComingSoonPageProps {
  title: string;
  description: string;
  launchLabel: string;
  mailtoSubject: string;
}

export default function ComingSoonPage({
  title,
  description,
  launchLabel,
  mailtoSubject,
}: ComingSoonPageProps) {
  const mailto = `mailto:info@pinchhitdigital.com?subject=${encodeURIComponent(mailtoSubject)}`;

  return (
    <div className="fixed inset-0 z-[100] flex min-h-screen flex-col items-center justify-center bg-ink-900 px-6 text-center">
      <Image
        src="/phd-logo.png"
        alt="Pinch Hit Digital"
        width={48}
        height={48}
        className="mb-8 opacity-80"
      />

      <p className="mb-3 font-mono text-xs uppercase tracking-wider text-teal-400">
        {title} &mdash; Pinch Hit Digital
      </p>

      <h1 className="mb-4 max-w-[16ch] font-display text-3xl font-extrabold leading-tight text-white md:text-5xl">
        Something good is coming.
      </h1>

      <p className="mb-2 max-w-[40ch] font-sans text-[16px] leading-relaxed text-white/60">
        {description}
      </p>

      <p className="mb-10 font-mono text-xs uppercase tracking-wider text-white/30">
        {launchLabel}
      </p>

      <hr className="mx-auto mb-10 w-16 border-t border-white/10" />

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <a
          href={mailto}
          className="inline-flex items-center gap-2 rounded-full bg-sun-400 px-6 py-3 font-display text-sm font-bold text-ink-900 transition-colors hover:bg-sun-300"
        >
          Get notified →
        </a>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-display text-sm font-semibold text-white/60 transition-colors hover:border-white/50 hover:text-white"
        >
          ← Back to home
        </Link>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="font-mono text-xs uppercase tracking-wider text-white/20">
          © 2026 Pinch Hit Digital · Dallas&ndash;Fort Worth, TX
        </p>
      </div>
    </div>
  );
}
