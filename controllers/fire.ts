import { TFirePayload } from "../common-types/socket/server-to-client"
import { TFireAPI, TEventFire } from "../common-types/socket/client-to-server"
import { IWebSocket } from "../api/socket/server";
import { IRoute } from "./handlers"
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { Rooms } from "../api/socket/socket/rooms";
import { PointerService } from "../services/pointer.service";
import { ArenaService } from "../services/arena.service";
import { WeaponService } from "../services/weapon.service";

@injectable()
class FireHandler extends IRoute {
    @inject(TYPES.Rooms) private _rooms!: Rooms
    @inject(TYPES.PointerService) private _pointerService!: PointerService
    @inject(TYPES.WeaponService) private _weaponService!: WeaponService
    @inject(TYPES.ArenaService) private _arenaService!: ArenaService

    public static EVENT: TEventFire = "fire"

    async handle(
        message: TFireAPI,
        uSocket: IWebSocket,
    ) {


        console.log('FireHandler handle')
        const _pointer = await this._pointerService.getById(message.payload.userId)
        const weapon = await this._weaponService.getById(message.payload.weapon)

        console.log('')

        // Если я умер
        if(_pointer.health < 1) {
            return
        }
        // Если у меня нет патронов
        if(weapon.bullets < 1) {
            return
        }

        weapon.bullets = weapon.bullets - 1
        await this._weaponService.update(weapon)

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

            const hitPointer = await this._pointerService.getById(message.payload.hitPointer.userId)

            hitPointer.health = hitPointer.health - weapon.weapon.damage

            if (hitPointer.health < 1) {

                if (message.payload?.arena) {

                    hitPointer.exitArena()
                    const arena = await this._arenaService.getById(_pointer.arena)

                    const killPointerTeam = arena.killPointer(hitPointer.userId, hitPointer.arenaTeam)

                    if (killPointerTeam.alive_members === 0) {
                        arena.teamList.forEach(team => {
                            if (team.id === killPointerTeam.id) {
                                team.defeatTeam()
                            } else {
                                team.victoryTeam()
                            }
                        })
                    }

                }

            }

            await this._pointerService.update(hitPointer)
        }

        if (message.payload?.arena && _pointer.arena) {
            this._rooms.arenas.broadcast(_pointer.arena, {
                event: 'fire',
                payload: fire
            })
        } else {
            this._rooms.sectors.broadcast(_pointer.sector, {
                event: 'fire',
                payload: fire
            })
        }

    }
}

// FireHandler.EVENT = 'fire'

export {
    FireHandler
}