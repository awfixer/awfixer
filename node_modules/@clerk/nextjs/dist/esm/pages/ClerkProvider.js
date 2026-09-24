import "../chunk-BUSYA2B4.js";
import {
  InternalClerkProvider as ReactClerkProvider,
  setClerkJSLoadingErrorPackageName,
  setErrorThrowerOptions
} from "@clerk/react/internal";
import { useRouter } from "next/router";
import React from "react";
import { useSafeLayoutEffect } from "../client-boundary/hooks/useSafeLayoutEffect";
import { ClerkNextOptionsProvider } from "../client-boundary/NextOptionsContext";
import { invalidateNextRouterCache } from "../utils/invalidateNextRouterCache";
import { mergeNextClerkPropsWithEnv } from "../utils/mergeNextClerkPropsWithEnv";
import { removeBasePath } from "../utils/removeBasePath";
import { RouterTelemetry } from "../utils/router-telemetry";
import { ClerkScripts } from "./ClerkScripts";
setErrorThrowerOptions({ packageName: "@clerk/nextjs" });
setClerkJSLoadingErrorPackageName("@clerk/nextjs");
function ClerkProvider({ children, ...props }) {
  var _a;
  const { __internal_invokeMiddlewareOnAuthStateChange = true } = props;
  const { push, replace } = useRouter();
  ReactClerkProvider.displayName = "ReactClerkProvider";
  useSafeLayoutEffect(() => {
    window.__internal_onBeforeSetActive = invalidateNextRouterCache;
  }, []);
  useSafeLayoutEffect(() => {
    window.__internal_onAfterSetActive = () => {
      if (__internal_invokeMiddlewareOnAuthStateChange) {
        void push(window.location.href);
      }
    };
  }, []);
  const navigate = (to) => push(removeBasePath(to));
  const replaceNavigate = (to) => replace(removeBasePath(to));
  const mergedProps = mergeNextClerkPropsWithEnv({
    ...props,
    routerPush: navigate,
    routerReplace: replaceNavigate
  });
  const initialState = ((_a = props.authServerSideProps) == null ? void 0 : _a.__clerk_ssr_state) || props.__clerk_ssr_state;
  return /* @__PURE__ */ React.createElement(ClerkNextOptionsProvider, { options: mergedProps }, /* @__PURE__ */ React.createElement(
    ReactClerkProvider,
    {
      ...mergedProps,
      initialState
    },
    /* @__PURE__ */ React.createElement(RouterTelemetry, null),
    /* @__PURE__ */ React.createElement(ClerkScripts, null),
    children
  ));
}
export {
  ClerkProvider
};
//# sourceMappingURL=ClerkProvider.js.map