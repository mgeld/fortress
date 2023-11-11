import { TFirePayload } from "../common-types/socket/server-to-client"
import { TFireAPI, TEventFire } from "../common-types/socket/client-to-server"
import { IWebSocket } from "../api/socket/server";
import { IRoute } from "./handlers"
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { Rooms } from "../api/socket/socket/rooms";
import { PointerService } from "../services/pointer.service";
import { WeaponService } from "../services/weapon.service";

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

        // console.log('FireHandler handle message.payload.weapon', message.payload.weapon)
        const _pointer = await this._pointerService.memoryGetById(uSocket.user_id)
        const weapon = await this._weaponService.memoryGetById(_pointer.weapons[0])

        console.log('FireHandler weapon.distance', weapon.distance)
        // Если я умер
        if (_pointer.health < 1) {
            return
        }
        // Если у меня нет патронов
        if (weapon.bullets < 1) {
            return
        }

        // console.log('fire weapon.distance', weapon.distance)

        weapon.bullets = weapon.bullets - 1
        await this._weaponService.memoryUpdate(weapon)

        const fire: TFirePayload = {
            pos: message.payload.pos,
            to_pos: message.payload.to_pos,
            direction: message.payload.direction,
            userId: _pointer.zoneId,
            // weapon: {
            //     power: weapon.power,
            //     dist: weapon.symbol,
            //     // level: weapon.level
            // }
        }

        if (message.payload?.hitPointer) {

            fire['hitPointer'] = message.payload.hitPointer

            const hitPointer = await this._pointerService.memoryGetById(message.payload.hitPointer.userId)

            // hitPointer.health = hitPointer.health - weapon.power
            hitPointer.removeHealth(weapon.power)

            fire.hitPointer.health = hitPointer.health

            console.log('fire.hitPointer.health', fire.hitPointer.health)

            if (hitPointer.health < 1) {}

            await this._pointerService.memoryUpdate(hitPointer)
        }

        this._rooms.areals.broadcast(_pointer.areal, {
            event: 'fire',
            payload: fire
        }, _pointer.zoneId)

    }
}

// FireHandler.EVENT = 'fire'

export {
    FireHandler
}