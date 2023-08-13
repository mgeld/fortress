import { randomNumber } from "shared/lib/randomNumber"
import { TLatLng } from "shared/types"

const rn = randomNumber

export const getRandomPosition = (): TLatLng => {
    return [
        +(String(rn(1,9)) + rn(1,9) + '.' + rn(1,9) + rn(1,9) + rn(1,9) + rn(1,9)),
        +(String(rn(1,9)) + rn(1,9) + '.' + rn(1,9) + rn(1,9) + rn(1,9) + rn(1,9)),
    ] as TLatLng
}