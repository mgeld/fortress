"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleOverHandler = void 0;
const __1 = require("..");
const events_1 = require("shared/api/events");
class BattleOverHandler extends __1.Handler {
    handle(message) {
        events_1.battleAPI.events.setTeams(message.payload.teams);
        events_1.battleAPI.events.setBattleStatus('over');
    }
}
exports.BattleOverHandler = BattleOverHandler;
BattleOverHandler.EVENT = "battle-over";
