import { WS } from "processes/socket"
import { TBattleGetAboutSectorAPI } from "../../../../common-types/socket/client-to-server"

export const battleGetAboutSectorAPI = (
    id: string,
    arena: string
) => {

    const data: TBattleGetAboutSectorAPI = {
        event: 'battleGetAboutSector',
        payload: {
            id,
            arena
        }
    }
    
    WS.sendData(data)
}