
import { inject, injectable } from "inversify";
import { IWebSocket } from "../api/socket/server";
import { TConnectAPI, TEventGetUser } from "../common-types/socket/client-to-server";
import { Pointer } from "../entities/pointer/pointer";
import { PointerService } from "../services/pointer.service";
import { TYPES } from "../types";
import { IRoute } from "./handlers";

@injectable()
class GetUserHandler implements IRoute {

    constructor(
        @inject(TYPES.PointerService) private _pointerService: PointerService,
    ) {
        console.log('GetUserHandler')
    }

    public static EVENT: TEventGetUser = "getUser"

    async handle(
        message: TConnectAPI,
        uSocket: IWebSocket,
    ) {

        console.log('------GetUserHandler handle -----------')

        const USER_ID = message.payload.userId

        let pointer: Pointer = await this._pointerService.memoryGetById(USER_ID)

        uSocket.send(JSON.stringify({
            event: 'set-user',
            payload: {
                user: {
                    pos: pointer.pos,
                    health: pointer.health,
                }
            }
        }))

    }
}

// ConnectHandler.EVENT = "connect"

export {
    GetUserHandler
}