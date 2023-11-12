"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDead = void 0;
const _icons_1 = require("shared/assets/icons/_icons");
const ui_1 = require("shared/ui/button/ui");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const map_1 = require("entities/map");
const events_1 = require("shared/api/events");
const citadel_1 = require("entities/citadel");
const popout_root_1 = require("shared/ui/popout-root");
const _icons_2 = require("widgets/counters/icons/_icons");
const UserDead = () => {
    var _a;
    const { mode } = map_1.mapModel.selectors.useMapMode();
    const latlng = ((_a = citadel_1.citadelModel.selectors.useCitadel()) === null || _a === void 0 ? void 0 : _a.latlng) || null;
    const selectPosition = (pos) => {
        if (!pos)
            return;
        mode === 'battle' && events_1.mapAPI.events.setMapMode('invade');
        events_1.shipAPI.events.setPos(pos);
        popout_root_1.popoutModel.events.setPopout(null);
    };
    return (<div className={styles_module_scss_1.default.userDead}>
            <div className={styles_module_scss_1.default.__content}>

                <div className={styles_module_scss_1.default.__dead}>

                    <div className={styles_module_scss_1.default.__header}>
                        <div className={styles_module_scss_1.default.__left}>
                            Поражение!
                        </div>
                        <div className={styles_module_scss_1.default.__right}>
                            <div className={styles_module_scss_1.default.__icon}>
                                <_icons_2.IconTrophy width={34} height={34}/>
                            </div>
                            <div className={styles_module_scss_1.default.__text}>
                                -25
                            </div>
                        </div>

                    </div>

                    <div className={styles_module_scss_1.default.__main}>
                        <div className={styles_module_scss_1.default.__swords}>
                            <_icons_1.IconBattleShield width={64} height={64}/>
                        </div>
                        <div className={styles_module_scss_1.default.__info}>
                            Ваш корабль потерпел крушение. Вернуться в цитадель или продолжить наблюдение за областью?
                        </div>
                    </div>

                    <div className={styles_module_scss_1.default.__bottom}>

                        <div className={styles_module_scss_1.default.__button}>
                            <ui_1.Button className="" text="Наблюдать" onClick={() => popout_root_1.popoutModel.events.setPopout(null)}/>
                        </div>

                        <div className={styles_module_scss_1.default.__button}>
                            <ui_1.Button className="" text="В цитадель" onClick={() => selectPosition(latlng)}/>
                        </div>

                    </div>
                </div>

            </div>
        </div>);
};
exports.UserDead = UserDead;
