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
var import_internal = require("@clerk/react/internal");
var import_script = __toESM(require("next/script"));
var import_react2 = __toESM(require("react"));
var import_NextOptionsContext = require("../client-boundary/NextOptionsContext");
function ClerkScript(props) {
  const { scriptUrl, attributes, dataAttribute } = props;
  return /* @__PURE__ */ import_react2.default.createElement(
    import_script.default,
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
  } = (0, import_NextOptionsContext.useClerkNextOptions)();
  const { domain, proxyUrl } = (0, import_react.useClerk)();
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
  return /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null, /* @__PURE__ */ import_react2.default.createElement(
    ClerkScript,
    {
      scriptUrl: (0, import_internal.clerkJSScriptUrl)(opts),
      attributes: (0, import_internal.buildClerkJSScriptAttributes)(opts),
      dataAttribute: "data-clerk-js-script"
    }
  ), prefetchUI !== false && !ui && /* @__PURE__ */ import_react2.default.createElement(
    "link",
    {
      rel: "preload",
      href: (0, import_internal.clerkUIScriptUrl)(opts),
      as: "script",
      crossOrigin: "anonymous",
      nonce
    }
  ));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ClerkScripts
});
//# sourceMappingURL=ClerkScripts.js.map