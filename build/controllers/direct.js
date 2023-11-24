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
const pointer_service_1 = require("../services/pointer.service");
const types_1 = require("../types");
const handlers_1 = require("./handlers");
const rooms_1 = require("../api/socket/socket/rooms");
const areal_1 = require("../entities/pointer/areal");
const sector_service_1 = require("../services/sector.service");
let DirectHandler = class DirectHandler extends handlers_1.IRoute {
    handle(message, uSocket) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!uSocket.user_id)
                return;
            console.log('DirectHandler handle');
            const _pointer = yield this._pointerService.memoryGetById(uSocket.user_id);
            if (_pointer.health < 1) {
                return;
            }
            _pointer.pos = message.payload.position;
            const areal = areal_1.Areal.generator(message.payload.position);
            console.log('_pointer.areal', _pointer.areal);
            if (_pointer.areal && _pointer.areal === areal) {
                this._rooms.areals.broadcast(_pointer.areal, {
                    event: 'direct',
                    payload: {
                        userId: _pointer.zoneId,
                        pos: message.payload.position
                    }
                }, _pointer.zoneId);
            }
            else {
                if (_pointer.areal && _pointer.areal !== -1) {
                    this._rooms.areals.deleteClient(_pointer.zoneId, _pointer.areal);
                    this._rooms.areals.broadcast(_pointer.areal, {
                        event: 'del-pointer',
                        payload: {
                            userId: _pointer.zoneId
                        }
                    });
                }
                if (!_pointer.areal) {
                    const direction = areal_1.Areal.generator([_pointer.pos[0] + 0.004, _pointer.pos[1]]) !== areal ? 'FORWARD' : 'BACKWARD';
                    const _lat = direction === 'FORWARD' ? _pointer.pos[0] - 0.004 : _pointer.pos[0] + 0.004;
                    setTimeout(() => {
                        uSocket.send(JSON.stringify({
                            event: 'connect-pointer',
                            payload: {
                                lvl: 1,
                                userId: -1,
                                icon: 'https://sun120-1.userapi.com/s/v1/ig2/Y5LhWYhLVxHswvVU4dGrqnGVc4wmSzQQKVKZXrlyflMWuRihg7F4TVephtlm4fmdE9SFxBCUKPFuxsqz4hIIu_cx.jpg?size=50x50&quality=95&crop=468,0,960,960&ava=1',
                                name: 'НЛО',
                                health: 50,
                                pos: [_lat, _pointer.pos[1]]
                            }
                        }));
                        const fire = {
                            pos: [_lat, _pointer.pos[1]],
                            to_pos: _pointer.pos,
                            direction,
                            userId: -1,
                            hitPointer: {
                                userId: _pointer.zoneId,
                                pos: _pointer.pos,
                                health: _pointer.health - 5
                            }
                        };
                        _pointer.health = _pointer.health - 5;
                        uSocket.send(JSON.stringify({
                            event: 'fire',
                            payload: fire
                        }));
                    }, 2000);
                }
                _pointer.areal = areal;
                this._rooms.areals.addClientToRoom(_pointer.zoneId, _pointer.areal, uSocket);
                const clients = this._rooms.areals.getClients(_pointer.areal).filter(p => p !== _pointer.zoneId);
                const pointers = yield this._repository.getByIds(clients);
                uSocket.send(JSON.stringify({
                    event: 'pointers',
                    payload: {
                        pointers: pointers.map(pointer => pointer.pointerUnmarshal())
                    }
                }));
                const _sectors = yield this._sectorService.getZonesAroundPosition(message.payload.position);
                const array_sectors = Object.values(_sectors);
                if (array_sectors.length > 0) {
                    let zones = {};
                    array_sectors.forEach(item => {
                        zones[item.zone.zone_id] = item.zone.zone_id;
                    });
                    const _pointers = yield this._pointerService.getZoneByIds(Object.values(zones));
                    console.log('_pointers', _pointers);
                    const sectors = array_sectors.map(zone => {
                        const user = _pointers.find(pointer => pointer.zone_id === zone.zone.zone_id);
                        return {
                            zone: Object.assign(Object.assign({}, zone.zone), { name: user === null || user === void 0 ? void 0 : user.name, color: user === null || user === void 0 ? void 0 : user.color }),
                            sectors: zone.sectors
                        };
                    });
                    uSocket.send(JSON.stringify({
                        event: 'sectors',
                        payload: sectors
                    }));
                }
                this._rooms.areals.broadcast(_pointer.areal, {
                    event: 'connect-pointer',
                    payload: {
                        lvl: _pointer.level,
                        userId: _pointer.zoneId,
                        icon: _pointer.icon,
                        name: _pointer.name,
                        health: _pointer.health,
                        pos: message.payload.position
                    }
                }, _pointer.zoneId);
            }
            this._pointerService.memoryUpdate(_pointer);
            console.log('>>>>memoryUpdate(_pointer) areal', _pointer.areal);
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
