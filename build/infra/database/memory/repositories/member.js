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
exports.MemberMemoryRepository = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../../../../types");
const member_1 = require("../../mappers/member");
const memory_data_1 = require("../memory-data");
let MemberMemoryRepository = class MemberMemoryRepository {
    constructor(_database) {
        this._database = _database;
    }
    insert(member) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtoMember = member.unmarshal();
            const inserted = yield this._database.arenaTeamMember.insert(dtoMember);
            return member_1.MemberMapper.toDomain(inserted);
        });
    }
    getById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const member = yield this._database.arenaTeamMember.getById(userId);
            if (!member) {
                throw new Error('----------');
            }
            return member_1.MemberMapper.toDomain(member);
        });
    }
    getByIds(userIds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const members = yield this._database.arenaTeamMember.getByIds(userIds);
                return members.map(member => member_1.MemberMapper.toDomain(member));
            }
            catch (e) {
                return [];
            }
        });
    }
    update(member) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtoMember = member.unmarshal();
            const updated = yield this._database.arenaTeamMember.update(dtoMember.id, dtoMember);
            return member_1.MemberMapper.toDomain(updated);
        });
    }
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._database.arenaTeamMember.delete(userId);
        });
    }
};
MemberMemoryRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.Database)),
    __metadata("design:paramtypes", [memory_data_1.MemoryData])
], MemberMemoryRepository);
exports.MemberMemoryRepository = MemberMemoryRepository;
