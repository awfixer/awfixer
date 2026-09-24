import type { PendingSessionOptions, ShowWhenCondition } from '@clerk/shared/types';
import React from 'react';
export type AppRouterShowProps = React.PropsWithChildren<PendingSessionOptions & {
    fallback?: React.ReactNode;
    when: ShowWhenCondition;
}>;
/**
 * Use `<Show/>` to render children when an authorization or sign-in condition passes.
 * When `treatPendingAsSignedOut` is true, pending sessions are treated as signed out.
 * Renders the provided `fallback` (or `null`) when the condition fails.
 *
 * The `when` prop supports:
 * - `"signed-in"` or `"signed-out"` shorthands
 * - Authorization objects such as `{ permission: "..." }`, `{ role: "..." }`, `{ feature: "..." }`, or `{ plan: "..." }`
 * - Predicate functions `(has) => boolean` that receive the `has` helper
 *
 * @example
 * ```tsx
 * <Show when={{ permission: "org:billing:manage" }} fallback={<p>Unauthorized</p>}>
 *   <BillingSettings />
 * </Show>
 *
 * <Show when={{ role: "admin" }}>
 *   <AdminPanel />
 * </Show>
 *
 * <Show when={(has) => has({ permission: "org:read" }) && isFeatureEnabled}>
 *   <ProtectedFeature />
 * </Show>
 *
 * <Show when="signed-in">
 *   <Dashboard />
 * </Show>
 * ```
 */
export declare function Show(props: AppRouterShowProps): Promise<React.JSX.Element | null>;
//# sourceMappingURL=controlComponents.d.ts.map