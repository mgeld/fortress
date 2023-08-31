import { TFireLimitProps, TFireLimitResult } from "../model/types"

export const fireLimitForward = ({
    bounds, fire
}: TFireLimitProps): TFireLimitResult => {

    const northEast = bounds.getNorthEast()

    let stop_line = 0

    let limit_to_pos = fire.to_pos

    if (fire.hit_pos)
        if (northEast.lat > fire.hit_pos[0]) {
            stop_line = fire.hit_pos[0]
        } else {
            stop_line = northEast.lat
        }
    else
        if (northEast.lat < fire.to_pos[0]) {
            stop_line = northEast.lat
        } else {
            stop_line = fire.to_pos[0]
        }

    let time_fire = Math.floor((stop_line - fire.from_pos[0]) * 1000)

    if (fire.to_pos[0] > stop_line) limit_to_pos = [stop_line, fire.to_pos[1]]

    return {
        time_fire,
        limit_to_pos
    }
}