import { WS } from "processes/socket"
import { TGetAboutSectorAPI } from "../../../../common-types/socket/client-to-server"

export const getAboutSectorAPI = (
    id: string
) => {

    const data: TGetAboutSectorAPI = {
        event: 'getAboutSector',
        payload: {
            id
        }
    }
    
    WS.sendData(data)
}