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
exports.BattleGetAboutSectorHandler = void 0;
const types_1 = require("../types");
const handlers_1 = require("./handlers");
const inversify_1 = require("inversify");
const arena_sector_service_1 = require("../services/arena-sector.service");
const member_service_1 = require("../services/member.service");
let BattleGetAboutSectorHandler = class BattleGetAboutSectorHandler extends handlers_1.IRoute {
    handle(message, uSocket) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(uSocket === null || uSocket === void 0 ? void 0 : uSocket.user_id))
                return;
            const _sector = yield this._sectorService.getById(message.payload.id, message.payload.arena);
            const _member = yield this._memberService.getById(uSocket.user_id);
            const dtoSector = _sector.unmarshal();
            const sector = {
                number: dtoSector.number,
                latlng: dtoSector.latlng,
                invaders: dtoSector.invaders,
                defenders: dtoSector.defenders,
                owner: _member.arenaTeam === dtoSector.team_id ? 'Вы' : 'Противник'
            };
            uSocket.send(JSON.stringify({
                event: 'sector',
                payload: sector
            }));
        });
    }
};
BattleGetAboutSectorHandler.EVENT = "battleGetAboutSector";
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ArenaSectorService),
    __metadata("design:type", arena_sector_service_1.ArenaSectorService)
], BattleGetAboutSectorHandler.prototype, "_sectorService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.MemberService),
    __metadata("design:type", member_service_1.MemberService)
], BattleGetAboutSectorHandler.prototype, "_memberService", void 0);
BattleGetAboutSectorHandler = __decorate([
    (0, inversify_1.injectable)()
], BattleGetAboutSectorHandler);
exports.BattleGetAboutSectorHandler = BattleGetAboutSectorHandler;
