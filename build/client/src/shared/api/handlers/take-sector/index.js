"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TakeSectorHandler = void 0;
const events_1 = require("shared/api/events");
const __1 = require("..");
class TakeSectorHandler extends __1.Handler {
    handle(message) {
        console.log('TakeSectorHandler');
        if (message.payload.prev_owner_id > 0)
            events_1.sectorsAPI.events.setSectorById({
                new_zone_id: message.payload.new_owner_id,
                prev_zone_id: message.payload.prev_owner_id,
                sector: message.payload.sector_id
            });
        else
            events_1.sectorsAPI.events.addSector({
                zone_id: message.payload.new_owner_id,
                sector: message.payload.sector_id
            });
    }
}
exports.TakeSectorHandler = TakeSectorHandler;
TakeSectorHandler.EVENT = 'take-sector';
