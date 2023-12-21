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
exports.MemberService = void 0;
const types_1 = require("../types");
const inversify_1 = require("inversify");
let MemberService = class MemberService {
    insert(member) {
        return this._repository.insert(member);
    }
    getById(userId) {
        return this._repository.getById(userId);
    }
    getByIds(userIds) {
        console.log('getByIds userIds', userIds);
        return this._repository.getByIds(userIds);
    }
    update(member) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._repository.update(member);
        });
    }
    remove(userId) {
        this._repository.delete(userId);
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.MemberMemoryRepository),
    __metadata("design:type", Object)
], MemberService.prototype, "_repository", void 0);
MemberService = __decorate([
    (0, inversify_1.injectable)()
], MemberService);
exports.MemberService = MemberService;
