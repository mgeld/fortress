import { LatLngBounds } from "leaflet"
import { TFire } from "../model/fire"
import { fireLimitLeft } from "./fire-limit-left"
import { firetLimitRigh } from "./fire-limit-right"
import { fireLimitForward } from "./fire-limit-forward"
import { fireLimitBackward } from "./fire-limit-backward"
import { TFireLimitProps, TFireLimitResult } from "../model/types"

export const fireLimit = ({
    bounds, fire
}: TFireLimitProps): TFireLimitResult => {
    if (fire.direction === 'LEFT') return fireLimitLeft({ fire, bounds })
    if (fire.direction === 'RIGHT') return firetLimitRigh({ fire, bounds })
    if (fire.direction === 'FORWARD') return fireLimitForward({ fire, bounds })
    return fireLimitBackward({ fire, bounds })
}