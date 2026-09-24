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
var clerk_script_tags_exports = {};
__export(clerk_script_tags_exports, {
  ClerkScriptTags: () => ClerkScriptTags
});
module.exports = __toCommonJS(clerk_script_tags_exports);
var import_loadClerkJsScript = require("@clerk/shared/loadClerkJsScript");
var import_react = __toESM(require("react"));
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
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(
    "script",
    {
      src: (0, import_loadClerkJsScript.clerkJSScriptUrl)(opts),
      "data-clerk-js-script": true,
      async: true,
      crossOrigin: "anonymous",
      ...(0, import_loadClerkJsScript.buildClerkJSScriptAttributes)(opts)
    }
  ), prefetchUI !== false && /* @__PURE__ */ import_react.default.createElement(
    "link",
    {
      rel: "preload",
      href: (0, import_loadClerkJsScript.clerkUIScriptUrl)(opts),
      as: "script",
      crossOrigin: "anonymous",
      nonce
    }
  ));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ClerkScriptTags
});
//# sourceMappingURL=clerk-script-tags.js.map