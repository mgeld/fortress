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
exports.BattleCreateHandler = void 0;
const inversify_1 = require("inversify");
const arena_service_1 = require("../services/arena.service");
const types_1 = require("../types");
const handlers_1 = require("./handlers");
const pointer_service_1 = require("../services/pointer.service");
let BattleCreateHandler = class BattleCreateHandler extends handlers_1.IRoute {
    handle(message, uSocket) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!uSocket.user_id)
                return;
            const _pointer = yield this._pointerService.memoryGetById(uSocket.user_id);
            if (_pointer.areal === -1)
                return;
            const arena = yield this._arenaService._create('private');
            uSocket.send(JSON.stringify({
                event: 'battle-id',
                payload: {
                    id: arena.id
                }
            }));
        });
    }
};
BattleCreateHandler.EVENT = "battleCreate";
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ArenaService),
    __metadata("design:type", arena_service_1.ArenaService)
], BattleCreateHandler.prototype, "_arenaService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.PointerService),
    __metadata("design:type", pointer_service_1.PointerService)
], BattleCreateHandler.prototype, "_pointerService", void 0);
BattleCreateHandler = __decorate([
    (0, inversify_1.injectable)()
], BattleCreateHandler);
exports.BattleCreateHandler = BattleCreateHandler;
