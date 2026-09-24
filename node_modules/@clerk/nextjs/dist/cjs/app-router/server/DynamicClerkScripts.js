"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var DynamicClerkScripts_exports = {};
__export(DynamicClerkScripts_exports, {
  DynamicClerkScripts: () => DynamicClerkScripts
});
module.exports = __toCommonJS(DynamicClerkScripts_exports);
var import_headers = require("next/headers");
var import_react = __toESM(require("react"));
var import_clerk_script_tags = require("../../utils/clerk-script-tags");
var import_utils = require("./utils");
async function getNonce() {
  try {
    const headersList = await (0, import_headers.headers)();
    const nonce = headersList.get("X-Nonce");
    return nonce ? nonce : (
      // Fallback to extracting from CSP header
      (0, import_utils.getScriptNonceFromHeader)(headersList.get("Content-Security-Policy") || "") || ""
    );
  } catch (e) {
    if ((0, import_utils.isPrerenderingBailout)(e)) {
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
  return /* @__PURE__ */ import_react.default.createElement(
    import_clerk_script_tags.ClerkScriptTags,
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DynamicClerkScripts
});
//# sourceMappingURL=DynamicClerkScripts.js.map