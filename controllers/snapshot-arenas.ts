import { TYPES } from "../types"
import { inject, injectable } from "inversify"
import { Rooms } from "../api/socket/socket/rooms"
import { ArenaService } from "../services/arena.service"
import { ArenaSectorService } from "../services/arena-sector.service"

@injectable()
class SnapshotArenas {
    @inject(TYPES.Rooms) private _rooms!: Rooms
    @inject(TYPES.ArenaService) private _arenaService!: ArenaService
    @inject(TYPES.ArenaSectorService) private _sectorService!: ArenaSectorService

    getInactiveArenas(): string[]{
        return this._rooms.areals.getInactiveRooms() as string[]
    }

    async clearInactiveArenas() {
        const inactiveArenas = this.getInactiveArenas()
        this._rooms.areals.clearRooms(inactiveArenas)

        // Очищаем все сектора с этой арены
        this._sectorService.removeByArenas(inactiveArenas)

        const arenas = await this._arenaService.deleteArenas(inactiveArenas)

        // const arenaIds = arenas.map(arena => arena.id)

    }

}

export {
    SnapshotArenas
}