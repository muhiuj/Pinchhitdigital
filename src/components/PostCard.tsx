import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import type { PostSummary } from "@/lib/queries";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function PostCard({ post }: { post: PostSummary }) {
  const formattedDate = post.publishedAt
    ? dateFormatter.format(new Date(post.publishedAt))
    : null;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {post.coverImage?.asset ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-100">
          <Image
            src={urlFor(post.coverImage).width(800).height(500).url()}
            alt={post.coverImage.alt ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6">
        {post.category ? (
          <span className="inline-block self-start rounded-full border border-teal-400 px-3 py-1 font-display text-[11px] font-bold uppercase tracking-widest text-teal-700">
            {post.category}
          </span>
        ) : null}

        <h2 className="mt-4 font-display text-xl font-extrabold leading-tight text-ink-900">
          {post.title}
        </h2>

        {post.excerpt ? (
          <p className="mt-3 text-sm leading-relaxed text-ink-500">
            {post.excerpt}
          </p>
        ) : null}

        <div className="mt-6 flex items-center justify-between border-t border-ink-100 pt-4">
          {formattedDate ? (
            <time
              dateTime={post.publishedAt ?? undefined}
              className="font-mono text-xs uppercase tracking-wider text-ink-400"
            >
              {formattedDate}
            </time>
          ) : (
            <span aria-hidden />
          )}
          <Link
            href={`/blog/${post.slug}`}
            className="font-display text-sm font-bold text-teal-700 transition-colors hover:text-teal-800"
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  );
}
