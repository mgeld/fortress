"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const connection = promise_1.default.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '12345',
    database: 'musa',
    multipleStatements: true
});
exports.default = connection;
