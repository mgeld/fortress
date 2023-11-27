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
const battle_service_1 = require("../services/battle.service");
let BattleDirectHandler = class BattleDirectHandler extends handlers_1.IRoute {
    handle(message, uSocket) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log('BattleDirectHandler handle');
            if (!uSocket.user_id)
                return;
            const pos = (_a = message.payload) === null || _a === void 0 ? void 0 : _a.position;
            if (!pos)
                return;
            const _pointer = yield this._pointerService.memoryGetById(uSocket.user_id);
            const _member = yield this._memberService.getById(_pointer.zoneId);
            _member.pos = pos;
            const arena = yield this._arenaService.getById(_member.arena);
            const bounds = arena.place.bounds;
            if (_member.pos[0] < bounds[0][0] || _member.pos[1] < bounds[0][1] ||
                _member.pos[0] > bounds[1][0] || _member.pos[1] > bounds[1][1]) {
                if (Math.random() > 0.6) {
                    const bomb = {
                        position: pos,
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
                    yield this._pointerService.memoryUpdate(_pointer);
                    if (health < 1) {
                        const killPointerTeam = arena.killPointer(_member.userId, _member.arenaTeam);
                        console.log('killPointerTeam.alive_members', killPointerTeam.alive_members);
                        if (killPointerTeam.alive_members === 0) {
                            arena.completeBattle(killPointerTeam.id);
                            yield this._arenaService.update(arena);
                            this._battleService.overGame(arena.id);
                        }
                        else {
                            yield this._arenaService.update(arena);
                        }
                    }
                }
            }
            this._memberService.update(_member);
            this._rooms.arenas.broadcast(_member.arena, {
                event: 'direct',
                payload: {
                    userId: _pointer.zoneId,
                    pos: pos
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
    (0, inversify_1.inject)(types_1.TYPES.ArenaService),
    __metadata("design:type", arena_service_1.ArenaService)
], BattleDirectHandler.prototype, "_arenaService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.MemberService),
    __metadata("design:type", member_service_1.MemberService)
], BattleDirectHandler.prototype, "_memberService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.PointerService),
    __metadata("design:type", pointer_service_1.PointerService)
], BattleDirectHandler.prototype, "_pointerService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.BattleService),
    __metadata("design:type", battle_service_1.BattleService)
], BattleDirectHandler.prototype, "_battleService", void 0);
BattleDirectHandler = __decorate([
    (0, inversify_1.injectable)()
], BattleDirectHandler);
exports.BattleDirectHandler = BattleDirectHandler;
