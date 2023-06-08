import { TFirePayload } from "../common-types/socket/server-to-client"
import { TFireAPI, TEventBattleFire } from "../common-types/socket/client-to-server"
import { IWebSocket } from "../api/socket/server";
import { IRoute } from "./handlers"
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { Rooms } from "../api/socket/socket/rooms";
import { ArenaService } from "../services/arena.service";
import { WeaponService } from "../services/weapon.service";
import { MemberService } from "../services/member.service";

@injectable()
class BattleFireHandler extends IRoute {
    @inject(TYPES.Rooms) private _rooms!: Rooms
    @inject(TYPES.MemberService) private _memberService!: MemberService
    @inject(TYPES.WeaponService) private _weaponService!: WeaponService
    @inject(TYPES.ArenaService) private _arenaService!: ArenaService

    public static EVENT: TEventBattleFire = "battleFire"

    async handle(
        message: TFireAPI,
        uSocket: IWebSocket,
    ) {

        console.log('FireHandler handle')

        const _member = await this._memberService.getById(message.payload.userId)
        const weapon = await this._weaponService.getById(message.payload.weapon)

        const arena = await this._arenaService.getById(_member.arena)

        // Если я умер
        if (_member.health < 1) {
            return
        }
        // Если у меня нет патронов
        if (weapon.bullets < 1) {
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

            const hitPointer = await this._memberService.getById(message.payload.hitPointer.userId)

            hitPointer.health = hitPointer.health - weapon.weapon.damage

            if (hitPointer.health < 1) {

                console.log('1111111111111111111111')

                const killPointerTeam = arena.killPointer(hitPointer.userId, hitPointer.arenaTeam)
                await this._arenaService.update(arena)

                console.log('killPointerTeam.alive_members', killPointerTeam.alive_members)

                if (killPointerTeam.alive_members === 0) {

                    arena.teamList.forEach(team => {
                        if (team.id === killPointerTeam.id) {
                            team.defeatTeam()
                        } else {
                            team.victoryTeam()
                        }
                    })

                    setTimeout(() => {
                        this._rooms.arenas.broadcast(arena.id, {
                            event: 'battle-over',
                            payload: {
                                teams: arena.teamList.map(team => ({
                                    teamId: team.id,
                                    status: team.status,
                                    pointers: team.members,
                                }))
                            }
                        })
                    }, 2000)

                }

                hitPointer.exitArena()

            }

            await this._memberService.update(hitPointer)
        }

        this._rooms.arenas.broadcast(_member.arena, {
            event: 'fire',
            payload: fire
        }, _member.userId)


    }
}

// FireHandler.EVENT = 'fire'

export {
    BattleFireHandler
}