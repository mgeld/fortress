import { TYPES } from "../types";
import { IRoute } from "./handlers"
import { inject, injectable } from "inversify";
import { IWebSocket } from "../api/socket/server";
import { SectorService } from "../services/sector.service";
import { PointerService } from "../services/pointer.service";

import { TSectorPayload } from "../common-types/socket/server-to-client";
import { TEventGetAboutSector, TGetAboutSectorAPI } from "../common-types/socket/client-to-server"

@injectable()
class GetAboutSectorHandler extends IRoute {
    @inject(TYPES.SectorService) private _sectorService!: SectorService
    @inject(TYPES.PointerService) private _pointerService!: PointerService

    public static EVENT: TEventGetAboutSector = "getAboutSector"

    async handle(
        message: TGetAboutSectorAPI,
        uSocket: IWebSocket,
    ) {
        const _sector = await this._sectorService.getById(message.payload.id)
        const _pointer = await this._pointerService.getById(_sector.zone_id)

        const dtoSector = _sector.unmarshal()

        // const dtoPointer = _pointer.unmarshal()
        // const zone = {
        //     id: dtoPointer.id,
        //     name: dtoPointer.name,
        //     icon: dtoPointer.icon,
        // }

        const sector: TSectorPayload = {
            number: dtoSector.number,
            areal: dtoSector.areal,
            invaders: dtoSector.invaders,
            defenders: dtoSector.defenders,
            owner: _pointer.name
        }

        uSocket.send(JSON.stringify({
            event: 'sector',
            payload: sector
        }))

    }
}

// TakeHandler.EVENT = 'take'

export {
    GetAboutSectorHandler
}