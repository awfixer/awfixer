"use strict";
"use client";
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
var controlComponents_exports = {};
__export(controlComponents_exports, {
  AuthenticateWithRedirectCallback: () => import_react.AuthenticateWithRedirectCallback,
  ClerkDegraded: () => import_react.ClerkDegraded,
  ClerkFailed: () => import_react.ClerkFailed,
  ClerkLoaded: () => import_react.ClerkLoaded,
  ClerkLoading: () => import_react.ClerkLoading,
  MultisessionAppSupport: () => import_internal.MultisessionAppSupport,
  RedirectToCreateOrganization: () => import_react.RedirectToCreateOrganization,
  RedirectToOrganizationProfile: () => import_react.RedirectToOrganizationProfile,
  RedirectToSignIn: () => import_react.RedirectToSignIn,
  RedirectToSignUp: () => import_react.RedirectToSignUp,
  RedirectToTasks: () => import_react.RedirectToTasks,
  RedirectToUserProfile: () => import_react.RedirectToUserProfile,
  Show: () => import_react.Show,
  UNSAFE_PortalProvider: () => import_react.UNSAFE_PortalProvider
});
module.exports = __toCommonJS(controlComponents_exports);
var import_react = require("@clerk/react");
var import_internal = require("@clerk/react/internal");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthenticateWithRedirectCallback,
  ClerkDegraded,
  ClerkFailed,
  ClerkLoaded,
  ClerkLoading,
  MultisessionAppSupport,
  RedirectToCreateOrganization,
  RedirectToOrganizationProfile,
  RedirectToSignIn,
  RedirectToSignUp,
  RedirectToTasks,
  RedirectToUserProfile,
  Show,
  UNSAFE_PortalProvider
});
//# sourceMappingURL=controlComponents.js.map