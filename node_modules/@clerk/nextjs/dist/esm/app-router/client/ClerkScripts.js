import "../../chunk-BUSYA2B4.js";
import { useClerk } from "@clerk/react";
import React from "react";
import { useClerkNextOptions } from "../../client-boundary/NextOptionsContext";
import { ClerkScriptTags } from "../../utils/clerk-script-tags";
function ClerkScripts() {
  const {
    publishableKey,
    __internal_clerkJSUrl,
    __internal_clerkJSVersion,
    __internal_clerkUIUrl,
    __internal_clerkUIVersion,
    nonce,
    prefetchUI
  } = useClerkNextOptions();
  const { domain, proxyUrl } = useClerk();
  if (!publishableKey) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(
    ClerkScriptTags,
    {
      publishableKey,
      __internal_clerkJSUrl,
      __internal_clerkJSVersion,
      __internal_clerkUIUrl,
      __internal_clerkUIVersion,
      nonce,
      domain,
      proxyUrl,
      prefetchUI
    }
  );
}
export {
  ClerkScripts
};
//# sourceMappingURL=ClerkScripts.js.map