import { TEventsAPI, TSendEvent } from "../common-types/socket/client-to-server"
import { IWebSocket } from "../api/socket/server";

import { inject, injectable } from "inversify";
import { TYPES } from "../types";

import 'reflect-metadata'

export type TRoutes = {
    [key in TEventsAPI]: IRoute
}

@injectable()
export abstract class IRoute {
    static EVENT: TEventsAPI
    abstract handle(
        message: TSendEvent,
        ws: IWebSocket,
    ): void
}

@injectable()
export class Handlers {

    constructor(
        @inject(TYPES.FireHandler) private fire: IRoute,
        @inject(TYPES.TakeHandler) private take: IRoute,
        @inject(TYPES.BattleTakeHandler) private battleTake: IRoute,
        @inject(TYPES.BeamHandler) private beam: IRoute,
        @inject(TYPES.DirectHandler) private direct: IRoute,
        @inject(TYPES.ConnectHandler) private connect: IRoute,
        @inject(TYPES.BattleJoinHandler) private battleJoin: IRoute,
        @inject(TYPES.BattleLeaveHandler) private battleLeave: IRoute,
        @inject(TYPES.BattleFireHandler) private battleFire: IRoute,
        @inject(TYPES.BattleDirectHandler) private battleDirect: IRoute,
        @inject(TYPES.GetSectorsHandler) private getSectors: IRoute,
        @inject(TYPES.GetAboutSectorHandler) private getAboutSector: IRoute,
        @inject(TYPES.GetUserHandler) private getUser: IRoute,
        @inject(TYPES.UseExtractionHandler) private useExtraction: IRoute,
        @inject(TYPES.BuyUnitHandler) private buyUnit: IRoute,
        @inject(TYPES.LevelUpHandler) private levelUp: IRoute,
        
    ) { }

    handle(
        uSocket: IWebSocket,
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