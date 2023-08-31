import { inject, injectable } from "inversify";
import { EntityIdGenerator } from "../domain/entityId";
import { Arena } from "../entities/arena/arena";
import { IArenaRepository } from "../entities/repository";
import { TYPES } from "../types";
import { Team } from "../entities/arena/arena-team";
import { ArenaPlace } from "../entities/arena/arena-place";

@injectable()
export class ArenaService {
    @inject(TYPES.ArenaMemoryRepository) private _repository!: IArenaRepository
    @inject(TYPES.Base64EntityIdGenerator) private _entityId!: EntityIdGenerator

    async getArena(): Promise<Arena> {
        try {
            const arena = await this._repository.getForRegistrArena('open')
            return arena
        } catch (e) {
            return this._create()
        }
    }

    async _create(): Promise<Arena> {
        const placeArena = ArenaPlace.nextPlace()
        const arena = Arena.create({
            id: this._entityId.nextIdEntity().id,
            place: placeArena,
            registr: 'open',
            status: 'pending',
            teams: [
                Team.create({ id: 1 }),
                Team.create({ id: 2 }),
            ]
        })
        const _arena = await this._repository.insert(arena)
        return _arena
    }


    async getById(arenaId: string): Promise<Arena> {
        const arena = await this._repository.getById(arenaId)
        return arena
    }

    remove(arenaId: string): Promise<Boolean> {
        return this._repository.delete(arenaId)
    }

    update(arena: Arena): Promise<Arena> {
        return this._repository.update(arena)
    }
}