import { TLevelUp, TLimit } from "../common-types/socket/server-to-client"
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
import { RankLevels } from "./libs/rank-levels";
import { ShipLevels } from "./libs/ship-levels";

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

        const __type = message.payload?.type

        if (!__type) return

        const zone = await this._zoneService.getById(uSocket.user_id)
        const pointer = await this._pointerService.memoryGetById(zone.id)
        const weapon = await this._weaponService.memoryGetById(pointer.weapons[0])

        let newLevel: number | 'limit' = 0
        let cost = 0
        let currency: 'coins' | 'rubies' | null = null
        let isSpend = 0

        if (__type === 'ship') {

            const maxLevel = RankLevels.getRankMaxLevelShip(zone.rank.rank)
            newLevel = pointer.upLevel(maxLevel)

            if (newLevel !== 'limit') {

                cost = Pointer.getLevelUpPrice(newLevel)
                isSpend = zone.spendRubies(cost)
                currency = 'rubies'

                if (~isSpend) {
                    await this._pointerService.memoryUpdate(pointer)
                    await this._zoneService.memoryUpdate(zone)
                }
            }

        } else if (__type === 'gun') {

            const maxLevel = ShipLevels.getShipMaxLevelGun(pointer.level)

            newLevel = weapon.upLevel(maxLevel)

            if (newLevel !== 'limit') {
                cost = Gun.getLevelUpPrice(newLevel)
                isSpend = zone.spendСoins(cost)
                currency = 'coins'

                if (~isSpend) {
                    await this._zoneService.memoryUpdate(zone)
                    await this._weaponService.memoryUpdate(weapon)
                }

            }

        } else if (__type === 'storm-corps') {

            const maxLevel = ShipLevels.getShipMaxLevelStorm(pointer.level)

            newLevel = zone.stormtrooper_corps.upLevel(maxLevel)

            if (newLevel !== 'limit') {
                cost = StormtrooperCorps.getLevelUpPrice(newLevel)
                isSpend = zone.spendСoins(cost)
                currency = 'coins'

                if (~isSpend) this._zoneService.memoryUpdate(zone)

            }

        } else if (__type === 'hold') {

            const maxLevel = ShipLevels.getShipMaxLevelHold(pointer.level)

            newLevel = zone.hold.upLevel(maxLevel)

            if (newLevel !== 'limit') {
                cost = Extraction.getLevelUpPrice(newLevel)
                isSpend = zone.spendСoins(cost)
                currency = 'coins'

                if (~isSpend) this._zoneService.memoryUpdate(zone)

            }

        } else {
            return
        }

        if (newLevel === 'limit') {

            // let gives: TLimitLevelTypes

            // if(__type === 'ship') gives = 'ship_level'
            // else if(__type === 'gun') gives = 'gun_level'
            // else if(__type === 'hold') gives = 'hold_level'
            // else if(__type === 'storm-corps') gives = 'storm_level'
            // else return

            // const limitResp: TLimit = {
            //     event: 'limit',
            //     payload: {
            //         gives
            //     }
            // }
            // uSocket.send(JSON.stringify(limitResp))
            return
        }

        if (isSpend === -1 && currency) {

            const limitResp: TLimit = {
                event: 'limit',
                payload: {
                    gives: currency
                }
            }
            uSocket.send(JSON.stringify(limitResp))
            return
        }

        if (currency) {
            const extrResp: TLevelUp = {
                event: 'level-up',
                payload: {
                    type: __type,
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