"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDead = void 0;
const ui_1 = require("shared/ui/button/ui");
const popout_root_1 = require("shared/ui/popout-root");
const icons_1 = require("widgets/panel/assets/icons");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const UserDead = () => {
    return (<div className={styles_module_scss_1.default.userDead}>
            <div className={styles_module_scss_1.default.__content}>

                <div className={styles_module_scss_1.default.__dead}>

                    <div className={styles_module_scss_1.default.__header}>
                        <div className={styles_module_scss_1.default.__left}>
                            Поражение!
                        </div>
                        <div className={styles_module_scss_1.default.__right}>
                            
                        </div>

                    </div>

                    <div className={styles_module_scss_1.default.__main}>
                        <div className={styles_module_scss_1.default.__swords}>
                            
                            
                            <icons_1.IconShip width={64} height={64}/>
                        </div>
                        <div className={`${styles_module_scss_1.default.__info} strw1`}>
                            
                            Ваш корабль сломан. Восстановить корабль или продолжить наблюдение за областью?
                        </div>
                    </div>

                    <div className={styles_module_scss_1.default.__bottom}>

                        <div className={styles_module_scss_1.default.__button}>
                            <ui_1.Button className="strw1" radius={10} text="Наблюдать" onClick={() => popout_root_1.popoutModel.events.setPopout(null)}/>
                        </div>

                        <div className={styles_module_scss_1.default.__button}>
                            <ui_1.Button className="strw1" radius={10} text="Восстановить" onClick={() => popout_root_1.popoutModel.events.setPopout('ship-improve-health')}/>
                        </div>

                    </div>
                </div>

            </div>
        </div>);
};
exports.UserDead = UserDead;
