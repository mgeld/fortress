import { TLimit, TNewRank, TTutorial, TUseExtraction } from "../common-types/socket/server-to-client"
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

        const extr = zone.hold.use(message.payload.id, message.payload.index)

        let resultIncrese: [number, number] | 'limit' = [0, 0]

        if (extr.gives === 'gun_distance') {
            const weapon = await this._weaponService.memoryGetById(pointer.weapons[0])
            resultIncrese = weapon.increaseDistance(extr.quantity)

            if (resultIncrese !== 'limit')
                await this._weaponService.memoryUpdate(weapon)
        }

        if (extr.gives === 'gun_power') {
            const weapon = await this._weaponService.memoryGetById(pointer.weapons[0])
            resultIncrese = weapon.increasePower(extr.quantity)
            if (resultIncrese !== 'limit')
                await this._weaponService.memoryUpdate(weapon)
        }

        if (extr.gives === 'ship_health') {
            resultIncrese = pointer.addHealth(extr.quantity)
            if (resultIncrese !== 'limit')
                this._pointerService.memoryUpdate(pointer)
        }

        if (extr.gives === 'storm_power') {
            resultIncrese = zone.stormtrooper_corps.increasePower(extr.quantity)
            if (resultIncrese !== 'limit')
                this._zoneService.memoryUpdate(zone)
        }

        if (extr.gives === 'stormtroopers') {
            resultIncrese = zone.stormtrooper_corps.addInvaders(extr.quantity)

            console.log('resultIncrese', resultIncrese)
            if (resultIncrese !== 'limit') {
                this._zoneService.memoryUpdate(zone)
            }
        }

        if (extr.gives === 'coins') {
            resultIncrese = zone.addCoins(extr.quantity)
            this._zoneService.memoryUpdate(zone)
        }

        if (extr.gives === 'rubies') {
            resultIncrese = zone.addRubies(extr.quantity)
            this._zoneService.memoryUpdate(zone)


            if (zone.terrain.sectors === 1) {
                const tutorialResp: TTutorial = {
                    event: 'tutorial',
                    payload: {
                        type: 'ship'
                    }
                }
                uSocket.send(JSON.stringify(tutorialResp))

            }
        }

        if (resultIncrese === 'limit') {
            const limitResp: TLimit = {
                event: 'limit',
                payload: {
                    gives: extr.gives
                }
            }
            uSocket.send(JSON.stringify(limitResp))
            return
        }

        if (extr.gives === 'rank_exp') {
            resultIncrese = zone.rank.addExp(extr.quantity)

            console.log('resultIncrese', resultIncrese)
            this._zoneService.memoryUpdate(zone)
            if (resultIncrese[1] === 0) {
                const newRank: TNewRank = {
                    event: 'new-rank',
                    payload: {
                        rank: zone.rank.rank
                    }
                }
                uSocket.send(JSON.stringify(newRank))
                return
            }
        }

        console.log('resultIncrese', resultIncrese)
        // console.log('resultIncrese - (resultIncrese - extr.quantity)', resultIncrese - (resultIncrese - extr.quantity))

        const extrResp: TUseExtraction = {
            event: 'use-extraction',
            payload: {
                unit: message.payload.id,
                amount: resultIncrese[1] - resultIncrese[0],
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