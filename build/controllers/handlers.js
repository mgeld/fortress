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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handlers = exports.IRoute = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../types");
require("reflect-metadata");
let IRoute = class IRoute {
};
IRoute = __decorate([
    (0, inversify_1.injectable)()
], IRoute);
exports.IRoute = IRoute;
let Handlers = class Handlers {
    constructor(fire, take, battleTake, beam, direct, connect, battleJoin, battleLeave, battleFire, battleDirect, getSectors, getAboutSector, battleGetAboutSector, getUser, useExtraction, buyUnit, levelUp) {
        this.fire = fire;
        this.take = take;
        this.battleTake = battleTake;
        this.beam = beam;
        this.direct = direct;
        this.connect = connect;
        this.battleJoin = battleJoin;
        this.battleLeave = battleLeave;
        this.battleFire = battleFire;
        this.battleDirect = battleDirect;
        this.getSectors = getSectors;
        this.getAboutSector = getAboutSector;
        this.battleGetAboutSector = battleGetAboutSector;
        this.getUser = getUser;
        this.useExtraction = useExtraction;
        this.buyUnit = buyUnit;
        this.levelUp = levelUp;
    }
    handle(uSocket) {
        return (message) => {
            const _message = JSON.parse(message);
            if (!this[_message.event]) {
                throw new Error('2 Передан несуществующий обработчик');
            }
            this[_message.event].handle(_message, uSocket);
        };
    }
};
Handlers = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.FireHandler)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.TakeHandler)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.BattleTakeHandler)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.BeamHandler)),
    __param(4, (0, inversify_1.inject)(types_1.TYPES.DirectHandler)),
    __param(5, (0, inversify_1.inject)(types_1.TYPES.ConnectHandler)),
    __param(6, (0, inversify_1.inject)(types_1.TYPES.BattleJoinHandler)),
    __param(7, (0, inversify_1.inject)(types_1.TYPES.BattleLeaveHandler)),
    __param(8, (0, inversify_1.inject)(types_1.TYPES.BattleFireHandler)),
    __param(9, (0, inversify_1.inject)(types_1.TYPES.BattleDirectHandler)),
    __param(10, (0, inversify_1.inject)(types_1.TYPES.GetSectorsHandler)),
    __param(11, (0, inversify_1.inject)(types_1.TYPES.GetAboutSectorHandler)),
    __param(12, (0, inversify_1.inject)(types_1.TYPES.BattleGetAboutSectorHandler)),
    __param(13, (0, inversify_1.inject)(types_1.TYPES.GetUserHandler)),
    __param(14, (0, inversify_1.inject)(types_1.TYPES.UseExtractionHandler)),
    __param(15, (0, inversify_1.inject)(types_1.TYPES.BuyUnitHandler)),
    __param(16, (0, inversify_1.inject)(types_1.TYPES.LevelUpHandler)),
    __metadata("design:paramtypes", [IRoute,
        IRoute,
        IRoute,
        IRoute,
        IRoute,
        IRoute,
        IRoute,
        IRoute,
        IRoute,
        IRoute,
        IRoute,
        IRoute,
        IRoute,
        IRoute,
        IRoute,
        IRoute,
        IRoute])
], Handlers);
exports.Handlers = Handlers;
