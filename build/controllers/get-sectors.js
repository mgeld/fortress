"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSectorsHandler = void 0;
const handlers_1 = require("./handlers");
const inversify_1 = require("inversify");
const types_1 = require("../types");
const sector_service_1 = require("../services/sector.service");
const areal_1 = require("../entities/pointer/areal");
let GetSectorsHandler = class GetSectorsHandler extends handlers_1.IRoute {
    handle(message, uSocket) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const __position = (_a = message.payload) === null || _a === void 0 ? void 0 : _a.position;
            if (!__position)
                return;
            const areal = areal_1.Areal.generator(__position);
            const _sectors = yield this._sectorService.getZonesAroundAreal(areal);
            const array_sectors = Object.values(_sectors);
            uSocket.send(JSON.stringify({
                event: 'add-sectors',
                payload: array_sectors
            }));
        });
    }
};
GetSectorsHandler.EVENT = "getSectors";
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.SectorService),
    __metadata("design:type", sector_service_1.SectorService)
], GetSectorsHandler.prototype, "_sectorService", void 0);
GetSectorsHandler = __decorate([
    (0, inversify_1.injectable)()
], GetSectorsHandler);
exports.GetSectorsHandler = GetSectorsHandler;
