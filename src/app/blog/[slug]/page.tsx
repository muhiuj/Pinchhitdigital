import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/components/PortableTextComponents";
import PostCTA from "@/components/PostCTA";
import { getPostBySlug } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";

// Next 16 passes params as a Promise — must be awaited.
type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: "Post not found | Pinch Hit Digital" };
  }
  return {
    title: `${post.title} | Pinch Hit Digital`,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = post.publishedAt
    ? dateFormatter.format(new Date(post.publishedAt))
    : null;

  return (
    <article className="bg-cream-50 px-6 pb-20 pt-10 md:px-8 lg:pt-14">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="font-display text-sm font-semibold text-ink-500 transition-colors hover:text-ink-900"
        >
          ← Back to Blog
        </Link>

        {post.category ? (
          <div className="mt-8">
            <span className="inline-block rounded-full border border-teal-400 px-3 py-1 font-display text-[11px] font-bold uppercase tracking-widest text-teal-700">
              {post.category}
            </span>
          </div>
        ) : null}

        <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-[-0.02em] text-ink-900 md:text-5xl">
          {post.title}
        </h1>

        {formattedDate ? (
          <time
            dateTime={post.publishedAt ?? undefined}
            className="mt-4 block font-mono text-xs uppercase tracking-wider text-ink-400"
          >
            {formattedDate}
          </time>
        ) : null}

        {post.coverImage?.asset ? (
          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-ink-100">
            <Image
              src={urlFor(post.coverImage).width(1200).url()}
              alt={post.coverImage.alt ?? ""}
              fill
              sizes="(max-width: 1024px) 100vw, 768px"
              priority
              className="object-cover"
            />
          </div>
        ) : null}

        {post.body ? (
          <div className="mt-10">
            <PortableText
              value={post.body}
              components={portableTextComponents}
            />
          </div>
        ) : null}

        {/* Tangentially-related conversion ask. <aside> marks it as
            distinct from the article body itself. */}
        <aside className="mt-16">
          <PostCTA />
        </aside>
      </div>
    </article>
  );
}
