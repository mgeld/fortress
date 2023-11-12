"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelUp = void 0;
const popout_root_1 = require("shared/ui/popout-root");
const _icons_1 = require("shared/assets/icons/_icons");
const _icons_2 = require("widgets/counters/icons/_icons");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const LevelUp = ({ _click, item, upswing, level, details, price }) => {
    const closePopout = () => popout_root_1.popoutModel.events.setPopout(null);
    return (<div className={styles_module_scss_1.default.levelUp}>

            <div className={styles_module_scss_1.default.header}>
                <div className={styles_module_scss_1.default.__border}>
                    {item}
                </div>
            </div>

            <div className={styles_module_scss_1.default.__content}>

                <div className={styles_module_scss_1.default.upswing}>
                    {upswing}
                </div>

                <div className={styles_module_scss_1.default.details}>
                    {details.map(item => {
            const prefix = (item === null || item === void 0 ? void 0 : item.prefix) ? item.prefix : '';
            return (<div className={styles_module_scss_1.default.item}>
                                <div className={styles_module_scss_1.default.name}>
                                    {item.name}
                                </div>
                                <div className={styles_module_scss_1.default.info}>
                                    <div className={styles_module_scss_1.default.was}>{item.was + prefix}</div>
                                    <div className={styles_module_scss_1.default.arrow}><_icons_1.IconArrow width={24} height={24}/></div>
                                    <div className={styles_module_scss_1.default.will}>{item.will + prefix}</div>
                                </div>
                            </div>);
        })}
                </div>

                <div className={styles_module_scss_1.default.resources}>

                    <div className={styles_module_scss_1.default.name}>
                        Необходимо:
                    </div>

                    <div className={styles_module_scss_1.default.price}>
                        <div className={styles_module_scss_1.default.icon}>{price.type === 'coins' ? <_icons_2.IconCoin /> : <_icons_2.IconSapphire />}</div>
                        <div className={styles_module_scss_1.default.quantity}>{price.quantity}</div>
                    </div>

                </div>

            </div>

            <div className={styles_module_scss_1.default.actions}>
                <div className={styles_module_scss_1.default.inside}>
                    <div onClick={closePopout} className={`${styles_module_scss_1.default.button} ${styles_module_scss_1.default.__white}`}>
                        Отмена
                    </div>
                    <div onClick={_click} className={styles_module_scss_1.default.button}>
                        Повысить
                    </div>
                </div>
            </div>

        </div>);
};
exports.LevelUp = LevelUp;
