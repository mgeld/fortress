import { inject, injectable } from "inversify";
import { IArenaSectorMemoryRepository } from "../entities/repository";
import { TYPES } from "../types";
import { ArenaSector, TArenaSectorProps } from "../entities/arena/sector";

type TCreateSectorProps = Omit<TArenaSectorProps, 'areal'>

@injectable()
export class ArenaSectorService {
    @inject(TYPES.ArenaSectorMemoryRepository) private _memoryRepository!: IArenaSectorMemoryRepository

    create({
        id,
        latlng,
        team_id,
        arena,
    }: TCreateSectorProps): ArenaSector {
        return ArenaSector.create({
            id,
            latlng,
            team_id,
            arena
        })
    }

    memoryInsert(sector: ArenaSector): Promise<ArenaSector> {
        return this._memoryRepository.insert(sector)
    }

    getById(sectorId: string, arenaId: string): Promise<ArenaSector> {
        return this._memoryRepository.getById(sectorId, arenaId)
    }

    // getByIds(sectorIds: string[]): Promise<ArenaSector[]> {
    //     console.log('getByIds sectorIds', sectorIds)
    //     return this._memoryRepository.getByIds(sectorIds)
    // }

    async update(sector: ArenaSector) {
        await this._memoryRepository.update(sector)
    }

    remove(sectorId: string) {
        this._memoryRepository.delete(sectorId)
    }

    removeByArenas(arenas: string[]) {
        this._memoryRepository.deleteByArenas(arenas)
    }
}