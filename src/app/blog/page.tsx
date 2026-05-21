import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Blog | Pinch Hit Digital — DFW Restaurant Operators",
  description:
    "Practical reads for DFW businesses — no fluff. Catering revenue, automation, and operations insights from Pinch Hit Digital.",
};

// Revalidate the index every 60s so newly-published posts appear without a
// full redeploy. Sanity webhooks could trigger on-demand revalidation later.
export const revalidate = 60;

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <section className="bg-cream-50 px-6 py-14 md:px-8 lg:py-20">
      <div className="mx-auto max-w-[1320px]">
        <p className="font-mono text-xs uppercase tracking-wider text-teal-700">
          Blog
        </p>
        <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight tracking-[-0.02em] text-ink-900 md:text-5xl">
          From the{" "}
          <span className="font-serif italic text-teal-700">Field</span>.
        </h1>
        <p className="mt-3 max-w-xl text-lg text-ink-500">
          Practical reads for DFW businesses — no fluff.
        </p>

        <hr className="mb-12 mt-10 border-t border-ink-200" />

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink-200 bg-white px-8 py-16 text-center">
            <p className="font-display text-xl font-bold text-ink-900">
              Posts coming soon.
            </p>
            <p className="mt-2 text-sm text-ink-500">
              We&rsquo;re cooking up the first batch.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
