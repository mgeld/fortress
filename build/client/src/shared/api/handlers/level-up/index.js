"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelUpHandler = void 0;
const __1 = require("..");
const notice_1 = require("shared/ui/notice");
const popout_root_1 = require("shared/ui/popout-root");
const events_1 = require("shared/api/events");
const page_root_1 = require("shared/ui/page-root");
class LevelUpHandler extends __1.Handler {
    handle(message) {
        console.log('LevelUpHandler message', message);
        const new_level = message.payload.new_level;
        const cost = message.payload.cost;
        const currency = message.payload.currency;
        const type = message.payload.type;
        let name = '';
        let text = '';
        if (currency === 'coins')
            events_1.zoneAPI.events.spendСoins(cost);
        else if (currency === 'rubies')
            events_1.zoneAPI.events.spendRubies(cost);
        switch (type) {
            case 'ship':
                name = `Повышение уровня`;
                text = `Корабль повышен до ${new_level}-го уровня!`;
                events_1.shipAPI.events.setLevel(new_level);
                break;
            case 'gun':
                name = `Повышение уровня`;
                text = `Пушка повышена до ${new_level}-го уровня!`;
                events_1.weaponsAPI.events.setLevel(new_level);
                break;
            case 'hold':
                name = `Повышение уровня`;
                text = `Трюм повышен до ${new_level}-го уровня!`;
                events_1.holdAPI.events.setLevel(new_level);
                break;
            case 'storm-corps':
                name = `Повышение уровня`;
                text = `Штурмовой корпус повышен до ${new_level}-го уровня!`;
                events_1.stormAPI.events.setStormLevel(new_level);
                break;
        }
        popout_root_1.popoutModel.events.setPopout(null);
        page_root_1.pageModel.events.setPage('map');
        notice_1.noticeModel.events.newToast({
            name,
            text,
            t: 'level-up'
        });
    }
}
exports.LevelUpHandler = LevelUpHandler;
LevelUpHandler.EVENT = 'level-up';
