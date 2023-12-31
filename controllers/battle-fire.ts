
import { TYPES } from "../types"
import { IRoute } from "./handlers"
import { inject, injectable } from "inversify"
import { IWebSocket } from "../api/socket/server"
import { Rooms } from "../api/socket/socket/rooms"
import { ArenaService } from "../services/arena.service"
import { WeaponService } from "../services/weapon.service"
import { MemberService } from "../services/member.service"
import { BattleService } from "../services/battle.service"
import { PointerService } from "../services/pointer.service"
import { TFirePayload } from "../common-types/socket/server-to-client"
import { TFireAPI, TEventBattleFire } from "../common-types/socket/client-to-server"

@injectable()
class BattleFireHandler extends IRoute {
    @inject(TYPES.Rooms) private _rooms!: Rooms
    @inject(TYPES.MemberService) private _memberService!: MemberService
    @inject(TYPES.PointerService) private _pointerService!: PointerService
    @inject(TYPES.WeaponService) private _weaponService!: WeaponService
    @inject(TYPES.ArenaService) private _arenaService!: ArenaService
    @inject(TYPES.BattleService) private _battleService!: BattleService

    public static EVENT: TEventBattleFire = "battleFire"

    async handle(
        message: TFireAPI,
        uSocket: IWebSocket,
    ) {

        if (!uSocket.user_id) return

        const __pos = message.payload?.pos
        const __to_pos = message.payload?.to_pos
        const __direction = message.payload?.direction
        const __hitPointer = message.payload?.hitPointer

        if (!__pos || !__to_pos || !__direction) return

        console.log('BattleFireHandler handle')

        const _pointer = await this._pointerService.memoryGetById(uSocket.user_id)
        const _member = await this._memberService.getById(_pointer.zoneId)

        const weapon = await this._weaponService.memoryGetById(_pointer.weapons[0])

        const arena = await this._arenaService.getById(_member.arena)

        // Если я умер
        if (_pointer.health < 1) {
            return
        }

        // Если у меня нет патронов
        if (weapon.bullets < 1) {
            // return
        }

        weapon.bullets = weapon.bullets - 1
        await this._weaponService.memoryUpdate(weapon)

        const fire: TFirePayload = {
            pos: __pos,
            to_pos: __to_pos,
            direction: __direction,
            userId: _pointer.zoneId
        }

        if (__hitPointer) {

            // Противник
            const hitPointer = await this._pointerService.memoryGetById(__hitPointer.userId)

            const hitMember = await this._memberService.getById(__hitPointer.userId)

            // Разница между точкой попадания и позицией игрока на сервере
            const hit_lat_diff = __hitPointer.pos[0] > hitMember.pos[0] ? __hitPointer.pos[0] - hitMember.pos[0] : hitMember.pos[0] - __hitPointer.pos[0]
            const hit_lng_diff = __hitPointer.pos[1] > hitMember.pos[1] ? __hitPointer.pos[1] - hitMember.pos[1] : hitMember.pos[1] - __hitPointer.pos[1]

            // Разница между точкой выстрела и позицией игрока на сервере
            const pos_lat_diff = __pos[0] > _member.pos[0] ? __pos[0] - _member.pos[0] : _member.pos[0] - __pos[0]
            const pos_lng_diff = __pos[1] > _member.pos[1] ? __pos[1] - _member.pos[1] : _member.pos[1] - __pos[1]

            if (hit_lat_diff > 0.0006 || pos_lat_diff > 0.0006 || hit_lng_diff > 0.0010 || pos_lng_diff > 0.0010) return

            // Сохраняем в свою стату нанесенный противнику урон
            _member.makeDamage(weapon.power)

            fire['hitPointer'] = __hitPointer

            // Отнимаем здоровье в зависимости от Урона Оружия
            hitPointer.removeHealth(weapon.power)
            await this._pointerService.memoryUpdate(hitPointer)
            
            // await this._memberService.update(hitMember)

            fire.hitPointer.health = hitPointer.health

            // Если противник погиб
            if (hitPointer.health < 1) {

                const killPointerTeam = arena.killPointer(hitMember.userId, hitMember.arenaTeam)

                // hitMember.leaveArena()

                // Сохраняем в свою стату убитого противника
                _member.addKilledPointer()

                await this._memberService.update(_member)

                if (killPointerTeam.alive_members === 0) {

                    arena.completeBattle(killPointerTeam.id)

                    await this._arenaService.update(arena)

                    this._battleService.overGame(arena.id)
                } else {

                    await this._arenaService.update(arena)
                }

            } else {
                await this._memberService.update(_member)
            }

        }

        this._rooms.arenas.broadcast(_member.arena, {
            event: 'fire',
            payload: fire
        }, [_member.userId])

    }
}

// FireHandler.EVENT = 'fire'

export {
    BattleFireHandler
}