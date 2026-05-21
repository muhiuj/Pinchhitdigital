/**
 * GROQ queries against the Sanity dataset. All queries run server-side
 * via the shared client in @/lib/sanity. Pure read; no mutations live here.
 */
import { client } from "@/lib/sanity";
import type { PortableTextBlock } from "@portabletext/react";

export type PostCategory =
  | "Operations"
  | "Marketing"
  | "Technology"
  | "Finance";

export type SanityImage = {
  asset: { _ref: string; _type: string } | null;
  alt: string | null;
};

export type PostSummary = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string | null;
  excerpt: string | null;
  category: PostCategory | null;
  coverImage: SanityImage | null;
};

export type Post = PostSummary & {
  body: PortableTextBlock[] | null;
};

const POST_SUMMARY_PROJECTION = `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  category,
  coverImage {
    asset,
    alt
  }
`;

export async function getAllPosts(): Promise<PostSummary[]> {
  return client.fetch<PostSummary[]>(
    `*[_type == "post"] | order(publishedAt desc) {
      ${POST_SUMMARY_PROJECTION}
    }`,
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return client.fetch<Post | null>(
    `*[_type == "post" && slug.current == $slug][0] {
      ${POST_SUMMARY_PROJECTION},
      body
    }`,
    { slug },
  );
}
