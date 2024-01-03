"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleConnect = void 0;
const _icons_1 = require("shared/assets/icons/_icons");
const popout_root_1 = require("shared/ui/popout-root");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const ui_1 = require("shared/ui/fbutton/ui");
const battle_1 = require("features/battle");
const battle_create_1 = require("shared/api/battle-create");
const BattleConnect = () => {
    return (<div className={styles_module_scss_1.default.battleConnect}>

            <div className={`${styles_module_scss_1.default.__content}`}>

                <div className={styles_module_scss_1.default.header}>

                    <div className={styles_module_scss_1.default.__border}>
                        <div className={styles_module_scss_1.default.name}>
                            Битва на арене
                        </div>
                        <div onClick={() => popout_root_1.popoutModel.events.setPopout(null)} className={styles_module_scss_1.default.close}>
                            <_icons_1.IconClose width={16} height={16} fill="#ffffff"/>
                        </div>
                    </div>

                    <div className={styles_module_scss_1.default.__whiteEffect}><div /></div>

                </div>

                <div className={styles_module_scss_1.default.main}>
                    <div className={styles_module_scss_1.default.__text}>
                        Ваша цель — захватить 5 фортов (башен) раньше, чем ваш соперник. Однако не забывайте, что если ваш корабль будет уничтожен, то битва завершится мгновенно.
                    </div>
                    <div className={styles_module_scss_1.default.button}>
                        <div className={styles_module_scss_1.default.__link}>
                            <ui_1.FButton width={140} color="gold" text="С друзьями" _click={() => {
            popout_root_1.popoutModel.events.setPopout(null);
            (0, battle_create_1.battleCreateAPI)();
        }}/>
                        </div>
                        <div className={styles_module_scss_1.default.__battle}>
                            <ui_1.FButton width={100} color="violet" text="В БОЙ" _click={() => {
            popout_root_1.popoutModel.events.setPopout(null);
            battle_1.battleConnectEvent.events.battleConnect(null);
        }}/>
                        </div>
                    </div>
                </div>

            </div>
        </div>);
};
exports.BattleConnect = BattleConnect;
