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
exports.PointerService = void 0;
const inversify_1 = require("inversify");
const pointer_1 = require("../entities/pointer/pointer");
const types_1 = require("../types");
const random_number_1 = require("../libs/random-number");
const user_1 = require("../entities/pointer/user");
let PointerService = class PointerService {
    memoryInsert(pointer) {
        return this._memoryRepository.insert(pointer);
    }
    baseInsert(pointer) {
        return this._baseRepository.insert(pointer);
    }
    memoryGetById(userId) {
        return this._memoryRepository.getById(userId);
    }
    baseGetById(userId) {
        console.log('baseGetById userId', userId);
        return this._baseRepository.getById(userId);
    }
    create(zoneId, pos, name, icon, weapon) {
        const DEFAULT_HEALTH = 100;
        const DEFAULT_COLOR = (0, random_number_1.randomNumber)(1, 6);
        console.log('DEFAULT_COLOR', DEFAULT_COLOR);
        const DEFAULT_INVADERS = 100;
        const DEFAULT_DEFENDERS = 100;
        const pointer = pointer_1.Pointer.create({
            zoneId,
            level: 1,
            user: user_1.User.create({
                icon,
                name,
            }),
            health: DEFAULT_HEALTH,
            color: DEFAULT_COLOR,
            weapons: [weapon.id],
            pos
        });
        return pointer;
    }
    getByIds(userIds) {
        console.log('getByIds');
        return this._memoryRepository.getByIds(userIds);
    }
    getZoneByIds(_ids) {
        return this._baseRepository.getZoneByIds(_ids);
    }
    memoryUpdate(pointer) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('memoryUpdate pointer.level', pointer.level);
            yield this._memoryRepository.update(pointer);
        });
    }
    baseUpdate(pointer) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._baseRepository.update(pointer);
        });
    }
    remove(userId) {
        this._memoryRepository.delete(userId);
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.PointerMemoryRepository),
    __metadata("design:type", Object)
], PointerService.prototype, "_memoryRepository", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.PointerRepository),
    __metadata("design:type", Object)
], PointerService.prototype, "_baseRepository", void 0);
PointerService = __decorate([
    (0, inversify_1.injectable)()
], PointerService);
exports.PointerService = PointerService;