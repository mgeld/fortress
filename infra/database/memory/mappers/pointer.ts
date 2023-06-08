import { Pointer, UnmarshalledPointer } from '../../../../entities/pointer/pointer'

export class PointerMapper {
  public static toDomain(pointer: UnmarshalledPointer): Pointer {
    return Pointer.create({
      userId: pointer.userId,
      health: pointer.health,
      pos: pointer.pos,
      weapons: pointer.weapons,
      areal: pointer.areal,
      // arena: pointer.arena,
      // arenaTeam: pointer.arenaTeam,
    })
  }
}
