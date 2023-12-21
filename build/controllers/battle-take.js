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
exports.BattleTakeHandler = void 0;
const handlers_1 = require("./handlers");
const inversify_1 = require("inversify");
const types_1 = require("../types");
const rooms_1 = require("../api/socket/socket/rooms");
const pointer_service_1 = require("../services/pointer.service");
const zone_service_1 = require("../services/zone.service");
const arena_service_1 = require("../services/arena.service");
const member_service_1 = require("../services/member.service");
const arena_sector_service_1 = require("../services/arena-sector.service");
const battle_service_1 = require("../services/battle.service");
let BattleTakeHandler = class BattleTakeHandler extends handlers_1.IRoute {
    handle(message, uSocket) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!uSocket.user_id)
                return;
            const __fort = (_a = message.payload) === null || _a === void 0 ? void 0 : _a.fort;
            const __sector = (_b = message.payload) === null || _b === void 0 ? void 0 : _b.sector;
            if (!__fort || !__sector)
                return;
            const zone = yield this._zoneService.getById(uSocket.user_id);
            const _member = yield this._memberService.getById(zone.id);
            const arena = yield this._arenaService.getById(_member.arena);
            if (zone.stormtrooper_corps.invaders < 1) {
                return;
            }
            let _sector;
            let prevTeamId = 0;
            let takeHit = {};
            let takeSector = null;
            const _pointer = yield this._pointerService.memoryGetById(uSocket.user_id);
            zone.stormtrooper_corps.storm();
            try {
                _sector = yield this._sectorService.getById(__sector, arena.id);
            }
            catch (e) {
                _sector = this._sectorService.create({
                    id: __sector,
                    latlng: __fort,
                    team_id: 0,
                    arena: arena.id,
                    defenders: 5
                });
            }
            const status = _sector.invade(_member.arenaTeam);
            takeHit = {
                status,
                fort: __fort,
                invaders: _sector.invaders,
                defenders: _sector.defenders,
                owner: _sector.team_id
            };
            if (status === 'victory') {
                if (_sector.team_id) {
                    const _prevTeam = arena.getTeam(_sector.team_id);
                    prevTeamId = _prevTeam.id;
                    if (_sector.defenders === 0) {
                        if (prevTeamId)
                            _prevTeam.loseSector();
                    }
                }
                let myTeam = null;
                if (_sector.defenders === 0) {
                    _member.invadeSector();
                    yield this._memberService.update(_member);
                    myTeam = arena.addSector(_member.arenaTeam);
                    takeSector = {
                        new_owner_id: _member.arenaTeam,
                        prev_owner_id: _sector.team_id,
                        sector_id: __sector
                    };
                    _sector.setOwner(_member.arenaTeam);
                    if (myTeam.sectors >= 5) {
                        arena.completeBattle(myTeam.id === 1 ? 2 : 1);
                        yield this._arenaService.update(arena);
                        this._battleService.overGame(arena.id);
                    }
                }
                if (myTeam && myTeam.sectors < 5)
                    yield this._arenaService.update(arena);
            }
            this._sectorService.update(_sector);
            this._zoneService.memoryUpdate(zone);
            this._pointerService.memoryUpdate(_pointer);
            const takeHitResp = {
                event: 'take-hit',
                payload: {
                    hit: takeHit
                }
            };
            setTimeout(() => {
                if (takeSector) {
                    const myTeam = arena.getTeam(_member.arenaTeam);
                    myTeam.members.forEach(member => {
                        if (takeSector)
                            this._rooms.arenas.clientSocket(member, _member.arena, {
                                event: 'battle-y-take-sector',
                                payload: takeSector
                            });
                    });
                    if (prevTeamId) {
                        const prevTeam = arena.getTeam(prevTeamId);
                        prevTeam.members.forEach(member => {
                            if (takeSector)
                                this._rooms.arenas.clientSocket(member, _member.arena, {
                                    event: 'battle-yr-take-sector',
                                    payload: takeSector
                                });
                        });
                    }
                    else {
                        const team = arena.getTeam(myTeam.id === 1 ? 2 : 1);
                        team.members.forEach(member => {
                            if (takeSector)
                                this._rooms.arenas.clientSocket(member, _member.arena, {
                                    event: 'battle-take-sector',
                                    payload: takeSector
                                });
                        });
                    }
                }
                else {
                    uSocket.send(JSON.stringify(takeHitResp));
                }
            }, 2000);
            this._sectorService.memoryInsert(_sector);
            const take = {
                position: _member.pos,
                fort: __fort,
                userId: _member.userId,
            };
            this._rooms.arenas.broadcast(arena.id, {
                event: 'take',
                payload: take
            }, [_member.userId]);
        });
    }
};
BattleTakeHandler.EVENT = "battleTake";
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Rooms),
    __metadata("design:type", rooms_1.Rooms)
], BattleTakeHandler.prototype, "_rooms", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ZoneService),
    __metadata("design:type", zone_service_1.ZoneService)
], BattleTakeHandler.prototype, "_zoneService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ArenaService),
    __metadata("design:type", arena_service_1.ArenaService)
], BattleTakeHandler.prototype, "_arenaService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.MemberService),
    __metadata("design:type", member_service_1.MemberService)
], BattleTakeHandler.prototype, "_memberService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.PointerService),
    __metadata("design:type", pointer_service_1.PointerService)
], BattleTakeHandler.prototype, "_pointerService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ArenaSectorService),
    __metadata("design:type", arena_sector_service_1.ArenaSectorService)
], BattleTakeHandler.prototype, "_sectorService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.BattleService),
    __metadata("design:type", battle_service_1.BattleService)
], BattleTakeHandler.prototype, "_battleService", void 0);
BattleTakeHandler = __decorate([
    (0, inversify_1.injectable)()
], BattleTakeHandler);
exports.BattleTakeHandler = BattleTakeHandler;
