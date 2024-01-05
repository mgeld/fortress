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
exports.DirectHandler = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../types");
const handlers_1 = require("./handlers");
const rooms_1 = require("../api/socket/socket/rooms");
const areal_1 = require("../entities/pointer/areal");
const sector_service_1 = require("../services/sector.service");
const pointer_service_1 = require("../services/pointer.service");
let DirectHandler = class DirectHandler extends handlers_1.IRoute {
    handle(message, uSocket) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!uSocket.user_id)
                return;
            const __position = (_a = message.payload) === null || _a === void 0 ? void 0 : _a.position;
            if (!__position)
                return;
            const _pointer = yield this._pointerService.memoryGetById(uSocket.user_id);
            if (_pointer.health < 1 && _pointer.areal !== -1) {
                return;
            }
            const areal = areal_1.Areal.generator(__position);
            if (_pointer.areal && _pointer.areal === areal) {
                this._rooms.areals.broadcast(_pointer.areal, {
                    event: 'direct',
                    payload: {
                        userId: _pointer.zoneId,
                        pos: __position
                    }
                }, [_pointer.zoneId]);
                _pointer.pos = __position;
            }
            else {
                if (_pointer.areal && _pointer.areal !== -1) {
                    this._rooms.areals.deleteClient(_pointer.zoneId, _pointer.areal);
                    this._rooms.areals.broadcast(_pointer.areal, {
                        event: 'del-pointer',
                        payload: {
                            userId: _pointer.zoneId
                        }
                    }, [_pointer.zoneId]);
                }
                this._rooms.areals.addClientToRoom(_pointer.zoneId, areal, uSocket);
                const clients = this._rooms.areals.getClients(areal).filter(p => p !== _pointer.zoneId);
                const pointers = yield this._repository.getByIds(clients);
                uSocket.send(JSON.stringify({
                    event: 'pointers',
                    payload: {
                        pointers: pointers.map(pointer => pointer.pointerUnmarshal())
                    }
                }));
                let areals = areal_1.Areal.generatorAreals(__position);
                const prevPosLat = _pointer.pos[0];
                const prevPosLng = _pointer.pos[1];
                const posLat = __position[0];
                const posLng = __position[1];
                if (Math.ceil(posLat - prevPosLat) > 0.02 ||
                    Math.ceil(posLng - prevPosLng) > 0.03) {
                }
                else if (_pointer.areal > 0) {
                    if (posLat > prevPosLat) {
                        areals = areals.slice(0, 3);
                    }
                    if (posLat < prevPosLat) {
                        areals = areals.slice(6);
                    }
                    if (posLng > prevPosLng) {
                        areals = [areals[2], areals[5], areals[8]];
                    }
                    if (posLng < prevPosLng) {
                        areals = [areals[0], areals[3], areals[6]];
                    }
                }
                const _sectors = yield this._sectorService.getZonesAroundAreals(areals);
                const array_sectors = Object.values(_sectors);
                if (array_sectors.length > 0) {
                    let zones = {};
                    array_sectors.forEach(item => {
                        zones[item.zone.zone_id] = item.zone.zone_id;
                    });
                    const _pointers = yield this._pointerService.getZoneByIds(Object.values(zones));
                    const sectors = array_sectors.map(zone => {
                        const user = _pointers.find(pointer => pointer.zone_id === zone.zone.zone_id);
                        return {
                            zone: Object.assign(Object.assign({}, zone.zone), { color: user === null || user === void 0 ? void 0 : user.color }),
                            sectors: zone.sectors
                        };
                    });
                    if (!(_pointer.zoneId in zones)) {
                        sectors.push({
                            zone: {
                                zone_id: _pointer.zoneId,
                                color: _pointer.color
                            },
                            sectors: {}
                        });
                    }
                    uSocket.send(JSON.stringify({
                        event: 'add-sectors',
                        payload: sectors
                    }));
                }
                else {
                    const sectors = [{
                            zone: {
                                zone_id: _pointer.zoneId,
                                color: _pointer.color
                            },
                            sectors: {}
                        }];
                    uSocket.send(JSON.stringify({
                        event: 'set-sectors',
                        payload: sectors
                    }));
                }
                _pointer.pos = __position;
                _pointer.areal = areal;
                this._rooms.areals.broadcast(_pointer.areal, {
                    event: 'connect-pointer',
                    payload: {
                        lvl: _pointer.level,
                        color: _pointer.color,
                        userId: _pointer.zoneId,
                        icon: _pointer.user.icon,
                        name: _pointer.user.name,
                        health: _pointer.health,
                        pos: __position
                    }
                }, [_pointer.zoneId]);
            }
            this._pointerService.memoryUpdate(_pointer);
        });
    }
};
DirectHandler.EVENT = "direct";
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Rooms),
    __metadata("design:type", rooms_1.Rooms)
], DirectHandler.prototype, "_rooms", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.PointerService),
    __metadata("design:type", pointer_service_1.PointerService)
], DirectHandler.prototype, "_pointerService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.PointerMemoryRepository),
    __metadata("design:type", Object)
], DirectHandler.prototype, "_repository", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.SectorService),
    __metadata("design:type", sector_service_1.SectorService)
], DirectHandler.prototype, "_sectorService", void 0);
DirectHandler = __decorate([
    (0, inversify_1.injectable)()
], DirectHandler);
exports.DirectHandler = DirectHandler;
