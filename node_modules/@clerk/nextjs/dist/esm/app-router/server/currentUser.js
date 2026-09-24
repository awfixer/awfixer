import "../../chunk-BUSYA2B4.js";
import { clerkClient } from "../../server/clerkClient";
import { auth } from "./auth";
import { ClerkUseCacheError, isClerkUseCacheError, isNextjsUseCacheError, USE_CACHE_ERROR_MESSAGE } from "./utils";
async function currentUser(opts) {
  require("server-only");
  try {
    const { userId } = await auth({ treatPendingAsSignedOut: opts == null ? void 0 : opts.treatPendingAsSignedOut });
    if (!userId) {
      return null;
    }
    return (await clerkClient()).users.getUser(userId);
  } catch (e) {
    if (isClerkUseCacheError(e)) {
      throw e;
    }
    if (isNextjsUseCacheError(e)) {
      throw new ClerkUseCacheError(`${USE_CACHE_ERROR_MESSAGE}

Original error: ${e.message}`, e);
    }
    throw e;
  }
}
export {
  currentUser
};
//# sourceMappingURL=currentUser.js.map