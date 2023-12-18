import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { IVkUser, VkUserMemoryRepository } from "../infra/database/memory/repositories/vk-user";
import { IVkUserRowData, VkUserRepository } from "../infra/database/mysql2/repositories/vk-user";

@injectable()
export class VkUserService {
    @inject(TYPES.VkUserRepository) private _baseRepository!: VkUserRepository
    @inject(TYPES.VkUserMemoryRepository) private _memoryRepository!: VkUserMemoryRepository

    memoryInsert(zone: IVkUserRowData): IVkUser {
        const vk_user: IVkUser = {
            id: zone.zone_id,
            vk_id: zone.user_id,
            is_msg: zone.is_msg,
            losses: 0
        }
        this._memoryRepository.insert(vk_user)
        return vk_user
    }

    memoryUpdate(zone: IVkUser) {
        this._memoryRepository.update(zone)
    }

    async getById(userId: number): Promise<IVkUser> {
        try {
            const zone = await this.memoryGetById(userId)
            return zone
        } catch (e) {
            const zone = await this.baseGetByZoneId(userId)
            return this.memoryInsert(zone)
        }
    }

    async memoryGetById(userId: number): Promise<IVkUser> {
        try {
            const zone = await this._memoryRepository.getById(userId)
            return zone
        } catch (e) {
            throw new Error('ZoneService memoryGetById catch throw')
        }
    }

    async baseGetById(userId: number): Promise<IVkUserRowData> {
        const zone = await this._baseRepository.getById(userId)
        return zone
    }

    async baseGetByZoneId(userId: number): Promise<IVkUserRowData> {
        const zone = await this._baseRepository.getByZoneId(userId)
        return zone
    }

    clear() {
        this._memoryRepository.clear()
    }
}