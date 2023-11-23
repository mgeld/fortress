import { TYPES } from "../types";
import { inject, injectable } from "inversify";
import { Rooms } from "../api/socket/socket/rooms";
import { ArenaSectorService } from "../services/arena-sector.service";

@injectable()
class SnapshotArenas {
    @inject(TYPES.Rooms) private _rooms!: Rooms
    @inject(TYPES.ArenaSectorService) private _sectorService!: ArenaSectorService

    constructor() {}

    getInactiveArenas(): string[]{
        return this._rooms.areals.getInactiveRooms() as string[]
    }

    clearInactiveArenas() {
        const arenas = this.getInactiveArenas()
        this._rooms.areals.clearRooms(arenas)
        // Очищаем все сектора с этой арены
        this._sectorService.removeByArenas(arenas)
    }
}

export {
    SnapshotArenas
}