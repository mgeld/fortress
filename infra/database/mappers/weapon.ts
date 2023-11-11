import { Gun } from '../../../entities/weapon/gun'
import { UnmarshalledWeapon, WeaponType } from '../../../entities/weapon/types'
// import { UnmarshalledWeapon, Weapon } from '../../../entities/weapon/weapon'

export class WeaponMapper {

  public static toDomain(weapon: UnmarshalledWeapon): WeaponType {
    if (weapon.weapon === 1) {
      return Gun.create({
        id: weapon.id,
        level: weapon.level,
        distance: weapon.distance,
        power: weapon.power,
        bullets: weapon.bullets,
        status: weapon.status
      })
    }
    throw new Error('WeaponMapper Error')

  }

}