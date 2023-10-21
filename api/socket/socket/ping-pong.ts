import WebSocket from "ws";
import { IWebSocket } from "../server";
import { inject } from "inversify";
import { TYPES } from "../../../types";
import { Rooms } from "./rooms";
import { PointerService } from "../../../services/pointer.service";

export class PingPong {

    @inject(TYPES.Rooms) private _rooms!: Rooms
    @inject(TYPES.PointerService) private _pointerService!: PointerService

    private _wss: WebSocket.Server

    constructor(wss: WebSocket.Server) {
        this._wss = wss

        this.start()
    }

    public async deleteUser(userId: number) {
        const _pointer = await this._pointerService.memoryGetById(userId)
        this._rooms.areals.deleteClient(_pointer.zoneId, _pointer.areal)
        await this._pointerService.baseInsert(_pointer)
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
        // const context = this
        this._wss.clients.forEach(this.each.bind(this));
    }

    start() {
        // const context = this
        setInterval(this.pingPong.bind(this), 10000);
    }

}