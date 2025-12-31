import { type Metadata } from "next";

import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Home() {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  // Separate navigation, content, and footer slices
  const navigationSlices = home.data.slices.filter((slice: any) => slice.slice_type === "navigation_menu");
  const contentSlices = home.data.slices.filter((slice: any) => slice.slice_type !== "navigation_menu" && slice.slice_type !== "footer");
  const footerSlices = home.data.slices.filter((slice: any) => slice.slice_type === "footer");

  return (
    <>
      {/* Navigation */}
      <SliceZone slices={navigationSlices} components={components} />
      
      {/* Main content */}
      <main className="flex-grow">
        <SliceZone slices={contentSlices} components={components} />
      </main>
      
      {/* Footer */}
      <SliceZone slices={footerSlices} components={components} />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return {
    title: asText(home.data.title) + " | AWFixer",
    description: home.data.meta_description || "AWFixer - Personal website and blog",
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? "" }],
    },
  };
}
