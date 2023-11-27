"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimitHandler = void 0;
const __1 = require("..");
const alert_1 = require("shared/ui/alert");
const popout_root_1 = require("shared/ui/popout-root");
class LimitHandler extends __1.Handler {
    handle(message) {
        console.log('LimitHandler message', message);
        let name = '';
        let text = '';
        switch (message.payload.gives) {
            case 'gun_distance':
                name = `Дальность удара`;
                text = `Пушка имеет максимальную дальность на текущий уровень! Чтобы увеличить дальность, повысьте уровень пушки.`;
                break;
            case 'gun_power':
                name = `Мощность удара`;
                text = `Пушка имеет максимальную мощность на текущий уровень! Чтобы увеличить силу, повысьте уровень пушки.`;
                break;
            case 'ship_health':
                name = `Состояние корабля`;
                text = `Ваш корабль обладает максимальным здоровьем! Чтобы перешагнут отметку, повысьте уровень корабля.`;
                break;
            case 'storm_power':
                name = `Сила штурмовиков`;
                text = `Штурмовой корпус обладает максимальной силой на текущий уровень! Чтобы увеличить силу, повысьте уровень корпуса.`;
                break;
            case 'stormtroopers':
                name = `Штурмовики`;
                text = `Штурмовой корпус переполнен. Освободите место или повыстье уровень штурмового корпуса!`;
                break;
            case 'coins':
                name = `Монеты`;
                text = `У вас недостаточно монет. Вы можете получать монеты за различные предметы, которые можно найти в фортах после их завоеваний!`;
                break;
            case 'rubies':
                name = `Кристаллы`;
                text = `У вас недостаточно кристаллов. Вы можете получать кристаллы за различные предметы, которые можно найти в фортах после их завоеваний!`;
                break;
            case 'hold':
                name = `Трюм переполнен`;
                text = `В трюме недостаточно места для новых предметов. Необходимо использовать предметы или повысить уровень трюма`;
                break;
        }
        if (message.payload.gives === 'hold') {
            alert_1.alertModel.events.setAlert({
                alert: name,
                message: text,
                action: {
                    close: false,
                    text: 'Подтвердить',
                    _click: () => popout_root_1.popoutModel.events.setPopout(null)
                }
            });
        }
        else {
            alert_1.alertModel.events.setAlert({
                alert: name,
                message: text,
                action: {
                    close: true,
                    text: 'Подтвердить',
                    _click: () => popout_root_1.popoutModel.events.setPopout('ship')
                }
            });
        }
        popout_root_1.popoutModel.events.setPopout('alert');
    }
}
exports.LimitHandler = LimitHandler;
LimitHandler.EVENT = 'limit';
