"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleIdHandler = void 0;
const __1 = require("..");
const events_1 = require("shared/api/events");
const popout_root_1 = require("shared/ui/popout-root");
class BattleIdHandler extends __1.Handler {
    handle(message) {
        const { id } = message.payload;
        events_1.battleAPI.events.setBattleShareId(id);
        popout_root_1.popoutModel.events.setPopout('battle-link');
    }
}
exports.BattleIdHandler = BattleIdHandler;
BattleIdHandler.EVENT = "battle-id";
