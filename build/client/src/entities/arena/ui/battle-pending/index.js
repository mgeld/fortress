"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattlePending = void 0;
const _icons_1 = require("shared/assets/icons/_icons");
const ui_1 = require("shared/ui/button/ui");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const events_1 = require("shared/api/events");
const battle_1 = require("features/battle");
const popout_root_1 = require("shared/ui/popout-root");
const BattlePending = () => {
    const breakBattlePending = () => {
        events_1.mapAPI.events.setMapMode('invade');
        events_1.battleAPI.events.setBattleStatus("default");
        popout_root_1.popoutModel.events.setPopout(null);
        battle_1.battleLeaveEvent.battleLeave();
    };
    return (<div className={styles_module_scss_1.default.battlePending}>
            <div className={styles_module_scss_1.default.__content}>

                <div className={styles_module_scss_1.default.__shield}>
                    <_icons_1.IconBattleShield width={68} height={68}/>
                </div>

                <div className={styles_module_scss_1.default.__swords}>
                    <_icons_1.IconBattleSwords width={56} height={56}/>
                </div>
                <div className={styles_module_scss_1.default.__text}>
                    Поиск противников<span>...</span>
                </div>
                <div className={styles_module_scss_1.default.__search}>
                    <_icons_1.IconBattleLoupe />
                </div>

                <div className={styles_module_scss_1.default.button}>
                    <ui_1.Button className={styles_module_scss_1.default.__button} text="Прервать" onClick={breakBattlePending}/>
                </div>

            </div>
        </div>);
};
exports.BattlePending = BattlePending;
