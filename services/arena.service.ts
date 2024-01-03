import { TYPES } from "../types";
import { inject, injectable } from "inversify";
import { Arena, UnmarshalledArena } from "../entities/arena/arena";
import { Team } from "../entities/arena/arena-team";
import { EntityIdGenerator } from "../domain/entityId";
import { ArenaPlace } from "../entities/arena/arena-place";
import { IArenaMemoryRepository, IArenaRepository } from "../entities/repository";
import { Member } from "../entities/arena/arena-team-member";

@injectable()
export class ArenaService {
    @inject(TYPES.ArenaRepository) private _mysqlRepository!: IArenaRepository
    @inject(TYPES.Base64EntityIdGenerator) private _entityId!: EntityIdGenerator
    @inject(TYPES.ArenaMemoryRepository) private _memoryRepository!: IArenaMemoryRepository

    async getArena(): Promise<Arena> {
        try {
            const arena = await this._memoryRepository.getForRegistrArena('open')
            return arena
        } catch (e) {
            return this._create()
        }
    }

    async _create(reg?: 'open' | 'private'): Promise<Arena> {
        const placeArena = ArenaPlace.nextPlace()
        const arena = Arena.create({
            id: this._entityId.nextIdEntity().id,
            place: placeArena,
            registr: reg || 'open',
            status: 'pending',
            teams: [
                Team.create({ id: 1 }),
                Team.create({ id: 2 }),
            ]
        })
        const _arena = await this._memoryRepository.insert(arena)
        return _arena
    }


    async getById(arenaId: string): Promise<Arena> {
        const arena = await this._memoryRepository.getById(arenaId)
        return arena
    }

    remove(arenaId: string): Promise<Boolean> {
        return this._memoryRepository.delete(arenaId)
    }

    update(arena: Arena): Promise<Arena> {
        return this._memoryRepository.update(arena)
    }

    // async getOverUnmarshalledArena(): Promise<UnmarshalledArena[]> {
    //     const arenas = await this._memoryRepository.getOverUnmarshalledArena()
    //     return arenas
    // }

    async deleteArenas(arenas: string[]) {
        await this._memoryRepository.deleteArenas(arenas)
    }

    mysqlInsertArena(arena: Arena) {
        this._mysqlRepository.insertArena(arena)
    }

    // mysqlInsertsTeam(teams: Team[]) {
    //     this._mysqlRepository.insertsTeam(teams)
    // }

    mysqlInsertsMembers(members: Member[]) {
        this._mysqlRepository.insertsMember(members)
    }

}