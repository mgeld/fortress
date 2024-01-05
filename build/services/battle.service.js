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
exports.BattleService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../types");
const rooms_1 = require("../api/socket/socket/rooms");
const member_service_1 = require("../services/member.service");
const zone_service_1 = require("../services/zone.service");
const arena_service_1 = require("./arena.service");
let BattleService = class BattleService {
    overGame(arenaId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('BattleService overGame');
            const arena = yield this._arenaService.getById(arenaId);
            arena.timeout && arena.destroyTimer();
            const _extraction = {};
            const members = [];
            members[0] = yield this._memberService.getByIds(arena.teamList[0].members);
            members[1] = yield this._memberService.getByIds(arena.teamList[1].members);
            if (arena.status !== 'over') {
                const team1 = arena.getTeam(1).sectors;
                const team2 = arena.getTeam(2).sectors;
                const defeatTeamId = team1 < team2 ? 1 : team1 > team2 ? 2 : 0;
                arena.completeBattle(defeatTeamId);
            }
            const teams = arena.teamList.map((team, index) => {
                const minTrophies = team.status === 'victory' ? 10 : team.status === 'defeat' ? -10 : 0;
                return {
                    teamId: team.id,
                    status: team.status,
                    sectors: team.sectors,
                    members: members[index].map(member => {
                        const wonTrophies = Math.floor(member.damage / 10 + member.sectors);
                        const trophy = minTrophies > 0 ? minTrophies + wonTrophies : 0;
                        _extraction[member.userId] = {
                            coins: trophy * 11,
                            trophies: trophy
                        };
                        return {
                            trophies: trophy,
                            coins: trophy * 11,
                            userId: member.userId,
                        };
                    })
                };
            });
            const zones = yield this._zoneService.memoryGetByIds([
                ...arena.teamList[0].members,
                ...arena.teamList[1].members
            ]);
            zones.forEach(zone => {
                zone.setTrophies(_extraction[zone.id].trophies);
                zone.addCoins(_extraction[zone.id].coins);
            });
            yield this._zoneService.memoryUpdates(zones);
            this._arenaService.mysqlInsertArena(arena);
            this._arenaService.mysqlInsertsMembers([...members[0], ...members[1]]);
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                this._rooms.arenas.broadcast(arena.id, {
                    event: 'battle-over',
                    payload: {
                        teams
                    }
                });
            }), 2000);
        });
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Rooms),
    __metadata("design:type", rooms_1.Rooms)
], BattleService.prototype, "_rooms", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ZoneService),
    __metadata("design:type", zone_service_1.ZoneService)
], BattleService.prototype, "_zoneService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ArenaService),
    __metadata("design:type", arena_service_1.ArenaService)
], BattleService.prototype, "_arenaService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.MemberService),
    __metadata("design:type", member_service_1.MemberService)
], BattleService.prototype, "_memberService", void 0);
BattleService = __decorate([
    (0, inversify_1.injectable)()
], BattleService);
exports.BattleService = BattleService;
