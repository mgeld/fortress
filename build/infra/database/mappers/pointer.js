"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointerMapper = void 0;
const pointer_1 = require("../../../entities/pointer/pointer");
const user_1 = require("../../../entities/pointer/user");
class PointerMapper {
    static toDomain(pointer) {
        return pointer_1.Pointer.create({
            zoneId: pointer.id,
            level: pointer.level,
            user: user_1.User.create({
                icon: pointer.user.icon,
                name: pointer.user.name
            }),
            color: pointer.color,
            health: pointer.health,
            pos: pointer.pos,
            weapons: pointer.weapons,
            bombs: pointer.bombs,
            areal: pointer.areal,
        });
    }
}
exports.PointerMapper = PointerMapper;
