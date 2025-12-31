# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this Next.js + Prismic repository.

## Build, Lint, and Test Commands

### Package Manager Enforcement

- This project strictly enforces pnpm usage via `packageManager` field in package.json and preinstall hook
- npm and yarn are explicitly blocked to ensure consistent dependency management

### Development

- `pnpm next:dev` - Start only Next.js development server (use when dev server is not running)
- `pnpm slicemachine` - Start only Slice Machine UI (use when Slice Machine is not running)
- NOTE: Never run `pnpm dev`, `pnpm build`, or `pnpm start` as these are always running in the background to monitor work

### Production

- Build and start processes are managed automatically in the background

### Code Quality

- `pnpm lint` - Run ESLint on the entire codebase
- `pnpm format` - Format code with Prettier

### Testing

This project does not currently have test scripts configured. If adding tests, update package.json with appropriate test commands.

## Project Structure

This is a Next.js 16 application with Prismic CMS integration using Slice Machine for component-based content management.

### Key Directories

- `src/app/` - Next.js App Router pages and layouts
- `src/slices/` - Prismic slice components
- `customtypes/` - Prismic custom type definitions
- `slicemachine.config.json` - Slice Machine configuration

## Code Style Guidelines

### Import Organization

- Group imports in this order: React/Next.js, Prismic libraries, local components, types, utilities
- Use named imports for Prismic components: `import { PrismicRichText, SliceZone } from "@prismicio/react"`
- Use absolute imports with `@/` alias for local files: `import { createClient } from "@/prismicio"`

### TypeScript

- Use strict TypeScript configuration (already enabled)
- Type all props and function parameters
- Use `FC` type for functional components: `const Component: FC<Props> = ({ prop }) => {}`
- Use Prismic generated types: `type Content = prismic.AllDocumentTypes`
- Use `SliceComponentProps` for slice components: `type SliceProps = SliceComponentProps<Content.RichTextSlice>`

### Component Structure

- Use functional components with React 19+ patterns
- Slice components should follow the pattern: export default, use slice prop, render within semantic section
- Include JSDoc comments for slice components describing their purpose
- Use CSS Modules for styling: `import styles from "./index.module.css"`

### Prismic-Specific Patterns

- **Always use MCP tools for Prismic tasks** before implementing manually
- Use `createClient()` from `@/prismicio` for all API calls
- Use `asText()` for extracting text content from Rich Text fields
- Use `SliceZone` with dynamic components for rendering slices
- Configure `JSXMapSerializer` for custom Rich Text rendering
- Use `PrismicNextLink` for internal links with Prismic field data

### Error Handling

- Use async/await for Prismic client calls
- Handle missing data gracefully with optional chaining and nullish coalescing
- Use proper TypeScript types to prevent runtime errors

### Naming Conventions

- Components: PascalCase (e.g., `RichText`, `HomePage`)
- Files: kebab-case for directories, PascalCase for component files
- Slice names: PascalCase matching Prismic slice names
- CSS Classes: kebab-case in CSS Modules, use camelCase in component access

### Styling

- Use CSS Modules for component-scoped styles
- Follow BEM-like naming: `.component-name`, `.component-name__element`
- Avoid inline styles except for dynamic values

### Slice Machine Integration

- Never manually edit `src/slices/index.ts` (code generated)
- Use Slice Machine UI for creating new slices and custom types
- Slice components should be self-contained with their own styles and types
- Use the slice's `primary` and `items` props as defined in the slice model

### Environment Variables

- Use `NEXT_PUBLIC_` prefix for client-side variables
- Prismic repository name configured via `NEXT_PUBLIC_PRISMIC_ENVIRONMENT`

### Performance

- Use dynamic imports for slice components (handled automatically by Slice Machine)
- Leverage Next.js caching for Prismic requests in production
- Use appropriate revalidation strategies for static generation

## Development Workflow

1. **Package Manager**: This project strictly uses pnpm. The `packageManager` field and preinstall hook enforce pnpm usage.
2. Start development with `pnpm dev` to run both Next.js and Slice Machine
3. Create slices using Slice Machine UI at http://localhost:3000/slice-simulator
4. Implement slice components in `src/slices/`
5. Test changes in the Slice Simulator
6. Run `pnpm lint` and `pnpm format` before committing

## File Generation Rules

- Slice Machine generates `src/slices/index.ts` - DO NOT EDIT
- Prismic generates types in `prismicio-types.d.ts` - DO NOT EDIT
- Custom types are managed through Slice Machine UI
- Always run `pnpm format` after code generation

## MCP (Model Context Protocol) Usage

### General Guidelines

- **Always prioritize MCP tools** when available for any task (Prismic, web search, code search, etc.)
- MCP tools provide real-time context and up-to-date information that supersedes local knowledge
- Assume MCP tools will provide current API documentation, best practices, and examples
- Use MCP tools before relying on local code examination or assumptions

### Available MCP Tools

- **Prismic MCP Tools**: Use for all Prismic-related tasks (slice creation, modeling, mocking, coding)
- **Code Search MCP**: Use for finding code patterns, API documentation, and implementation examples
- **Web Search MCP**: Use for current information beyond local documentation
- **Context7 MCP**: Use for library documentation and code examples

### External Documentation

- **Prismic Next.js Documentation**: https://prismic.io/docs/nextjs - Official Prismic Next.js integration guide

# Prismic with Next.js Documentation Summary

This is a detailed summary of Prismic documentation for integrating with **Next.js** (as of December 2025), based on main hub page at https://prismic.io/docs/nextjs. It serves as comprehensive reference notes for an agent's knowledge file.

Prismic offers first-party integration with Next.js, supporting key features like:

