import type { Ui } from '@clerk/react/internal';
import type { Without } from '@clerk/shared/types';
import React from 'react';
import type { NextClerkProviderProps } from '../../types';
export declare function ClerkProvider<TUi extends Ui = Ui>(props: Without<NextClerkProviderProps<TUi>, '__internal_invokeMiddlewareOnAuthStateChange'>): Promise<React.JSX.Element>;
//# sourceMappingURL=ClerkProvider.d.ts.map