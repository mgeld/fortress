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
import { PointerService } from "../services/pointer.service";
import { ZoneService } from "../services/zone.service";
import { BattleService } from "../services/battle.service";

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
            return
        }

        weapon.bullets = weapon.bullets - 1
        await this._weaponService.memoryUpdate(weapon)

        const fire: TFirePayload = {
            pos: message.payload.pos,
            to_pos: message.payload.to_pos,
            direction: message.payload.direction,
            userId: _pointer.zoneId
        }

        if (message.payload?.hitPointer) {

            // console.log('message.payload?.hitPointer', message.payload?.hitPointer)

            // Сохраняем в свою стату нанесенный противнику урон
            _member.makeDamage(weapon.power)

            fire['hitPointer'] = message.payload.hitPointer

            // Противник
            const hitMember = await this._memberService.getById(message.payload.hitPointer.userId)
            const hitPointer = await this._pointerService.memoryGetById(message.payload.hitPointer.userId)

            // Отнимаем здоровье в зависимости от Урона Оружия
            hitPointer.removeHealth(weapon.power)

            fire.hitPointer.health = hitPointer.health

            // console.log('hitPointer.health', hitPointer.health)
            // console.log('message.payload.hitPointer.userId', message.payload.hitPointer.userId)

            console.log('BattleFire _member.sectors', _member.sectors)

            // Если противник погиб
            if (hitPointer.health < 1) {

                console.log('Погиб hitPointer.zoneId', hitPointer.zoneId)

                const killPointerTeam = arena.killPointer(hitMember.userId, hitMember.arenaTeam)
                await this._arenaService.update(arena)

                hitMember.leaveArena()

                // Сохраняем в свою стату убитого противника
                _member.addKilledPointer()

                if (killPointerTeam.alive_members === 0) {
                    arena.completeBattle(killPointerTeam.id)
                    arena.destroyTimer()
                    this._battleService.overGame(arena.id)
                }

            }

            await this._pointerService.memoryUpdate(hitPointer)

            await this._memberService.update(hitMember)
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