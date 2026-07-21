import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/queries";

const baseUrl = "https://www.pinchhitdigital.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/catering-lead-recovery`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/audit`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/build-it-live`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      // Pricing changes more often than "yearly" signals to Googlebot.
      url: `${baseUrl}/plans`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/newsletter`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/sms-privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/sms-terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Pull live blog posts from Sanity. Guarded so a CMS outage doesn't break
  // the whole sitemap build — we fall back to the static routes only.
  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getAllPosts();
    postRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("sitemap: failed to fetch blog posts from Sanity:", error);
  }

  return [...staticRoutes, ...postRoutes];
}
