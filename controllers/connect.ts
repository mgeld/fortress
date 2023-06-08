
import { inject, injectable } from "inversify";
import { IWebSocket } from "../api/socket/server";
import { TConnectAPI, TEventConnect } from "../common-types/socket/client-to-server";
import { Pointer } from "../entities/pointer/pointer";
import { PointerService } from "../services/pointer.service";
import { WeaponService } from "../services/weapon.service";
import { TYPES } from "../types";
import { IRoute } from "./handlers";

@injectable()
class ConnectHandler implements IRoute {

    constructor(
        @inject(TYPES.PointerService) private _pointerService: PointerService,
        @inject(TYPES.WeaponService) private _weaponService: WeaponService
    ) {
        console.log('ConnectHandler')
    }

    // async getVkUser(userId: number): Promise<{ photo_50: string }> {
    //     try {
    //         const userParams = {
    //             user_id: userId,
    //             fields: "sex, photo_50",
    //             access_token: '',
    //             lang: 'ru',
    //             v: '5.130'
    //         }
    //         const user = await fetch('https://api.vk.com/method/users.get' + encodeURIComponent(JSON.stringify(userParams)))
    //         // return JSON.parse(user)
    //     } catch (e) {
    //         throw new Error('vkkkkkk')
    //     }
    // }


    public static EVENT: TEventConnect = "connect"

    async handle(
        message: TConnectAPI,
        uSocket: IWebSocket,
        // broadcast: Broadcast
    ) {

        console.log('------ConnectHandler handle -----------')

        const USER_ID = message.payload.userId

        const DEFAULT_HEALTH = 100

        const weapon = await this._weaponService.createGun()
        weapon.status = 'used'

        const pointer = Pointer.create({
            userId: USER_ID,
            health: DEFAULT_HEALTH,
            pos: message.payload.position,
            // areal: '',
            weapons: [weapon.id]
        })

        this._pointerService.insert(pointer)

        uSocket.send(JSON.stringify({
            event: 'connect',
            payload: {
                user: {
                    pos: pointer.pos,
                    health: pointer.health,
                },
                weapon: [weapon.unmarshal()]
            }
        }))

    }
}

// ConnectHandler.EVENT = "connect"

export {
    ConnectHandler
}