import "../../chunk-BUSYA2B4.js";
import React from "react";
import { auth } from "./auth";
async function Show(props) {
  const { children, fallback, treatPendingAsSignedOut, when } = props;
  const { has, userId } = await auth({ treatPendingAsSignedOut });
  const resolvedWhen = when;
  const authorized = /* @__PURE__ */ React.createElement(React.Fragment, null, children);
  const unauthorized = fallback ? /* @__PURE__ */ React.createElement(React.Fragment, null, fallback) : null;
  if (typeof resolvedWhen === "string") {
    if (resolvedWhen === "signed-out") {
      return userId ? unauthorized : authorized;
    }
    return userId ? authorized : unauthorized;
  }
  if (!userId) {
    return unauthorized;
  }
  if (typeof resolvedWhen === "function") {
    return resolvedWhen(has) ? authorized : unauthorized;
  }
  return has(resolvedWhen) ? authorized : unauthorized;
}
export {
  Show
};
//# sourceMappingURL=controlComponents.js.map