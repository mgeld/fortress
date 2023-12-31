"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleTakeSectorHandler = void 0;
const events_1 = require("shared/api/events");
const __1 = require("..");
class BattleTakeSectorHandler extends __1.Handler {
    handle(message) {
        if (message.payload.prev_owner_id > 0)
            events_1.sectorsAPI.events.setSectorById({
                new_zone_id: message.payload.new_owner_id,
                prev_zone_id: message.payload.prev_owner_id,
                sector: message.payload.sector_id,
                area: message.payload.area
            });
        else
            events_1.sectorsAPI.events.addSector({
                zone_id: message.payload.new_owner_id,
                sector: message.payload.sector_id,
                area: message.payload.area
            });
        events_1.battleAPI.events.addSector({
            team: message.payload.new_owner_id
        });
    }
}
exports.BattleTakeSectorHandler = BattleTakeSectorHandler;
BattleTakeSectorHandler.EVENT = 'battle-take-sector';
