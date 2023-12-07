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
exports.VkCallback = void 0;
const types_1 = require("../types");
const inversify_1 = require("inversify");
const rooms_1 = require("../api/socket/socket/rooms");
const vk_user_1 = require("../infra/database/mysql2/repositories/vk-user");
const zone_service_1 = require("../services/zone.service");
let VkCallback = class VkCallback {
    messageAllow(vk_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._vkUserRepository.setMsg(vk_id, 1);
            }
            catch (e) {
            }
        });
    }
    messageDeny(vk_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._vkUserRepository.setMsg(vk_id, -1);
            }
            catch (e) {
            }
        });
    }
    groupJoin(vk_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { is_group, zone_id } = yield this._vkUserRepository.getById(vk_id);
                console.log('is_group', is_group);
                if (is_group === 0) {
                    const isClient = this._rooms.areals.isCient(zone_id);
                    console.log('isClient', isClient);
                    if (isClient) {
                        const zone = yield this._zoneService.getById(zone_id);
                        console.log('zone.id', zone.id);
                        const rubies = 50;
                        const newRubies = zone.addRubies(rubies);
                        this._zoneService.memoryUpdate(zone);
                        this._rooms.areals.clientSocket(zone_id, isClient, {
                            event: 'reward',
                            payload: {
                                type: 'rubies',
                                amount: rubies
                            }
                        });
                    }
                }
                yield this._vkUserRepository.setGroup(vk_id, 1);
            }
            catch (e) {
            }
        });
    }
    groupLeave(vk_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._vkUserRepository.setGroup(vk_id, -1);
            }
            catch (e) {
            }
        });
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Rooms),
    __metadata("design:type", rooms_1.Rooms)
], VkCallback.prototype, "_rooms", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.VkUserRepository),
    __metadata("design:type", vk_user_1.VkUserRepository)
], VkCallback.prototype, "_vkUserRepository", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ZoneService),
    __metadata("design:type", zone_service_1.ZoneService)
], VkCallback.prototype, "_zoneService", void 0);
VkCallback = __decorate([
    (0, inversify_1.injectable)()
], VkCallback);
exports.VkCallback = VkCallback;
