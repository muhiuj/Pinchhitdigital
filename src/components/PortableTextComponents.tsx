/**
 * Custom serializers for Sanity portable text → React. Maps Sanity's block
 * types to the canonical PHD typography tokens. Stays a server component
 * (no client APIs used) so it can render inside server pages.
 */
import Image from "next/image";
import type { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanity";

type ImageValue = {
  _key?: string;
  asset?: { _ref: string; _type: string };
  alt?: string;
};

type LinkValue = {
  href?: string;
};

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const image = value as ImageValue;
      if (!image?.asset) return null;
      return (
        <figure className="my-10">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-ink-100">
            <Image
              src={urlFor(image).width(1200).url()}
              alt={image.alt ?? ""}
              fill
              sizes="(max-width: 1024px) 100vw, 768px"
              className="object-cover"
            />
          </div>
          {image.alt ? (
            <figcaption className="mt-3 text-center font-mono text-xs uppercase tracking-wider text-ink-400">
              {image.alt}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-12 font-display text-3xl font-extrabold leading-tight tracking-[-0.02em] text-ink-900 md:text-4xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-ink-900 md:text-3xl">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mt-5 font-sans text-lg leading-relaxed text-ink-700">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-4 border-teal-400 bg-cream-50 px-6 py-4 font-serif text-xl italic leading-relaxed text-ink-800">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 font-sans text-lg leading-relaxed text-ink-700 marker:text-teal-600">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 font-sans text-lg leading-relaxed text-ink-700 marker:text-teal-600">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-display font-bold text-ink-900">
        {children}
      </strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const link = value as LinkValue;
      const href = link?.href ?? "#";
      const isExternal = /^https?:\/\//i.test(href);
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-teal-700 underline underline-offset-4 transition-colors hover:text-teal-800"
        >
          {children}
        </a>
      );
    },
  },
};
