import { WS } from "processes/socket"
import { TBattleAPI, TEventBattle } from "../../../../common-types/socket/client-to-server"
import { battleAPI } from "./events"

export const battleJoinAPI = (
    userId: number
) => {

    const data: TBattleAPI = {
        event: 'battleJoin' as TEventBattle,
        payload: {
            userId
        }
    }

    console.log('getSocketStatus', WS.getSocketStatus())
    WS.sendData(data)

    battleAPI.events.setBattleStatus('pending')
    
}
