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
exports.BattleFireHandler = void 0;
const handlers_1 = require("./handlers");
const inversify_1 = require("inversify");
const types_1 = require("../types");
const rooms_1 = require("../api/socket/socket/rooms");
const arena_service_1 = require("../services/arena.service");
const weapon_service_1 = require("../services/weapon.service");
const member_service_1 = require("../services/member.service");
const pointer_service_1 = require("../services/pointer.service");
const battle_service_1 = require("../services/battle.service");
let BattleFireHandler = class BattleFireHandler extends handlers_1.IRoute {
    handle(message, uSocket) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!uSocket.user_id)
                return;
            console.log('BattleFireHandler handle');
            const _pointer = yield this._pointerService.memoryGetById(uSocket.user_id);
            const _member = yield this._memberService.getById(_pointer.zoneId);
            const weapon = yield this._weaponService.memoryGetById(_pointer.weapons[0]);
            const arena = yield this._arenaService.getById(_member.arena);
            if (_pointer.health < 1) {
                return;
            }
            if (weapon.bullets < 1) {
                return;
            }
            weapon.bullets = weapon.bullets - 1;
            yield this._weaponService.memoryUpdate(weapon);
            const fire = {
                pos: message.payload.pos,
                to_pos: message.payload.to_pos,
                direction: message.payload.direction,
                userId: _pointer.zoneId
            };
            if ((_a = message.payload) === null || _a === void 0 ? void 0 : _a.hitPointer) {
                _member.makeDamage(weapon.power);
                fire['hitPointer'] = message.payload.hitPointer;
                const hitMember = yield this._memberService.getById(message.payload.hitPointer.userId);
                const hitPointer = yield this._pointerService.memoryGetById(message.payload.hitPointer.userId);
                hitPointer.removeHealth(weapon.power);
                fire.hitPointer.health = hitPointer.health;
                console.log('BattleFire _member.sectors', _member.sectors);
                if (hitPointer.health < 1) {
                    console.log('Погиб hitPointer.zoneId', hitPointer.zoneId);
                    const killPointerTeam = arena.killPointer(hitMember.userId, hitMember.arenaTeam);
                    yield this._arenaService.update(arena);
                    hitMember.leaveArena();
                    _member.addKilledPointer();
                    if (killPointerTeam.alive_members === 0) {
                        arena.completeBattle(killPointerTeam.id);
                        this._battleService.overGame(arena.id);
                    }
                }
                yield this._pointerService.memoryUpdate(hitPointer);
                yield this._memberService.update(hitMember);
                yield this._memberService.update(_member);
            }
            this._rooms.arenas.broadcast(_member.arena, {
                event: 'fire',
                payload: fire
            }, _member.userId);
        });
    }
};
BattleFireHandler.EVENT = "battleFire";
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Rooms),
    __metadata("design:type", rooms_1.Rooms)
], BattleFireHandler.prototype, "_rooms", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.MemberService),
    __metadata("design:type", member_service_1.MemberService)
], BattleFireHandler.prototype, "_memberService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.PointerService),
    __metadata("design:type", pointer_service_1.PointerService)
], BattleFireHandler.prototype, "_pointerService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.WeaponService),
    __metadata("design:type", weapon_service_1.WeaponService)
], BattleFireHandler.prototype, "_weaponService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ArenaService),
    __metadata("design:type", arena_service_1.ArenaService)
], BattleFireHandler.prototype, "_arenaService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.BattleService),
    __metadata("design:type", battle_service_1.BattleService)
], BattleFireHandler.prototype, "_battleService", void 0);
BattleFireHandler = __decorate([
    (0, inversify_1.injectable)()
], BattleFireHandler);
exports.BattleFireHandler = BattleFireHandler;
