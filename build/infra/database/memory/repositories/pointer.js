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
exports.PointerMemoryRepository = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../../../../types");
const pointer_1 = require("../../mappers/pointer");
const memory_data_1 = require("../memory-data");
let PointerMemoryRepository = class PointerMemoryRepository {
    getById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pointer = yield this._database.pointer.getById(userId);
            if (!pointer) {
                throw new Error('----------');
            }
            return pointer_1.PointerMapper.toDomain(pointer);
        });
    }
    getByIds(userIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const pointers = yield this._database.pointer.getByIds(userIds);
            if (!pointers) {
                throw new Error('----------');
            }
            return pointers.map(pointer => pointer_1.PointerMapper.toDomain(pointer));
        });
    }
    insert(pointer) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtoPointer = pointer.unmarshal();
            const inserted = yield this._database.pointer.insert(dtoPointer);
            return pointer_1.PointerMapper.toDomain(inserted);
        });
    }
    update(pointer) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtoPointer = pointer.unmarshal();
            const updated = yield this._database.pointer.update(dtoPointer.id, dtoPointer);
            return pointer_1.PointerMapper.toDomain(updated);
        });
    }
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._database.pointer.delete(userId);
        });
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Database),
    __metadata("design:type", memory_data_1.MemoryData)
], PointerMemoryRepository.prototype, "_database", void 0);
PointerMemoryRepository = __decorate([
    (0, inversify_1.injectable)()
], PointerMemoryRepository);
exports.PointerMemoryRepository = PointerMemoryRepository;
