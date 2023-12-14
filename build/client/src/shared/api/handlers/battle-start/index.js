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
        events_1.battleAPI.events.setTimer(120);
        events_1.sectorsAPI.events.setSectors([
            {
                zone: {
                    zone_id: 1,
                    color: 1,
                },
                sectors: []
            },
            {
                zone: {
                    zone_id: 2,
                    color: 2,
                },
                sectors: []
            },
        ]);
        setTimeout(() => events_1.battleAPI.events.setBattleStatus('start'), 500);
    }
}
exports.BattleStartHandler = BattleStartHandler;
BattleStartHandler.EVENT = "battle-start";
