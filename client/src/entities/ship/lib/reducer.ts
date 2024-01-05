import { TLatLng } from "shared/types"
import { TActionPos } from "../model"

export const reducer = (state: TLatLng, action: TActionPos): TLatLng => {
    switch (action.type) {
        case 'FORWARD':
            return [state[0] + 0.0006, state[1]]
        case 'BACKWARD':
            return [state[0] - 0.0006, state[1]]
        case 'LEFT':
            return [state[0], state[1] - 0.0010]
        case 'RIGHT':
            return [state[0], state[1] + 0.0010]
        default:
            return state
    }
}