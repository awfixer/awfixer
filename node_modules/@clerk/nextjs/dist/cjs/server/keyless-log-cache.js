"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var keyless_log_cache_exports = {};
__export(keyless_log_cache_exports, {
  clerkDevelopmentCache: () => import_keyless.clerkDevelopmentCache,
  createClerkDevCache: () => import_keyless.createClerkDevCache,
  createConfirmationMessage: () => import_keyless.createConfirmationMessage,
  createKeylessModeMessage: () => import_keyless.createKeylessModeMessage
});
module.exports = __toCommonJS(keyless_log_cache_exports);
var import_keyless = require("@clerk/shared/keyless");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  clerkDevelopmentCache,
  createClerkDevCache,
  createConfirmationMessage,
  createKeylessModeMessage
});
//# sourceMappingURL=keyless-log-cache.js.map