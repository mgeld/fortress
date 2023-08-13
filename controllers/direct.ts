import { inject, injectable } from "inversify"
import { TDirectAPI, TEventDirect } from "../common-types/socket/client-to-server"
import { PointerService } from "../services/pointer.service"
import { TYPES } from "../types"
import { IWebSocket } from "../api/socket/server";
import { IRoute } from "./handlers"
import { Rooms } from "../api/socket/socket/rooms"
import { Areal } from "../entities/pointer/areal"
import { IPointerMemoryRepository } from "../entities/repository"
import { SectorService } from "../services/sector.service";

@injectable()
class DirectHandler extends IRoute {
    @inject(TYPES.Rooms) private _rooms!: Rooms
    @inject(TYPES.PointerService) private _pointerService!: PointerService
    @inject(TYPES.PointerMemoryRepository) private _repository!: IPointerMemoryRepository
    @inject(TYPES.SectorService) private _sectorService!: SectorService

    public static EVENT: TEventDirect = "direct"

    async handle(
        message: TDirectAPI,
        uSocket: IWebSocket,
    ) {

        console.log('DirectHandler handle')

        const _pointer = await this._pointerService.memoryGetById(message.payload.userId)

        if (_pointer.health < 1) {
            return
        }

        _pointer.pos = message.payload.position

        const areal = Areal.generator(message.payload.position)

        if (_pointer.areal && _pointer.areal === areal) {

            this._rooms.areals.broadcast(_pointer.areal, {
                event: 'direct',
                payload: {
                    userId: message.payload.userId,
                    pos: message.payload.position
                }
            }, _pointer.id)

        } else {

            if (_pointer.areal) {
                this._rooms.areals.deleteClient(_pointer.id, _pointer.areal)

                this._rooms.areals.broadcast(_pointer.areal, {
                    event: 'del-pointer',
                    payload: {
                        userId: _pointer.id
                    }
                })
            }

            _pointer.areal = areal

            console.log('2 _pointer.areal', _pointer.areal)

            this._rooms.areals.addClientToRoom(_pointer.id, _pointer.areal, uSocket)

            const clients = this._rooms.areals.getClients(_pointer.areal).filter(p => p !== _pointer.id)
            const pointers = await this._repository.getByIds(clients)

            uSocket.send(JSON.stringify({
                event: 'pointers',
                payload: {
                    pointers: pointers.map(pointer => pointer.pointerUnmarshal())
                }
            }))

            /** **/
            const _sectors = await this._sectorService.getZonesAroundPosition(message.payload.position)

            const array_sectors = Object.values(_sectors)

            if (array_sectors.length > 0) {
                let zones: Record<number, number> = {}
                array_sectors.forEach(item => {
                    zones[item.zone.zone_id] = item.zone.zone_id
                })
                const _pointers = await this._pointerService.getZoneByIds(Object.values(zones))
                const sectors = array_sectors.map(zone => {

                    const user = _pointers.find(pointer => pointer.zone_id === zone.zone.zone_id)

                    return {
                        zone: {
                            ...zone.zone,
                            name: user?.name,
                            color: user?.color
                        },
                        sectors: zone.sectors
                    }
                })

                uSocket.send(JSON.stringify({
                    event: 'sectors',
                    payload: sectors
                }))

            }
            /** */

            this._rooms.areals.broadcast(_pointer.areal, {
                event: 'connect-pointer',
                payload: {
                    health: _pointer.health,
                    userId: message.payload.userId,
                    pos: message.payload.position
                }
            }, _pointer.id)

        }

        this._pointerService.memoryUpdate(_pointer)

    }
}

// DirectHandler.EVENT = "direct"

export {
    DirectHandler
}