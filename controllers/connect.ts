import fetch from 'node-fetch'

import { TYPES } from "../types"
import { IRoute } from "./handlers"
import { Zone } from "../entities/zone/zone"
import { inject, injectable } from "inversify"
import { IWebSocket } from "../api/socket/server"
import { Rooms } from "../api/socket/socket/rooms"
import { randomNumber } from "../libs/random-number"
import { Citadel } from "../entities/citadel/citadel"
import { Pointer } from "../entities/pointer/pointer"
import { WeaponType } from "../entities/weapon/types"
import { ZoneService } from "../services/zone.service"
import { VkUserService } from "../services/vk-user.service"
import { WeaponService } from "../services/weapon.service"
import { CitadelService } from "../services/citadel.service"
import { PointerService } from "../services/pointer.service"
import { verifyLaunchParams } from "../libs/verify-launch-params"
import { TConnectPayload } from "../common-types/socket/server-to-client"
import { TConnectAPI, TEventConnect } from "../common-types/socket/client-to-server"

@injectable()
class ConnectHandler implements IRoute {
    @inject(TYPES.Rooms) private _rooms!: Rooms
    @inject(TYPES.ZoneService) private _zoneService!: ZoneService
    @inject(TYPES.WeaponService) private _weaponService!: WeaponService
    @inject(TYPES.CitadelService) private _citadelService!: CitadelService
    @inject(TYPES.PointerService) private _pointerService!: PointerService
    @inject(TYPES.VkUserService) private _vkUserService!: VkUserService

    public static EVENT: TEventConnect = "connect"

    async handle(
        message: TConnectAPI,
        uSocket: IWebSocket,
    ) {

        console.log('ConnectHandler')

        const VK_URL = message.payload.url
        const __abduction = message.payload?.hash

        let zone: Zone
        let pointer: Pointer
        let weapon: WeaponType
        let citadel: Citadel | null = null

        // const clientSecret = 'D1m0YtrP8D0nd7dvdkEO'
        const clientSecret = 'SCecuoQxDCCS0hdTSuhe' // FortRess Official

        // Берём только параметры запуска.
        const launchParams = decodeURIComponent(VK_URL.slice(VK_URL.indexOf('?') + 1));

        // Проверяем, валидны ли параметры запуска.
        const result = verifyLaunchParams(launchParams, clientSecret);

        if (!result) return

        let { is_valid, vk_id } = result

        // vk_id = vk_id - randomNumber(10,1000) // Убрать в проде!!!!!!!!!!!!

        if (!is_valid || !vk_id) return 'ERROR_SECRET_KEY'

        try {

            console.log('CONNECT TRY')

            const { zone_id: zoneId } = await this._vkUserService.baseGetById(vk_id)

            const isClient = this._rooms.areals.getCientSocket(zoneId)

            // Если клиент уже подключен
            if (isClient) {

                console.log('isClient есть')

                isClient.send(JSON.stringify({
                    event: 'session-destroy',
                    payload: {}
                }))

                isClient.close(3000, 'session-destroy')

                // isClient.terminate()

                pointer = await this._pointerService.memoryGetById(zoneId)

                this._rooms.areals.deleteClient(zoneId, pointer.areal)
                this._rooms.areals.broadcast(pointer.areal, {
                    event: 'del-pointer',
                    payload: {
                        userId: zoneId
                    }
                }, [zoneId])

                pointer.areal = -1

                weapon = await this._weaponService.memoryGetById(pointer.weapons[0])
                zone = await this._zoneService.getById(zoneId)

            } else {
                pointer = await this._pointerService.baseGetById(zoneId)
                weapon = await this._weaponService.baseGetById(pointer.weapons[0])
                zone = await this._zoneService.getById(zoneId)

                this._zoneService.memoryInsert(zone)
                this._weaponService.memoryInsert(weapon)
            }

            this._pointerService.memoryInsert(pointer)

            if (zone.terrain.sectors > 0) {
                citadel = await this._citadelService.getById(zoneId)
            }

        } catch (e) {
            
            console.log('CONNECT CATCH')

            weapon = this._weaponService.createGun()

            this._weaponService.memoryInsert(weapon)
            this._weaponService.baseInsert(weapon)

            zone = this._zoneService.create(0)
            zone = await this._zoneService.baseInsert(zone)

            const request_params = {
                user_ids: '' + vk_id,
                fields: 'photo_100',
                access_token: 'be91a38abe91a38abe91a38aa1bd879becbbe91be91a38adbdefc537e9e9fcfee28a2d5',
                lang: 'ru',
                v: '5.130'
            }

            const url = 'https://api.vk.com/method/users.get?' + new URLSearchParams(request_params).toString();

            const result = await fetch(url, { method: 'GET' }).then(response => response.json())

            const user = result.response[0]

            const USER_NAME = user.first_name
            const USER_ICON = user.photo_100

            pointer = this._pointerService.create(
                zone.id,
                [0, 0],
                USER_NAME,
                USER_ICON,
                weapon
            )

            const vkUser = {
                vk_id,
                zone_id: zone.id,
                ufo: 0
            }

            if (__abduction && Number(__abduction) > 0) {
                try {
                    const rewardCoins = 60

                    const ufoZone = await this._zoneService.getById(__abduction)
                    ufoZone.addCoins(rewardCoins)
                    this._zoneService.memoryUpdate(ufoZone)

                    vkUser.ufo = ufoZone.id

                    const ufoVkUser = await this._vkUserService.getById(ufoZone.id)
                    if (ufoVkUser.is_msg === 1) {
                        const request_params = {
                            user_id: '' + ufoVkUser.vk_id,
                            message: `Вами был похищен [id${vkUser.vk_id}|${pointer.user.name}], который в следствие проведенных опытов стал одним из пришельцев. В качестве вознаграждения вы получили ${rewardCoins} монет.`,
                            random_id: '' + randomNumber(100, 10000),
                            access_token: 'vk1.a.8PG1mPGkbbSNx8yWgdQt_qz4_EjRKy91SlNKqeZ7sxmaLqnx-b_9MJNbtC71Go1A_jknLxDaj41gR-yB687rte_XDGmdsnwwsom__UvxICg6Wc0pmIYIoT3jMXcfsprLs0JhzDg3VFCWD_upITg2VnHhmG_apBvkM6VpJk6FEmIAr9cpXiuICCSHYBZ-cHZVp8VF1jVZFmSFJGOky0kdiQ',
                            v: '5.130'
                        }
                        const url = 'https://api.vk.com/method/messages.send?' + new URLSearchParams(request_params).toString();

                        fetch(url, { method: 'GET' })
                    }
                } catch (e) {

                }
            }

            await this._vkUserService.baseInsert(vkUser)

            this._pointerService.baseInsert(pointer)
            this._pointerService.memoryInsert(pointer)

            this._zoneService.memoryInsert(zone)

        }

        uSocket.user_id = zone.id

        const dtoZone = zone.unmarshal()

        console.log('ConnectHandler pointer.pos', pointer.pos)

        const payload: TConnectPayload = {
            user: {
                zoneId: zone.id,
                icon: pointer.user.icon,
                name: pointer.user.name
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
                color: dtoZone.color,
                coins: dtoZone.coins,
                rubies: dtoZone.rubies,
                trophies: dtoZone.trophies,
                description: dtoZone.description
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