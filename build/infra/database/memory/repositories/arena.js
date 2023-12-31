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
exports.ArenaMemoryRepository = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../../../../types");
const arena_1 = require("../../mappers/arena");
const memory_data_1 = require("../memory-data");
let ArenaMemoryRepository = class ArenaMemoryRepository {
    insert(arena) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtoCart = arena.unmarshal();
            const inserted = yield this._database.arena.insert(dtoCart);
            return arena_1.ArenaMapper.toDomain(inserted);
        });
    }
    count() {
        return this._database.arena.count();
    }
    getById(arenaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const arena = yield this._database.arena.getById(arenaId);
            if (!arena) {
                throw new Error();
            }
            return arena_1.ArenaMapper.toDomain(arena);
        });
    }
    getForRegistrArena(registr) {
        return __awaiter(this, void 0, void 0, function* () {
            const arenas = yield this._database.arena.findAll();
            const arena = arenas.find(a => a.registr === registr);
            if (!arena) {
                throw new Error();
            }
            return arena_1.ArenaMapper.toDomain(arena);
        });
    }
    getOverUnmarshalledArena() {
        return __awaiter(this, void 0, void 0, function* () {
            const arenas = yield this._database.arena.findAll();
            const _arenas = arenas.filter(a => a.status === 'over');
            if (!_arenas) {
                throw new Error();
            }
            return arenas;
        });
    }
    update(arena) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtoArena = arena.unmarshal();
            try {
                const updated = yield this._database.arena.update(dtoArena.id, dtoArena);
                return arena_1.ArenaMapper.toDomain(updated);
            }
            catch (e) {
                throw new Error('132388');
            }
        });
    }
    delete(arenaId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._database.arena.delete(arenaId);
        });
    }
    deleteArenas(arenas) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                arenas.forEach((arena) => __awaiter(this, void 0, void 0, function* () {
                    yield this.delete(arena);
                }));
                console.log('deleteArenas true');
                return true;
            }
            catch (e) {
                console.log('deleteArenas false');
                return false;
            }
        });
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Database),
    __metadata("design:type", memory_data_1.MemoryData)
], ArenaMemoryRepository.prototype, "_database", void 0);
ArenaMemoryRepository = __decorate([
    (0, inversify_1.injectable)()
], ArenaMemoryRepository);
exports.ArenaMemoryRepository = ArenaMemoryRepository;
