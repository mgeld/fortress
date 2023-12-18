"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditZoneHandler = void 0;
const events_1 = require("shared/api/events");
const __1 = require("..");
const popout_root_1 = require("shared/ui/popout-root");
const select_zone_1 = require("features/user/select-zone");
class EditZoneHandler extends __1.Handler {
    handle(message) {
        const update = message.payload;
        console.log('EditZoneHandler');
        if (update === null || update === void 0 ? void 0 : update.color) {
            events_1.sectorsAPI.events.setMyZoneColor(update.color);
            events_1.zoneAPI.events.setZoneColor(update.color);
        }
        if ((update === null || update === void 0 ? void 0 : update.description) !== undefined)
            events_1.zoneAPI.events.setZoneDescription(update.description);
        if (update === null || update === void 0 ? void 0 : update.name)
            events_1.userAPI.events.setName(update.name);
        if (update === null || update === void 0 ? void 0 : update.icon)
            events_1.userAPI.events.setUserIcon(update.icon);
        setTimeout(select_zone_1.setSelectMyZone, 500);
        popout_root_1.popoutModel.events.setPopout(null);
    }
}
exports.EditZoneHandler = EditZoneHandler;
EditZoneHandler.EVENT = "edit-zone";
