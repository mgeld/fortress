"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyUnitHandler = void 0;
const __1 = require("..");
const notice_1 = require("shared/ui/notice");
const popout_root_1 = require("shared/ui/popout-root");
const events_1 = require("shared/api/events");
const ui_1 = require("features/unit/use-item/ui");
class BuyUnitHandler extends __1.Handler {
    handle(message) {
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
            case 10:
            case 11:
            case 12:
                name = `Покупка прошла успешно!`;
                text = `Модуль опыта добавлен в трюм корабля. Вы можете активировать модуль в любой момент!`;
                break;
            case 20:
            case 21:
            case 22:
                name = `Покупка прошла успешно!`;
                text = `Модуль штурмовой силы добавлен в трюм корабля. Вы можете активировать модуль в любой момент!`;
                break;
            case 30:
            case 31:
            case 32:
                name = `Покупка прошла успешно!`;
                text = `Модуль здоровья добавлен в трюм корабля. Вы можете активировать модуль в любой момент!`;
                break;
            case 40:
            case 41:
            case 42:
                name = `Покупка прошла успешно!`;
                text = `Модуль мощности добавлен в трюм корабля. Вы можете активировать модуль в любой момент!`;
                break;
            case 50:
            case 51:
            case 52:
                name = `Покупка прошла успешно!`;
                text = `Модуль дальности добавлен в трюм корабля. Вы можете активировать модуль в любой момент!`;
                break;
            case 100:
                name = `Покупка прошла успешно!`;
                text = `Группа штурма добавлена в трюм корабля. Вы можете активировать предмет в любой момент!`;
                break;
            case 101:
                name = `Покупка прошла успешно!`;
                text = `Эскадрон штурма добавлен в трюм корабля. Вы можете активировать предмет в любой момент!`;
                break;
            case 120:
                name = `Покупка прошла успешно!`;
                text = `Золотой камень добавлен в трюм корабля. Вы можете активировать предмет в любой момент!`;
                break;
            case 121:
                name = `Покупка прошла успешно!`;
                text = `Слиток золота добавлен в трюм корабля. Вы можете активировать предмет в любой момент!`;
                break;
            default:
                name = `Покупка прервалась`;
                text = `Возникла непредвиденная ошибка`;
        }
        const popout = ui_1.useItemImproves[(Math.floor(unit / 10) * 10)];
        popout_root_1.popoutModel.events.setPopout(popout);
        notice_1.noticeModel.events.newToast({
            name,
            text,
            t: unit
        });
    }
}
exports.BuyUnitHandler = BuyUnitHandler;
BuyUnitHandler.EVENT = 'buy-unit';
