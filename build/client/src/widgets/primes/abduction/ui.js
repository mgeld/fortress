"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbductionPrimes = void 0;
const react_1 = require("react");
const prime_1 = require("shared/ui/prime");
const events_1 = require("shared/api/events");
const popout_root_1 = require("shared/ui/popout-root");
const icons_1 = require("widgets/panel/assets/icons");
const _icons_1 = require("entities/unit/icons/_icons");
const _icons_2 = require("shared/assets/icons/_icons");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const AbductionPrimes = () => {
    const [card, setCard] = (0, react_1.useState)(1);
    const cards = [
        {
            id: 1,
            name: "Похищение",
            icon: <_icons_2.IconShipBeam width={76} height={76}/>,
            message: "Вы просыпаетесь в странном месте — на борту гигантского летающего корабля. Вы не знаете, как здесь оказались. Последнее, что вы помните — это странный свет, который охватил вас и понес в небо.",
        },
        {
            id: 2,
            name: "Сон... или реальность?",
            icon: <_icons_2.IconAlien width={68} height={68}/>,
            message: "Когда вы приходите в себя, вам предстоит столкнуться с необъяснимым: вы больше не человек, а один из пришельцев. Опыты прищельцев были успешными.",
        },
        {
            id: 3,
            name: "Вы справитесь!",
            icon: <icons_1.IconShip width={78} height={78}/>,
            message: "Вы пока не знаете, что теперь ждет вас, но вы готовы к этому, ведь теперь у вас есть собственный летающий корабль!",
        },
        {
            id: 4,
            name: "Начало экспансии",
            icon: <_icons_1.IconStorm2 width={72} height={72}/>,
            message: "В роли пришельца вам предстоит завоевать эту планету! Теперь вы — командир армии штурмовиков, и ваша задача — взять под контроль все форты (башни), разбросанные по всей земле.",
        },
        {
            id: 5,
            name: "Победить сильнейший!",
            icon: <_icons_2.IconUFO width={74} height={74}/>,
            message: "Будьте готовы к неожиданным атакам и подлым трюкам ваших врагов. Защитите свои территории и покорите новые земли! Вас ждут великие завоевания и неповторимые победы!",
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
exports.AbductionPrimes = AbductionPrimes;
