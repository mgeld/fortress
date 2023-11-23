import { injectable, inject } from 'inversify'
import { IArenaSectorMemoryRepository } from '../../../../entities/repository'
import { TYPES } from '../../../../types'
import { MemoryData } from '../memory-data'
import { ArenaSector, UnmarshalledArenaSector } from '../../../../entities/arena/sector'
import { ArenaSectorMapper } from '../../mappers/arena-sector'

@injectable()
export class ArenaSectorMemoryRepository implements IArenaSectorMemoryRepository {

    constructor(
        @inject(TYPES.Database) private _database: MemoryData
    ) { }

    async insert(sector: ArenaSector): Promise<ArenaSector> {
        const dtoSector = sector.unmarshal()
        const inserted = await this._database.sector.insert<UnmarshalledArenaSector>(dtoSector)
        return ArenaSectorMapper.toDomain(inserted)
    }

    async inserts(sectors: UnmarshalledArenaSector[]): Promise<Boolean> {
        try {
            sectors.forEach(async sector => {
                await this._database.arenaSector.insert<UnmarshalledArenaSector>(sector)
            })
            return true
        } catch(e) {
            throw new Error('Ну, что-то пошло не так в inserts memory')
        }
    }

    async getById(sectorId: string): Promise<ArenaSector> {
        const sector = await this._database.arenaSector.getById<UnmarshalledArenaSector>(sectorId)
        if (!sector) {
            throw new Error('----------')
        }
        return ArenaSectorMapper.toDomain(sector)
    }

    async getByIds(sectorIds: string[]): Promise<ArenaSector[]> {
        const sectors = await this._database.arenaSector.getByIds<UnmarshalledArenaSector>(sectorIds)
        if (!sectors) {
            throw new Error('----------')
        }
        return sectors.map(sector => ArenaSectorMapper.toDomain(sector))
    }

    async getByArena(arena: string): Promise<UnmarshalledArenaSector[]> {
        const sectors = await this._database.arenaSector.findAll<UnmarshalledArenaSector>()
        if (!sectors) {
            throw new Error('----------')
        }
        return sectors.filter(sector => sector.arena === arena)
    }

    async update(sector: ArenaSector): Promise<ArenaSector> {

        const dtoSector = sector.unmarshal()
        const updated = await this._database.arenaSector.update<UnmarshalledArenaSector>(
            dtoSector.id,
            dtoSector,
        )

        return ArenaSectorMapper.toDomain(updated)
    }

    async delete(sectorId: string): Promise<Boolean> {
        return await this._database.arenaSector.delete(sectorId)
    }

    async getByArenasSectors(arenas: string[]): Promise<UnmarshalledArenaSector[]> {
        const sectors = await this._database.arenaSector.findAll<UnmarshalledArenaSector>()
        if (!sectors) {
            throw new Error('----------')
        }
        return sectors.filter(sector => ~arenas.findIndex(arena => sector.arena === arena))
    }

    async deleteByArenas(arenas: string[]): Promise<Boolean> {

        const _sectors = await this.getByArenasSectors(arenas)

        try {
            _sectors.forEach(async sector => {
                await this._database.arenaSector.delete(sector.id)
            })
            console.log('deleteByArenas true')
            return true
        } catch (e) {
            console.log('deleteByArenas false')
            return false
        }
    }
}
