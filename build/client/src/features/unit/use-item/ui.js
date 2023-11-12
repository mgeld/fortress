"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseItem = void 0;
const react_1 = require("react");
const popout_root_1 = require("shared/ui/popout-root");
const modules_1 = require("entities/unit/lib/modules");
const hold_1 = require("entities/hold");
const _icons_1 = require("shared/assets/icons/_icons");
const unit_1 = require("entities/unit");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const UseItem = ({ item, upswing, type, details, modules }) => {
    const extr = hold_1.holdModel.selectors.useHoldItems();
    const [card, setCard] = (0, react_1.useState)(modules[0]);
    const extrIndex = extr.findIndex(item => item === card);
    const closePopout = () => popout_root_1.popoutModel.events.setPopout(null);
    const openExtraction = () => {
        console.log('extrIndex', extrIndex);
        if (~extrIndex) {
            hold_1.holdModel.events.selectExtraction({
                id: card,
                index: extrIndex
            });
            popout_root_1.popoutModel.events.setPopout('select-extraction');
        }
        else {
            unit_1.unitModel.events.selectUnit(card);
            popout_root_1.popoutModel.events.setPopout('unit-out-hold');
        }
    };
    return (<div className={styles_module_scss_1.default.useItem}>

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
                                    <div className={styles_module_scss_1.default.will}>{item.was + modules_1.modules[card].feature_amount + prefix}</div>
                                </div>
                            </div>);
        })}
                </div>

                <div className={styles_module_scss_1.default.modules}>

                    <div className={styles_module_scss_1.default.name}>
                        Доступные {type === 'module' ? 'модули' : 'предметы'}:
                    </div>

                    <div className={styles_module_scss_1.default.items}>

                        {modules.map(module => {
            return (<div className={`${styles_module_scss_1.default.item}${module === card ? ' ' + styles_module_scss_1.default.select : ''}`} onClick={() => setCard(module)}>
                                    <div className={styles_module_scss_1.default.module}>
                                        <div className={`${styles_module_scss_1.default.__icon} e${module}`}>
                                            {modules_1.modules[module].icon(66, 66)}
                                        </div>
                                        <div className={styles_module_scss_1.default.__name}>
                                            <div>
                                                {modules_1.modules[module].name}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles_module_scss_1.default.__status}>
                                        {extr.filter(item => item === module).length} штук
                                    </div>
                                </div>);
        })}

                    </div>

                </div>


                <div className={styles_module_scss_1.default.actions}>
                    <div className={styles_module_scss_1.default.inside}>
                        <div onClick={closePopout} className={`${styles_module_scss_1.default.button} ${styles_module_scss_1.default.__white}`}>
                            Отмена
                        </div>
                        <div onClick={() => openExtraction()} className={styles_module_scss_1.default.button}>
                            Повысить
                        </div>
                    </div>
                </div>


            </div>
        </div>);
};
exports.UseItem = UseItem;
