import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { Logs } from "../infra/logs/takes";
import { Rooms } from "../api/socket/socket/rooms";
import { SectorService } from "../services/sector.service";
// import { VkUserRepository } from "../infra/database/mysql2/repositories/vk-user";
// import { Sector } from "../entities/sector/sector";

@injectable()
class SnapshotAreals {
    @inject(TYPES.Logs) private _logs!: Logs
    @inject(TYPES.Rooms) private _rooms!: Rooms
    @inject(TYPES.SectorService) private _sectorService!: SectorService
    // @inject(TYPES.VkUserRepository) private _vkUserRepository!: VkUserRepository

    constructor() {}

    getInactiveAreals(): number[] {
        return this._rooms.areals.getInactiveRooms() as number[]
    }

    clearInactiveAreals() {
        const areals: number[] = this.getInactiveAreals()
        this._rooms.areals.clearRooms(areals)
        // Очищаем все сектора с этого ареала
        this._sectorService.removeByAreals(areals)
    }

    async saveSectorsToBase() {
        const takes = this.getLogsTakes()
        this.clearLogsTakes()
        const sectors = await this._sectorService.getByIds(takes)

        await this._sectorService.baseInserts(sectors)
    }

    // async sendVkMsgs(sectors: Sector[]) {
    //     const zones: Record<number, number> = {}

    //     sectors.forEach(sector => {
    //         zones[sector.zone_id] = zones[sector.zone_id] ? zones[sector.zone_id] + 1 : 1
    //     })

    //     const vkUsers = await this._vkUserRepository.getByZoneIds(Object.keys(zones).map(key => parseInt(key)))

    //     const users = vkUsers.filter(user => user.is_msg === 1)
    
    // }

    getLogsTakes(): string[] {
        return this._logs.takes.get()
    }

    clearLogsTakes() {
        return this._logs.takes.clear()
    }

}

export {
    SnapshotAreals
}