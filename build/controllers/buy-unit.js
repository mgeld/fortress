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
exports.BuyUnitHandler = void 0;
const handlers_1 = require("./handlers");
const inversify_1 = require("inversify");
const types_1 = require("../types");
const zone_service_1 = require("../services/zone.service");
const units_1 = require("../entities/units/units");
let BuyUnitHandler = class BuyUnitHandler extends handlers_1.IRoute {
    handle(message, uSocket) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('BuyUnitHandler handle');
            if (!uSocket.user_id)
                return;
            const zone = yield this._zoneService.getById(uSocket.user_id);
            const cost = units_1.Units.getUnitPrice(message.payload.id);
            let isSpend = 0;
            if (cost.currency === 'coins') {
                isSpend = zone.spendСoins(cost.price);
            }
            else if (cost.currency === 'rubies') {
                isSpend = zone.spendRubies(cost.price);
            }
            if (isSpend < 0) {
                const limitResp = {
                    event: 'limit',
                    payload: {
                        gives: cost.currency
                    }
                };
                uSocket.send(JSON.stringify(limitResp));
                return;
            }
            const extr = zone.hold.addExtrToList(message.payload.id);
            this._zoneService.memoryUpdate(zone);
            const extrResp = {
                event: 'buy-unit',
                payload: {
                    type: message.payload.id,
                    currency: cost.currency,
                    cost: cost.price,
                    unit: message.payload.id
                }
            };
            uSocket.send(JSON.stringify(extrResp));
        });
    }
};
BuyUnitHandler.EVENT = "buyUnit";
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ZoneService),
    __metadata("design:type", zone_service_1.ZoneService)
], BuyUnitHandler.prototype, "_zoneService", void 0);
BuyUnitHandler = __decorate([
    (0, inversify_1.injectable)()
], BuyUnitHandler);
exports.BuyUnitHandler = BuyUnitHandler;
