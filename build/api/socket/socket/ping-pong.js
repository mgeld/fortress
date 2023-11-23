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
exports.PingPong = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../../../types");
const rooms_1 = require("./rooms");
const pointer_service_1 = require("../../../services/pointer.service");
const zone_service_1 = require("../../../services/zone.service");
const weapon_service_1 = require("../../../services/weapon.service");
let PingPong = class PingPong {
    constructor() {
        this._wss = null;
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId)
                return;
            console.log('deleteUser');
            const _pointer = yield this._pointerService.memoryGetById(userId);
            _pointer.areal = -1;
            const _zone = yield this._zoneService.memoryGetById(userId);
            const _weapon = yield this._weaponService.memoryGetById(_pointer.weapons[0]);
            console.log('//////////////// /////////////deleteUser _pointer.pos', _pointer.pos);
            yield this._pointerService.baseUpdate(_pointer);
            yield this._zoneService.baseUpdate(_zone);
            yield this._weaponService.baseUpdate(_weapon);
            this._rooms.areals.deleteClient(_pointer.zoneId, _pointer.areal);
            yield this._weaponService.remove(_pointer.weapons[0]);
            this._pointerService.remove(userId);
            this._zoneService.remove(userId);
        });
    }
    each(ws) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((ws === null || ws === void 0 ? void 0 : ws.is_alive) === false) {
                if (ws === null || ws === void 0 ? void 0 : ws.user_id) {
                    this.deleteUser(ws === null || ws === void 0 ? void 0 : ws.user_id);
                }
                return ws.terminate();
            }
            ws.is_alive = false;
            ws.ping();
        });
    }
    pingPong() {
        console.log('pingPong');
        if (this._wss)
            this._wss.clients.forEach(this.each.bind(this));
    }
    start(wss) {
        this._wss = wss;
        setInterval(this.pingPong.bind(this), 10000);
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Rooms),
    __metadata("design:type", rooms_1.Rooms)
], PingPong.prototype, "_rooms", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ZoneService),
    __metadata("design:type", zone_service_1.ZoneService)
], PingPong.prototype, "_zoneService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.WeaponService),
    __metadata("design:type", weapon_service_1.WeaponService)
], PingPong.prototype, "_weaponService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.PointerService),
    __metadata("design:type", pointer_service_1.PointerService)
], PingPong.prototype, "_pointerService", void 0);
PingPong = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], PingPong);
exports.PingPong = PingPong;
