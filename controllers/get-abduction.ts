
import { inject, injectable } from "inversify";
import { IWebSocket } from "../api/socket/server";
import { TEventGetAbduction, TGetAbductionAPI } from "../common-types/socket/client-to-server";
import { TYPES } from "../types";
import { IRoute } from "./handlers";
import { VkUserService } from "../services/vk-user.service";

@injectable()
class GetAbductionHandler implements IRoute {

    // @inject(TYPES.PointerService) private _pointerService!: PointerService

    @inject(TYPES.VkUserService) private _vkService!: VkUserService

    public static EVENT: TEventGetAbduction = "getAbduction"

    async handle(
        message: TGetAbductionAPI,
        uSocket: IWebSocket,
    ) {
        if (!uSocket.user_id) return

        const __zoneId = message.payload.zone_id
        const __page = message.payload.page

        let zones = await this._vkService.getAbduction(__zoneId)

        uSocket.send(JSON.stringify({
            event: 'set-abduction',
            payload: {
                zones
            }
        }))

    }
}

export {
    GetAbductionHandler
}