"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tutorial = void 0;
const _1 = require(".");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const ship_1 = require("entities/ship");
const events_1 = require("shared/api/events");
const Tutorial = () => {
    const card = _1.tutorialModel.selectors.useTutorial();
    const pos = ship_1.shipModel.selectors.useShipPos();
    if (!card)
        return <></>;
    const setTutorial = () => {
        if (card === 'ship') {
            _1.tutorialModel.events.setTutorial(null);
            setTimeout(() => {
                events_1.pointersAPI.events.newPointer({
                    lvl: 1,
                    userId: -1,
                    icon: 'https://sun120-1.userapi.com/s/v1/ig2/Y5LhWYhLVxHswvVU4dGrqnGVc4wmSzQQKVKZXrlyflMWuRihg7F4TVephtlm4fmdE9SFxBCUKPFuxsqz4hIIu_cx.jpg?size=50x50&quality=95&crop=468,0,960,960&ava=1',
                    name: 'НЛО',
                    health: 50,
                    pos: [pos[0] + 0.004, pos[1]]
                });
                setTimeout(() => {
                    _1.tutorialModel.events.setTutorial('gun');
                }, 500);
            }, 3000);
        }
        else {
            _1.tutorialModel.events.setTutorial(null);
        }
    };
    const cards = {
        ship: {
            name: 'Джойстик передвижения',
            description: `Проведите пальцем по этому джойстику и ваш корабль будет двигаться в том направлении, в котором тянется джойстик`,
        },
        storm: {
            name: 'Кнопка захвата',
            description: `Чтобы захватывать башни и территории вокруг них, используйте выделенную кнопку.
            Она выпускает из корабля штурмовые дроны, которые нападают на ближайшую башню`,
        },
        projector: {
            name: 'Кнопка луча',
            description: `В некоторых завоеванных башнях находятся полезные предметы для развития вашей зоны.
            Нажмите на данную кнопку для выпуска из корабля притягивающего луча, чтобы собирать найденные предметы`,
        },
        gun: {
            name: 'Джойстик атаки',
            description: `Пушка нужна для защиты и нападения на вражеские корабли других игроков.
            Перемещение пальца по этому джойстику приведет к выстрелам из пушки в том направлении, в котором тянется джойстик`,
        },
        hold: {
            name: 'Трюм корабля',
            description: `Все собранные лучом предметы заносятся в трюм корабля.
            Нажмите на эту кнопку, чтобы открыть трюм, а затем выберите предмет, который хотите использовать`,
        },
    };
    return (<div className={`${styles_module_scss_1.default.tutorialRoot} ${styles_module_scss_1.default[card]}`}>
            <div className={`${styles_module_scss_1.default.main} strw1`}>
                <div className={styles_module_scss_1.default.name}>
                    {cards[card].name}
                </div>
                <div className={styles_module_scss_1.default.description}>
                    {cards[card].description}
                </div>
                <div className={styles_module_scss_1.default.next} onClick={setTutorial}>
                    <div>
                        
                        {'Понятно!'}
                    </div>
                </div>

            </div>

        </div>);
};
exports.Tutorial = Tutorial;
