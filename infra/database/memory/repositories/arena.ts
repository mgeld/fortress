import { injectable, inject } from 'inversify'
import { Arena, TRegistr, UnmarshalledArena } from '../../../../entities/arena/arena'
import { IArenaRepository } from '../../../../entities/repository'
import { TYPES } from '../../../../types'
import { ArenaMapper } from '../mappers/arena'
import { MemoryData } from '../memory-data'

@injectable()
export class ArenaMemoryRepository implements IArenaRepository {

    constructor(
        @inject(TYPES.Database) private _database: MemoryData
    ) { }

    async insert(arena: Arena): Promise<Arena> {
        const dtoCart = arena.unmarshal()
        const inserted = await this._database.arena.insert<UnmarshalledArena>(dtoCart)
        return ArenaMapper.toDomain(inserted)
    }

    count(): Promise<number> {
        return this._database.arena.count()
    }

    async getById(arenaId: string): Promise<Arena> {
        const arena = await this._database.arena.getById<UnmarshalledArena>(arenaId)
        if (!arena) {
            throw new Error()
        }
        return ArenaMapper.toDomain(arena)
    }

    async getForRegistrArena(registr: TRegistr): Promise<Arena> {

        const arenas = await this._database.arena.findAll<UnmarshalledArena>()
        const arena = arenas.find(a => a.registr === registr)

        if (!arena) {
            throw new Error()
        }
        return ArenaMapper.toDomain(arena)

    }

    async update(arena: Arena): Promise<Arena> {
        const dtoCart = arena.unmarshal()
        try {
            const updated = await this._database.arena.update<UnmarshalledArena>(
                dtoCart.id,
                dtoCart,
            )
            return ArenaMapper.toDomain(updated)
        } catch (e) {
            throw new Error('132388')
        }
    }

    async delete(arenaId: string): Promise<Boolean> {
        return await this._database.arena.delete(arenaId)
    }
}
