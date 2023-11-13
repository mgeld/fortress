"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyUnitHandler = void 0;
const __1 = require("..");
const notice_1 = require("shared/ui/notice");
const popout_root_1 = require("shared/ui/popout-root");
const events_1 = require("shared/api/events");
const page_root_1 = require("shared/ui/page-root");
class BuyUnitHandler extends __1.Handler {
    handle(message) {
        console.log('BuyUnitHandler message', message);
        const cost = message.payload.cost;
        const currency = message.payload.currency;
        const unit = message.payload.unit;
        let name = '';
        let text = '';
        if (currency === 'coins')
            events_1.zoneAPI.events.spendСoins(cost);
        else if (currency === 'rubies')
            events_1.zoneAPI.events.spendRubies(cost);
        events_1.holdAPI.events.addExtraction(unit);
        switch (unit) {
            case 11:
            case 12:
                name = `Покупка прошла успешно!`;
                text = `Модуль опыта добавлен в трюм корабля. Вы можете активрировать модуль в любой момент!`;
                break;
            case 21:
            case 22:
                name = `Покупка прошла успешно!`;
                text = `Модуль штурмовой силы добавлен в трюм корабля. Вы можете активрировать модуль в любой момент!`;
                break;
            case 31:
            case 32:
                name = `Покупка прошла успешно!`;
                text = `Модуль здоровья добавлен в трюм корабля. Вы можете активрировать модуль в любой момент!`;
                break;
            case 41:
            case 42:
                name = `Покупка прошла успешно!`;
                text = `Модуль мощности добавлен в трюм корабля. Вы можете активрировать модуль в любой момент!`;
                break;
            case 51:
            case 52:
                name = `Покупка прошла успешно!`;
                text = `Модуль дальности добавлен в трюм корабля. Вы можете активрировать модуль в любой момент!`;
                break;
            case 100:
            case 101:
                name = `Покупка прошла успешно!`;
                text = `Группа штурма добавлена в трюм корабля. Вы можете активрировать предмет в любой момент!`;
                break;
            default:
                name = `Покупка прервалась`;
                text = `Возникла непредвиденная ошибка`;
        }
        popout_root_1.popoutModel.events.setPopout(null);
        page_root_1.pageModel.events.setPage('map');
        notice_1.noticeModel.events.newToast({
            name,
            text,
            t: unit
        });
    }
}
exports.BuyUnitHandler = BuyUnitHandler;
BuyUnitHandler.EVENT = 'buy-unit';
