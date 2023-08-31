import { Aerial } from '../../../entities/bomb/aerial'
import { Bomb, UnmarshalledBomb } from '../../../entities/bomb/bomb'

export class BombMapper {
  public static toDomain(bomb: UnmarshalledBomb): Bomb {
    if (bomb.bomb === 1) {
      return Bomb.create({
        id: bomb.id,
        bomb: Aerial.level(bomb.level),
        counter: bomb.counter,
        status: bomb.status
      })
    }
    throw new Error('------------')
  }

}
