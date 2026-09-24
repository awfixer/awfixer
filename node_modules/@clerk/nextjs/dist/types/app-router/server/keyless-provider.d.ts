import type { Without } from '@clerk/shared/types';
import type { PropsWithChildren } from 'react';
import React from 'react';
import type { NextClerkProviderProps } from '../../types';
export declare function getKeylessStatus(params: Without<NextClerkProviderProps, '__internal_invokeMiddlewareOnAuthStateChange' | 'children'>): Promise<{
    shouldRunAsKeyless: boolean;
    runningWithClaimedKeys: boolean;
}>;
type KeylessProviderProps = PropsWithChildren<{
    rest: Without<NextClerkProviderProps, '__internal_invokeMiddlewareOnAuthStateChange' | 'children'>;
    runningWithClaimedKeys: boolean;
    __internal_scriptsSlot?: React.ReactNode;
}>;
export declare const KeylessProvider: (props: KeylessProviderProps) => Promise<React.JSX.Element>;
export {};
//# sourceMappingURL=keyless-provider.d.ts.map