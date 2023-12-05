"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyUnit = void 0;
const unit_1 = require("entities/unit");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const popout_root_1 = require("shared/ui/popout-root");
const modules_1 = require("entities/unit/lib/modules");
const model_1 = require("../model");
const unit_buy_list_1 = require("entities/unit/lib/unit-buy-list");
const _icons_1 = require("shared/assets/icons/_icons");
const BuyUnit = () => {
    const _unit = unit_1.unitModel.selectors.useBuyUnit();
    if (!_unit)
        return <></>;
    const unit = modules_1.modules[_unit];
    const closePopout = () => popout_root_1.popoutModel.events.setPopout(null);
    const _price = unit_buy_list_1.unitsPrices[_unit];
    const buyUnit = () => {
        popout_root_1.popoutModel.events.setPopout(null);
        (0, model_1.onBuyUnit)();
    };
    return (<div className={styles_module_scss_1.default.unit}>

            <div className={styles_module_scss_1.default.header}>
                <div className={styles_module_scss_1.default.__border}>
                    {unit.name}
                </div>
            </div>

            <div className={styles_module_scss_1.default.__content}>

                <div className={styles_module_scss_1.default.feature}>

                    <div className={styles_module_scss_1.default.properties}>

                        <div className={styles_module_scss_1.default.__name}>
                            {unit.feature_name}
                        </div>

                        <div className={styles_module_scss_1.default.__amount}>
                            +{unit.feature_amount}
                        </div>
                    </div>

                    <div className={`${styles_module_scss_1.default.icon} e${_unit}`}>
                        {unit.icon(66, 66)}
                    </div>
                </div>

                <div className={styles_module_scss_1.default.description}>
                    {unit.description}
                </div>
                <div className={styles_module_scss_1.default.resources}>

                    <div className={styles_module_scss_1.default.name}>
                        Цена:
                    </div>

                    <div className={styles_module_scss_1.default.price}>
                        <div className={styles_module_scss_1.default.icon}>{_price.currency === 'coins' ? <_icons_1.IconCoin /> : <_icons_1.IconSapphire />}</div>
                        <div className={styles_module_scss_1.default.quantity}>{_price.price}</div>
                    </div>

                </div>

                <div className={styles_module_scss_1.default.actions}>
                    <div className={styles_module_scss_1.default.inside}>
                        <div onClick={closePopout} className={`${styles_module_scss_1.default.button} ${styles_module_scss_1.default.__white}`}>
                            Отмена
                        </div>
                        <div onClick={buyUnit} className={styles_module_scss_1.default.button}>
                            Купить
                        </div>
                    </div>
                </div>

            </div>
        </div>);
};
exports.BuyUnit = BuyUnit;
