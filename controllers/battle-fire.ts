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
import { Member } from "../entities/arena/arena-team-member";

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
        const weapon = await this._weaponService.memoryGetById(message.payload.weapon)

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
        await this._weaponService.memoryUpdate(weapon)

        const fire: TFirePayload = {
            position: message.payload.position,
            direction: message.payload.direction,
            userId: message.payload.userId,
            weapon: {
                symbol: weapon.symbol,
                level: weapon.level
            }
        }

        if (message.payload?.hitPointer) {

            // Сохраняем в свою стату нанесенный противнику урон
            _member.makeDamage(weapon.power)

            fire['hitPointer'] = message.payload.hitPointer

            // Противник
            const hitPointer = await this._memberService.getById(message.payload.hitPointer.userId)

            // Отнимаем здоровье в зависимости от Урона Оружия
            const health = hitPointer.removeHealth(weapon.power)

            // Если противник погиб
            if (health < 1) {

                const killPointerTeam = arena.killPointer(hitPointer.userId, hitPointer.arenaTeam)
                await this._arenaService.update(arena)

                hitPointer.leaveArena()

                // Сохраняем в свою стату убитого противника
                _member.addKilledPointer()

                if (killPointerTeam.alive_members === 0) {

                    setTimeout(async () => {

                        const members: Member[][] = []

                        members[0] = await this._memberService.getByIds(arena.teamList[0].members)
                        members[1] = await this._memberService.getByIds(arena.teamList[1].members)

                        const p = {
                            teams: arena.teamList.map((team, index) => {
                                const minTrophies = team.status === 'victory' ? 10 : -10
                                return {
                                    teamId: team.id,
                                    status: team.status,
                                    members: members[index].map(member => {
                                        const wonTrophies = member.damage / 5
                                        return {
                                            userId: member.userId,
                                            trophies: minTrophies + wonTrophies
                                        }
                                    }),
                                }
                            })
                        }

                        this._rooms.arenas.broadcast(arena.id, {
                            event: 'battle-over',
                            payload: p
                        })

                    }, 2000)

                }


            }

            await this._memberService.update(hitPointer)
            await this._memberService.update(_member)
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