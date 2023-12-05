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
exports.GetSatelliteHandler = void 0;
const types_1 = require("../types");
const handlers_1 = require("./handlers");
const inversify_1 = require("inversify");
const sector_service_1 = require("../services/sector.service");
let GetSatelliteHandler = class GetSatelliteHandler extends handlers_1.IRoute {
    handle(message, uSocket) {
        return __awaiter(this, void 0, void 0, function* () {
            const zoneId = message.payload.zoneId;
            const position = message.payload.position;
            console.log('GetSatelliteHandler zoneId', zoneId);
            const _sectors = yield this._sectorService.getBoundsCitadel(position);
            const array_sectors = Object.values(this.unmarshalSectors(zoneId, _sectors));
            uSocket.send(JSON.stringify({
                event: 'sectors',
                payload: array_sectors
            }));
        });
    }
    unmarshalSectors(zoneId, _sectors) {
        const sectors = _sectors.reduce((zoneItems, item) => {
            const zId = zoneId === item.zone_id ? zoneId : -1;
            if (!zoneItems[zId]) {
                zoneItems[zId] = {};
                zoneItems[zId]['zone'] = {
                    zone_id: zId,
                    name: '',
                    color: 1
                };
                zoneItems[zId]['sectors'] = [];
            }
            zoneItems[zId]['sectors'].push(item.id);
            return zoneItems;
        }, {});
        return sectors;
    }
};
GetSatelliteHandler.EVENT = "getSatellite";
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.SectorService),
    __metadata("design:type", sector_service_1.SectorService)
], GetSatelliteHandler.prototype, "_sectorService", void 0);
GetSatelliteHandler = __decorate([
    (0, inversify_1.injectable)()
], GetSatelliteHandler);
exports.GetSatelliteHandler = GetSatelliteHandler;
