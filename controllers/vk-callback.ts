import { TYPES } from "../types";
import { inject, injectable } from "inversify";
import { Rooms } from "../api/socket/socket/rooms";
import { VkUserRepository } from "../infra/database/mysql2/repositories/vk-user";
import { ZoneService } from "../services/zone.service";

@injectable()
class VkCallback {
    @inject(TYPES.Rooms) private _rooms!: Rooms
    @inject(TYPES.VkUserRepository) private _vkUserRepository!: VkUserRepository
    @inject(TYPES.ZoneService) private _zoneService!: ZoneService

    async messageAllow(vk_id: number) {
        try {
            // const { zone_id: zoneId } = await this._vkUserRepository.getById(vk_id)
            await this._vkUserRepository.setMsg(vk_id, 1)
        } catch (e) {

        }
    }

    async messageDeny(vk_id: number) {
        try {
            // const { zone_id: zoneId } = await this._vkUserRepository.getById(vk_id)
            await this._vkUserRepository.setMsg(vk_id, -1)
        } catch (e) {

        }
    }

    async groupJoin(vk_id: number) {
        try {
            const { is_group, zone_id } = await this._vkUserRepository.getById(vk_id)

            if (is_group === 0) {

                const isClient = this._rooms.areals.isCient(zone_id)

                if (isClient) {

                    const zone = await this._zoneService.getById(zone_id)

                    const rubies = 50

                    const newRubies = zone.addRubies(rubies)
                    this._zoneService.memoryUpdate(zone)

                    this._rooms.areals.clientSocket(zone_id, isClient, {
                        event: 'reward',
                        payload: {
                            type: 'rubies',
                            amount: rubies
                        }
                    })
                }
            }

            await this._vkUserRepository.setGroup(vk_id, 1)
        } catch (e) {

        }
    }

    async groupLeave(vk_id: number) {
        try {
            // const { zone_id: zoneId } = await this._vkUserRepository.getById(vk_id)
            await this._vkUserRepository.setGroup(vk_id, -1)
        } catch (e) {

        }
    }
}

export {
    VkCallback
}