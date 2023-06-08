import { TYPES } from "../types"
import { IRoute } from "./handlers"
import { inject, injectable } from "inversify"
import { IWebSocket } from "../api/socket/server"
import { Rooms } from "../api/socket/socket/rooms"
import { MemberService } from "../services/member.service"
import { TBattleDirectAPI, TEventBattleDirect } from "../common-types/socket/client-to-server"

@injectable()
class BattleDirectHandler extends IRoute {
    @inject(TYPES.Rooms) private _rooms!: Rooms
    @inject(TYPES.MemberService) private _memberService!: MemberService

    public static EVENT: TEventBattleDirect = "battleDirect"

    async handle(
        message: TBattleDirectAPI,
        uSocket: IWebSocket,
    ) {

        console.log('BattleDirectHandler handle')

        const _member = await this._memberService.getById(message.payload.userId)

        if (_member.health < 1) {
            return
        }

        _member.pos = message.payload.position
        this._memberService.update(_member)

        this._rooms.arenas.broadcast(_member.arena, {
            event: 'direct',
            payload: {
                userId: message.payload.userId,
                pos: message.payload.position
            }
        }, _member.userId)

    }
}

// DirectHandler.EVENT = "direct"

export {
    BattleDirectHandler
}