import { NextRequest } from 'next/server';
declare const CLERK_USE_CACHE_MARKER: unique symbol;
/**
 * Custom error class for "use cache" errors with a symbol marker to prevent double-wrapping.
 */
export declare class ClerkUseCacheError extends Error {
    readonly originalError?: Error | undefined;
    readonly [CLERK_USE_CACHE_MARKER] = true;
    constructor(message: string, originalError?: Error | undefined);
}
export declare const isClerkUseCacheError: (e: unknown) => e is ClerkUseCacheError;
export declare const isPrerenderingBailout: (e: unknown) => boolean;
/**
 * Detects Next.js errors from using dynamic APIs (headers/cookies) inside "use cache".
 */
export declare const isNextjsUseCacheError: (e: unknown) => boolean;
export declare const USE_CACHE_ERROR_MESSAGE: string;
export declare function buildRequestLike(): Promise<NextRequest>;
export declare function getScriptNonceFromHeader(cspHeaderValue: string): string | undefined;
export {};
//# sourceMappingURL=utils.d.ts.map