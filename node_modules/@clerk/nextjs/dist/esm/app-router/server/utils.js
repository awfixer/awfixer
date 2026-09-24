import "../../chunk-BUSYA2B4.js";
var _a, _b;
import { NextRequest } from "next/server";
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
    return new NextRequest("https://placeholder.com", { headers: resolvedHeaders });
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
export {
  ClerkUseCacheError,
  USE_CACHE_ERROR_MESSAGE,
  buildRequestLike,
  getScriptNonceFromHeader,
  isClerkUseCacheError,
  isNextjsUseCacheError,
  isPrerenderingBailout
};
//# sourceMappingURL=utils.js.map