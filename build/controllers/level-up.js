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
exports.LevelUpHandler = void 0;
const handlers_1 = require("./handlers");
const inversify_1 = require("inversify");
const types_1 = require("../types");
const zone_service_1 = require("../services/zone.service");
const weapon_service_1 = require("../services/weapon.service");
const pointer_service_1 = require("../services/pointer.service");
const pointer_1 = require("../entities/pointer/pointer");
const gun_1 = require("../entities/weapon/gun");
const stormtrooper_corps_1 = require("../entities/zone/stormtrooper_corps");
const extraction_1 = require("../entities/zone/extraction");
let LevelUpHandler = class LevelUpHandler extends handlers_1.IRoute {
    handle(message, uSocket) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('UseExtractionHandler handle');
            if (!uSocket.user_id)
                return;
            const zone = yield this._zoneService.getById(uSocket.user_id);
            const pointer = yield this._pointerService.memoryGetById(zone.id);
            const weapon = yield this._weaponService.memoryGetById(pointer.weapons[0]);
            let newLevel = 0;
            let cost = 0;
            let currency = null;
            if (message.payload.type === 'ship') {
                newLevel = pointer.upLevel();
                cost = pointer_1.Pointer.getLevelUpPrice(newLevel);
                zone.spendRubies(cost);
                currency = 'rubies';
                yield this._pointerService.memoryUpdate(pointer);
                yield this._zoneService.memoryUpdate(zone);
            }
            if (message.payload.type === 'gun') {
                newLevel = weapon.upLevel();
                cost = gun_1.Gun.getLevelUpPrice(newLevel);
                zone.spendСoins(cost);
                currency = 'coins';
                yield this._zoneService.memoryUpdate(zone);
                yield this._weaponService.memoryUpdate(weapon);
            }
            if (message.payload.type === 'storm-corps') {
                newLevel = zone.stormtrooper_corps.upLevel();
                cost = stormtrooper_corps_1.StormtrooperCorps.getLevelUpPrice(newLevel);
                zone.spendСoins(cost);
                currency = 'coins';
                this._zoneService.memoryUpdate(zone);
            }
            if (message.payload.type === 'hold') {
                newLevel = zone.hold.upLevel();
                cost = extraction_1.Extraction.getLevelUpPrice(newLevel);
                zone.spendСoins(cost);
                currency = 'coins';
                this._zoneService.memoryUpdate(zone);
            }
            if (currency) {
                const extrResp = {
                    event: 'level-up',
                    payload: {
                        type: message.payload.type,
                        cost,
                        new_level: newLevel,
                        currency
                    }
                };
                uSocket.send(JSON.stringify(extrResp));
            }
        });
    }
};
LevelUpHandler.EVENT = "levelUp";
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ZoneService),
    __metadata("design:type", zone_service_1.ZoneService)
], LevelUpHandler.prototype, "_zoneService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.PointerService),
    __metadata("design:type", pointer_service_1.PointerService)
], LevelUpHandler.prototype, "_pointerService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.WeaponService),
    __metadata("design:type", weapon_service_1.WeaponService)
], LevelUpHandler.prototype, "_weaponService", void 0);
LevelUpHandler = __decorate([
    (0, inversify_1.injectable)()
], LevelUpHandler);
exports.LevelUpHandler = LevelUpHandler;
