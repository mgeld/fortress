import { injectable, inject } from 'inversify'
import { IArealMemoryRepository } from '../../../../entities/repository'
import { TYPES } from '../../../../types'
import { MemoryData } from '../memory-data'
import { Areal } from '../../../../entities/areal/areal'

@injectable()
export class ArealMemoryRepository implements IArealMemoryRepository {

    constructor(
        @inject(TYPES.Database) private _database: MemoryData
    ) { }

    async insert(areal: Areal): Promise<Areal> {
        const inserted = await this._database.areal.insert<Areal>(areal)
        return areal
    }

    async getById(arealId: number): Promise<Areal> {
        const select = await this._database.areal.getById<Areal>(arealId)
        return select
    }

}