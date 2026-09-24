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
var useInternalNavFun_exports = {};
__export(useInternalNavFun_exports, {
  useInternalNavFun: () => useInternalNavFun
});
module.exports = __toCommonJS(useInternalNavFun_exports);
var import_react = require("react");
var import_removeBasePath = require("../../utils/removeBasePath");
const getClerkNavigationObject = (name) => {
  var _a, _b, _c;
  (_a = window.__clerk_internal_navigations) != null ? _a : window.__clerk_internal_navigations = {};
  (_c = (_b = window.__clerk_internal_navigations)[name]) != null ? _c : _b[name] = {};
  return window.__clerk_internal_navigations[name];
};
const useInternalNavFun = (props) => {
  const { windowNav, routerNav, name } = props;
  const [isPending, startTransition] = (0, import_react.useTransition)();
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
            routerNav((0, import_removeBasePath.removeBasePath)(to));
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
  (0, import_react.useEffect)(() => {
    flushPromises();
    return flushPromises;
  }, []);
  (0, import_react.useEffect)(() => {
    if (!isPending) {
      flushPromises();
    }
  }, [isPending]);
  return (0, import_react.useCallback)((to, metadata) => {
    return getClerkNavigationObject(name).fun(to, metadata);
  }, []);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useInternalNavFun
});
//# sourceMappingURL=useInternalNavFun.js.map