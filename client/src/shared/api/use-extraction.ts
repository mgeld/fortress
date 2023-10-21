import { WS } from "processes/socket"
import { TExtrTypes } from "@ctypes/model"
import { TUseExtractionAPI } from "@ctypes/socket/client-to-server"

export const useExtractionAPI = (
    id: TExtrTypes,
    index: number,
) => {
    
    const data: TUseExtractionAPI = {
        event: 'useExtraction',
        payload: {
            id,
            index,
        }
    }

    WS.sendData(data)
}