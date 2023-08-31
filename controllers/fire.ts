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

        console.log('FireHandler handle')
        const _pointer = await this._pointerService.memoryGetById(message.payload.userId)
        const weapon = await this._weaponService.memoryGetById(message.payload.weapon)

        // Если я умер
        if (_pointer.health < 1) {
            return
        }
        // Если у меня нет патронов
        if (weapon.bullets < 1) {
            return
        }

        weapon.bullets = weapon.bullets - 1
        await this._weaponService.memoryUpdate(weapon)

        const fire: TFirePayload = {
            position: message.payload.position,
            direction: message.payload.direction,
            userId: message.payload.userId,
            weapon: {
                symbol: weapon.weapon.symbol,
                level: weapon.weapon.level
            }
        }

        if (message.payload?.hitPointer) {

            fire['hitPointer'] = message.payload.hitPointer

            const hitPointer = await this._pointerService.memoryGetById(message.payload.hitPointer.userId)

            hitPointer.health = hitPointer.health - weapon.weapon.damage

            if (hitPointer.health < 1) {}

            await this._pointerService.memoryUpdate(hitPointer)
        }

        this._rooms.areals.broadcast(_pointer.areal, {
            event: 'fire',
            payload: fire
        }, _pointer.id)

    }
}

// FireHandler.EVENT = 'fire'

export {
    FireHandler
}