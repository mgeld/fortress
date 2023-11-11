
import { inject, injectable } from "inversify";
import { IWebSocket } from "../api/socket/server";
import { TConnectAPI, TEventConnect } from "../common-types/socket/client-to-server";
import { Pointer } from "../entities/pointer/pointer";
import { PointerService } from "../services/pointer.service";
import { WeaponService } from "../services/weapon.service";
import { TYPES } from "../types";
import { IRoute } from "./handlers";
import { ZoneService } from "../services/zone.service";
import { Zone } from "../entities/zone/zone";
import { CitadelService } from "../services/citadel.service";
import { Citadel } from "../entities/citadel/citadel";
import { TConnectPayload } from "../common-types/socket/server-to-client";
import { VkUserRepository } from "../infra/database/mysql2/repositories/vk-user";
import { WeaponType } from "../entities/weapon/types";

@injectable()
class ConnectHandler implements IRoute {

    @inject(TYPES.CitadelService) private _citadelService!: CitadelService
    @inject(TYPES.ZoneService) private _zoneService!: ZoneService
    @inject(TYPES.PointerService) private _pointerService!: PointerService
    @inject(TYPES.WeaponService) private _weaponService!: WeaponService
    @inject(TYPES.VkUserRepository) private _vkUserRepository!: VkUserRepository

    constructor() {
        console.log('ConnectHandler')
    }

    public static EVENT: TEventConnect = "connect"

    async handle(
        message: TConnectAPI,
        uSocket: IWebSocket,
    ) {

        console.log('------ConnectHandler handle -----------')

        const VK_USER_ID = message.payload.vkUserId
        const USER_NAME = message.payload.name
        const USER_ICON = message.payload.icon

        let pointer: Pointer
        let weapon: WeaponType
        let zone: Zone
        let citadel: Citadel | null = null

        try {

            const { zone_id: zoneId } = await this._vkUserRepository.getById(VK_USER_ID)

            pointer = await this._pointerService.baseGetById(zoneId)

            weapon = await this._weaponService.baseGetById(pointer.weapons[0])

            zone = await this._zoneService.getById(zoneId)

            this._zoneService.memoryInsert(zone)
            this._weaponService.memoryInsert(weapon)
            this._pointerService.memoryInsert(pointer)

            if (zone.terrain.sectors > 0) {
                citadel = await this._citadelService.getById(zoneId)
            }

        } catch (e) {

            weapon = this._weaponService.createGun()

            this._weaponService.memoryInsert(weapon)
            this._weaponService.baseInsert(weapon)

            zone = this._zoneService.create(0)
            zone = await this._zoneService.baseInsert(zone)

            await this._vkUserRepository.insert({
                user_id: VK_USER_ID,
                zone_id: zone.id
            })

            pointer = this._pointerService.create(
                zone.id,
                [0, 0],
                USER_NAME,
                USER_ICON,
                weapon
            )

            this._pointerService.baseInsert(pointer)
            this._pointerService.memoryInsert(pointer)

            this._zoneService.memoryInsert(zone)
        }


        uSocket.user_id = zone.id

        const dtoZone = zone.unmarshal()

        const payload: TConnectPayload = {
            user: {
                zoneId: zone.id,
            },
            ship: {
                pos: pointer.pos,
                level: pointer.level,
                health: pointer.health,
            },
            storm: {
                level: dtoZone.stormtrooper_corps.level,
                power: dtoZone.stormtrooper_corps.power,
                invaders: dtoZone.stormtrooper_corps.invaders
            },
            rank: {
                exp: dtoZone.rank.exp,
                level: dtoZone.rank.rank,
            },
            terrain: {
                level: dtoZone.terrain.level,
                sectors: dtoZone.terrain.sectors,
            },
            zone: {
                coins: dtoZone.coins,
                rubies: dtoZone.rubies,
                trophies: dtoZone.trophies,
            },
            hold: dtoZone.hold,
            citadel: citadel ? {
                id: citadel.id,
                level: citadel.level,
                latlng: citadel.latlng,
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