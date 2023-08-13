import { TEventGetAboutSector, TGetAboutSectorAPI } from "../common-types/socket/client-to-server"
import { IWebSocket } from "../api/socket/server";
import { IRoute } from "./handlers"
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { SectorService } from "../services/sector.service";
import { TSectorPayload } from "../common-types/socket/server-to-client";
// import { PointerService } from "../services/pointer.service";

@injectable()
class GetAboutSectorHandler extends IRoute {
    @inject(TYPES.SectorService) private _sectorService!: SectorService
    // @inject(TYPES.PointerService) private _pointerService!: PointerService

    public static EVENT: TEventGetAboutSector = "getAboutSector"

    async handle(
        message: TGetAboutSectorAPI,
        uSocket: IWebSocket,
    ) {
        const _sector = await this._sectorService.getById(message.payload.id)
        // const _pointer = await this._pointerService.baseGetById(message.payload.userId)

        // const dtoPointer = _pointer.unmarshal()
        const dtoSector = _sector.unmarshal()

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