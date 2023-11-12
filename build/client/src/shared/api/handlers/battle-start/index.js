"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleStartHandler = void 0;
const __1 = require("..");
const events_1 = require("shared/api/events");
class BattleStartHandler extends __1.Handler {
    handle(message) {
        events_1.pointersAPI.events.setPointers(message.payload.pointers);
        events_1.battleAPI.events.setArena({
            id: message.payload.battleId,
            time_start: message.payload.timeStart,
            place: message.payload.place
        });
        events_1.battleAPI.events.setTeams(message.payload.teams);
        events_1.battleAPI.events.setBattleStatus('start');
    }
}
exports.BattleStartHandler = BattleStartHandler;
BattleStartHandler.EVENT = "battle-start";
