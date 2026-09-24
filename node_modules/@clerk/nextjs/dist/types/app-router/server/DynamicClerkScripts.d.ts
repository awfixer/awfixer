import React from 'react';
type DynamicClerkScriptsProps = {
    publishableKey: string;
    __internal_clerkJSUrl?: string;
    __internal_clerkJSVersion?: string;
    __internal_clerkUIUrl?: string;
    __internal_clerkUIVersion?: string;
    domain?: string;
    proxyUrl?: string;
    prefetchUI?: boolean;
};
/**
 * Server component that fetches nonce from headers and renders Clerk scripts.
 * This component should be wrapped in a Suspense boundary to isolate the dynamic
 * nonce fetching from the rest of the page, allowing static rendering/PPR to work.
 */
export declare function DynamicClerkScripts(props: DynamicClerkScriptsProps): Promise<React.JSX.Element | null>;
export {};
//# sourceMappingURL=DynamicClerkScripts.d.ts.map