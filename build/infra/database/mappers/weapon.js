"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeaponMapper = void 0;
const gun_1 = require("../../../entities/weapon/gun");
class WeaponMapper {
    static toDomain(weapon) {
        if (weapon.weapon === 1) {
            return gun_1.Gun.create({
                id: weapon.id,
                level: weapon.level,
                distance: weapon.distance,
                power: weapon.power,
                bullets: weapon.bullets,
                status: weapon.status
            });
        }
        throw new Error('WeaponMapper Error');
    }
}
exports.WeaponMapper = WeaponMapper;
