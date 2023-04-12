import { TLatLng } from "shared/types"
import { TActionPos } from "../model/user"

export const reducer = (state: TLatLng, action: TActionPos): TLatLng => {
    switch (action.type) {
        case 'FORWARD':
            return [state[0] + 0.0002, state[1]]
        case 'BACKWARD':
            return [state[0] - 0.0002, state[1]]
        case 'LEFT':
            return [state[0], state[1] - 0.0004]
        case 'RIGHT':
            return [state[0], state[1] + 0.0004]
        default:
            return state
    }
}