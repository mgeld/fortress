import { WS } from "processes/socket"
import { TBattleJoinAPI, TEventBattleJoin } from "@ctypes/socket/client-to-server"

export const battleJoinAPI = (userId: number) => {
    const data: TBattleJoinAPI = {
        event: 'battleJoin' as TEventBattleJoin,
        payload: {
            userId
        }
    }
    WS.sendData(data)
}
