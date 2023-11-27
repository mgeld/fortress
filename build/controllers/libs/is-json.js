"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsJsonString = void 0;
function IsJsonString(str) {
    try {
        return JSON.parse(str);
    }
    catch (e) {
        return false;
    }
}
exports.IsJsonString = IsJsonString;
