"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardHandler = void 0;
const __1 = require("..");
const notice_1 = require("shared/ui/notice");
const events_1 = require("shared/api/events");
class RewardHandler extends __1.Handler {
    handle(message) {
        const amount = message.payload.amount;
        let name = '';
        let text = '';
        switch (message.payload.type) {
            case 'coins':
                name = `Монеты`;
                text = `Вы получили ${amount} монет!`;
                events_1.zoneAPI.events.addCoins(amount);
                break;
            case 'rubies':
                name = `Кристаллы`;
                text = `Вы получили ${amount} кристаллов!`;
                events_1.zoneAPI.events.addRubies(amount);
                break;
            default:
        }
        notice_1.noticeModel.events.newToast({
            name,
            text,
            t: message.payload.type
        });
    }
}
exports.RewardHandler = RewardHandler;
RewardHandler.EVENT = 'reward';
