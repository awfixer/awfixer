import "../../chunk-BUSYA2B4.js";
import { headers } from "next/headers";
import React from "react";
import { ClerkScriptTags } from "../../utils/clerk-script-tags";
import { getScriptNonceFromHeader, isPrerenderingBailout } from "./utils";
async function getNonce() {
  try {
    const headersList = await headers();
    const nonce = headersList.get("X-Nonce");
    return nonce ? nonce : (
      // Fallback to extracting from CSP header
      getScriptNonceFromHeader(headersList.get("Content-Security-Policy") || "") || ""
    );
  } catch (e) {
    if (isPrerenderingBailout(e)) {
      throw e;
    }
    return "";
  }
}
async function DynamicClerkScripts(props) {
  const {
    publishableKey,
    __internal_clerkJSUrl,
    __internal_clerkJSVersion,
    __internal_clerkUIUrl,
    __internal_clerkUIVersion,
    domain,
    proxyUrl,
    prefetchUI
  } = props;
  if (!publishableKey) {
    return null;
  }
  const nonce = await getNonce();
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
  DynamicClerkScripts
};
//# sourceMappingURL=DynamicClerkScripts.js.map