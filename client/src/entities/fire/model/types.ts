import { LatLngBounds } from "leaflet"
import { TFire } from "./fire"
import { TLatLng } from "shared/types"

export type TFireLimitProps = {
    bounds: LatLngBounds
    fire: TFire
}

export type TFireLimitResult = {
    time_fire: number
    limit_to_pos: TLatLng
}