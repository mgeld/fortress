"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingAPI = exports.stormAPI = exports.projectorAPI = exports.holdAPI = exports.citadelAPI = exports.zoneAPI = exports.mapAPI = exports.sectorsAPI = exports.battleAPI = exports.shipAPI = exports.userAPI = exports.weaponsAPI = exports.takesAPI = exports.bombsAPI = exports.firesAPI = exports.pointersAPI = void 0;
exports.pointersAPI = __importStar(require("./pointers"));
exports.firesAPI = __importStar(require("./fires"));
exports.bombsAPI = __importStar(require("./bombs"));
exports.takesAPI = __importStar(require("./takes"));
exports.weaponsAPI = __importStar(require("./weapons"));
exports.userAPI = __importStar(require("./user"));
exports.shipAPI = __importStar(require("./ship"));
exports.battleAPI = __importStar(require("./battle"));
exports.sectorsAPI = __importStar(require("./sectors"));
exports.mapAPI = __importStar(require("./map"));
exports.zoneAPI = __importStar(require("./zone"));
exports.citadelAPI = __importStar(require("./citadel"));
exports.holdAPI = __importStar(require("./hold"));
exports.projectorAPI = __importStar(require("./projector"));
exports.stormAPI = __importStar(require("./storm"));
exports.ratingAPI = __importStar(require("./rating"));
