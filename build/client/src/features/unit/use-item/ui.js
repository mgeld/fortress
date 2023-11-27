"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseItem = exports.useItemImproves = void 0;
const react_1 = require("react");
const popout_root_1 = require("shared/ui/popout-root");
const modules_1 = require("entities/unit/lib/modules");
const hold_1 = require("entities/hold");
const _icons_1 = require("shared/assets/icons/_icons");
const unit_1 = require("entities/unit");
const alert_1 = require("shared/ui/alert");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const model_1 = require("../use-extraction/model");
exports.useItemImproves = {
    20: 'storm-improve-power',
    30: 'ship-improve-health',
    40: 'gun-improve-power',
    50: 'gun-improve-distance',
    100: 'storm-add-invaders',
};
const UseItem = ({ item, upswing, type, details, modules }) => {
    const extr = hold_1.holdModel.selectors.useHoldItems();
    const unit = unit_1.unitModel.selectors.useBuyUnit();
    const [card, setCard] = (0, react_1.useState)(unit && ~modules.indexOf(unit) ? unit : modules[0]);
    const extrIndex = extr.findIndex(item => item === card);
    const closePopout = () => popout_root_1.popoutModel.events.setPopout(null);
    const openExtraction = () => {
        if (~extrIndex) {
            hold_1.holdModel.events.selectExtraction({
                id: card,
                index: extrIndex
            });
            (0, model_1.onUseExtraction)();
        }
        else {
            popout_root_1.popoutModel.events.setPopout('alert');
            alert_1.alertModel.events.setAlert({
                alert: modules_1.modules[card].name,
                message: `В трюме нет нужного предмета для использования. Перейти к покупке?`,
                action: {
                    close: true,
                    text: 'Подтвердить',
                    _click: () => {
                        unit_1.unitModel.events.selectBuyUnit(card);
                        popout_root_1.popoutModel.events.setPopout('select-unit');
                    }
                }
            });
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
                            Применить
                        </div>
                    </div>
                </div>


            </div>
        </div>);
};
exports.UseItem = UseItem;
