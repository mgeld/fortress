"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipPopout = void 0;
const popout_root_1 = require("shared/ui/popout-root");
const icons_1 = require("./assets/icons");
const storm_corps_1 = require("./storm-corps");
const gun_1 = require("./gun");
const hold_1 = require("./hold");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const __1 = require("..");
const ship_level_1 = require("../lib/ship-level");
const user_1 = require("entities/user");
const alert_1 = require("shared/ui/alert");
const _icons_1 = require("shared/assets/icons/_icons");
const ShipPopout = () => {
    const closePopout = () => popout_root_1.popoutModel.events.setPopout(null);
    const rankLevel = user_1.userModel.selectors.useRankLevel();
    const health = __1.shipModel.selectors.useShipHealth();
    const shipLevel = __1.shipModel.selectors.useShipLevel();
    const levelUp = () => {
        if (ship_level_1.ShipLevel.isUpLevel(shipLevel, rankLevel)) {
            popout_root_1.popoutModel.events.setPopout('ship-level-up');
        }
        else {
            popout_root_1.popoutModel.events.setPopout('alert');
            alert_1.alertModel.events.setAlert({
                alert: 'Уровень Корабля',
                message: 'У вас максимальный уровень Корабля на текущий Ранг Завоеваний. Для повышения уровня, сначала неободимо повысить Ранг Завоеваний.',
                action: {
                    close: false,
                    text: 'Закрыть',
                    _click: () => popout_root_1.popoutModel.events.setPopout("ship")
                }
            });
        }
    };
    return (<div className={styles_module_scss_1.default.ship}>

            <div className={styles_module_scss_1.default.header}>
                <div className={styles_module_scss_1.default.__border}>
                    <div className={styles_module_scss_1.default.name}>
                        Корабль
                    </div>
                    <div onClick={closePopout} className={styles_module_scss_1.default.close}>
                        <_icons_1.IconClose width={16} height={16} fill="#ffffff"/>
                    </div>
                </div>

            </div>

            <div className={styles_module_scss_1.default.__content}>

                <div className={styles_module_scss_1.default.__ship}>
                    <div className={styles_module_scss_1.default.__flex}>
                        <div className={styles_module_scss_1.default.__info}>

                            <div className={styles_module_scss_1.default.head}>
                                <div className={`${styles_module_scss_1.default.name}`}>
                                    Корабль
                                </div>
                                <div className={styles_module_scss_1.default.level}>
                                    <span>{shipLevel} ур.</span>
                                    <div onClick={levelUp} className={styles_module_scss_1.default.levelUp}>
                                        <icons_1.IconLevelUp width={18} height={18}/>
                                    </div>
                                </div>
                            </div>

                            <div className={styles_module_scss_1.default.description}>

                                <div className={styles_module_scss_1.default.name}>
                                    <div className={styles_module_scss_1.default.icon}>
                                        <icons_1.IconHealth width={24} height={24}/>
                                    </div>
                                    <div className={styles_module_scss_1.default.text}>
                                        Здоровье
                                    </div>
                                </div>

                                <div className={styles_module_scss_1.default.counter}>
                                    <span>
                                        {health} / {ship_level_1.ShipLevel.getMaxHealth(shipLevel)}
                                    </span>
                                    <div onClick={() => popout_root_1.popoutModel.events.setPopout('ship-improve-health')} className={styles_module_scss_1.default.levelUp}>
                                        <icons_1.IconPlus width={18} height={18}/>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className={styles_module_scss_1.default.__icon}>
                            <icons_1.IconShip width={64} height={64}/>
                        </div>
                    </div>

                </div>

                <div className={styles_module_scss_1.default.items}>
                    <storm_corps_1.StormCorps />
                    <gun_1.Gun />
                    <hold_1.Hold />
                </div>

                

            </div>
        </div>);
};
exports.ShipPopout = ShipPopout;
