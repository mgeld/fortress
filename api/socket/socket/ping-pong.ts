import WebSocket from "ws";
import { IWebSocket } from "../server";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";
import { Rooms } from "./rooms";
import { PointerService } from "../../../services/pointer.service";
import { ZoneService } from "../../../services/zone.service";
import { WeaponService } from "../../../services/weapon.service";

@injectable()
export class PingPong {

    @inject(TYPES.Rooms) private _rooms!: Rooms
    @inject(TYPES.ZoneService) private _zoneService!: ZoneService
    @inject(TYPES.WeaponService) private _weaponService!: WeaponService
    @inject(TYPES.PointerService) private _pointerService!: PointerService

    // @inject(TYPES.VkUserRepository) private _vkUserRepository!: VkUserRepository
    private _wss: WebSocket.Server | null = null

    constructor() {
    }

    public async deleteUser(userId: number) {

        if (!userId) return

        console.log('deleteUser')

        const _pointer = await this._pointerService.memoryGetById(userId)
        _pointer.areal = -1 // Типа удаляем ареал, чтобы в след заход появится у других в игре
        const _zone = await this._zoneService.memoryGetById(userId)
        const _weapon = await this._weaponService.memoryGetById(_pointer.weapons[0])

        console.log('//////////////// /////////////deleteUser _pointer.pos', _pointer.pos)

        await this._pointerService.baseUpdate(_pointer)
        await this._zoneService.baseUpdate(_zone)
        await this._weaponService.baseUpdate(_weapon)

        this._rooms.areals.deleteClient(_pointer.zoneId, _pointer.areal)

        await this._weaponService.remove(_pointer.weapons[0])
        this._pointerService.remove(userId)
        this._zoneService.remove(userId)
    }

    async each(ws: IWebSocket) {

        if (ws?.is_alive === false) {

            if (ws?.user_id) {
                this.deleteUser(ws?.user_id)
            }
            return ws.terminate();
        }

        ws.is_alive = false;
        ws.ping();
    }

    pingPong() {
        console.log('pingPong')
        if (this._wss)
            // const context = this
            this._wss.clients.forEach(this.each.bind(this));
    }

    start(wss: WebSocket.Server) {
        this._wss = wss
        // const context = this
        setInterval(this.pingPong.bind(this), 10000);
    }

}