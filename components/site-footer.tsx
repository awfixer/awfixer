import { NewsletterEmbed } from "@/components/newsletter-embed"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer id="newsletter" className="border-t">
      <div className="grid items-center gap-6 px-6 py-6 min-[1100px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <p>awfixer</p>
        <p className="text-sm text-muted-foreground min-[1100px]:text-center">
          © {year} iResolved, LLC
        </p>
        <div className="min-[1100px]:justify-self-end">
          <NewsletterEmbed />
        </div>
      </div>
    </footer>
  )
}
