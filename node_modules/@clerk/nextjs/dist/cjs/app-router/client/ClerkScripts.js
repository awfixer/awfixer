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
var ClerkScripts_exports = {};
__export(ClerkScripts_exports, {
  ClerkScripts: () => ClerkScripts
});
module.exports = __toCommonJS(ClerkScripts_exports);
var import_react = require("@clerk/react");
var import_react2 = __toESM(require("react"));
var import_NextOptionsContext = require("../../client-boundary/NextOptionsContext");
var import_clerk_script_tags = require("../../utils/clerk-script-tags");
function ClerkScripts() {
  const {
    publishableKey,
    __internal_clerkJSUrl,
    __internal_clerkJSVersion,
    __internal_clerkUIUrl,
    __internal_clerkUIVersion,
    nonce,
    prefetchUI
  } = (0, import_NextOptionsContext.useClerkNextOptions)();
  const { domain, proxyUrl } = (0, import_react.useClerk)();
  if (!publishableKey) {
    return null;
  }
  return /* @__PURE__ */ import_react2.default.createElement(
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
  ClerkScripts
});
//# sourceMappingURL=ClerkScripts.js.map