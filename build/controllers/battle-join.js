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
exports.BattleJoinHandler = void 0;
const inversify_1 = require("inversify");
const rooms_1 = require("../api/socket/socket/rooms");
const arena_service_1 = require("../services/arena.service");
const member_service_1 = require("../services/member.service");
const arena_team_member_1 = require("../entities/arena/arena-team-member");
const member_place_1 = require("../entities/arena/member-place");
const types_1 = require("../types");
const handlers_1 = require("./handlers");
const pointer_service_1 = require("../services/pointer.service");
const battle_service_1 = require("../services/battle.service");
let BattleJoinHandler = class BattleJoinHandler extends handlers_1.IRoute {
    handle(message, uSocket) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('BattleJoinHandler handle');
            if (!uSocket.user_id)
                return;
            const arena = yield this._arenaService.getArena();
            const team = arena.addPointer(uSocket.user_id);
            const teamPlace = team.getPlace(arena.place.place);
            const _member = arena_team_member_1.Member.create({
                userId: uSocket.user_id,
                pos: member_place_1.MemberPlace.generate(teamPlace, team.getMembersNumber()),
                arena: arena.id,
                arenaTeam: team.id
            });
            const member = yield this._memberService.insert(_member);
            const roomId = this._rooms.arenas.getRoom(arena.id);
            this._rooms.arenas.addClientToRoom(uSocket.user_id, roomId, uSocket);
            const roomValues = Object.values(this._rooms.arenas.getClients(roomId));
            uSocket.send(JSON.stringify({
                event: 'battle-join',
                payload: {
                    user: {
                        pos: _member.pos,
                        team: _member.arenaTeam,
                    },
                }
            }));
            const pointer = yield this._pointerService.memoryGetById(member.userId);
            pointer.areal = -1;
            yield this._pointerService.memoryUpdate(pointer);
            if (arena.isFullTeams()) {
                console.log('ISFULL TEAMS !!!!!!!!!!!!!');
                arena.battleStart();
                const members = yield this._memberService.getByIds(arena.pointers);
                const users = yield this._pointerService.getMarshalPointers(arena.pointers);
                this._rooms.arenas.broadcast(roomId, {
                    event: 'battle-start',
                    payload: {
                        battleId: arena.id,
                        place: arena.place.place,
                        timeStart: +new Date(),
                        teams: arena.teamList.map(team => ({
                            teamId: team.id,
                            status: team.status,
                            sectors: team.sectors,
                            members: team.members.map(member => ({
                                userId: member,
                                trophies: 0
                            })),
                        })),
                        pointers: members.map(member => {
                            const memb = member.pointerUnmarshal();
                            return Object.assign(Object.assign({}, memb), users[member.userId]);
                        })
                    }
                });
                arena.timeout = setTimeout(() => this._battleService.overGame(arena.id), 120000);
            }
            yield this._arenaService.update(arena);
        });
    }
};
BattleJoinHandler.EVENT = "battleJoin";
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Rooms),
    __metadata("design:type", rooms_1.Rooms)
], BattleJoinHandler.prototype, "_rooms", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ArenaService),
    __metadata("design:type", arena_service_1.ArenaService)
], BattleJoinHandler.prototype, "_arenaService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.MemberService),
    __metadata("design:type", member_service_1.MemberService)
], BattleJoinHandler.prototype, "_memberService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.BattleService),
    __metadata("design:type", battle_service_1.BattleService)
], BattleJoinHandler.prototype, "_battleService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.PointerService),
    __metadata("design:type", pointer_service_1.PointerService)
], BattleJoinHandler.prototype, "_pointerService", void 0);
BattleJoinHandler = __decorate([
    (0, inversify_1.injectable)()
], BattleJoinHandler);
exports.BattleJoinHandler = BattleJoinHandler;
