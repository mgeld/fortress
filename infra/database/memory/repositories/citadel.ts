import { injectable, inject } from 'inversify'
import { ICitadelMemoryRepository } from '../../../../entities/repository'
import { TYPES } from '../../../../types'
import { MemoryData } from '../memory-data'
import { Citadel, UnmarshalledCitadel } from '../../../../entities/citadel/citadel'
import { CitadelMapper } from '../../mappers/citadel'

@injectable()
export class CitadelMemoryRepository implements ICitadelMemoryRepository {
    constructor(
        @inject(TYPES.Database) private _database: MemoryData
    ) {}

    async insert(citadel: Citadel): Promise<Citadel> {
        const dtoCitadel = citadel.unmarshal()
        const inserted = await this._database.citadel.insert<UnmarshalledCitadel>(dtoCitadel)
        return CitadelMapper.toDomain(inserted)
    }

    async getById(userId: number): Promise<Citadel> {
        const member = await this._database.citadel.getById<UnmarshalledCitadel>(userId)
        if (!member) {
            throw new Error('----------')
        }
        return CitadelMapper.toDomain(member)
    }

    async update(citadel: Citadel): Promise<Citadel> {
        const dtoCitadel = citadel.unmarshal()
        const updated = await this._database.citadel.update<UnmarshalledCitadel>(
            dtoCitadel.id,
            dtoCitadel,
        )
        return CitadelMapper.toDomain(updated)
    }

    async delete(userId: number): Promise<Boolean> {
        return await this._database.citadel.delete(userId)
    }
}
