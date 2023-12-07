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
exports.VkUserRepository = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../../../../types");
let VkUserRepository = class VkUserRepository {
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [[result]] = yield this._connection.query(`SELECT * FROM vk_users WHERE user_id = ?;`, [_id]);
            if (!result) {
                throw new Error('-НУ ну сработал запрос.---------');
            }
            return result;
        });
    }
    getByIds(_ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this._connection.query(`SELECT * FROM vk_users WHERE user_id IN (?);`, [_ids]);
            if (!result) {
                throw new Error('----------');
            }
            return result;
        });
    }
    insert(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const date_reg = Math.floor(new Date().getTime() / 1000);
            const inserted = yield this._connection.execute(`
            INSERT INTO vk_users(
                user_id,
                zone_id,
                date
            )VALUES(
                ?,
                ?,
                ?
            );
        `, [
                user.user_id,
                user.zone_id,
                date_reg
            ]);
            if (!inserted) {
                throw new Error('----------');
            }
        });
    }
    setMsg(vkId, is_msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const inserted = yield this._connection.execute(`
            UPDATE vk_users SET is_msg = ? WHERE user_id = ?
        `, [
                is_msg,
                vkId
            ]);
            if (!inserted) {
                throw new Error('----------');
            }
        });
    }
    setGroup(vkId, join) {
        return __awaiter(this, void 0, void 0, function* () {
            const inserted = yield this._connection.execute(`
            UPDATE vk_users SET is_group = ? WHERE user_id = ?
        `, [
                join,
                vkId
            ]);
            if (!inserted) {
                throw new Error('----------');
            }
        });
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.connection),
    __metadata("design:type", Object)
], VkUserRepository.prototype, "_connection", void 0);
VkUserRepository = __decorate([
    (0, inversify_1.injectable)()
], VkUserRepository);
exports.VkUserRepository = VkUserRepository;
