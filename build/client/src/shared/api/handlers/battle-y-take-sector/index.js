"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleYTakeSectorHandler = void 0;
const __1 = require("..");
const events_1 = require("shared/api/events");
const snackbar_1 = require("shared/ui/snackbar");
class BattleYTakeSectorHandler extends __1.Handler {
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
        events_1.battleAPI.events.loseSector({
            team: message.payload.prev_owner_id
        });
        snackbar_1.snackbarModel.events.newToast({
            text: 'Сектор захвачен!',
            t: 1
        });
    }
}
exports.BattleYTakeSectorHandler = BattleYTakeSectorHandler;
BattleYTakeSectorHandler.EVENT = 'battle-y-take-sector';
