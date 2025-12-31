# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this Next.js + Prismic repository.

## Build, Lint, and Test Commands

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

1. Start development with `pnpm dev` to run both Next.js and Slice Machine
2. Create slices using Slice Machine UI at http://localhost:3000/slice-simulator
3. Implement slice components in `src/slices/`
4. Test changes in the Slice Simulator
5. Run `pnpm lint` and `pnpm format` before committing

## File Generation Rules

- Slice Machine generates `src/slices/index.ts` - DO NOT EDIT
- Prismic generates types in `prismicio-types.d.ts` - DO NOT EDIT
- Custom types are managed through Slice Machine UI
- Always run `pnpm format` after code generation