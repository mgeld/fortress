"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleJoinHandler = void 0;
const __1 = require("..");
const notice_1 = require("shared/ui/notice");
const events_1 = require("shared/api/events");
class BattleJoinHandler extends __1.Handler {
    handle(message) {
        var _a;
        const status = message.payload.status;
        if (status === 'start') {
            notice_1.noticeModel.events.newToast({
                name: 'Не удалось присоединиться!',
                text: 'Битва уже началась, но Вы можете начать на арене новое сражение',
                t: 'warning'
            });
            return;
        }
        if (status === 'over') {
            notice_1.noticeModel.events.newToast({
                name: 'Не удалось присоединиться!',
                text: 'Эта битва уже завершилась, но Вы можете начать на арене новое сражение',
                t: 'warning'
            });
            return;
        }
        if ((_a = message.payload) === null || _a === void 0 ? void 0 : _a.user) {
            events_1.mapAPI.events.setMapMode('battle');
            events_1.battleAPI.events.setBattleStatus(message.payload.status);
            events_1.battleAPI.events.setMyTeam(message.payload.user.team);
            events_1.shipAPI.events.setPos(message.payload.user.pos);
        }
    }
}
exports.BattleJoinHandler = BattleJoinHandler;
BattleJoinHandler.EVENT = "battle-join";
