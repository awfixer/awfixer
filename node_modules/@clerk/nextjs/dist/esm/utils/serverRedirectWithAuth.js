import "../chunk-BUSYA2B4.js";
import { constants } from "@clerk/backend/internal";
import { DEV_BROWSER_KEY, setDevBrowserInURL } from "@clerk/shared/devBrowser";
import { isDevelopmentFromSecretKey } from "@clerk/shared/keys";
import { NextResponse } from "next/server";
const serverRedirectWithAuth = (clerkRequest, res, opts) => {
  const location = res.headers.get("location");
  const shouldAppendDevBrowser = res.headers.get(constants.Headers.ClerkRedirectTo) === "true";
  if (shouldAppendDevBrowser && !!location && isDevelopmentFromSecretKey(opts.secretKey) && clerkRequest.clerkUrl.isCrossOrigin(location)) {
    const devBrowser = clerkRequest.cookies.get(DEV_BROWSER_KEY) || "";
    const url = new URL(location);
    const urlWithDevBrowser = setDevBrowserInURL(url, devBrowser);
    return NextResponse.redirect(urlWithDevBrowser.href, res);
  }
  return res;
};
export {
  serverRedirectWithAuth
};
//# sourceMappingURL=serverRedirectWithAuth.js.map