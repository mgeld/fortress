import { WS } from "processes/socket"
import { TBattleJoinAPI, TEventBattleJoin } from "@ctypes/socket/client-to-server"

export const battleJoinAPI = (battleId?: string) => {
    const data: TBattleJoinAPI = {
        event: 'battleJoin' as TEventBattleJoin,
        payload: {}
    }
    if(battleId) data.payload.id = battleId

    WS.sendData(data)
}
