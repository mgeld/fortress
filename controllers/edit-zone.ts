
import { inject, injectable } from "inversify";
import { IWebSocket } from "../api/socket/server";
import { TEditZoneAPI, TEventEditZone } from "../common-types/socket/client-to-server";
import { PointerService } from "../services/pointer.service";
import { TYPES } from "../types";
import { IRoute } from "./handlers";
import { ZoneService } from "../services/zone.service";
import crypto from 'crypto'

@injectable()
class EditZoneHandler implements IRoute {

    @inject(TYPES.PointerService) private _pointerService!: PointerService
    @inject(TYPES.ZoneService) private _zoneService!: ZoneService

    constructor(
    ) {
    }
    
    public static EVENT: TEventEditZone = "editZone"

    async handle(
        message: TEditZoneAPI,
        uSocket: IWebSocket,
    ) {

        if (!uSocket.user_id) return

        const USER_ID = uSocket.user_id

        const __name = message.payload.name
        const __descr = message.payload.description
        const __icon = message.payload.icon
        const __color = message.payload.color
        const __hash = message.payload.hash

        if (!__name || !__icon || !__color) return

        const zone = await this._zoneService.getById(USER_ID)
        const pointer = await this._pointerService.memoryGetById(USER_ID)

        zone.color = __color
        pointer.color = __color
        
        pointer.user.name = __name
        zone.description = __descr

        const hash = crypto.createHash('md5').update(__icon + 'gm_fortress_2023').digest('hex');

        if(__hash === hash) {
            pointer.user.icon = __icon
        } else {
            console.log('hash НЕ совпадаеют')
        }

        this._zoneService.memoryUpdate(zone)
        this._pointerService.memoryUpdate(pointer)

        uSocket.send(JSON.stringify({
            event: 'edit-zone',
            payload: {
                icon: pointer.user.icon,
                name: pointer.user.name,
                description: zone.description,
                color: zone.color
            }
        }))

    }
}

export {
    EditZoneHandler
}