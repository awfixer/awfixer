import "../chunk-BUSYA2B4.js";
import nextPkg from "next/package.json";
function meetsNextMinimumVersion(minimumMajorVersion) {
  var _a;
  if (!((_a = nextPkg) == null ? void 0 : _a.version)) {
    return false;
  }
  const majorVersion = parseInt(nextPkg.version.split(".")[0], 10);
  return !isNaN(majorVersion) && majorVersion >= minimumMajorVersion;
}
const isNext16OrHigher = meetsNextMinimumVersion(16);
const middlewareFileReference = isNext16OrHigher ? "middleware or proxy" : "middleware";
export {
  isNext16OrHigher,
  middlewareFileReference
};
//# sourceMappingURL=sdk-versions.js.map