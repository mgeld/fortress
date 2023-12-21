import { WS } from "processes/socket"
import { TExtrTypes } from "@ctypes/model"
import { TDelExtractionAPI } from "@ctypes/socket/client-to-server"

export const delExtractionAPI = (
    id: TExtrTypes,
    index: number,
) => {
    
    const data: TDelExtractionAPI = {
        event: 'delExtraction',
        payload: {
            id,
            index,
        }
    }

    WS.sendData(data)
}