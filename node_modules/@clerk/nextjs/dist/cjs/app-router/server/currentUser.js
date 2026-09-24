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
var currentUser_exports = {};
__export(currentUser_exports, {
  currentUser: () => currentUser
});
module.exports = __toCommonJS(currentUser_exports);
var import_clerkClient = require("../../server/clerkClient");
var import_auth = require("./auth");
var import_utils = require("./utils");
async function currentUser(opts) {
  require("server-only");
  try {
    const { userId } = await (0, import_auth.auth)({ treatPendingAsSignedOut: opts == null ? void 0 : opts.treatPendingAsSignedOut });
    if (!userId) {
      return null;
    }
    return (await (0, import_clerkClient.clerkClient)()).users.getUser(userId);
  } catch (e) {
    if ((0, import_utils.isClerkUseCacheError)(e)) {
      throw e;
    }
    if ((0, import_utils.isNextjsUseCacheError)(e)) {
      throw new import_utils.ClerkUseCacheError(`${import_utils.USE_CACHE_ERROR_MESSAGE}

Original error: ${e.message}`, e);
    }
    throw e;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  currentUser
});
//# sourceMappingURL=currentUser.js.map