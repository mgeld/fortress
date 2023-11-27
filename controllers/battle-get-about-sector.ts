import { TYPES } from "../types";
import { IRoute } from "./handlers"
import { inject, injectable } from "inversify";
import { IWebSocket } from "../api/socket/server";
import { PointerService } from "../services/pointer.service";

import { TSectorPayload } from "../common-types/socket/server-to-client";
import { TBattleGetAboutSectorAPI, TEventBattleGetAboutSector } from "../common-types/socket/client-to-server"
import { ArenaSectorService } from "../services/arena-sector.service";
import { MemberService } from "../services/member.service";

@injectable()
class BattleGetAboutSectorHandler extends IRoute {
    @inject(TYPES.ArenaSectorService) private _sectorService!: ArenaSectorService
    @inject(TYPES.MemberService) private _memberService!: MemberService

    public static EVENT: TEventBattleGetAboutSector = "battleGetAboutSector"

    async handle(
        message: TBattleGetAboutSectorAPI,
        uSocket: IWebSocket,
    ) {

        if (!uSocket?.user_id) return

        const __id = message.payload?.id
        const __arena = message.payload?.arena
        
        if(!__id || !__arena) return

        const _sector = await this._sectorService.getById(__id, __arena)
        const _member = await this._memberService.getById(uSocket.user_id)

        const dtoSector = _sector.unmarshal()

        // dtoSector.invaders.team_id === _pointer.areal

        const sector: TSectorPayload = {
            number: dtoSector.number,
            latlng: dtoSector.latlng,
            invaders: dtoSector.invaders,
            defenders: dtoSector.defenders,
            owner: _member.arenaTeam === dtoSector.team_id ? 'Вы' : 'Противник'
        }

        uSocket.send(JSON.stringify({
            event: 'sector',
            payload: sector
        }))

    }
}

// TakeHandler.EVENT = 'take'

export {
    BattleGetAboutSectorHandler
}