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
var utils_exports = {};
__export(utils_exports, {
  ClerkUseCacheError: () => ClerkUseCacheError,
  USE_CACHE_ERROR_MESSAGE: () => USE_CACHE_ERROR_MESSAGE,
  buildRequestLike: () => buildRequestLike,
  getScriptNonceFromHeader: () => getScriptNonceFromHeader,
  isClerkUseCacheError: () => isClerkUseCacheError,
  isNextjsUseCacheError: () => isNextjsUseCacheError,
  isPrerenderingBailout: () => isPrerenderingBailout
});
module.exports = __toCommonJS(utils_exports);
var import_server = require("next/server");
var _a, _b;
const CLERK_USE_CACHE_MARKER = /* @__PURE__ */ Symbol.for("clerk_use_cache_error");
class ClerkUseCacheError extends (_b = Error, _a = CLERK_USE_CACHE_MARKER, _b) {
  constructor(message, originalError) {
    super(message);
    this.originalError = originalError;
    this[_a] = true;
    this.name = "ClerkUseCacheError";
  }
}
const isClerkUseCacheError = (e) => {
  return e instanceof Error && CLERK_USE_CACHE_MARKER in e;
};
const USE_CACHE_WITH_DYNAMIC_API_PATTERN = /inside\s+["']use cache["']|["']use cache["'].*(?:headers|cookies)|(?:headers|cookies).*["']use cache["']/i;
const CACHE_SCOPE_PATTERN = /cache scope/i;
const DYNAMIC_DATA_SOURCE_PATTERN = /dynamic data source/i;
const ROUTE_BAILOUT_PATTERN = /Route .*? needs to bail out of prerendering at this point because it used .*?./;
const isPrerenderingBailout = (e) => {
  if (!(e instanceof Error) || !("message" in e)) {
    return false;
  }
  const { message } = e;
  const lowerCaseInput = message.toLowerCase();
  return ROUTE_BAILOUT_PATTERN.test(message) || lowerCaseInput.includes("dynamic server usage") || lowerCaseInput.includes("this page needs to bail out of prerendering") || lowerCaseInput.includes("during prerendering");
};
const isNextjsUseCacheError = (e) => {
  if (!(e instanceof Error)) {
    return false;
  }
  const { message } = e;
  if (USE_CACHE_WITH_DYNAMIC_API_PATTERN.test(message)) {
    return true;
  }
  if (CACHE_SCOPE_PATTERN.test(message) && DYNAMIC_DATA_SOURCE_PATTERN.test(message)) {
    return true;
  }
  return false;
};
const USE_CACHE_ERROR_MESSAGE = `Clerk: auth() and currentUser() cannot be called inside a "use cache" function. These functions access \`headers()\` internally, which is a dynamic API not allowed in cached contexts.

To fix this, call auth() outside the cached function and pass the values you need as arguments:

  import { auth, clerkClient } from '@clerk/nextjs/server';

  async function getCachedUser(userId: string) {
    "use cache";
    const client = await clerkClient();
    return client.users.getUser(userId);
  }

  // In your component/page:
  const { userId } = await auth();
  if (userId) {
    const user = await getCachedUser(userId);
  }`;
async function buildRequestLike() {
  try {
    const { headers } = await import("next/headers");
    const resolvedHeaders = await headers();
    return new import_server.NextRequest("https://placeholder.com", { headers: resolvedHeaders });
  } catch (e) {
    if (e && isPrerenderingBailout(e)) {
      throw e;
    }
    if (e && isNextjsUseCacheError(e)) {
      throw new ClerkUseCacheError(`${USE_CACHE_ERROR_MESSAGE}

Original error: ${e.message}`, e);
    }
    throw new Error(
      `Clerk: auth(), currentUser() and clerkClient(), are only supported in App Router (/app directory).
If you're using /pages, try getAuth() instead.
Original error: ${e}`
    );
  }
}
function getScriptNonceFromHeader(cspHeaderValue) {
  var _a2;
  const directives = cspHeaderValue.split(";").map((directive2) => directive2.trim());
  const directive = directives.find((dir) => dir.startsWith("script-src")) || directives.find((dir) => dir.startsWith("default-src"));
  if (!directive) {
    return;
  }
  const nonce = (_a2 = directive.split(" ").slice(1).map((source) => source.trim()).find((source) => source.startsWith("'nonce-") && source.length > 8 && source.endsWith("'"))) == null ? void 0 : _a2.slice(7, -1);
  if (!nonce) {
    return;
  }
  if (/[&><\u2028\u2029]/g.test(nonce)) {
    throw new Error(
      "Nonce value from Content-Security-Policy contained invalid HTML escape characters, which is disallowed for security reasons. Make sure that your nonce value does not contain the following characters: `<`, `>`, `&`"
    );
  }
  return nonce;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ClerkUseCacheError,
  USE_CACHE_ERROR_MESSAGE,
  buildRequestLike,
  getScriptNonceFromHeader,
  isClerkUseCacheError,
  isNextjsUseCacheError,
  isPrerenderingBailout
});
//# sourceMappingURL=utils.js.map