import { WS } from "processes/socket"
import { TBattleJoinAPI, TEventBattleJoin } from "@ctypes/socket/client-to-server"

export const battleJoinAPI = () => {
    const data: TBattleJoinAPI = {
        event: 'battleJoin' as TEventBattleJoin,
        payload: {}
    }
    WS.sendData(data)
}
