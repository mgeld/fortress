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
exports.BattleDirectHandler = void 0;
const types_1 = require("../types");
const handlers_1 = require("./handlers");
const inversify_1 = require("inversify");
const rooms_1 = require("../api/socket/socket/rooms");
const member_service_1 = require("../services/member.service");
const arena_service_1 = require("../services/arena.service");
const pointer_service_1 = require("../services/pointer.service");
let BattleDirectHandler = class BattleDirectHandler extends handlers_1.IRoute {
    handle(message, uSocket) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('BattleDirectHandler handle');
            if (!uSocket.user_id)
                return;
            const _pointer = yield this._pointerService.memoryGetById(uSocket.user_id);
            const _member = yield this._memberService.getById(_pointer.zoneId);
            _member.pos = message.payload.position;
            const arena = yield this._arenaService.getById(_member.arena);
            const bounds = arena.place.bounds;
            if (_member.pos[0] < bounds[0][0] || _member.pos[1] < bounds[0][1] ||
                _member.pos[0] > bounds[1][0] || _member.pos[1] > bounds[1][1]) {
                if (Math.random() > 0.6) {
                    const bomb = {
                        position: message.payload.position,
                        userId: _pointer.zoneId,
                        bomb: {
                            symbol: 'aerial',
                            level: 1
                        }
                    };
                    this._rooms.arenas.broadcast(_member.arena, {
                        event: 'bomb',
                        payload: bomb
                    });
                    const health = _pointer.removeHealth(10);
                    if (health < 1) {
                        const killPointerTeam = arena.killPointer(_member.userId, _member.arenaTeam);
                        yield this._arenaService.update(arena);
                        _member.leaveArena();
                        if (killPointerTeam.alive_members === 0) {
                            console.log('КРЫНДЕЦ!');
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                const members = [];
                                members[0] = yield this._memberService.getByIds(arena.teamList[0].members);
                                members[1] = yield this._memberService.getByIds(arena.teamList[1].members);
                                this._rooms.arenas.broadcast(arena.id, {
                                    event: 'battle-over',
                                    payload: {
                                        teams: arena.teamList.map((team, index) => {
                                            const minTrophies = team.status === 'victory' ? 10 : -10;
                                            return {
                                                teamId: team.id,
                                                status: team.status,
                                                members: members[index].map(member => {
                                                    const wonTrophies = member.damage / 5;
                                                    return {
                                                        userId: member.userId,
                                                        trophies: minTrophies + wonTrophies
                                                    };
                                                }),
                                            };
                                        })
                                    }
                                });
                            }), 2000);
                        }
                    }
                }
            }
            this._memberService.update(_member);
            this._rooms.arenas.broadcast(_member.arena, {
                event: 'direct',
                payload: {
                    userId: _pointer.zoneId,
                    pos: message.payload.position
                }
            }, _member.userId);
        });
    }
};
BattleDirectHandler.EVENT = "battleDirect";
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Rooms),
    __metadata("design:type", rooms_1.Rooms)
], BattleDirectHandler.prototype, "_rooms", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.MemberService),
    __metadata("design:type", member_service_1.MemberService)
], BattleDirectHandler.prototype, "_memberService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.PointerService),
    __metadata("design:type", pointer_service_1.PointerService)
], BattleDirectHandler.prototype, "_pointerService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ArenaService),
    __metadata("design:type", arena_service_1.ArenaService)
], BattleDirectHandler.prototype, "_arenaService", void 0);
BattleDirectHandler = __decorate([
    (0, inversify_1.injectable)()
], BattleDirectHandler);
exports.BattleDirectHandler = BattleDirectHandler;