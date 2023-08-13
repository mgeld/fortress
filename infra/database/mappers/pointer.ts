import { Pointer, UnmarshalledPointer } from '../../../entities/pointer/pointer'

export class PointerMapper {
  public static toDomain(pointer: UnmarshalledPointer): Pointer {
    return Pointer.create({
      id: pointer.id,
      zoneId: pointer.zoneId,
          
      icon: pointer.icon,
      name: pointer.name,
  
      // sectors: pointer.sectors,
      // trophies: pointer.trophies,
  
      color: pointer.color,
  
      // coins: pointer.coins,
      // rubies: pointer.rubies,

      health: pointer.health,

      invaders: pointer.invaders,
      defenders: pointer.defenders,

      pos: pointer.pos,
      
      weapons: pointer.weapons,
      areal: pointer.areal,
    })
  }
}
