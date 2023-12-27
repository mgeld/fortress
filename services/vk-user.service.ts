import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { IVkUser, VkUserMemoryRepository } from "../infra/database/memory/repositories/vk-user";
import { IVkUserRowData, VkUserRepository } from "../infra/database/mysql2/repositories/vk-user";
import { TZoneAbduction } from "../common-types/model";

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
        if (zone.ufo) vk_user.ufo = zone.ufo

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

    async getAbduction(zone_id: number): Promise<TZoneAbduction[]> {
        const zone = await this._baseRepository.getAbduction({
            ufo_id: zone_id,
            page: 1
        })
        return zone
    }

    async baseInsert({
        vk_id,
        zone_id,
        ufo
    }: {
        vk_id: number,
        zone_id: number
        ufo?: number
    }) {
        await this._baseRepository.insert({
            user_id: vk_id,
            zone_id: zone_id,
            is_msg: 0,
            is_group: 0,
            ufo: ufo || 0
        })
    }

    async baseGetByZoneId(userId: number): Promise<IVkUserRowData> {
        const zone = await this._baseRepository.getByZoneId(userId)
        return zone
    }

    clear() {
        this._memoryRepository.clear()
    }
}