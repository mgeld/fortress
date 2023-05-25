import { TEventsAPI, TSendEvent } from "../common-types/socket/client-to-server"
import { IWebSocket } from "../api/socket/server";
// import { Broadcast } from "./libs/broadcast"

import 'reflect-metadata'
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
// import { FireHandler } from "./fire";
// import { BattleHandler } from "./battle";
// import { DirectHandler } from "./direct";
// import { ConnectHandler } from "./connect";

export type TRoutes = {
    [key in TEventsAPI]: IRoute
}

@injectable()
export abstract class IRoute {
    static EVENT: TEventsAPI
    abstract handle(
        message: TSendEvent,
        ws: IWebSocket,
        // broadcast: Broadcast
    ): void
}

@injectable()
export class Handlers {

    // handlers = {
    //     fire: @inject(TYPES.FireHandler) private fire: FireHandler
    //     connect:  @inject(TYPES.FireHandler)
    //     direct:  @inject(TYPES.FireHandler)
    //     battle: @inject(TYPES.FireHandler)
    // }

    // constructor(public handlers: TRoutes) {}

    constructor(
        @inject(TYPES.FireHandler) private fire: IRoute,
        @inject(TYPES.BattleJoinHandler) private battleJoin: IRoute,
        @inject(TYPES.DirectHandler) private direct: IRoute,
        @inject(TYPES.ConnectHandler) private connect: IRoute,
    ) { }

    handle(
        uSocket: IWebSocket,
        // broadcast: Broadcast
    ) {
        return (message: string) => {
            const _message = JSON.parse(message) as TSendEvent

            if (!this[_message.event]) {
                throw new Error('2 Передан несуществующий обработчик')
            }
            this[_message.event].handle(_message, uSocket)
        }
    }
}