import { citadelAPI, holdAPI, mapAPI, shipAPI, stormAPI, userAPI, weaponsAPI, zoneAPI } from "shared/api/events";
import { Handler } from "..";
import { TConnect } from '@ctypes/socket/server-to-client'
import { popoutModel } from "shared/ui/popout-root";

class ConnectHandler extends Handler {
    handle(message: TConnect) {
        console.log('ConnectHandler handle')

        shipAPI.events.setHealth(message.payload.ship.health)
        shipAPI.events.setLevel(message.payload.ship.level)

        // weaponsAPI.events.setWeapons(message.payload.weapon)

        weaponsAPI.events.setId(message.payload.weapon[0].id)
        weaponsAPI.events.setBullets(message.payload.weapon[0].bullets)
        weaponsAPI.events.setDistance(message.payload.weapon[0].distance)
        weaponsAPI.events.setLevel(message.payload.weapon[0].level)
        weaponsAPI.events.setPower(message.payload.weapon[0].power)

        zoneAPI.events.setZoneSectors(message.payload.terrain.sectors)
        zoneAPI.events.setZoneLevel(message.payload.terrain.level)

        zoneAPI.events.setZoneCoins(message.payload.zone.coins)
        zoneAPI.events.setZoneRubies(message.payload.zone.rubies)
        zoneAPI.events.setZoneTrophies(message.payload.zone.trophies)

        stormAPI.events.setStormLevel(message.payload.storm.level)
        stormAPI.events.setStormPower(message.payload.storm.power)
        stormAPI.events.setStormInvaders(message.payload.storm.invaders)

        userAPI.events.setUser(message.payload.user.zoneId)
        userAPI.events.setRankLevel(message.payload.rank.level)
        userAPI.events.setRankExp(message.payload.rank.exp)

        holdAPI.events.setItems(message.payload.hold.items)
        holdAPI.events.setLevel(message.payload.hold.level)

        if (message.payload.citadel) citadelAPI.events.setCitadel(message.payload.citadel)

        if (message.payload.ship.pos[0] && message.payload.ship.pos[1]) {
            shipAPI.events.setPos(message.payload.ship.pos)
            mapAPI.events.setMapMode('invade')
        } else {
            // popoutModel.events.setPopout('select-place')
            // mapAPI.events.setMapMode('select-place')
            popoutModel.events.setPopout('primes')
            mapAPI.events.setMapMode('start')
        }
    }
}

ConnectHandler.EVENT = "connect"

export {
    ConnectHandler
}