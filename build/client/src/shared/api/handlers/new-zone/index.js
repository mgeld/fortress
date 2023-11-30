"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewZoneHandler = void 0;
const __1 = require("..");
const notice_1 = require("shared/ui/notice");
const events_1 = require("shared/api/events");
class NewZoneHandler extends __1.Handler {
    handle(message) {
        console.log('NewZoneHandler message', message);
        events_1.zoneAPI.events.setZoneLevel(message.payload.level);
        notice_1.noticeModel.events.newToast({
            name: 'Новый Уровень Зоны!',
            text: 'Вы достигли новый уровень зоны!',
            t: 'level-zone'
        });
    }
}
exports.NewZoneHandler = NewZoneHandler;
NewZoneHandler.EVENT = 'new-zone';
