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
exports.TakeHandler = void 0;
const handlers_1 = require("./handlers");
const inversify_1 = require("inversify");
const types_1 = require("../types");
const rooms_1 = require("../api/socket/socket/rooms");
const pointer_service_1 = require("../services/pointer.service");
const sector_service_1 = require("../services/sector.service");
const sector_1 = require("../entities/sector/sector");
const takes_1 = require("../infra/logs/takes");
const zone_service_1 = require("../services/zone.service");
const citadel_service_1 = require("../services/citadel.service");
let TakeHandler = class TakeHandler extends handlers_1.IRoute {
    handle(message, uSocket) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('TakeHandler handle');
            if (!uSocket.user_id)
                return;
            const zone = yield this._zoneService.getById(uSocket.user_id);
            if (zone.stormtrooper_corps.invaders < 1) {
                return;
            }
            let _sector;
            let prevZoneId = 0;
            let takeHit = {};
            let takeSector = null;
            let isBooty = false;
            const _pointer = yield this._pointerService.memoryGetById(uSocket.user_id);
            zone.stormtrooper_corps.storm();
            try {
                _sector = yield this._sectorService.getById(message.payload.sector);
                console.log('____________1');
            }
            catch (e) {
                console.log('____________2');
                _sector = this._sectorService.create({
                    id: message.payload.sector,
                    latlng: message.payload.fort,
                    zone_id: 0,
                    defenders: 5
                });
            }
            const status = _sector.invade(zone.id);
            takeHit = {
                status,
                fort: message.payload.fort,
                invaders: _sector.invaders,
                defenders: _sector.defenders
            };
            if (status === 'victory') {
                if (_sector.zone_id) {
                    const _prevZone = yield this._zoneService.getById(_sector.zone_id);
                    _prevZone.terrain.killDefender();
                    prevZoneId = _prevZone.id;
                    if (_sector.defenders === 0) {
                        if (prevZoneId)
                            _prevZone.terrain.loseSector();
                    }
                    this._zoneService.memoryUpdate(_prevZone);
                }
                zone.terrain.newDefender();
                if (_sector.defenders === 0) {
                    const tempLevel = zone.terrain.level;
                    const sectsAndLevel = zone.terrain.addSector();
                    if (sectsAndLevel.level > tempLevel) {
                        const newLevel = {
                            event: 'new-zone',
                            payload: {
                                level: sectsAndLevel.level
                            }
                        };
                        setTimeout(() => uSocket.send(JSON.stringify(newLevel)), 5000);
                    }
                    takeSector = {
                        new_owner_id: _pointer.zoneId,
                        prev_owner_id: _sector.zone_id,
                        sector_id: message.payload.sector
                    };
                    _sector.setOwner(_pointer.zoneId);
                    isBooty = sector_1.Sector.probabilityGettingExtractionInFort(message.payload.fort);
                    console.log('take isBooty', isBooty);
                    if (zone.terrain.sectors === 1) {
                        const citadel = this._citadelService.create({
                            id: _pointer.zoneId,
                            sectorId: _sector.id,
                            latlng: _sector.latlng
                        });
                        this._citadelService.baseInsert(citadel);
                        const payload = {
                            id: citadel.id,
                            latlng: citadel.latlng,
                            level: citadel.level
                        };
                        setTimeout(() => {
                            uSocket.send(JSON.stringify({
                                event: 'set-citadel',
                                payload: payload
                            }));
                        }, 2000);
                    }
                }
            }
            this._logs.takes.add(_sector.id);
            this._sectorService.update(_sector);
            if (0) {
                _sector.addDefender();
                takeHit = {
                    status: 'defense',
                    invaders: 0,
                    fort: message.payload.fort,
                    defenders: _sector.defenders
                };
                takeSector = {
                    new_owner_id: _pointer.zoneId,
                    prev_owner_id: 0,
                    sector_id: message.payload.sector
                };
                this._logs.takes.add(_sector.id);
                zone.terrain.newDefender();
                zone.terrain.addSector();
                if (zone.terrain.sectors === 1) {
                    const citadel = this._citadelService.create({
                        id: _pointer.zoneId,
                        sectorId: _sector.id,
                        latlng: _sector.latlng
                    });
                    this._citadelService.baseInsert(citadel);
                    const payload = {
                        id: citadel.id,
                        latlng: citadel.latlng,
                        level: citadel.level
                    };
                    setTimeout(() => {
                        uSocket.send(JSON.stringify({
                            event: 'set-citadel',
                            payload: payload
                        }));
                    }, 2000);
                }
            }
            this._zoneService.memoryUpdate(zone);
            this._pointerService.memoryUpdate(_pointer);
            const takeHitResp = {
                event: 'take-hit',
                payload: {
                    hit: takeHit
                }
            };
            let container;
            if (isBooty) {
                container = _sector.generateBooty();
            }
            setTimeout(() => {
                if (takeSector) {
                    if (isBooty) {
                        const resp = {
                            event: 'find-cont',
                            payload: {
                                fort: message.payload.fort,
                                cont: container
                            }
                        };
                        uSocket.send(JSON.stringify(resp));
                    }
                    uSocket.send(JSON.stringify({
                        event: 'y-take-sector',
                        payload: takeSector
                    }));
                    this._rooms.areals.broadcast(_pointer.areal, {
                        event: 'take-sector',
                        payload: takeSector
                    }, _pointer.zoneId);
                    if (prevZoneId) {
                        this._rooms.areals.clientSocket(prevZoneId, _pointer.areal, {
                            event: 'yr-take-sector',
                            payload: takeSector
                        });
                    }
                }
                else {
                    uSocket.send(JSON.stringify(takeHitResp));
                }
            }, 2000);
            this._sectorService.memoryInsert(_sector);
            const take = {
                position: _pointer.pos,
                fort: message.payload.fort,
                userId: _pointer.zoneId,
            };
            this._rooms.areals.broadcast(_pointer.areal, {
                event: 'take',
                payload: take
            }, _pointer.zoneId);
        });
    }
};
TakeHandler.EVENT = "take";
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Rooms),
    __metadata("design:type", rooms_1.Rooms)
], TakeHandler.prototype, "_rooms", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.PointerService),
    __metadata("design:type", pointer_service_1.PointerService)
], TakeHandler.prototype, "_pointerService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ZoneService),
    __metadata("design:type", zone_service_1.ZoneService)
], TakeHandler.prototype, "_zoneService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.SectorService),
    __metadata("design:type", sector_service_1.SectorService)
], TakeHandler.prototype, "_sectorService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.CitadelService),
    __metadata("design:type", citadel_service_1.CitadelService)
], TakeHandler.prototype, "_citadelService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Logs),
    __metadata("design:type", takes_1.Logs)
], TakeHandler.prototype, "_logs", void 0);
TakeHandler = __decorate([
    (0, inversify_1.injectable)()
], TakeHandler);
exports.TakeHandler = TakeHandler;
