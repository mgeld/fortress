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
exports.UseExtractionHandler = void 0;
const handlers_1 = require("./handlers");
const inversify_1 = require("inversify");
const types_1 = require("../types");
const zone_service_1 = require("../services/zone.service");
const weapon_service_1 = require("../services/weapon.service");
const pointer_service_1 = require("../services/pointer.service");
const rooms_1 = require("../api/socket/socket/rooms");
const rank_1 = require("../entities/zone/rank");
let UseExtractionHandler = class UseExtractionHandler extends handlers_1.IRoute {
    handle(message, uSocket) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            console.log('UseExtractionHandler handle');
            if (!uSocket.user_id)
                return;
            const __id = (_a = message.payload) === null || _a === void 0 ? void 0 : _a.id;
            const __index = (_b = message.payload) === null || _b === void 0 ? void 0 : _b.index;
            if (!__id)
                return;
            const zone = yield this._zoneService.getById(uSocket.user_id);
            const pointer = yield this._pointerService.memoryGetById(zone.id);
            const extr = zone.hold.use(__id, __index);
            if (!extr)
                return;
            let resultIncrese = [0, 0];
            if (extr.gives === 'gun_distance') {
                const weapon = yield this._weaponService.memoryGetById(pointer.weapons[0]);
                resultIncrese = weapon.increaseDistance(extr.quantity);
                if (resultIncrese !== 'limit')
                    yield this._weaponService.memoryUpdate(weapon);
            }
            if (extr.gives === 'gun_power') {
                const weapon = yield this._weaponService.memoryGetById(pointer.weapons[0]);
                resultIncrese = weapon.increasePower(extr.quantity);
                if (resultIncrese !== 'limit')
                    yield this._weaponService.memoryUpdate(weapon);
            }
            if (extr.gives === 'ship_health') {
                resultIncrese = pointer.addHealth(extr.quantity);
                if (resultIncrese !== 'limit') {
                    this._pointerService.memoryUpdate(pointer);
                    this._rooms.areals.broadcast(pointer.areal, {
                        event: 'set-health',
                        payload: {
                            userId: pointer.zoneId,
                            health: pointer.health,
                        }
                    }, [pointer.zoneId]);
                }
            }
            if (extr.gives === 'storm_power') {
                resultIncrese = zone.stormtrooper_corps.increasePower(extr.quantity);
            }
            if (extr.gives === 'stormtroopers') {
                resultIncrese = zone.stormtrooper_corps.addInvaders(extr.quantity);
            }
            if (extr.gives === 'coins') {
                resultIncrese = zone.addCoins(extr.quantity);
            }
            if (extr.gives === 'rubies') {
                resultIncrese = zone.addRubies(extr.quantity);
            }
            if (extr.gives === 'rank_exp') {
                resultIncrese = zone.rank.addExp(extr.quantity);
                if (resultIncrese[1] === 0) {
                    const rubies = rank_1.Rank.getLevelRewardRubies(zone.rank.rank);
                    zone.addRubies(rubies);
                    const newRank = {
                        event: 'new-rank',
                        payload: {
                            rank: zone.rank.rank
                        }
                    };
                    setTimeout(() => uSocket.send(JSON.stringify(newRank)), 1500);
                }
            }
            if (resultIncrese !== 'limit') {
                this._zoneService.memoryUpdate(zone);
            }
            else {
                const limitResp = {
                    event: 'limit',
                    payload: {
                        gives: extr.gives
                    }
                };
                uSocket.send(JSON.stringify(limitResp));
                return;
            }
            const [was, will] = resultIncrese;
            let amount = will - was;
            const extrResp = {
                event: 'use-extraction',
                payload: {
                    unit: __id,
                    amount,
                    type: extr.gives,
                    index: __index
                }
            };
            uSocket.send(JSON.stringify(extrResp));
        });
    }
};
UseExtractionHandler.EVENT = "useExtraction";
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Rooms),
    __metadata("design:type", rooms_1.Rooms)
], UseExtractionHandler.prototype, "_rooms", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ZoneService),
    __metadata("design:type", zone_service_1.ZoneService)
], UseExtractionHandler.prototype, "_zoneService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.PointerService),
    __metadata("design:type", pointer_service_1.PointerService)
], UseExtractionHandler.prototype, "_pointerService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.WeaponService),
    __metadata("design:type", weapon_service_1.WeaponService)
], UseExtractionHandler.prototype, "_weaponService", void 0);
UseExtractionHandler = __decorate([
    (0, inversify_1.injectable)()
], UseExtractionHandler);
exports.UseExtractionHandler = UseExtractionHandler;
