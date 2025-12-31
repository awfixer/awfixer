import {
  createClient as baseCreateClient,
  ClientConfig,
  Route,
} from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import sm from "../slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || sm.repositoryName;

/**
 * The project's Prismic route resolvers. This list determines a Prismic document's URL.
 */
const routes: Route[] = [
  { type: "page", uid: "home", path: "/" },
  { type: "page", path: "/:uid" },
  // Blog post routes will be added dynamically if the type exists
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export function createClient(config: ClientConfig = {}) {
  const client = baseCreateClient(sm.apiEndpoint || repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
    ...config,
  });

  enableAutoPreviews({ client });

  return client;
}

/**
 * Creates a Prismic client with blog post routes included. Use this only when
 * you're sure the blog_post type exists in the repository.
 */
export function createClientWithBlogRoutes(config: ClientConfig = {}) {
  const blogRoutes: Route[] = [
    ...routes,
    { type: "blog_post", path: "/blog/:uid" },
  ];

  const client = baseCreateClient(sm.apiEndpoint || repositoryName, {
    routes: blogRoutes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
    ...config,
  });

  enableAutoPreviews({ client });

  return client;
}
