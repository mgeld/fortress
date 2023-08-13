import { injectable, inject } from 'inversify'
import { TLatLng } from '../../../../common-types/model'
import { ISectorMemoryRepository } from '../../../../entities/repository'
import { Sector, UnmarshalledSector } from '../../../../entities/sector/sector'
import { TYPES } from '../../../../types'
import { SectorMapper } from '../../mappers/sector'
import { MemoryData } from '../memory-data'

@injectable()
export class SectorMemoryRepository implements ISectorMemoryRepository {

    constructor(
        @inject(TYPES.Database) private _database: MemoryData
    ) { }

    async insert(sector: Sector): Promise<Sector> {
        const dtoSector = sector.unmarshal()
        const inserted = await this._database.sector.insert<UnmarshalledSector>(dtoSector)
        return SectorMapper.toDomain(inserted)
    }

    async inserts(sectors: UnmarshalledSector[]): Promise<Boolean> {
        try {
            sectors.forEach(async sector => {
                await this._database.sector.insert<UnmarshalledSector>(sector)
            })
            return true
        } catch(e) {
            throw new Error('Ну, что-то пошло не так в inserts memory')
        }
    }

    async getBoundsSectors(bounds: [TLatLng, TLatLng]): Promise<UnmarshalledSector[]> {

        const sectors = await this._database.sector.findAll<UnmarshalledSector>()
        if (sectors.length < 1) {
            console.log('1 sectors', sectors)
            throw new Error('1 error sectors')
        }
        return sectors.filter(sector => {
            return sector.latlng[0] > bounds[0][0] && sector.latlng[0] < bounds[1][0] &&
                sector.latlng[1] > bounds[0][1] && sector.latlng[1] < bounds[1][1]
        })
    }

    async getById(sectorId: string): Promise<Sector> {
        const sector = await this._database.sector.getById<UnmarshalledSector>(sectorId)
        if (!sector) {
            throw new Error('----------')
        }
        return SectorMapper.toDomain(sector)
    }

    async getByIds(sectorIds: string[]): Promise<Sector[]> {
        const sectors = await this._database.sector.getByIds<UnmarshalledSector>(sectorIds)
        if (!sectors) {
            throw new Error('----------')
        }
        return sectors.map(sector => SectorMapper.toDomain(sector))
    }

    async getByAreal(areal: number): Promise<UnmarshalledSector[]> {
        const sectors = await this._database.sector.findAll<UnmarshalledSector>()
        if (!sectors) {
            throw new Error('----------')
        }
        return sectors.filter(sector => sector.areal === areal)
    }

    async getByArealsSectors(areals: number[]): Promise<UnmarshalledSector[]> {
        const sectors = await this._database.sector.findAll<UnmarshalledSector>()
        if (!sectors) {
            throw new Error('----------')
        }
        return sectors.filter(sector => ~areals.findIndex(areal => sector.areal === areal))
    }

    async update(sector: Sector): Promise<Sector> {

        const dtoSector = sector.unmarshal()
        const updated = await this._database.sector.update<UnmarshalledSector>(
            dtoSector.id,
            dtoSector,
        )

        return SectorMapper.toDomain(updated)
    }

    async delete(sectorId: string): Promise<Boolean> {
        return await this._database.sector.delete(sectorId)
    }

    async deleteByAreals(areals: number[]): Promise<Boolean> {

        const _sectors = await this.getByArealsSectors(areals)

        try {
            _sectors.forEach(async sector => {
                await this._database.sector.delete(sector.id)
            })
            console.log('deleteByAreals true')
            return true
        } catch (e) {
            console.log('deleteByAreals false')
            return false
        }
    }
}
