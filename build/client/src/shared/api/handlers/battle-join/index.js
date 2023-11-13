"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleJoinHandler = void 0;
const events_1 = require("shared/api/events");
const __1 = require("..");
class BattleJoinHandler extends __1.Handler {
    handle(message) {
        console.log('BattleJoinHandler handle');
        events_1.mapAPI.events.setMapMode('battle');
        events_1.shipAPI.events.setHealth(message.payload.user.health);
        events_1.shipAPI.events.setPos(message.payload.user.pos);
        events_1.battleAPI.events.setBattleStatus('pending');
    }
}
exports.BattleJoinHandler = BattleJoinHandler;
BattleJoinHandler.EVENT = "battle-join";
