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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectHandler = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const types_1 = require("../types");
const inversify_1 = require("inversify");
const rooms_1 = require("../api/socket/socket/rooms");
const random_number_1 = require("../libs/random-number");
const zone_service_1 = require("../services/zone.service");
const vk_user_service_1 = require("../services/vk-user.service");
const weapon_service_1 = require("../services/weapon.service");
const citadel_service_1 = require("../services/citadel.service");
const pointer_service_1 = require("../services/pointer.service");
const verify_launch_params_1 = require("../libs/verify-launch-params");
let ConnectHandler = class ConnectHandler {
    handle(message, uSocket) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log('ConnectHandler');
            const VK_URL = message.payload.url;
            const __abduction = (_a = message.payload) === null || _a === void 0 ? void 0 : _a.hash;
            let zone;
            let pointer;
            let weapon;
            let citadel = null;
            const clientSecret = 'SCecuoQxDCCS0hdTSuhe';
            const launchParams = decodeURIComponent(VK_URL.slice(VK_URL.indexOf('?') + 1));
            const result = (0, verify_launch_params_1.verifyLaunchParams)(launchParams, clientSecret);
            if (!result)
                return;
            let { is_valid, vk_id } = result;
            if (!is_valid || !vk_id)
                return 'ERROR_SECRET_KEY';
            try {
                console.log('CONNECT TRY');
                const { zone_id: zoneId } = yield this._vkUserService.baseGetById(vk_id);
                const isClient = this._rooms.areals.getCientSocket(zoneId);
                if (isClient) {
                    console.log('isClient есть');
                    isClient.send(JSON.stringify({
                        event: 'session-destroy',
                        payload: {}
                    }));
                    isClient.close(3000, 'session-destroy');
                    pointer = yield this._pointerService.memoryGetById(zoneId);
                    this._rooms.areals.deleteClient(zoneId, pointer.areal);
                    this._rooms.areals.broadcast(pointer.areal, {
                        event: 'del-pointer',
                        payload: {
                            userId: zoneId
                        }
                    }, [zoneId]);
                    pointer.areal = -1;
                    weapon = yield this._weaponService.memoryGetById(pointer.weapons[0]);
                    zone = yield this._zoneService.getById(zoneId);
                }
                else {
                    pointer = yield this._pointerService.baseGetById(zoneId);
                    weapon = yield this._weaponService.baseGetById(pointer.weapons[0]);
                    zone = yield this._zoneService.getById(zoneId);
                    this._zoneService.memoryInsert(zone);
                    this._weaponService.memoryInsert(weapon);
                }
                this._pointerService.memoryInsert(pointer);
                if (zone.terrain.sectors > 0) {
                    citadel = yield this._citadelService.getById(zoneId);
                }
            }
            catch (e) {
                console.log('CONNECT CATCH');
                weapon = this._weaponService.createGun();
                this._weaponService.memoryInsert(weapon);
                this._weaponService.baseInsert(weapon);
                zone = this._zoneService.create(0);
                zone = yield this._zoneService.baseInsert(zone);
                const request_params = {
                    user_ids: '' + vk_id,
                    fields: 'photo_100',
                    access_token: 'be91a38abe91a38abe91a38aa1bd879becbbe91be91a38adbdefc537e9e9fcfee28a2d5',
                    lang: 'ru',
                    v: '5.130'
                };
                const url = 'https://api.vk.com/method/users.get?' + new URLSearchParams(request_params).toString();
                const result = yield (0, node_fetch_1.default)(url, { method: 'GET' }).then(response => response.json());
                const user = result.response[0];
                const USER_NAME = user.first_name;
                const USER_ICON = user.photo_100;
                pointer = this._pointerService.create(zone.id, [0, 0], USER_NAME, USER_ICON, weapon);
                const vkUser = {
                    vk_id,
                    zone_id: zone.id,
                    ufo: 0
                };
                if (__abduction && Number(__abduction) > 0) {
                    try {
                        const rewardCoins = 60;
                        const ufoZone = yield this._zoneService.getById(__abduction);
                        ufoZone.addCoins(rewardCoins);
                        this._zoneService.memoryUpdate(ufoZone);
                        vkUser.ufo = ufoZone.id;
                        const ufoVkUser = yield this._vkUserService.getById(ufoZone.id);
                        if (ufoVkUser.is_msg === 1) {
                            const request_params = {
                                user_id: '' + ufoVkUser.vk_id,
                                message: `Вами был похищен [id${vkUser.vk_id}|${pointer.user.name}], который в следствие проведенных опытов стал одним из пришельцев. В качестве вознаграждения вы получили ${rewardCoins} монет.`,
                                random_id: '' + (0, random_number_1.randomNumber)(100, 10000),
                                access_token: 'vk1.a.8PG1mPGkbbSNx8yWgdQt_qz4_EjRKy91SlNKqeZ7sxmaLqnx-b_9MJNbtC71Go1A_jknLxDaj41gR-yB687rte_XDGmdsnwwsom__UvxICg6Wc0pmIYIoT3jMXcfsprLs0JhzDg3VFCWD_upITg2VnHhmG_apBvkM6VpJk6FEmIAr9cpXiuICCSHYBZ-cHZVp8VF1jVZFmSFJGOky0kdiQ',
                                v: '5.130'
                            };
                            const url = 'https://api.vk.com/method/messages.send?' + new URLSearchParams(request_params).toString();
                            (0, node_fetch_1.default)(url, { method: 'GET' });
                        }
                    }
                    catch (e) {
                    }
                }
                yield this._vkUserService.baseInsert(vkUser);
                this._pointerService.baseInsert(pointer);
                this._pointerService.memoryInsert(pointer);
                this._zoneService.memoryInsert(zone);
            }
            uSocket.user_id = zone.id;
            const dtoZone = zone.unmarshal();
            console.log('ConnectHandler pointer.pos', pointer.pos);
            const payload = {
                user: {
                    zoneId: zone.id,
                    icon: pointer.user.icon,
                    name: pointer.user.name
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
                    color: dtoZone.color,
                    coins: dtoZone.coins,
                    rubies: dtoZone.rubies,
                    trophies: dtoZone.trophies,
                    description: dtoZone.description
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
    (0, inversify_1.inject)(types_1.TYPES.Rooms),
    __metadata("design:type", rooms_1.Rooms)
], ConnectHandler.prototype, "_rooms", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ZoneService),
    __metadata("design:type", zone_service_1.ZoneService)
], ConnectHandler.prototype, "_zoneService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.WeaponService),
    __metadata("design:type", weapon_service_1.WeaponService)
], ConnectHandler.prototype, "_weaponService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.CitadelService),
    __metadata("design:type", citadel_service_1.CitadelService)
], ConnectHandler.prototype, "_citadelService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.PointerService),
    __metadata("design:type", pointer_service_1.PointerService)
], ConnectHandler.prototype, "_pointerService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.VkUserService),
    __metadata("design:type", vk_user_service_1.VkUserService)
], ConnectHandler.prototype, "_vkUserService", void 0);
ConnectHandler = __decorate([
    (0, inversify_1.injectable)()
], ConnectHandler);
exports.ConnectHandler = ConnectHandler;
