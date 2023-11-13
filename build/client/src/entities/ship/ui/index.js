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
const ShipPopout = () => {
    const closePopout = () => popout_root_1.popoutModel.events.setPopout(null);
    const health = __1.shipModel.selectors.useShipHealth();
    const level = __1.shipModel.selectors.useShipLevel();
    return (<div className={styles_module_scss_1.default.ship}>

            <div className={styles_module_scss_1.default.header}>
                <div className={styles_module_scss_1.default.__border}>
                    Корабль
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
                                    <span>{level} ур.</span>
                                    {ship_level_1.ShipLevel.isUpLevel(level) ? <div onClick={() => popout_root_1.popoutModel.events.setPopout('ship-level-up')} className={styles_module_scss_1.default.levelUp}>
                                        <icons_1.IconLevelUp width={18} height={18}/>
                                    </div> : null}
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
                                        {health} / {ship_level_1.ShipLevel.getMaxHealth(level)}
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

                <div className={styles_module_scss_1.default.actions}>
                    <div className={styles_module_scss_1.default.inside}>
                        <div onClick={closePopout} className={`${styles_module_scss_1.default.button} ${styles_module_scss_1.default.__white}`}>
                            Закрыть
                        </div>
                        <div onClick={() => popout_root_1.popoutModel.events.setPopout('ship-level-up')} className={styles_module_scss_1.default.button}>
                            Улучшить
                        </div>
                    </div>
                </div>

            </div>
        </div>);
};
exports.ShipPopout = ShipPopout;
