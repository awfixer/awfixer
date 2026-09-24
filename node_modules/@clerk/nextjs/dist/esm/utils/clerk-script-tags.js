import "../chunk-BUSYA2B4.js";
import { buildClerkJSScriptAttributes, clerkJSScriptUrl, clerkUIScriptUrl } from "@clerk/shared/loadClerkJsScript";
import React from "react";
function ClerkScriptTags(props) {
  const {
    publishableKey,
    __internal_clerkJSUrl,
    __internal_clerkJSVersion,
    __internal_clerkUIUrl,
    __internal_clerkUIVersion,
    nonce,
    domain,
    proxyUrl,
    prefetchUI
  } = props;
  const opts = {
    publishableKey,
    __internal_clerkJSUrl,
    __internal_clerkJSVersion,
    __internal_clerkUIUrl,
    __internal_clerkUIVersion,
    nonce,
    domain,
    proxyUrl
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    "script",
    {
      src: clerkJSScriptUrl(opts),
      "data-clerk-js-script": true,
      async: true,
      crossOrigin: "anonymous",
      ...buildClerkJSScriptAttributes(opts)
    }
  ), prefetchUI !== false && /* @__PURE__ */ React.createElement(
    "link",
    {
      rel: "preload",
      href: clerkUIScriptUrl(opts),
      as: "script",
      crossOrigin: "anonymous",
      nonce
    }
  ));
}
export {
  ClerkScriptTags
};
//# sourceMappingURL=clerk-script-tags.js.map