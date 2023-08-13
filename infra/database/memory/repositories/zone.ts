import { injectable, inject } from 'inversify'
import { TYPES } from '../../../../types'
import { PointerMapper } from '../../mappers/pointer'
import { MemoryData } from '../memory-data'
import { UnmarshalledZone, Zone } from '../../../../entities/zone/zone'
import { ZoneMapper } from '../../mappers/zone'
import { IZoneMemoryRepository } from '../../../../entities/repository'

@injectable()
export class ZoneMemoryRepository implements IZoneMemoryRepository {
    @inject(TYPES.Database) private _database!: MemoryData

    async getById(userId: number): Promise<Zone> {
        const zone = await this._database.zone.getById<UnmarshalledZone>(userId)
        if (!zone) {
            throw new Error('----------')
        }
        return ZoneMapper.toDomain(zone)
    }

    async getByIds(userIds: number[]): Promise<Zone[]> {
        const zones = await this._database.zone.getByIds<UnmarshalledZone>(userIds)
        if (!zones) {
            throw new Error('----------')
        }

        return zones.map(zone => ZoneMapper.toDomain(zone))
    }

    async insert(zone: Zone): Promise<Zone> {
        const dtoZone = zone.unmarshal()
        const inserted = await this._database.zone.insert<UnmarshalledZone>(dtoZone)
        return ZoneMapper.toDomain(inserted)
    }

    async update(zone: Zone): Promise<Zone> {

        console.log('-----update zone')
        const dtoZone = zone.unmarshal()
        const updated = await this._database.zone.update<UnmarshalledZone>(
            dtoZone.id,
            dtoZone,
        )

        return ZoneMapper.toDomain(updated)
    }

    async delete(userId: number): Promise<Boolean> {
        return await this._database.zone.delete(userId)
    }

}
