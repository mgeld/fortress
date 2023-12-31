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
exports.BeamHandler = void 0;
const handlers_1 = require("./handlers");
const inversify_1 = require("inversify");
const types_1 = require("../types");
const rooms_1 = require("../api/socket/socket/rooms");
const sector_service_1 = require("../services/sector.service");
const sector_1 = require("../entities/sector/sector");
const takes_1 = require("../infra/logs/takes");
const zone_service_1 = require("../services/zone.service");
let BeamHandler = class BeamHandler extends handlers_1.IRoute {
    handle(message, uSocket) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if (!uSocket.user_id)
                return;
            const __fort = (_a = message.payload) === null || _a === void 0 ? void 0 : _a.fort;
            const __sector = (_b = message.payload) === null || _b === void 0 ? void 0 : _b.sector;
            const __position = (_c = message.payload) === null || _c === void 0 ? void 0 : _c.position;
            if (!__fort || !__sector || !__position)
                return;
            let _sector;
            const zone = yield this._zoneService.getById(uSocket.user_id);
            let beamResp = {
                event: 'attraction',
                payload: {
                    type: null,
                    data: null,
                    fort: __fort,
                    pos: __position
                }
            };
            try {
                _sector = yield this._sectorService.getById(__sector);
                if (_sector.booty) {
                    let extr = null;
                    if (zone.terrain.sectors > 1) {
                        extr = sector_1.Sector.getContainerExtr(_sector.booty);
                    }
                    else {
                        extr = 110;
                        const tutorialResp = {
                            event: 'tutorial',
                            payload: {
                                type: 'hold'
                            }
                        };
                        uSocket.send(JSON.stringify(tutorialResp));
                    }
                    beamResp.payload.type = 'cont';
                    beamResp.payload.data = {
                        extr,
                        cont: _sector.booty,
                    };
                    const hold = zone.hold.addExtrToList(extr);
                    if (hold === 'limit') {
                        const limitResp = {
                            event: 'limit',
                            payload: {
                                gives: 'hold'
                            }
                        };
                        uSocket.send(JSON.stringify(limitResp));
                        return;
                    }
                    _sector.takenBooty();
                }
                else {
                    if (zone.id === _sector.zone_id) {
                        if (_sector.defenders > 1) {
                            beamResp.payload.type = 'strm';
                            beamResp.payload.data = null;
                            let resultIncrese = zone.stormtrooper_corps.addInvaders(1);
                            if (resultIncrese === 'limit') {
                                const limitResp = {
                                    event: 'limit',
                                    payload: {
                                        gives: 'stormtroopers'
                                    }
                                };
                                uSocket.send(JSON.stringify(limitResp));
                                return;
                            }
                            _sector.killDefender();
                            zone.terrain.killDefender();
                        }
                    }
                }
                if (beamResp.payload.type) {
                    this._logs.takes.add(_sector.id);
                    this._zoneService.memoryUpdate(zone);
                    this._sectorService.update(_sector);
                }
            }
            catch (e) {
            }
            uSocket.send(JSON.stringify(beamResp));
        });
    }
};
BeamHandler.EVENT = "beam";
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Rooms),
    __metadata("design:type", rooms_1.Rooms)
], BeamHandler.prototype, "_rooms", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ZoneService),
    __metadata("design:type", zone_service_1.ZoneService)
], BeamHandler.prototype, "_zoneService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.SectorService),
    __metadata("design:type", sector_service_1.SectorService)
], BeamHandler.prototype, "_sectorService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Logs),
    __metadata("design:type", takes_1.Logs)
], BeamHandler.prototype, "_logs", void 0);
BeamHandler = __decorate([
    (0, inversify_1.injectable)()
], BeamHandler);
exports.BeamHandler = BeamHandler;
