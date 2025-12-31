import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { asText } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

import { createClient } from "@/prismicio";

type Params = { uid: string };

export default async function BlogPostPage({ params }: { params: Params }) {
  const client = createClient();

  try {
    const post = await client.getByUID("blog_post" as any, params.uid);

    return (
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="prose prose-lg max-w-none">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              {asText((post.data as any).title)}
            </h1>

            <div className="flex items-center gap-4 text-gray-600 mb-6">
              {(post.data as any).publication_date && (
                <time dateTime={(post.data as any).publication_date}>
                  {new Date(
                    (post.data as any).publication_date,
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}
              {(post.data as any).author && (
                <span>• By {(post.data as any).author}</span>
              )}
              {(post.data as any).reading_time && (
                <span>• {(post.data as any).reading_time} min read</span>
              )}
            </div>

            {(post.data as any).tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {(post.data as any).tags.map((tag: any, index: number) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag.tag}
                  </span>
                ))}
              </div>
            )}

            {(post.data as any).featured_image?.url && (
              <div className="mb-8">
                <img
                  src={(post.data as any).featured_image.url}
                  alt={
                    (post.data as any).featured_image.alt ||
                    asText((post.data as any).title)
                  }
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}
          </header>

          <div className="prose-content">
            <PrismicRichText field={(post.data as any).content} />
          </div>

          {(post.data as any).excerpt && (
            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Summary</h3>
                <p className="text-gray-600">
                  {asText((post.data as any).excerpt)}
                </p>
              </div>
            </footer>
          )}
        </article>
      </main>
    );
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  const client = createClient();

  try {
    // Get all blog posts
    const posts = await client.getAllByType("blog_post" as any);

    return posts.map((post) => ({ uid: post.uid }));
  } catch (error) {
    // Return empty array if blog_post type doesn't exist yet
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();

  try {
    const post = await client.getByUID("blog_post" as any, params.uid);

    return {
      title: asText((post.data as any).title) + " | AWFixer",
      description:
        (post.data as any).meta_description ||
        asText((post.data as any).excerpt),
      openGraph: {
        title:
          (post.data as any).meta_title || asText((post.data as any).title),
        description:
          (post.data as any).meta_description ||
          asText((post.data as any).excerpt),
        images: (post.data as any).meta_image?.url
          ? [{ url: (post.data as any).meta_image.url }]
          : (post.data as any).featured_image?.url
            ? [{ url: (post.data as any).featured_image.url }]
            : [],
      },
    };
  } catch (error) {
    return {
      title: "Blog Post Not Found | AWFixer",
    };
  }
}
