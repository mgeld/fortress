import WebSocket from "ws";
import { IWebSocket } from "../server";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";
import { Rooms } from "./rooms";
import { PointerService } from "../../../services/pointer.service";
import { ZoneService } from "../../../services/zone.service";
import { WeaponService } from "../../../services/weapon.service";
import { ArenaService } from "../../../services/arena.service";
import { MemberService } from "../../../services/member.service";

@injectable()
export class PingPong {

    @inject(TYPES.Rooms) private _rooms!: Rooms
    @inject(TYPES.ZoneService) private _zoneService!: ZoneService
    @inject(TYPES.WeaponService) private _weaponService!: WeaponService
    @inject(TYPES.PointerService) private _pointerService!: PointerService
    @inject(TYPES.ArenaService) private _arenaService!: ArenaService
    @inject(TYPES.MemberService) private _memberService!: MemberService

    private _wss: WebSocket.Server | null = null

    public async deleteUser(userId: number) {

        console.log('deleteUser')

        if (!userId) return

        const _pointer = await this._pointerService.memoryGetById(userId)
        const _zone = await this._zoneService.memoryGetById(userId)
        const _weapon = await this._weaponService.memoryGetById(_pointer.weapons[0])

        try {
            const member = await this._memberService.getById(userId)
            const arena = await this._arenaService.getById(member.arena)

            if (arena.status === 'pending') {

                arena.delPointer(member.userId, member.arenaTeam)

            } else if (arena.status === 'start') {
                arena.killPointer(member.userId, member.arenaTeam)
                this._rooms.arenas.broadcast(arena.id, {
                    event: 'del-pointer',
                    payload: {
                        userId: _pointer.zoneId
                    }
                }, [_pointer.zoneId])
            }

            this._memberService.remove(member.userId)
            this._rooms.arenas.deleteClient(member.userId, arena.id)

            await this._arenaService.update(arena)
        } catch (e) {

        }

        this._rooms.areals.getCientSocket(_zone.id)?.terminate();

        if (_pointer.areal !== -1) {

            this._rooms.areals.deleteClient(_pointer.zoneId, _pointer.areal)
            this._rooms.areals.broadcast(_pointer.areal, {
                event: 'del-pointer',
                payload: {
                    userId: _pointer.zoneId
                }
            }, [_pointer.zoneId])

            _pointer.areal = -1 // Типа удаляем ареал, чтобы в след заход появится у других в игре
        }

        await this._pointerService.baseUpdate(_pointer)
        await this._zoneService.baseUpdate(_zone)
        await this._weaponService.baseUpdate(_weapon)

        await this._weaponService.remove(_pointer.weapons[0])
        this._pointerService.remove(userId)
        this._zoneService.remove(userId)

        console.log('Конец удаления')
    }

    async each(ws: IWebSocket) {

        if (ws?.is_alive === false) {
            if (ws?.user_id) this.deleteUser(ws.user_id)
            return ws.terminate();
        }

        ws.is_alive = false;
        ws.ping();
    }

    pingPong() {
        // console.log('pingPong')
        if (this._wss)
            this._wss.clients.forEach(() => {
                this.each.bind(this)
            });
    }

    start(wss: WebSocket.Server) {
        this._wss = wss
        // const context = this
        setInterval(this.pingPong.bind(this), 5000);
    }

}