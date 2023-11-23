"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectHandler = void 0;
const events_1 = require("shared/api/events");
const __1 = require("..");
const popout_root_1 = require("shared/ui/popout-root");
class ConnectHandler extends __1.Handler {
    handle(message) {
        console.log('ConnectHandler handle');
        events_1.shipAPI.events.setHealth(message.payload.ship.health);
        events_1.shipAPI.events.setLevel(message.payload.ship.level);
        events_1.weaponsAPI.events.setId(message.payload.weapon[0].id);
        events_1.weaponsAPI.events.setBullets(message.payload.weapon[0].bullets);
        events_1.weaponsAPI.events.setDistance(message.payload.weapon[0].distance);
        events_1.weaponsAPI.events.setLevel(message.payload.weapon[0].level);
        events_1.weaponsAPI.events.setPower(message.payload.weapon[0].power);
        events_1.zoneAPI.events.setZoneSectors(message.payload.terrain.sectors);
        events_1.zoneAPI.events.setZoneLevel(message.payload.terrain.level);
        events_1.zoneAPI.events.setZoneCoins(message.payload.zone.coins);
        events_1.zoneAPI.events.setZoneRubies(message.payload.zone.rubies);
        events_1.zoneAPI.events.setZoneTrophies(message.payload.zone.trophies);
        events_1.stormAPI.events.setStormLevel(message.payload.storm.level);
        events_1.stormAPI.events.setStormPower(message.payload.storm.power);
        events_1.stormAPI.events.setStormInvaders(message.payload.storm.invaders);
        events_1.userAPI.events.setUser(message.payload.user.zoneId);
        events_1.userAPI.events.setRankLevel(message.payload.rank.level);
        events_1.userAPI.events.setRankExp(message.payload.rank.exp);
        events_1.holdAPI.events.setItems(message.payload.hold.items);
        events_1.holdAPI.events.setLevel(message.payload.hold.level);
        if (message.payload.citadel)
            events_1.citadelAPI.events.setCitadel(message.payload.citadel);
        if (message.payload.ship.pos[0] && message.payload.ship.pos[1]) {
            events_1.mapAPI.events.setMapMode('invade');
            events_1.shipAPI.events.setPos(message.payload.ship.pos);
        }
        else {
            popout_root_1.popoutModel.events.setPopout('primes');
            events_1.mapAPI.events.setMapMode('start');
        }
    }
}
exports.ConnectHandler = ConnectHandler;
ConnectHandler.EVENT = "connect";
