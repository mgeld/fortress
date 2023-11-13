"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BombMapper = void 0;
const aerial_1 = require("../../../entities/bomb/aerial");
const bomb_1 = require("../../../entities/bomb/bomb");
class BombMapper {
    static toDomain(bomb) {
        if (bomb.bomb === 1) {
            return bomb_1.Bomb.create({
                id: bomb.id,
                bomb: aerial_1.Aerial.level(bomb.level),
                counter: bomb.counter,
                status: bomb.status
            });
        }
        throw new Error('------------');
    }
}
exports.BombMapper = BombMapper;
