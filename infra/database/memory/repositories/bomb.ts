import { injectable, inject } from 'inversify'
import { IBombMemoryRepository } from '../../../../entities/repository'
import { TYPES } from '../../../../types'
import { MemoryData } from '../memory-data'
import { Bomb, UnmarshalledBomb } from '../../../../entities/bomb/bomb'
import { BombMapper } from '../../mappers/bomb'

@injectable()
export class BombMemoryRepository implements IBombMemoryRepository {
    @inject(TYPES.Database) private _database!: MemoryData

    async getBombs(ids: string[]): Promise<Bomb[]> {
        const bombs = await this._database.bomb.getByIds<UnmarshalledBomb>(ids)
        if (!bombs) {
            throw new Error('----------')
        }
        return bombs.map(bomb => BombMapper.toDomain(bomb))
    }

    async getById(id: string): Promise<Bomb> {
        const bomb = await this._database.bomb.getById<UnmarshalledBomb>(id)
        if (!bomb) {
            throw new Error('----------')
        }
        return BombMapper.toDomain(bomb)

    }

    async insert(bomb: Bomb): Promise<Bomb> {
        const dtoBomb = bomb.unmarshal()
        const inserted = await this._database.bomb.insert<UnmarshalledBomb>(dtoBomb)
        return BombMapper.toDomain(inserted)
    }

    async update(bomb: Bomb): Promise<Bomb> {
        const dtoBomb = bomb.unmarshal()
        const updated = await this._database.bomb.update<UnmarshalledBomb>(
            dtoBomb.id,
            dtoBomb,
        )

        return BombMapper.toDomain(updated)
    }

    async delete(userId: string): Promise<Boolean> {
        return await this._database.bomb.delete(userId)
    }

}
