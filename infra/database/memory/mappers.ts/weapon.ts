import { Gun } from '../../../../entities/weapon/gun'
import { UnmarshalledWeapon, Weapon } from '../../../../entities/weapon/weapon'

export class WeaponMapper {

  public static toDomain(weapon: UnmarshalledWeapon): Weapon {
    if (weapon.weapon === 'gun') {
      return Weapon.create({
        id: weapon.id,
        weapon: Gun.level(weapon.level),
        bullets: weapon.bullets,
        status: weapon.status
      })
    }

    throw new Error('------------')

  }

}
