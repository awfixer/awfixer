import "../chunk-BUSYA2B4.js";
import { useClerk } from "@clerk/react";
import { buildClerkJSScriptAttributes, clerkJSScriptUrl, clerkUIScriptUrl } from "@clerk/react/internal";
import NextScript from "next/script";
import React from "react";
import { useClerkNextOptions } from "../client-boundary/NextOptionsContext";
function ClerkScript(props) {
  const { scriptUrl, attributes, dataAttribute } = props;
  return /* @__PURE__ */ React.createElement(
    NextScript,
    {
      src: scriptUrl,
      ...{ [dataAttribute]: true },
      async: true,
      defer: false,
      crossOrigin: "anonymous",
      strategy: "beforeInteractive",
      ...attributes
    }
  );
}
function ClerkScripts() {
  const {
    publishableKey,
    __internal_clerkJSUrl,
    __internal_clerkJSVersion,
    __internal_clerkUIUrl,
    __internal_clerkUIVersion,
    nonce,
    prefetchUI,
    ui
  } = useClerkNextOptions();
  const { domain, proxyUrl } = useClerk();
  if (!publishableKey) {
    return null;
  }
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
    ClerkScript,
    {
      scriptUrl: clerkJSScriptUrl(opts),
      attributes: buildClerkJSScriptAttributes(opts),
      dataAttribute: "data-clerk-js-script"
    }
  ), prefetchUI !== false && !ui && /* @__PURE__ */ React.createElement(
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
  ClerkScripts
};
//# sourceMappingURL=ClerkScripts.js.map