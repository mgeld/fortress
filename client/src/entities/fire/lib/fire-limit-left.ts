import { TFireLimitProps, TFireLimitResult } from "../model/types"

export const fireLimitLeft = ({
    bounds, fire
}: TFireLimitProps): TFireLimitResult => {

    const southWest = bounds.getSouthWest()

    let stop_line = 0

    let limit_to_pos = fire.to_pos

    if (fire.hit_pos)
        if (southWest.lng < fire.hit_pos[1]) {
            stop_line = fire.hit_pos[1]
        } else {
            stop_line = southWest.lng
        }
    else
        if (southWest.lng > fire.to_pos[1]) {
            stop_line = southWest.lng
        } else {
            stop_line = fire.to_pos[1]
        }

    let time_fire = Math.floor((fire.from_pos[1] - stop_line) * 1000 / 2)


    if (fire.to_pos[1] < stop_line) limit_to_pos = [fire.to_pos[0], stop_line]

    return {
        time_fire,
        limit_to_pos
    }
}