# awfixer design system

The Autist's black-and-white editorial system, retargeted at this Next.js app.
White on black, Roboto for reading, Roboto Mono for UI chrome, hairline
borders, no brand color. SpaceX and SpaceXAI contribute composition only:
a one-sentence thesis, full-bleed media, and spec rows. The type, the
tokens, the pill, and the draw-on underline stay.

Styles are hand-written CSS in `app/globals.css` on top of Tailwind v4.
No daisyUI. New CSS does not use `@apply`. Load the faces with
`next/font/google` in `app/layout.tsx` and drop Geist.

## What stays, what is borrowed

Kept from The Autist, including the parts the written rules and the
shipped CSS already agree on:

- The opacity scale, the viewport type scale, and the 75% hero leading.
- Mono for chrome, Roboto for prose and for nav links.
- Hairline borders. No shadows.
- Pill buttons that invert. Draw-on underlines.
- Section numbers, the 36px / 15vw / 84px rhythm, and the horizontal post rail.
- The editorial stack: article grid, TOC, tags, callouts.

Borrowed from SpaceX: full-bleed media with square frames, spec rows
(mono label, figure, hairline), and a header that sits on the hero until
the hero scrolls away.

Borrowed from SpaceXAI (x.ai, 2026): the hero is one thesis sentence, then
at most two actions. A product prompt, when a page has one, is a single
line in an empty black field.

The site is the black field. Grok's paper surface (`#f9f8f7`) belongs to
the chat product and is not a second theme here. The nova light palette
and the `d` theme toggle in `components/theme-provider.tsx` are starter
leftovers, not part of this system.

## Tokens (`app/globals.css`)

| Token                               | Value                                 | Use                                                   |
| ----------------------------------- | ------------------------------------- | ----------------------------------------------------- |
| `--background-color`                | `rgb(0, 0, 0)`                        | Page background                                       |
| `--text-color`                      | `rgb(255, 255, 255)`                  | Primary text, active states, button borders           |
| `--text-color-80`                   | 80% white                             | Body copy                                             |
| `--text-color-muted`                | 65% white                             | Section numbers                                       |
| `--text-color-40`                   | 40% white                             | Muted chrome, emphasis hairlines                      |
| `--text-color-20`                   | 20% white                             | Default hairlines                                     |
| `--font1` / `--font3`               | Roboto, system-ui                     | Body, headings, nav links                             |
| `--font2`                           | Roboto Mono                           | Buttons, kickers, TOC, tags, breadcrumbs, spec labels |
| `--scale`                           | 1 (0.8 at ≥1920px)                    | Multiplies the vw heading scale                       |
| `--ease-transition`                 | `cubic-bezier(0.215, 0.61, 0.355, 1)` | Shared easing                                         |
| `--motion-duration-reduced`         | `1ms`                                 | `prefers-reduced-motion`                              |
| `--success-color` / `--error-color` | form feedback only                    | Never decorative                                      |

There is no brand color. Emphasis comes from weight, opacity, and
underline-on-hover. Photography is the only chroma on the page.

Point the shadcn slots at these tokens so `border-t`, `text-muted-foreground`,
and `bg-primary` resolve here:

| Slot                                   | Points at            |
| -------------------------------------- | -------------------- |
| `--background`, `--primary-foreground` | `--background-color` |
| `--foreground`, `--primary`            | `--text-color`       |
| `--muted-foreground`                   | `--text-color-80`    |
| `--border`, `--input`                  | `--text-color-20`    |
| `--destructive`                        | `--error-color`      |
| `--radius`                             | `0`                  |

`--radius: 0` keeps frames, menus, and images square. Pills set their own
radius. Do not leave the nova oklch scale in `:root`.

Name the layout measures in `@theme` so utilities can use them:
`--spacing-wide: 36px`, `--spacing-section: 84px`, `--spacing-narrow: 15vw`.

### Type scale

Headings are viewport-scaled so layouts hold at any width:
`h1 = 13.8vw`, `h2 = 5.7vw`, `h3 = 3.33vw`, `h4 = 2.6vw`, `h5 = 2.2vw`,
`h6 = 2vw`, all × `--scale`. Hero `h1` leading is 75%. Body is 18px / 150%
with tracking `-0.035em`. UI chrome is 12–13px mono, uppercase,
letter-spacing `0.08em`.

Nav links are the shipped Autist treatment, not chrome: Roboto, 18px,
sentence case, draw-on underline.

### Layout containers

- `.wide-container` — 36px inline padding
- `.narrow-container` — 15vw inline padding
- `.section-padding[-top|-bottom]` — 84px block padding

## Composition

### Thesis

One sentence in the hero `h1`. Under it, a single paragraph capped at
480px (`.hero-paragraph-wrapper`), then a hairline (`.hero-bottom-border`,
`--text-color-40`). Two actions at most, and only when the page needs
them: `.button` and `.button.primary-fill`. The filled action brings the
reader to `NewsletterEmbed`. It does not open a second form.

### Media frame