- Building pages with **slices** and page types.
- Live previews in Page Builder.
- Full-website draft previews.
- Content modeling via **Slice Machine**.
- Type-safe fetching with `@prismicio/client` and generated TypeScript types.
- Multi-language support (locales).
- Next.js optimizations: App Router/Pages Router, image optimization, Server Components, Incremental Static Revalidation (ISR), and data caching.

The docs recommend using **App Router** with TypeScript.

## Setup Process

1. **Create a Prismic Repository**  
   In Prismic dashboard, create a new repository and select "Connect your own web app".

2. **Integrate Prismic into Next.js**  
   Use `@slicemachine/init` (guided from repository dashboard):
   - Installs Slice Machine, `@prismicio/react`, `@prismicio/client`.
   - Sets up preview/exit-preview endpoints (`/api/preview`, `/api/exit-preview`).
   - Sets up revalidation endpoint (`/api/revalidate`).
   - Creates slice simulator page (`/slice-simulator`).
   - Generates `prismicio.ts` client and `slicemachine.config.json`.

3. **Model Content**  
   Use Slice Machine to create page types (e.g., homepage, general pages) with slices.

4. **Enable Previews**  
   Minor manual configuration required (detailed below).

5. **Deploy**  
   Host site (e.g., Vercel/Netlify) and set up webhooks for content updates.

6. **Publish Content**  
   Writers can now create/publish in Prismic.

## Key Concepts

### Routes and Route Resolvers

Define routes in `prismicio.ts` to resolve internal links:

```typescript
const routes: Route[] = [
  { type: "homepage", path: "/" },
  { type: "page", path: "/:uid" },
  { type: "blog_post", path: "/blog/:uid" },
];
```

Matches Next.js file-system routing (App: `app/[uid]/page.tsx`; Pages: `pages/[uid].tsx`).

### Slices

Reusable page sections modeled in Slice Machine.

- Generates React components in `src/slices/`.
- Render with `<SliceZone slices={page.data.slices} components={components} />`.

Example Slice Component:

```tsx
export default function CallToAction({ slice }) {
  return (
    <section>
      <PrismicRichText field={slice.primary.text} />
      <PrismicNextLink field={slice.primary.link} />
    </section>
  );
}
```

### Prismic Client Setup (`prismicio.ts`)

**App Router** (recommended):

```typescript
export function createClient(config = {}) {
  const client = baseCreateClient(repositoryName, {
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
```

**Pages Router**:
Passes `previewData` and `req` for previews.

### Fetching Content

**App Router** (Server Components):

```tsx
export default async function Page({ params }) {
  const client = createClient();
  const page = await client.getByUID("page", params.uid);
  return <SliceZone slices={page.data.slices} components={components} />;
}
```

**Pages Router** (getStaticProps):
Similar, but props passed to component.

Avoid fetching in slices with Pages Router; use context or relationships.

### Displaying Content (`@prismicio/react` & `@prismicio/next`)

- `<PrismicRichText field={...} />` — Rich text.
- `<PrismicText field={...} />` — Key text/title.
- `<PrismicNextLink field={...} />` — Internal/external links.
- `<PrismicNextImage field={...} />` — Optimized images.

### Security

Set API to "Private" and use access token via `PRISMIC_ACCESS_TOKEN` env var.

## Previews

### Live Previews (Slice Simulator)

- Page at `/slice-simulator`.
- Configure simulator URL in Prismic Page Builder.

### Draft Previews

- App Router: Wrap root layout with `<PrismicPreview>`, use Draft Mode.
- Pages Router: Wrap `_app.tsx` with `<PrismicPreview>`, use Preview Mode.
- Endpoints: `/api/preview` (enter), `/api/exit-preview` (exit).
- Configure preview site in Prismic repo settings.

## Deployment & Content Updates

**App Router**:

- `/api/revalidate` handler revalidates `prismic` tag.
- Add Prismic webhook to trigger on publish/unpublish.

**Pages Router**:

- Webhook triggers full rebuild.

## SEO

Add meta fields (title, description, image) to custom types.  
Generate metadata in pages (App: `generateMetadata`; Pages: `<Head>`).

## Internationalization (i18n)

- Install `negotiator` and `@formatjs/intl-localematcher`.
- Define locales mapping.
- **App Router**: Middleware for locale redirects, nest routes under `[lang]`.
- **Pages Router**: `next.config.js` i18n config.
- Query with `lang` param; use `lang: "*"` for all locales in static generation.

## Additional Resources in Docs

- Content Modeling: https://prismic.io/docs/technologies/model-content-nextjs
- Slices: Various guides on creating/displaying.
- Technical References: `@prismicio/next`, `@prismicio/react`, `@prismicio/client`.
- Crash Course: https://prismic.io/docs/nextjs-crash-course

This integration emphasizes developer experience (TypeScript, Slice Machine) and editor experience (previews, slices). For production, always secure the API and configure caching/revalidation properly.

### MCP Workflow Priority

1. **First**: Check if MCP tool exists for the task
2. **Second**: Use MCP tool to get current context/documentation
3. **Third**: Apply MCP-provided information to local codebase
4. **Last**: Fall back to local examination if MCP unavailable

### Specific MCP Use Cases

- **Prismic Slices**: Use `prismic_how_to_model_slice`, `prismic_how_to_mock_slice`, `prismic_how_to_code_slice`, `prismic_save_slice_data`
- **Code Research**: Use `codesearch` for library documentation and examples
- **Web Information**: Use `websearch` for current trends and solutions
- **Library Documentation**: Use `context7_resolve-library-id` and `context7_query-docs` for detailed API references
