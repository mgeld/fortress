"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipCell = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const popout_root_1 = require("shared/ui/popout-root");
const icons_1 = require("entities/ship/ui/assets/icons");
const ShipCell = ({ head, items }) => {
    const closePopout = () => popout_root_1.popoutModel.events.setPopout(null);
    return (<div className={styles_module_scss_1.default.shipItem}>

            <div className={styles_module_scss_1.default.header}>
                <div className={styles_module_scss_1.default.__border}>
                    {head.name}
                </div>
            </div>

            <div className={styles_module_scss_1.default.__content}>

                <div className={styles_module_scss_1.default.main}>

                    <div className={styles_module_scss_1.default.__info}>

                        <div className={styles_module_scss_1.default.head}>
                            <div className={`${styles_module_scss_1.default.name}`}>{head.level_name}</div>
                            <div className={styles_module_scss_1.default.level}>
                                <span>{head.level} ур.</span>
                                {head.up ? <div className={styles_module_scss_1.default.levelUp} onClick={head.up._click}>
                                    <icons_1.IconLevelUp width={18} height={18}/>
                                </div> : <></>}
                            </div>
                        </div>

                        <div className={styles_module_scss_1.default.__icon}>
                            {head.icon}
                        </div>

                    </div>

                    <div className={styles_module_scss_1.default.units}>
                        {items.map(unit => {
            return (<div className={styles_module_scss_1.default.__unit}>
                                    <div className={styles_module_scss_1.default.name}>
                                        
                                        <div className={styles_module_scss_1.default.text}>
                                            {unit.name}
                                        </div>
                                    </div>
                                    <div className={styles_module_scss_1.default.__line}></div>
                                    <div className={styles_module_scss_1.default.counter}>
                                        <div onClick={unit._click ? unit._click : () => { }} className={styles_module_scss_1.default.levelUp}>
                                            
                                            <icons_1.IconPlus width={18} height={18}/>
                                            
                                            
                                        </div>
                                        <span>{unit.counter}</span>
                                    </div>
                                </div>);
        })}
                    </div>

                </div>

                <div className={styles_module_scss_1.default.actions}>
                    <div className={styles_module_scss_1.default.inside}>
                        <div onClick={closePopout} className={`${styles_module_scss_1.default.button} ${styles_module_scss_1.default.__white}`}>
                            Закрыть
                        </div>
                        <div onClick={() => popout_root_1.popoutModel.events.setPopout('ship')} className={styles_module_scss_1.default.button}>
                            В корабль
                        </div>
                    </div>
                </div>

            </div>

        </div>);
};
exports.ShipCell = ShipCell;
