import { WS } from "processes/socket"
import { TBattleLeaveAPI, TEventBattleLeave } from "@ctypes/socket/client-to-server"

export const battleLeaveAPI = (userId: number) => {
    const data: TBattleLeaveAPI = {
        event: 'battleLeave' as TEventBattleLeave,
        payload: {
            userId
        }
    }
    WS.sendData(data)
}
