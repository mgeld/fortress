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
exports.GetSatelliteFortHandler = void 0;
const types_1 = require("../types");
const handlers_1 = require("./handlers");
const inversify_1 = require("inversify");
const sector_service_1 = require("../services/sector.service");
const pointer_service_1 = require("../services/pointer.service");
let GetSatelliteFortHandler = class GetSatelliteFortHandler extends handlers_1.IRoute {
    handle(message, uSocket) {
        return __awaiter(this, void 0, void 0, function* () {
            const position = message.payload.position;
            const _sectors = yield this._sectorService.getBoundsFort(position);
            const array_sectors = Object.values(yield this.fortUnmarshalSectors(_sectors));
            uSocket.send(JSON.stringify({
                event: 'set-sectors',
                payload: array_sectors
            }));
        });
    }
    fortUnmarshalSectors(_sectors) {
        return __awaiter(this, void 0, void 0, function* () {
            const sectors = _sectors.reduce((zoneItems, item) => {
                if (!zoneItems[item.zone_id]) {
                    zoneItems[item.zone_id] = {};
                    zoneItems[item.zone_id]['zone'] = {
                        zone_id: item.zone_id,
                        color: 1
                    };
                    zoneItems[item.zone_id]['sectors'] = { 1: [] };
                }
                zoneItems[item.zone_id]['sectors'][1].push(item.id);
                return zoneItems;
            }, {});
            let zones = {};
            _sectors.forEach(item => {
                zones[item.zone_id] = item.zone_id;
            });
            const _pointers = yield this._pointerService.getZoneByIds(Object.values(zones));
            const array_sectors = Object.values(sectors);
            const __sectors = array_sectors.map(zone => {
                const user = _pointers.find(pointer => pointer.zone_id === zone.zone.zone_id);
                return {
                    zone: Object.assign(Object.assign({}, zone.zone), { color: (user === null || user === void 0 ? void 0 : user.color) || -1 }),
                    sectors: zone.sectors
                };
            });
            return __sectors;
        });
    }
};
GetSatelliteFortHandler.EVENT = "getSatelliteFort";
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.SectorService),
    __metadata("design:type", sector_service_1.SectorService)
], GetSatelliteFortHandler.prototype, "_sectorService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.PointerService),
    __metadata("design:type", pointer_service_1.PointerService)
], GetSatelliteFortHandler.prototype, "_pointerService", void 0);
GetSatelliteFortHandler = __decorate([
    (0, inversify_1.injectable)()
], GetSatelliteFortHandler);
exports.GetSatelliteFortHandler = GetSatelliteFortHandler;
