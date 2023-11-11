"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base64EntityIdGenerator = exports.EntityId = void 0;
const inversify_1 = require("inversify");
const uuid_1 = require("uuid");
class Base64UID {
    static generate() {
        return Buffer.from((0, uuid_1.v4)()).toString('base64');
    }
}
class EntityId {
    constructor(id) {
        this._id = id;
    }
    get id() {
        return this._id;
    }
}
exports.EntityId = EntityId;
let Base64EntityIdGenerator = class Base64EntityIdGenerator {
    nextIdEntity() {
        return new EntityId(Base64UID.generate());
    }
};
Base64EntityIdGenerator = __decorate([
    (0, inversify_1.injectable)()
], Base64EntityIdGenerator);
exports.Base64EntityIdGenerator = Base64EntityIdGenerator;
