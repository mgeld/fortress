import { Pointer, UnmarshalledPointer } from '../../../entities/pointer/pointer'

export class PointerMapper {
  public static toDomain(pointer: UnmarshalledPointer): Pointer {
    return Pointer.create({
      zoneId: pointer.id,
          
      icon: pointer.icon,
      name: pointer.name,
  
      color: pointer.color,

      health: pointer.health,

      // invaders: pointer.invaders,

      pos: pointer.pos,
      
      weapons: pointer.weapons,
      bombs: pointer.bombs,
      areal: pointer.areal,
    })
  }
}
