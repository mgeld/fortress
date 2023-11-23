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
exports.BeamHandler = void 0;
const handlers_1 = require("./handlers");
const inversify_1 = require("inversify");
const types_1 = require("../types");
const rooms_1 = require("../api/socket/socket/rooms");
const sector_service_1 = require("../services/sector.service");
const sector_1 = require("../entities/sector/sector");
const takes_1 = require("../infra/logs/takes");
const zone_service_1 = require("../services/zone.service");
let BeamHandler = class BeamHandler extends handlers_1.IRoute {
    handle(message, uSocket) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('BeamHandler handle');
            if (!uSocket.user_id)
                return;
            let _sector;
            const zone = yield this._zoneService.getById(uSocket.user_id);
            let extrResp;
            try {
                _sector = yield this._sectorService.getById(message.payload.sector);
                let extr = null;
                console.log('_sector.booty', _sector.booty);
                if (_sector.booty) {
                    if (zone.terrain.sectors > 1) {
                        extr = sector_1.Sector.getContainerExtr(_sector.booty);
                    }
                    else {
                        extr = 110;
                        const tutorialResp = {
                            event: 'tutorial',
                            payload: {
                                type: 'hold'
                            }
                        };
                        uSocket.send(JSON.stringify(tutorialResp));
                    }
                    zone.hold.addExtrToList(extr);
                }
                extrResp = {
                    event: 'attraction',
                    payload: {
                        extr,
                        cont: _sector.booty,
                        fort: message.payload.fort,
                        pos: message.payload.position
                    }
                };
                console.log('extr', extr);
                if (extr) {
                    _sector.takenBooty();
                    this._logs.takes.add(_sector.id);
                    this._zoneService.memoryUpdate(zone);
                    this._sectorService.update(_sector);
                }
            }
            catch (e) {
                extrResp = {
                    event: 'attraction',
                    payload: {
                        extr: null,
                        cont: 0,
                        fort: null,
                        pos: message.payload.position
                    }
                };
            }
            uSocket.send(JSON.stringify(extrResp));
        });
    }
};
BeamHandler.EVENT = "beam";
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Rooms),
    __metadata("design:type", rooms_1.Rooms)
], BeamHandler.prototype, "_rooms", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ZoneService),
    __metadata("design:type", zone_service_1.ZoneService)
], BeamHandler.prototype, "_zoneService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.SectorService),
    __metadata("design:type", sector_service_1.SectorService)
], BeamHandler.prototype, "_sectorService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Logs),
    __metadata("design:type", takes_1.Logs)
], BeamHandler.prototype, "_logs", void 0);
BeamHandler = __decorate([
    (0, inversify_1.injectable)()
], BeamHandler);
exports.BeamHandler = BeamHandler;
