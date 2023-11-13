"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tutorial = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const _1 = require(".");
const Tutorial = () => {
    const card = _1.tutorialModel.selectors.useTutorial();
    if (!card)
        return <></>;
    const cards = {
        ship: {
            name: 'Джойстик передвижения',
            description: `Чтобы манипулировать виртуальным джойстиком, проведедите пальцем по этой кнопке, и ваш корабль будет двигаться в том направлении, в котором тянется джойстик`,
            next: 'storm'
        },
        storm: {
            name: 'Кнопка захвата',
            description: `Чтобы захватывать башни и территории вокруг них, используйте выделенную кнопку.
            Она выпускает из корабля штурмовые дроны, которые нападают на ближайшую башню`,
            next: 'projector'
        },
        projector: {
            name: 'Кнопка луча',
            description: `В некоторых завоеванных башнях находятся полезные предметы для развития вашей зоны.
            Нажмите на данную кнопку для выпуска из корабля притягивающего луча, чтобы собирать найденные предметы`,
            next: 'gun'
        },
        gun: {
            name: 'Джойстик атаки',
            description: `Пушка нужна для защиты и нападения на вражеские корабли других игроков.
            Перемещение пальца по этому джойстики приведет к выстрелам из пушки в том направлении, в котором тянется джойстик`,
            next: null
        },
    };
    return (<div className={`${styles_module_scss_1.default.tutorialRoot} ${styles_module_scss_1.default[card]}`}>
            <div className={styles_module_scss_1.default.main}>
                <div className={styles_module_scss_1.default.name}>
                    {cards[card].name}
                </div>
                <div className={styles_module_scss_1.default.description}>
                    {cards[card].description}
                </div>
                <div className={styles_module_scss_1.default.next} onClick={() => _1.tutorialModel.events.setTutorial(cards[card].next)}>
                    <div>
                        {cards[card].next ? 'Далее' : 'Понятно!'}
                    </div>
                </div>

            </div>

        </div>);
};
exports.Tutorial = Tutorial;
