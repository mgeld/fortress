import { Handler } from "..";
import { TLimit } from '@ctypes/socket/server-to-client'
import { noticeModel } from "shared/ui/notice";
import { alertModel } from "shared/ui/alert";
import { popoutModel } from "shared/ui/popout-root";

class LimitHandler extends Handler {
    handle(message: TLimit) {

        console.log('LimitHandler message', message)

        let name = ''
        let text = ''

        switch (message.payload.gives) {
            case 'gun_distance':
                name = `Дальность удара`
                text = `Пушка имеет максимальную дальность на текущий уровень! Чтобы увеличить дальность, повысьте уровень пушки.`
                break;
            case 'gun_power':
                name = `Мощность удара`
                text = `Пушка имеет максимальную мощность на текущий уровень! Чтобы увеличить силу, повысьте уровень пушки.`
                break;
            case 'ship_health':
                name = `Состояние корабля`
                text = `Ваш корабль обладает максимальным здоровьем! Чтобы перешагнут отметку, повысьте уровень корабля.`
                break;
            case 'storm_power':
                name = `Сила штурмовиков`
                text = `Штурмовой корпус обладает максимальной силой на текущий уровень! Чтобы увеличить силу, повысьте уровень корпуса.`
                break;
            case 'stormtroopers':
                name = `Штурмовики`
                text = `Штурмовой корпус переполнен. Освободите место или повыстье уровень штурмового корпуса!`
                break;
            case 'coins':
                name = `Монеты`
                text = `У вас недостаточно монет для покупки. Монетки могут выпадать после захвата башен, которые окружены золотым территорием!`
                break;
            case 'rubies':
                name = `Кристаллы`
                text = `У вас недостаточно кристаллов для покупки. Кристаллы могут выпадать после захвата башен, которые окружены золотым территорием!`
                break;

        }

        alertModel.events.setAlert({
            alert: name,
            message: text,
            action: {
                text: 'Подтвердить',
                _click: () => popoutModel.events.setPopout('ship')
            }
        })

        popoutModel.events.setPopout('alert')


    }

}

LimitHandler.EVENT = 'limit'

export {
    LimitHandler
}