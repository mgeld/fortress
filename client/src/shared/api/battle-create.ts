import { WS } from "processes/socket"
import { TBattleCreateAPI, TEventBattleCreate } from "@ctypes/socket/client-to-server"

export const battleCreateAPI = () => {
    const data: TBattleCreateAPI = {
        event: 'battleCreate' as TEventBattleCreate,
        payload: {}
    }
    WS.sendData(data)
}
