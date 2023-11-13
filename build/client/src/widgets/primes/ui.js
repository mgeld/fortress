"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primes = void 0;
const react_1 = require("react");
const prime_1 = require("shared/ui/prime");
const icons_1 = require("widgets/panel/assets/icons");
const popout_root_1 = require("shared/ui/popout-root");
const events_1 = require("shared/api/events");
const _icons_1 = require("shared/assets/icons/_icons");
const _icons_2 = require("entities/unit/icons/_icons");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const Primes = () => {
    const [card, setCard] = (0, react_1.useState)(1);
    const cards = [
        {
            id: 1,
            name: "Начало экспансии",
            icon: <_icons_2.IconStorm2 width={74} height={74}/>,
            message: "В роли пришельца тебе предстоит завоевать планету, управляя армией штурмовиков и собирая ресурсы с башен, разбросанных по всей земле.",
        },
        {
            id: 2,
            name: "Корабль",
            icon: <icons_1.IconShip width={74} height={74}/>,
            message: "Для этого тебе представлен свой личный летающий корабль, на борту которой базируется корпус штурмовиков."
        },
        {
            id: 3,
            name: "Защита корабля",
            icon: <_icons_1.IconShipGun width={74} height={74}/>,
            message: "Для защиты от вражеских пришельцев, корабль оснащен плазменной пушкой, а для сбора необходимых ресурсов в корабль встроен проектор луча притяжения."
        },
    ];
    let action = card + 1 > Object.keys(cards).length ? {
        _click: () => {
            popout_root_1.popoutModel.events.setPopout(null);
            setTimeout(() => {
                popout_root_1.popoutModel.events.setPopout('select-place');
                events_1.mapAPI.events.setMapMode('select-place');
            }, 500);
        },
        text: 'Начать'
    } : {
        _click: () => setCard(card + 1),
        text: 'Далее'
    };
    return (<div className={styles_module_scss_1.default.primes}>

            {cards.map((_card) => {
            if (_card.id !== card)
                return <></>;
            return (<div className={styles_module_scss_1.default.card}>
                        <prime_1.Prime name={_card.name} icon={_card.icon} message={_card.message} action={action}/>
                    </div>);
        })}

            

        </div>);
};
exports.Primes = Primes;
