import { type Ui } from '@clerk/react/internal';
import React from 'react';
import type { NextClerkProviderProps } from '../../types';
export declare const ClientClerkProvider: <TUi extends Ui = Ui>(props: NextClerkProviderProps<TUi> & {
    disableKeyless?: boolean;
}) => string | number | bigint | boolean | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | React.JSX.Element | null | undefined;
//# sourceMappingURL=ClerkProvider.d.ts.map