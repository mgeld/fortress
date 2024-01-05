import { TYPES } from "../types";
import { IRoute } from "./handlers"
import { inject, injectable } from "inversify";
import { IWebSocket } from "../api/socket/server";
import { Rooms } from "../api/socket/socket/rooms";
import { WeaponService } from "../services/weapon.service";
import { PointerService } from "../services/pointer.service";
import { TFirePayload } from "../common-types/socket/server-to-client"
import { TFireAPI, TEventFire } from "../common-types/socket/client-to-server"

@injectable()
class FireHandler extends IRoute {
    @inject(TYPES.Rooms) private _rooms!: Rooms
    @inject(TYPES.PointerService) private _pointerService!: PointerService
    @inject(TYPES.WeaponService) private _weaponService!: WeaponService

    public static EVENT: TEventFire = "fire"

    async handle(
        message: TFireAPI,
        uSocket: IWebSocket,
    ) {

        if (!uSocket.user_id) return

        const __pos = message.payload?.pos
        const __to_pos = message.payload?.to_pos
        const __direction = message.payload?.direction
        const __hitPointer = message.payload?.hitPointer

        if (!__pos || !__to_pos || !__direction) return

        const _pointer = await this._pointerService.memoryGetById(uSocket.user_id)
        const weapon = await this._weaponService.memoryGetById(_pointer.weapons[0])

        // Если я умер
        if (_pointer.health < 1) {
            return
        }
        // Если у меня нет патронов
        if (weapon.bullets < 1) {
            // return
        }

        weapon.bullets = weapon.bullets - 1
        await this._weaponService.memoryUpdate(weapon)

        const fire: TFirePayload = {
            pos: __pos,
            to_pos: __to_pos,
            direction: __direction,
            userId: _pointer.zoneId
        }

        if (__hitPointer) {

            if (__hitPointer?.userId === -1) return

            fire['hitPointer'] = __hitPointer

            const hitPointer = await this._pointerService.memoryGetById(__hitPointer.userId)

            const hit_lat_diff = __hitPointer.pos[0] > hitPointer.pos[0] ? __hitPointer.pos[0] - hitPointer.pos[0] : hitPointer.pos[0] - __hitPointer.pos[0]
            const hit_lng_diff = __hitPointer.pos[1] > hitPointer.pos[1] ? __hitPointer.pos[1] - hitPointer.pos[1] : hitPointer.pos[1] - __hitPointer.pos[1]

            const pos_lat_diff = __pos[0] > _pointer.pos[0] ? __pos[0] - _pointer.pos[0] : _pointer.pos[0] - __pos[0]
            const pos_lng_diff = __pos[1] > _pointer.pos[1] ? __pos[1] - _pointer.pos[1] : _pointer.pos[1] - __pos[1]

            if (hit_lat_diff > 0.0006 || pos_lat_diff > 0.0006 || hit_lng_diff > 0.0010 || pos_lng_diff > 0.0010) return

            hitPointer.removeHealth(weapon.power)

            fire.hitPointer.health = hitPointer.health

            // Если противник погиб
            if (hitPointer.health < 1) {

            }

            await this._pointerService.memoryUpdate(hitPointer)
        }

        this._rooms.areals.broadcast(_pointer.areal, {
            event: 'fire',
            payload: fire
        }, [_pointer.zoneId])

    }
}

// FireHandler.EVENT = 'fire'

export {
    FireHandler
}