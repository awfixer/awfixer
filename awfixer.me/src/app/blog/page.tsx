import { type Metadata } from "next";

import { asText } from "@prismicio/client";

import { createClient } from "@/prismicio";

export default async function BlogPage() {
  const client = createClient();
  
  // Get all blog posts, sorted by publication date
  const blogPosts = await client.getAllByType("blog_post" as any, {
    orderings: [
      { field: "my.blog_post.publication_date", direction: "desc" }
    ],
    fetch: [
      "blog_post.title",
      "blog_post.excerpt",
      "blog_post.featured_image",
      "blog_post.publication_date",
      "blog_post.author",
      "blog_post.reading_time",
      "blog_post.tags"
    ]
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-gray-600 text-lg">
          My thoughts on web development, technology, and personal projects
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {(post.data as any).featured_image?.url && (
              <div className="aspect-video overflow-hidden">
                <img
                  src={(post.data as any).featured_image.url}
                  alt={(post.data as any).featured_image.alt || ""}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <time dateTime={(post.data as any).publication_date}>
                  {new Date((post.data as any).publication_date).toLocaleDateString()}
                </time>
                {(post.data as any).author && <span>• {(post.data as any).author}</span>}
                {(post.data as any).reading_time && (
                  <span>• {(post.data as any).reading_time} min read</span>
                )}
              </div>

              <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                <a
                  href={`/blog/${post.uid}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {asText((post.data as any).title)}
                </a>
              </h2>

              {(post.data as any).excerpt && (
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {asText((post.data as any).excerpt)}
                </p>
              )}

              {(post.data as any).tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {(post.data as any).tags.map((tag: any, index: number) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                    >
                      {tag.tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {blogPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No blog posts found.</p>
        </div>
      )}
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog | AWFixer",
    description: "My thoughts on web development, technology, and personal projects",
  };
}