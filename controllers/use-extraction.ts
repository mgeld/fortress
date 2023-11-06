import { TUseExtraction } from "../common-types/socket/server-to-client"
import { TEventUseExtraction, TUseExtractionAPI } from "../common-types/socket/client-to-server"
import { IWebSocket } from "../api/socket/server";
import { IRoute } from "./handlers"
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ZoneService } from "../services/zone.service";
import { WeaponService } from "../services/weapon.service";
import { PointerService } from "../services/pointer.service";

@injectable()
class UseExtractionHandler extends IRoute {
    @inject(TYPES.ZoneService) private _zoneService!: ZoneService
    @inject(TYPES.PointerService) private _pointerService!: PointerService
    @inject(TYPES.WeaponService) private _weaponService!: WeaponService

    public static EVENT: TEventUseExtraction = "useExtraction"

    async handle(
        message: TUseExtractionAPI,
        uSocket: IWebSocket,
    ) {
        console.log('UseExtractionHandler handle')

        if (!uSocket.user_id) return

        const zone = await this._zoneService.getById(uSocket.user_id)
        const pointer = await this._pointerService.memoryGetById(zone.id)
        const weapon = await this._weaponService.memoryGetById(pointer.weapons[0])

        const extr = zone.extraction.use(message.payload.id, message.payload.index)

        if (extr.gives === 'gun_distance') {
            weapon.increaseDistance(extr.quantity)
            await this._weaponService.memoryUpdate(weapon)
        }

        if (extr.gives === 'gun_power') {
            weapon.increasePower(extr.quantity)
            await this._weaponService.memoryUpdate(weapon)
        }

        if (extr.gives === 'storm_power') {
            zone.stormtrooper_corps.increasePower(extr.quantity)
            this._zoneService.memoryUpdate(zone)
        }

        if (extr.gives === 'ship_health') {
            pointer.addHealth(extr.quantity)
            this._pointerService.memoryUpdate(pointer)
        }

        if (extr.gives === 'rank_exp') {
            zone.rank.addExp(extr.quantity)
            this._zoneService.memoryUpdate(zone)
        }

        console.log('weapon.distance', weapon.distance)

        const extrResp: TUseExtraction = {
            event: 'use-extraction',
            payload: {
                amount: extr.quantity,
                type: extr.gives,
                index: message.payload.index
            }
        }
        uSocket.send(JSON.stringify(extrResp))

    }
}

export {
    UseExtractionHandler
}