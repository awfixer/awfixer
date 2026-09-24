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
var sdk_versions_exports = {};
__export(sdk_versions_exports, {
  isNext16OrHigher: () => isNext16OrHigher,
  middlewareFileReference: () => middlewareFileReference
});
module.exports = __toCommonJS(sdk_versions_exports);
var import_package = __toESM(require("next/package.json"));
function meetsNextMinimumVersion(minimumMajorVersion) {
  var _a;
  if (!((_a = import_package.default) == null ? void 0 : _a.version)) {
    return false;
  }
  const majorVersion = parseInt(import_package.default.version.split(".")[0], 10);
  return !isNaN(majorVersion) && majorVersion >= minimumMajorVersion;
}
const isNext16OrHigher = meetsNextMinimumVersion(16);
const middlewareFileReference = isNext16OrHigher ? "middleware or proxy" : "middleware";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isNext16OrHigher,
  middlewareFileReference
});
//# sourceMappingURL=sdk-versions.js.map