import { inject, injectable } from "inversify"
import { TYPES } from "../types"
import { IRoute } from "./handlers"
import { Rooms } from "../api/socket/socket/rooms"
import { IWebSocket } from "../api/socket/server"
import { Areal } from "../entities/pointer/areal"
import { SectorService } from "../services/sector.service"
import { PointerService } from "../services/pointer.service"
import { IPointerMemoryRepository } from "../entities/repository"
import { TDirectAPI, TEventDirect } from "../common-types/socket/client-to-server"

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

        if (!uSocket.user_id) return

        const __position = message.payload?.position

        if (!__position) return

        const _pointer = await this._pointerService.memoryGetById(uSocket.user_id)

        if (_pointer.health < 1 && _pointer.areal !== -1) {
            return
        }

        const areal = Areal.generator(__position)

        if (_pointer.areal && _pointer.areal === areal) {

            this._rooms.areals.broadcast(_pointer.areal, {
                event: 'direct',
                payload: {
                    userId: _pointer.zoneId,
                    pos: __position
                }
            }, [_pointer.zoneId])
            
            _pointer.pos = __position

        } else {

            if (_pointer.areal && _pointer.areal !== -1) {
                this._rooms.areals.deleteClient(_pointer.zoneId, _pointer.areal)

                this._rooms.areals.broadcast(_pointer.areal, {
                    event: 'del-pointer',
                    payload: {
                        userId: _pointer.zoneId
                    }
                }, [_pointer.zoneId])
            }

            this._rooms.areals.addClientToRoom(_pointer.zoneId, areal, uSocket)

            const clients = this._rooms.areals.getClients(areal).filter(p => p !== _pointer.zoneId)
            const pointers = await this._repository.getByIds(clients)

            uSocket.send(JSON.stringify({
                event: 'pointers',
                payload: {
                    pointers: pointers.map(pointer => pointer.pointerUnmarshal())
                }
            }))

            /** ** **/

            let areals = Areal.generatorAreals(__position)

            const prevPosLat =  _pointer.pos[0]
            const prevPosLng =  _pointer.pos[1]

            const posLat =  __position[0]
            const posLng =  __position[1]

            if (
                Math.ceil(posLat - prevPosLat) > 0.02 ||
                Math.ceil(posLng - prevPosLng) > 0.03
            ) {

            } else if (_pointer.areal > 0) {

                    // const arealLat = +String(areal).slice(0, 4)
                    // const arealLng = +String(areal).slice(4)

                    // const prevArealLat = +String(_pointer.areal).slice(0, 4)
                    // const prevArealLng = +String(_pointer.areal).slice(4)

                    if (posLat > prevPosLat) {
                        areals = areals.slice(0, 3)
                    }
                    if (posLat < prevPosLat) {
                        areals = areals.slice(6)
                    }
                    if (posLng > prevPosLng) {
                        areals = [areals[2], areals[5], areals[8]]
                    }
                    if (posLng < prevPosLng) {
                        areals = [areals[0], areals[3], areals[6]]
                    }
                }

            const _sectors = await this._sectorService.getZonesAroundAreals(areals)
            // const _sectors = await this._sectorService.getZonesAroundPosition(_pointer.pos)

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
                            color: user?.color
                        },
                        sectors: zone.sectors
                    }
                })

                // Если у меня нет сектора в этом ареале
                if (!(_pointer.zoneId in zones)) {
                    sectors.push({
                        zone: {
                            zone_id: _pointer.zoneId,
                            color: _pointer.color
                        },
                        sectors: {}
                    })
                }

                uSocket.send(JSON.stringify({
                    event: 'add-sectors',
                    payload: sectors
                }))

            } else {
                const sectors = [{
                    zone: {
                        zone_id: _pointer.zoneId,
                        color: _pointer.color
                    },
                    sectors: {}
                }]

                uSocket.send(JSON.stringify({
                    event: 'set-sectors',
                    payload: sectors
                }))
            }

            _pointer.pos = __position
            _pointer.areal = areal

            /** */

            this._rooms.areals.broadcast(_pointer.areal, {
                event: 'connect-pointer',
                payload: {
                    lvl: _pointer.level,
                    color: _pointer.color,
                    userId: _pointer.zoneId,
                    icon: _pointer.user.icon,
                    name: _pointer.user.name,
                    health: _pointer.health,
                    pos: __position
                }
            }, [_pointer.zoneId])

        }

        this._pointerService.memoryUpdate(_pointer)

    }
}

// DirectHandler.EVENT = "direct"

export {
    DirectHandler
}