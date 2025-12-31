import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        {children}
        <PrismicPreview repositoryName={repositoryName} />
        <Analytics />
      </body>
    </html>
  );
}
