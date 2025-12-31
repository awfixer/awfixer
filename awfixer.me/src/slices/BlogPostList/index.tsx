"use client";

import React, { type FC } from "react";
import { asText } from "@prismicio/client";
import { type SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import styles from "./index.module.css";

/**
 * Props for `BlogPostList`.
 */
type BlogPostListProps = SliceComponentProps<any>;

/**
 * Component for `BlogPostList` Slices.
 */
const BlogPostList: FC<BlogPostListProps> = ({ slice }) => {
  // Client component - we'll fetch on client side
  const [blogPosts, setBlogPosts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchBlogPosts = async () => {
      const client = createClient();
      const limit = slice.primary.limit || 3;
      const showExcerpt = slice.primary.show_excerpt !== false;

      try {
        const posts = await client.getAllByType("blog_post" as any, {
          orderings: [
            { field: "my.blog_post.publication_date", direction: "desc" },
          ],
          limit: limit,
          fetch: [
            "blog_post.title",
            "blog_post.excerpt",
            "blog_post.featured_image",
            "blog_post.publication_date",
            "blog_post.author",
            "blog_post.uid",
          ],
        });
        setBlogPosts(posts);
      } catch (error) {
        console.log("Blog posts not available:", error);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [slice.primary.limit, slice.primary.show_excerpt]);

  const showExcerpt = slice.primary.show_excerpt !== false;

  if (loading) {
    return (
      <section className={styles.blogPostList}>
        <div className={styles.container}>
          <h2 className={styles.title}>
            {slice.primary.title || "Recent Blog Posts"}
          </h2>
          <div className={styles.grid}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.card + " " + styles.skeleton}>
                <div className={styles.skeletonImage}></div>
                <div className={styles.skeletonContent}></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (blogPosts.length === 0) {
    return null;
  }

  return (
    <section className={styles.blogPostList}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          {slice.primary.title || "Recent Blog Posts"}
        </h2>

        <div className={styles.grid}>
          {blogPosts.map((post) => (
            <article key={post.id} className={styles.card}>
              {(post.data as any).featured_image?.url && (
                <div className={styles.imageContainer}>
                  <img
                    src={(post.data as any).featured_image.url}
                    alt={(post.data as any).featured_image.alt || ""}
                    className={styles.image}
                  />
                </div>
              )}

              <div className={styles.content}>
                <div className={styles.meta}>
                  {(post.data as any).publication_date && (
                    <time dateTime={(post.data as any).publication_date}>
                      {new Date(
                        (post.data as any).publication_date,
                      ).toLocaleDateString()}
                    </time>
                  )}
                  {(post.data as any).author && (
                    <span>• {(post.data as any).author}</span>
                  )}
                </div>

                <h3 className={styles.postTitle}>
                  <a href={`/blog/${post.uid}`} className={styles.link}>
                    {asText((post.data as any).title)}
                  </a>
                </h3>

                {showExcerpt && (post.data as any).excerpt && (
                  <p className={styles.excerpt}>
                    {asText((post.data as any).excerpt)}
                  </p>
                )}

                <a href={`/blog/${post.uid}`} className={styles.readMore}>
                  Read more →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPostList;