Full-bleed, square corners, no shadow, `object-fit: cover`. The picture
runs to the container edge. Hover scales the image to `1.04` over `0.6s`
on `--ease-transition`, the same move as the post rail.

### Spec row

A SpaceX telemetry strip, built from Autist tokens. Each row is a mono
label, a Roboto figure, and a 1px `--text-color-20` rule. No cards, no
icons, no filled backgrounds.

### Header

Sticky. Transparent while a full-bleed hero is behind it; background
becomes `--background-color` once the hero has scrolled away. Wordmark
left, a short sentence-case nav, actions right. Menus are hairline panels
on black, square, no shadow.

### Section index and post rail

`.section-header` puts the heading and `.section-number` on one baseline.
The number is Roboto, 36px, weight 700, leading 75%, `--text-color-muted`.

The post rail is a horizontal mandatory snap scroller. Cards are square
image frames with the 1.04 hover scale. Controls sit on the wide-container
inset.

### Product prompt

When a page is a tool rather than an essay, it is an empty black field and
one line of type. No surrounding card.

### Signup

`NewsletterEmbed` (`components/newsletter-embed.tsx`) is the only signup.
It is the iframe at `https://xtra.theautist.me/embed`. The footer holds it.
Do not draw a card around the iframe, and do not build a form beside it.

## Component inventory

| Piece                                                    | Lives in                      | Notes                                                                                                                                                       |
| -------------------------------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tokens, type, containers                                 | `app/globals.css`             | Hand-written. Split into `app/styles/*.css` only when this file stops being readable                                                                        |
| `Button`                                                 | `components/ui/button.tsx`    | Retheme this component. Do not add a parallel button                                                                                                        |
| `.button`                                                | default variant               | Ghost pill: transparent, 1px `--text-color` border, mono, 14px, uppercase, padding `11px 30px`, radius `100px`. Hover fills white and turns the label black |
| `.button.primary-fill`                                   | `primary-fill` variant        | Filled white, black label. Hover inverts                                                                                                                    |
| `.hover-underline`                                       | link class                    | Draw-on 1px underline, `0.3s`                                                                                                                               |
| `SiteHeader`                                             | `components/site-header.tsx`  | Overlay behavior above. Open state in a Zustand store                                                                                                       |
| `SiteFooter`                                             | `components/site-footer.tsx`  | Quiet link index, copyright, `NewsletterEmbed`                                                                                                              |
| Thesis, media frame, spec row, section header, post rail | `components/`                 | One component each. Markup uses the classes above                                                                                                           |
| `.mdx-article`, `.mdx-frame`, `.mdx-main`, `.mdx-header` | article route, when it exists | Same grid as The Autist                                                                                                                                     |
| `.mdx-toc*`                                              | article rail                  | Scroll-spy in a Zustand store                                                                                                                               |
| `.mdx-tag`, `.callout`                                   | editorial                     | Chips and inline notes. Tags are mono                                                                                                                       |

Every `div` is a `motion.div` from `motion/react`. Enter with opacity and
an 8px rise, `0.5s`, `--ease-transition`. No spring and no bounce. Under
`prefers-reduced-motion`, duration is `--motion-duration-reduced`.

Stored UI state lives in Zustand stores. The header scrim and the TOC spy
are the first two.

Focus is a 2px solid `--text-color` outline, offset 3px, on
`:focus-visible`. The skip link is the same pill as a button, parked
off-screen until keyboard focus.

## Rules

1. **No raw colors.** Hex, oklch, and palette colors stay out of markup and
   new CSS. Use the tokens. `--success-color` and `--error-color` are the
   only exceptions, and only for form feedback.
2. **No arbitrary values.** Spacing, radii, and sizes come from the tokens
   and the component classes. `p-[13px]` is not a spacing decision.
3. **No restyling components.** Wrappers may set margin, width, and flex.
   A component's padding, radius, type, and color change through a variant
   or a token.
4. **Mono for chrome, Roboto for reading.** Buttons, kickers, tags, TOC,
   breadcrumbs, and spec labels use `--font2`, 12–13px, uppercase, `0.08em`.
   Prose and nav links use `--font1`.
5. **Borders are hairlines.** 1px solid `--text-color-20`, or `-40` for
   emphasis. Depth comes from the black field and the rule, not from a shadow.
6. **Square, except the pill.** Images, menus, spec rows, and frames are
   square. Buttons and the skip link are pills.
7. **Two actions.** A page gets one ghost pill and one filled pill, or
   fewer. The filled pill reaches `NewsletterEmbed`.
8. **Motion.** `--ease-transition`. Honor `prefers-reduced-motion`.
9. **No inline styles.** Dynamic values go through custom properties.
   Motion props that animate imperatively are the exception.

## Enforcement

`eslint.config.mjs` already registers `@shadcn/lint`. Enable
`no-restyle`, `no-raw-colors`, `no-arbitrary-values`, and `no-inline-styles`
on `**/*.{js,jsx,ts,tsx}`.

```bash
bun run lint
```

CSS and the rules in this document are covered in review. Run lint after
UI changes and fix every error.
