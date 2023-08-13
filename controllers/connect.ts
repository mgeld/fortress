
import { inject, injectable } from "inversify";
import { IWebSocket } from "../api/socket/server";
import { TConnectAPI, TEventConnect } from "../common-types/socket/client-to-server";
import { Pointer } from "../entities/pointer/pointer";
import { Gun } from "../entities/weapon/gun";
import { Weapon } from "../entities/weapon/weapon";
import { PointerService } from "../services/pointer.service";
import { WeaponService } from "../services/weapon.service";
import { TYPES } from "../types";
import { IRoute } from "./handlers";
import { ZoneService } from "../services/zone.service";
import { Zone } from "../entities/zone/zone";
import { CitadelService } from "../services/citadel.service";
import { Citadel } from "../entities/citadel/citadel";
import { TConnectPayload } from "../common-types/socket/server-to-client";

@injectable()
class ConnectHandler implements IRoute {

    @inject(TYPES.CitadelService) private _citadelService!: CitadelService
    @inject(TYPES.ZoneService) private _zoneService!: ZoneService
    @inject(TYPES.PointerService) private _pointerService!: PointerService
    @inject(TYPES.WeaponService) private _weaponService!: WeaponService

    constructor(
    ) {
        console.log('ConnectHandler')
    }

    public static EVENT: TEventConnect = "connect"

    async handle(
        message: TConnectAPI,
        uSocket: IWebSocket,
    ) {

        console.log('------ConnectHandler handle -----------')

        const USER_ID = message.payload.userId
        const USER_NAME = message.payload.name

        uSocket.user_id = USER_ID

        let pointer: Pointer
        let weapon: Weapon
        let zone: Zone
        let citadel: Citadel | null = null

        try {

            pointer = await this._pointerService.baseGetById(USER_ID)
            weapon = await this._weaponService.baseGetById(pointer.weapons[0])

            zone = await this._zoneService.getById(USER_ID)

            this._pointerService.memoryInsert(pointer)
            this._weaponService.memoryInsert(weapon)
            this._zoneService.memoryInsert(zone)

            if (zone.sectors > 0) {
                citadel = await this._citadelService.getById(pointer.id)
            }

        } catch (e) {

            weapon = this._weaponService.createGun(Gun.level(1))
            weapon.status = 'used'

            this._weaponService.memoryInsert(weapon)
            this._weaponService.baseInsert(weapon)

            pointer = this._pointerService.create(USER_ID, [0, 0], USER_NAME, weapon)
            zone = this._zoneService.create(USER_ID, pointer.color)

            this._pointerService.baseInsert(pointer)
            this._pointerService.memoryInsert(pointer)

            this._zoneService.baseInsert(zone)
            this._zoneService.memoryInsert(zone)

        }

        const dtoZone = zone.unmarshal()

        const payload: TConnectPayload = {
            user: {
                pos: pointer.pos,
                health: pointer.health,
            },
            zone: {
                sectors: dtoZone.sectors,
                trophies: dtoZone.trophies,
                coins: dtoZone.coins,
                rubies: dtoZone.rubies,
            },
            citadel: citadel ? {
                id: citadel.id,
                latlng: citadel.latlng,
                level: citadel.level
            } : null,
            weapon: [weapon.unmarshal()]
        }

        uSocket.send(JSON.stringify({
            event: 'connect',
            payload
        }))

    }
}

// ConnectHandler.EVENT = "connect"

export {
    ConnectHandler
}