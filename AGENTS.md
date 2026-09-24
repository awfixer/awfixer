@DESIGN.md

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# awfixer

Signups and forms render `NewsletterEmbed` in `components/newsletter-embed.tsx`. That component is the iframe at `https://xtra.theautist.me/embed`. It is the only signup.

Every `div` is a `motion.div` from `motion/react`.

State lives in Zustand stores. Default to a Zustand store for stored state. We are addicted to it.
