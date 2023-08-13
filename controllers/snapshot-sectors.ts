
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { Logs } from "../infra/logs/takes";
import { Rooms } from "../api/socket/socket/rooms";
import { SectorService } from "../services/sector.service";

@injectable()
class SnapshotSectors {
    @inject(TYPES.Logs) private _logs!: Logs
    @inject(TYPES.Rooms) private _rooms!: Rooms
    @inject(TYPES.SectorService) private _sectorService!: SectorService

    constructor() {}

    getInactiveAreals() {
        return this._rooms.areals.getInactiveRooms()
    }

    clearInactiveAreals() {
        const areals = this.getInactiveAreals()
        this._rooms.areals.clearRooms(areals)
        this._sectorService.removeByAreals(areals)
    }

    async saveSectorsToBase() {
        console.log('saveSectorsToBase')
        const takes = this.getLogsTakes()
        this.clearLogsTakes()
        const sectors = await this._sectorService.getByIds(takes)
        await this._sectorService.baseInserts(sectors)
    }

    getLogsTakes(): string[] {
        return this._logs.takes.get()
    }

    clearLogsTakes() {
        return this._logs.takes.clear()
    }

}

export {
    SnapshotSectors
}