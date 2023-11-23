"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseExtractionHandler = void 0;
const __1 = require("..");
const notice_1 = require("shared/ui/notice");
const popout_root_1 = require("shared/ui/popout-root");
const events_1 = require("shared/api/events");
const page_root_1 = require("shared/ui/page-root");
class UseExtractionHandler extends __1.Handler {
    handle(message) {
        console.log('UseExtractionHandler message', message);
        const amount = message.payload.amount;
        let name = '';
        let text = '';
        switch (message.payload.type) {
            case 'rank_exp':
                name = `Опыт завоеваний`;
                text = `Получено ${amount} единиц опыта завоеваний!`;
                events_1.userAPI.events.addRankExp(amount);
                break;
            case 'gun_distance':
                name = `Дальность удара`;
                text = `Дальность удара пушки увеличена на ${amount} метров!`;
                events_1.weaponsAPI.events.increaseDistance(amount);
                break;
            case 'gun_power':
                name = `Мощность удара`;
                text = `Сила пушечного залпа увеличена на ${amount} единиц!`;
                events_1.weaponsAPI.events.increasePower(amount);
                break;
            case 'ship_health':
                name = `Состояние корабля`;
                text = `Здоровье корабля увеличено на ${amount} единиц!`;
                events_1.shipAPI.events.addHealth(amount);
                break;
            case 'storm_power':
                name = `Сила штурмовиков`;
                text = `Сила штурмовиков повышена на ${amount} единиц!`;
                events_1.stormAPI.events.improveStormPower(amount);
                break;
            case 'stormtroopers':
                name = `Штурмовики`;
                text = `Штурмовой корпус пополнен на ${amount} штурмовиков!`;
                events_1.stormAPI.events.addInvaders(amount);
                break;
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
                name = `Ошибка типа common`;
                text = `Обратитесь в поддержку что ли`;
                break;
        }
        popout_root_1.popoutModel.events.setPopout(null);
        page_root_1.pageModel.events.setPage('map');
        events_1.holdAPI.events.delExtraction(message.payload.index);
        notice_1.noticeModel.events.newToast({
            name,
            text,
            t: message.payload.unit
        });
    }
}
exports.UseExtractionHandler = UseExtractionHandler;
UseExtractionHandler.EVENT = 'use-extraction';
