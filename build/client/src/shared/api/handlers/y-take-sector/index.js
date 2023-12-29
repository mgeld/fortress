"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YTakeSectorHandler = void 0;
const __1 = require("..");
const zone_1 = require("entities/zone");
const snackbar_1 = require("shared/ui/snackbar");
const events_1 = require("shared/api/events");
class YTakeSectorHandler extends __1.Handler {
    handle(message) {
        console.log('YTakeSectorHandler message', message);
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
        zone_1.zoneModel.events.addSector();
        if (message.payload.exp) {
            events_1.userAPI.events.setRankExp(message.payload.exp);
        }
        if (message.payload.trp) {
            events_1.zoneAPI.events.setZoneTrophies(message.payload.trp);
        }
        snackbar_1.snackbarModel.events.newToast({
            text: 'Сектор захвачен!',
            t: 1
        });
    }
}
exports.YTakeSectorHandler = YTakeSectorHandler;
YTakeSectorHandler.EVENT = 'y-take-sector';
