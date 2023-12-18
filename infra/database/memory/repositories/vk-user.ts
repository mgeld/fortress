import { injectable, inject } from 'inversify'
import { TYPES } from '../../../../types'
import { MemoryData } from '../memory-data'

export interface IVkUser {
    id: number // zone_id
    vk_id: number
    is_msg: number
    losses: number
}

@injectable()
export class VkUserMemoryRepository {
    @inject(TYPES.Database) private _database!: MemoryData

    async getById(zoneId: number): Promise<IVkUser> {
        const zone = await this._database.vk_user.getById<IVkUser>(zoneId)
        if (!zone) {
            throw new Error('ERROOR ZoneMemoryRepository----------')
        }
        return zone
    }

    insert(user: IVkUser): boolean {
        const inserted = this._database.vk_user.insert<IVkUser>(user)
        return true
    }

    update(user: IVkUser): boolean {
        const update = this._database.vk_user.update<IVkUser>(user.id, user)
        return true
    }

    clear() {
        this._database.vk_user.clear()
    }

}
