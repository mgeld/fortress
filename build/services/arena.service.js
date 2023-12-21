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
exports.ArenaService = void 0;
const types_1 = require("../types");
const inversify_1 = require("inversify");
const arena_1 = require("../entities/arena/arena");
const arena_team_1 = require("../entities/arena/arena-team");
const arena_place_1 = require("../entities/arena/arena-place");
let ArenaService = class ArenaService {
    getArena() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const arena = yield this._memoryRepository.getForRegistrArena('open');
                return arena;
            }
            catch (e) {
                return this._create();
            }
        });
    }
    _create() {
        return __awaiter(this, void 0, void 0, function* () {
            const placeArena = arena_place_1.ArenaPlace.nextPlace();
            const arena = arena_1.Arena.create({
                id: this._entityId.nextIdEntity().id,
                place: placeArena,
                registr: 'open',
                status: 'pending',
                teams: [
                    arena_team_1.Team.create({ id: 1 }),
                    arena_team_1.Team.create({ id: 2 }),
                ]
            });
            const _arena = yield this._memoryRepository.insert(arena);
            return _arena;
        });
    }
    getById(arenaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const arena = yield this._memoryRepository.getById(arenaId);
            return arena;
        });
    }
    remove(arenaId) {
        return this._memoryRepository.delete(arenaId);
    }
    update(arena) {
        return this._memoryRepository.update(arena);
    }
    deleteArenas(arenas) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._memoryRepository.deleteArenas(arenas);
        });
    }
    mysqlInsertArena(arena) {
        this._mysqlRepository.insertArena(arena);
    }
    mysqlInsertsMembers(members) {
        this._mysqlRepository.insertsMember(members);
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ArenaRepository),
    __metadata("design:type", Object)
], ArenaService.prototype, "_mysqlRepository", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Base64EntityIdGenerator),
    __metadata("design:type", Object)
], ArenaService.prototype, "_entityId", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ArenaMemoryRepository),
    __metadata("design:type", Object)
], ArenaService.prototype, "_memoryRepository", void 0);
ArenaService = __decorate([
    (0, inversify_1.injectable)()
], ArenaService);
exports.ArenaService = ArenaService;
