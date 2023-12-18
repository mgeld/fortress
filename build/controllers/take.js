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
const rank_1 = require("../entities/zone/rank");
const vk_user_service_1 = require("../services/vk-user.service");
const node_fetch_1 = __importDefault(require("node-fetch"));
const random_number_1 = require("../libs/random-number");
let TakeHandler = class TakeHandler extends handlers_1.IRoute {
    handle(message, uSocket) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            console.log('TakeHandler handle');
            if (!uSocket.user_id)
                return;
            const __fort = (_a = message.payload) === null || _a === void 0 ? void 0 : _a.fort;
            const __sector = (_b = message.payload) === null || _b === void 0 ? void 0 : _b.sector;
            if (!__fort || !__sector)
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
                _sector = yield this._sectorService.getById(__sector);
            }
            catch (e) {
                _sector = this._sectorService.create({
                    id: __sector,
                    latlng: __fort,
                    zone_id: 0,
                    defenders: 5
                });
            }
            let _prevZone = null;
            if (_sector.zone_id) {
                _prevZone = yield this._zoneService.getById(_sector.zone_id);
            }
            const invPower = zone.stormtrooper_corps.power;
            const defPower = _prevZone ? _prevZone.stormtrooper_corps.power : invPower / 2;
            const status = _sector.invade(zone.id, invPower, defPower);
            takeHit = {
                status,
                fort: __fort,
                invaders: _sector.invaders,
                defenders: _sector.defenders,
                owner: _sector.zone_id
            };
            if (status === 'victory') {
                zone.rank.increaseExp(2);
                if (_sector.zone_id && _prevZone) {
                    _prevZone.terrain.killDefender();
                    prevZoneId = _prevZone.id;
                    if (_sector.defenders === 0) {
                        if (prevZoneId)
                            _prevZone.terrain.loseSector();
                        const vkUser = yield this._vkUserService.getById(prevZoneId);
                        console.log('vkUser.is_msg', vkUser.is_msg);
                        if (vkUser.is_msg === 1) {
                            vkUser.losses = vkUser.losses + 1;
                            this._vkUserService.memoryUpdate(vkUser);
                            const keyboard = {
                                one_time: false,
                                inline: true,
                                buttons: [
                                    [
                                        {
                                            action: {
                                                type: "open_app",
                                                app_id: 51787878,
                                                label: 'Открыть игру'
                                            }
                                        }
                                    ]
                                ]
                            };
                            const request_params = {
                                user_id: '' + vkUser.vk_id,
                                message: '',
                                random_id: '' + (0, random_number_1.randomNumber)(100, 10000),
                                keyboard: JSON.stringify(keyboard),
                                access_token: 'vk1.a.8PG1mPGkbbSNx8yWgdQt_qz4_EjRKy91SlNKqeZ7sxmaLqnx-b_9MJNbtC71Go1A_jknLxDaj41gR-yB687rte_XDGmdsnwwsom__UvxICg6Wc0pmIYIoT3jMXcfsprLs0JhzDg3VFCWD_upITg2VnHhmG_apBvkM6VpJk6FEmIAr9cpXiuICCSHYBZ-cHZVp8VF1jVZFmSFJGOky0kdiQ',
                                v: '5.130'
                            };
                            switch (vkUser.losses) {
                                case 1:
                                    request_params.message = 'Неопознанный корабль вторгся на ваши земли! Вражеские штурмовики захватывают форты!';
                                    break;
                                case 3:
                                    request_params.message = 'Штурмовики продолжают захватывать ваши территории!';
                                    break;
                                case 5:
                                    request_params.message = 'Ваши стражи не справляются с натиском врагов! Необходимо уничтожить корабль, нарушивший воздушное пространство вашей зоны!';
                                    break;
                                default:
                                    request_params.message = `Ваш форт захвачен штурмовиками из зоны ${_pointer.user.name}`;
                            }
                            const url = 'https://api.vk.com/method/messages.send?' + new URLSearchParams(request_params).toString();
                            const result = yield (0, node_fetch_1.default)(url, { method: 'GET' })
                                .then(response => response.json())
                                .then(res => console.log('res', res))
                                .catch(error => console.log('error', error));
                        }
                    }
                    this._zoneService.memoryUpdate(_prevZone);
                }
                zone.terrain.newDefender();
                if (_sector.defenders === 0) {
                    const trophies = Math.ceil(zone.rank.tempExp / 10);
                    zone.setTrophies(trophies);
                    const [wasExp, willExp] = zone.rank.saveExp();
                    if (willExp === 0) {
                        const newRank = {
                            event: 'new-rank',
                            payload: {
                                rank: zone.rank.rank
                            }
                        };
                        const rubies = rank_1.Rank.getLevelRewardRubies(zone.rank.rank);
                        zone.addRubies(rubies);
                        setTimeout(() => uSocket.send(JSON.stringify(newRank)), 2000);
                    }
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
                        sector_id: __sector
                    };
                    if (_sector.zone_id === 0) {
                        isBooty = sector_1.Sector.probabilityGettingExtractionInFort(__fort);
                    }
                    _sector.setOwner(_pointer.zoneId);
                    if (zone.terrain.sectors === 1) {
                        isBooty = true;
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
                                fort: __fort,
                                cont: container
                            }
                        };
                        uSocket.send(JSON.stringify(resp));
                    }
                    this._rooms.areals.broadcast(_pointer.areal, {
                        event: 'take-sector',
                        payload: takeSector
                    }, [_pointer.zoneId, prevZoneId]);
                    if (prevZoneId) {
                        this._rooms.areals.clientSocket(prevZoneId, _pointer.areal, {
                            event: 'yr-take-sector',
                            payload: takeSector
                        });
                    }
                    takeSector.exp = zone.rank.exp;
                    takeSector.trp = zone.trophies;
                    uSocket.send(JSON.stringify({
                        event: 'y-take-sector',
                        payload: takeSector
                    }));
                }
                else {
                    uSocket.send(JSON.stringify(takeHitResp));
                }
            }, 2000);
            this._sectorService.memoryInsert(_sector);
            const take = {
                position: _pointer.pos,
                fort: __fort,
                userId: _pointer.zoneId,
            };
            this._rooms.areals.broadcast(_pointer.areal, {
                event: 'take',
                payload: take
            }, [_pointer.zoneId]);
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
    (0, inversify_1.inject)(types_1.TYPES.VkUserService),
    __metadata("design:type", vk_user_service_1.VkUserService)
], TakeHandler.prototype, "_vkUserService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Logs),
    __metadata("design:type", takes_1.Logs)
], TakeHandler.prototype, "_logs", void 0);
TakeHandler = __decorate([
    (0, inversify_1.injectable)()
], TakeHandler);
exports.TakeHandler = TakeHandler;
