import { WS } from "processes/socket"
import { TBattleLeaveAPI, TEventBattleLeave } from "@ctypes/socket/client-to-server"

export const battleLeaveAPI = () => {
    const data: TBattleLeaveAPI = {
        event: 'battleLeave' as TEventBattleLeave,
        payload: {
        }
    }
    WS.sendData(data)
}
