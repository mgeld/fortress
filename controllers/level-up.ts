import { TLevelUp, TUseExtraction } from "../common-types/socket/server-to-client"
import { TEventLevelUp, TLevelUpAPI } from "../common-types/socket/client-to-server"
import { IWebSocket } from "../api/socket/server";
import { IRoute } from "./handlers"
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ZoneService } from "../services/zone.service";
import { WeaponService } from "../services/weapon.service";
import { PointerService } from "../services/pointer.service";
import { Pointer } from "../entities/pointer/pointer";
import { Gun } from "../entities/weapon/gun";
import { StormtrooperCorps } from "../entities/zone/stormtrooper_corps";
import { Extraction } from "../entities/zone/extraction";

@injectable()
class LevelUpHandler extends IRoute {
    @inject(TYPES.ZoneService) private _zoneService!: ZoneService
    @inject(TYPES.PointerService) private _pointerService!: PointerService
    @inject(TYPES.WeaponService) private _weaponService!: WeaponService

    public static EVENT: TEventLevelUp = "levelUp"

    async handle(
        message: TLevelUpAPI,
        uSocket: IWebSocket,
    ) {
        console.log('UseExtractionHandler handle')

        if (!uSocket.user_id) return

        const zone = await this._zoneService.getById(uSocket.user_id)
        const pointer = await this._pointerService.memoryGetById(zone.id)
        const weapon = await this._weaponService.memoryGetById(pointer.weapons[0])

        let newLevel = 0
        let cost = 0
        let currency: 'coins' | 'rubies' | null = null

        if (message.payload.type === 'ship') {
            newLevel = pointer.upLevel()
            cost = Pointer.getLevelUpPrice(newLevel)
            zone.spendRubies(cost)
            currency = 'rubies'
            await this._pointerService.memoryUpdate(pointer)
            await this._zoneService.memoryUpdate(zone)

        }

        if (message.payload.type === 'gun') {
            newLevel = weapon.upLevel()
            cost = Gun.getLevelUpPrice(newLevel)
            zone.spendRubies(cost)
            currency = 'rubies'
            await this._zoneService.memoryUpdate(zone)
            await this._weaponService.memoryUpdate(weapon)
        }

        if (message.payload.type === 'storm-corps') {
            newLevel = zone.stormtrooper_corps.upLevel()
            cost = StormtrooperCorps.getLevelUpPrice(newLevel)
            zone.spendRubies(cost)
            currency = 'rubies'
            this._zoneService.memoryUpdate(zone)
        }

        if (message.payload.type === 'hold') {
            newLevel = zone.hold.upLevel()
            cost = Extraction.getLevelUpPrice(newLevel)
            zone.spendRubies(cost)
            currency = 'rubies'
            this._zoneService.memoryUpdate(zone)
        }

        if (currency) {
            const extrResp: TLevelUp = {
                event: 'level-up',
                payload: {
                    type: message.payload.type,
                    cost,
                    new_level: newLevel,
                    currency
                }
            }
            uSocket.send(JSON.stringify(extrResp))
        }

    }
}

export {
    LevelUpHandler
}