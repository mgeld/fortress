"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YrTakeSectorHandler = void 0;
const __1 = require("..");
const zone_1 = require("entities/zone");
const events_1 = require("shared/api/events");
const snackbar_1 = require("shared/ui/snackbar");
class YrTakeSectorHandler extends __1.Handler {
    handle(message) {
        console.log('YrTakeSectorHandler message', message);
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
        zone_1.zoneModel.events.delSector();
        snackbar_1.snackbarModel.events.newToast({
            text: 'Ваш сектор захвачен!',
            t: 1
        });
    }
}
exports.YrTakeSectorHandler = YrTakeSectorHandler;
YrTakeSectorHandler.EVENT = 'yr-take-sector';
