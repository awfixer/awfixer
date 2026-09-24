import React from 'react';
type ClerkScriptTagsProps = {
    publishableKey: string;
    __internal_clerkJSUrl?: string;
    __internal_clerkJSVersion?: string;
    __internal_clerkUIUrl?: string;
    __internal_clerkUIVersion?: string;
    nonce?: string;
    domain?: string;
    proxyUrl?: string;
    prefetchUI?: boolean;
};
/**
 * Pure component that renders the Clerk script tags.
 * Shared between `ClerkScripts` (client, app router) and `DynamicClerkScripts` (server).
 * No hooks or client-only imports — safe for both server and client components.
 */
export declare function ClerkScriptTags(props: ClerkScriptTagsProps): React.JSX.Element;
export {};
//# sourceMappingURL=clerk-script-tags.d.ts.map