import { citadelAPI, mapAPI, userAPI, weaponsAPI, zoneAPI } from "shared/api/events";
import { Handler } from "..";
import { TConnect } from '@ctypes/socket/server-to-client'
import { popoutModel } from "shared/ui/PopoutRoot";

class ConnectHandler extends Handler {
    handle(message: TConnect) {
        console.log('ConnectHandler handle')
        console.log('ConnectHandler message.payload.user.pos', message.payload.user.pos)
        weaponsAPI.events.setWeapons(message.payload.weapon)
        userAPI.events.setHealth(message.payload.user.health)

        zoneAPI.events.setZoneCoins(message.payload.zone.coins)
        zoneAPI.events.setZoneRubies(message.payload.zone.rubies)
        zoneAPI.events.setZoneSectors(message.payload.zone.sectors)
        zoneAPI.events.setZoneTrophies(message.payload.zone.trophies)

        if(message.payload.citadel) citadelAPI.events.setCitadel(message.payload.citadel)

        if (message.payload.user.pos[0] && message.payload.user.pos[1]) {
            userAPI.events.setPos(message.payload.user.pos)
            mapAPI.events.setMapMode('invade')
        } else {
            popoutModel.events.setPopout('select-place')
            mapAPI.events.setMapMode('select-place')
        }
    }
}

ConnectHandler.EVENT = "connect"

export {
    ConnectHandler
}