import { TLimit, TNewRank, TTutorial, TUseExtraction } from "../common-types/socket/server-to-client"
import { TEventUseExtraction, TUseExtractionAPI } from "../common-types/socket/client-to-server"
import { IWebSocket } from "../api/socket/server";
import { IRoute } from "./handlers"
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ZoneService } from "../services/zone.service";
import { WeaponService } from "../services/weapon.service";
import { PointerService } from "../services/pointer.service";
import { Rooms } from "../api/socket/socket/rooms";
import { Rank } from "../entities/zone/rank";

@injectable()
class UseExtractionHandler extends IRoute {
    @inject(TYPES.Rooms) private _rooms!: Rooms
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

        const __id = message.payload?.id
        const __index = message.payload?.index

        if (!__id) return

        const zone = await this._zoneService.getById(uSocket.user_id)
        const pointer = await this._pointerService.memoryGetById(zone.id)

        const extr = zone.hold.use(__id, __index)

        if (!extr) return

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

            if (resultIncrese !== 'limit') {
                this._pointerService.memoryUpdate(pointer)
                this._rooms.areals.broadcast(pointer.areal, {
                    event: 'set-health',
                    payload: {
                        userId: pointer.zoneId,
                        health: pointer.health,
                    }
                }, [pointer.zoneId])
            }
        }

        if (extr.gives === 'storm_power') {
            resultIncrese = zone.stormtrooper_corps.increasePower(extr.quantity)
        }

        if (extr.gives === 'stormtroopers') {
            resultIncrese = zone.stormtrooper_corps.addInvaders(extr.quantity)
        }

        if (extr.gives === 'coins') {
            resultIncrese = zone.addCoins(extr.quantity)
        }

        if (extr.gives === 'rubies') {
            resultIncrese = zone.addRubies(extr.quantity)

            // if (zone.terrain.sectors === 1) {
            //     const tutorialResp: TTutorial = {
            //         event: 'tutorial',
            //         payload: {
            //             type: 'ship'
            //         }
            //     }
            //     uSocket.send(JSON.stringify(tutorialResp))
            // }
        }

        // Если активируется один из Модулей Опыта
        if (extr.gives === 'rank_exp') {
            resultIncrese = zone.rank.addExp(extr.quantity)
            if (resultIncrese[1] === 0) {
                const rubies = Rank.getLevelRewardRubies(zone.rank.rank)
                zone.addRubies(rubies)
                const newRank: TNewRank = {
                    event: 'new-rank',
                    payload: {
                        rank: zone.rank.rank
                    }
                }
                setTimeout(() => uSocket.send(JSON.stringify(newRank)), 1500)
            }

        }

        if (resultIncrese !== 'limit') {
            this._zoneService.memoryUpdate(zone)
        }

        else {
            const limitResp: TLimit = {
                event: 'limit',
                payload: {
                    gives: extr.gives
                }
            }
            uSocket.send(JSON.stringify(limitResp))
            return
        }

        
        const [was, will] = resultIncrese

        let amount = will - was

        const extrResp: TUseExtraction = {
            event: 'use-extraction',
            payload: {
                unit: __id,
                amount,
                type: extr.gives,
                index: __index
            }
        }
        uSocket.send(JSON.stringify(extrResp))

    }
}

export {
    UseExtractionHandler
}