import { WS } from "processes/socket"
// import { battleAPI } from "./events"
import { TBattleJoinAPI, TEventBattleJoin } from "@ctypes/socket/client-to-server"

export const battleJoinAPI = (
    userId: number
) => {
    const data: TBattleJoinAPI = {
        event: 'battleJoin' as TEventBattleJoin,
        payload: {
            userId
        }
    }
    WS.sendData(data)
    // battleAPI.events.setBattleStatus('pending')
}
