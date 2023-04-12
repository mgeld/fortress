import { fromToDirectionPos } from "shared/lib/fromToDirectionPos"
import { isHitFireTarget } from "shared/lib/isHitFireTarget"
import { TJoystickDirection, TLatLng } from "shared/types"

export class GunFire {

    private fromPos: TLatLng = [0, 0]
    private toPos: TLatLng = [0, 0]
    private distance = 0
    private direction: TJoystickDirection | null = null

    readonly fireId: number = 0

    constructor() {
        this.fireId = Date.now()
    }

    // Получить место, куда попадает огонь
    getToPosLatLng(position: TLatLng, direction: TJoystickDirection | null, distance: number) {
        this.fromPos = position
        this.distance = distance
        this.direction = direction

        this.toPos = fromToDirectionPos(this.fromPos, this.direction, this.distance)
    }

    hitFireTarget(position: TLatLng,) {
        return isHitFireTarget({
            from: this.fromPos,
            to: this.toPos,
            marker: position,
            radius: 0.0004,
            direction: this.direction,
        })
    }
}