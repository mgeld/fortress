import { Pointer, UnmarshalledPointer } from '../../../entities/pointer/pointer'
import { User } from '../../../entities/pointer/user'

export class PointerMapper {
  public static toDomain(pointer: UnmarshalledPointer): Pointer {
    return Pointer.create({
      zoneId: pointer.id,

      level: pointer.level,

      user: User.create({
        icon: pointer.user.icon,
        name: pointer.user.name
      }),
      
      color: pointer.color,

      health: pointer.health,

      pos: pointer.pos,
      
      weapons: pointer.weapons,

      bombs: pointer.bombs,
      areal: pointer.areal,
    })
  }
}
