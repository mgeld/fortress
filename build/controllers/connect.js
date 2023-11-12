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
exports.ConnectHandler = void 0;
const inversify_1 = require("inversify");
const pointer_service_1 = require("../services/pointer.service");
const weapon_service_1 = require("../services/weapon.service");
const types_1 = require("../types");
const zone_service_1 = require("../services/zone.service");
const citadel_service_1 = require("../services/citadel.service");
const vk_user_1 = require("../infra/database/mysql2/repositories/vk-user");
const verify_launch_params_1 = require("../libs/verify-launch-params");
let ConnectHandler = class ConnectHandler {
    constructor() {
        console.log('ConnectHandler');
    }
    handle(message, uSocket) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('------ConnectHandler handle -----------');
            const VK_URL = message.payload.url;
            const USER_NAME = message.payload.name;
            const USER_ICON = message.payload.icon;
            console.log('VK_URL', VK_URL);
            let pointer;
            let weapon;
            let zone;
            let citadel = null;
            const clientSecret = 'SCecuoQxDCCS0hdTSuhe';
            const launchParams = decodeURIComponent(VK_URL.slice(VK_URL.indexOf('?') + 1));
            const result = (0, verify_launch_params_1.verifyLaunchParams)(launchParams, clientSecret);
            console.log('result', result);
            if (!result)
                return;
            const { is_valid, vk_id } = result;
            if (!is_valid || !vk_id)
                return 'ERROR SECRET KEY';
            console.log('is_valid', is_valid);
            console.log('vk_id', vk_id);
            try {
                const { zone_id: zoneId } = yield this._vkUserRepository.getById(vk_id);
                pointer = yield this._pointerService.baseGetById(zoneId);
                weapon = yield this._weaponService.baseGetById(pointer.weapons[0]);
                zone = yield this._zoneService.getById(zoneId);
                this._zoneService.memoryInsert(zone);
                this._weaponService.memoryInsert(weapon);
                this._pointerService.memoryInsert(pointer);
                if (zone.terrain.sectors > 0) {
                    citadel = yield this._citadelService.getById(zoneId);
                }
            }
            catch (e) {
                weapon = this._weaponService.createGun();
                this._weaponService.memoryInsert(weapon);
                this._weaponService.baseInsert(weapon);
                zone = this._zoneService.create(0);
                zone = yield this._zoneService.baseInsert(zone);
                yield this._vkUserRepository.insert({
                    user_id: vk_id,
                    zone_id: zone.id
                });
                pointer = this._pointerService.create(zone.id, [0, 0], USER_NAME, USER_ICON, weapon);
                this._pointerService.baseInsert(pointer);
                this._pointerService.memoryInsert(pointer);
                this._zoneService.memoryInsert(zone);
            }
            uSocket.user_id = zone.id;
            const dtoZone = zone.unmarshal();
            const payload = {
                user: {
                    zoneId: zone.id,
                },
                ship: {
                    pos: pointer.pos,
                    level: pointer.level,
                    health: pointer.health,
                },
                storm: {
                    level: dtoZone.stormtrooper_corps.level,
                    power: dtoZone.stormtrooper_corps.power,
                    invaders: dtoZone.stormtrooper_corps.invaders
                },
                rank: {
                    exp: dtoZone.rank.exp,
                    level: dtoZone.rank.rank,
                },
                terrain: {
                    level: dtoZone.terrain.level,
                    sectors: dtoZone.terrain.sectors,
                },
                zone: {
                    coins: dtoZone.coins,
                    rubies: dtoZone.rubies,
                    trophies: dtoZone.trophies,
                },
                hold: dtoZone.hold,
                citadel: citadel ? {
                    id: citadel.id,
                    level: citadel.level,
                    latlng: citadel.latlng,
                } : null,
                weapon: [weapon.unmarshal()]
            };
            uSocket.send(JSON.stringify({
                event: 'connect',
                payload
            }));
        });
    }
};
ConnectHandler.EVENT = "connect";
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.CitadelService),
    __metadata("design:type", citadel_service_1.CitadelService)
], ConnectHandler.prototype, "_citadelService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ZoneService),
    __metadata("design:type", zone_service_1.ZoneService)
], ConnectHandler.prototype, "_zoneService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.PointerService),
    __metadata("design:type", pointer_service_1.PointerService)
], ConnectHandler.prototype, "_pointerService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.WeaponService),
    __metadata("design:type", weapon_service_1.WeaponService)
], ConnectHandler.prototype, "_weaponService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.VkUserRepository),
    __metadata("design:type", vk_user_1.VkUserRepository)
], ConnectHandler.prototype, "_vkUserRepository", void 0);
ConnectHandler = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], ConnectHandler);
exports.ConnectHandler = ConnectHandler;
