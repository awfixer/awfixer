import "../../chunk-BUSYA2B4.js";
import { useCallback, useEffect, useTransition } from "react";
import { removeBasePath } from "../../utils/removeBasePath";
const getClerkNavigationObject = (name) => {
  var _a, _b, _c;
  (_a = window.__clerk_internal_navigations) != null ? _a : window.__clerk_internal_navigations = {};
  (_c = (_b = window.__clerk_internal_navigations)[name]) != null ? _c : _b[name] = {};
  return window.__clerk_internal_navigations[name];
};
const useInternalNavFun = (props) => {
  const { windowNav, routerNav, name } = props;
  const [isPending, startTransition] = useTransition();
  if (windowNav) {
    getClerkNavigationObject(name).fun = (to, opts) => {
      var _a, _b;
      const nav = getClerkNavigationObject(name);
      if (((_b = (_a = nav.promisesBuffer) == null ? void 0 : _a.length) != null ? _b : 0) > 0 && nav.pendingDestination === to) {
        return new Promise((res) => {
          var _a2;
          (_a2 = nav.promisesBuffer) != null ? _a2 : nav.promisesBuffer = [];
          nav.promisesBuffer.push(res);
        });
      }
      nav.pendingDestination = to;
      return new Promise((res) => {
        var _a2;
        (_a2 = nav.promisesBuffer) != null ? _a2 : nav.promisesBuffer = [];
        nav.promisesBuffer.push(res);
        startTransition(() => {
          var _a3;
          if (((_a3 = opts == null ? void 0 : opts.__internal_metadata) == null ? void 0 : _a3.navigationType) === "internal") {
            windowNav(null, "", to);
          } else {
            routerNav(removeBasePath(to));
          }
        });
      });
    };
  }
  const flushPromises = () => {
    var _a;
    const nav = getClerkNavigationObject(name);
    (_a = nav.promisesBuffer) == null ? void 0 : _a.forEach((resolve) => resolve());
    nav.promisesBuffer = [];
    nav.pendingDestination = void 0;
  };
  useEffect(() => {
    flushPromises();
    return flushPromises;
  }, []);
  useEffect(() => {
    if (!isPending) {
      flushPromises();
    }
  }, [isPending]);
  return useCallback((to, metadata) => {
    return getClerkNavigationObject(name).fun(to, metadata);
  }, []);
};
export {
  useInternalNavFun
};
//# sourceMappingURL=useInternalNavFun.js.map