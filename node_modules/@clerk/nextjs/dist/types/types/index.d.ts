/**
 * Re-exports all types from @clerk/shared/types along with Next.js-specific types.
 * This allows consumers to import types from @clerk/nextjs/types instead of
 * installing @clerk/types separately.
 */
export type * from '@clerk/shared/types';
export type { NextClerkProviderProps } from '../types';
export type { ClerkMiddlewareAuth, ClerkMiddlewareOptions, ClerkMiddlewareSessionAuthObject, } from '../server/clerkMiddleware';
//# sourceMappingURL=index.d.ts.map