"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GunShop = void 0;
const ui_1 = require("entities/unit/ui/unit/units-list/ui");
const ui_2 = require("entities/unit/ui/unit/unit-card/ui");
const _icons_1 = require("widgets/counters/icons/_icons");
const shop_svg_1 = require("./shop.svg");
const back_button_1 = require("widgets/back-button");
const zone_1 = require("entities/zone");
const modules_1 = require("entities/unit/lib/modules");
const unit_buy_list_1 = require("entities/unit/lib/unit-buy-list");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const units = Object.entries({
    100: unit_buy_list_1.unitsPrices[100],
    101: unit_buy_list_1.unitsPrices[101],
    120: unit_buy_list_1.unitsPrices[120],
    121: unit_buy_list_1.unitsPrices[121],
    30: unit_buy_list_1.unitsPrices[30],
    31: unit_buy_list_1.unitsPrices[31],
    10: unit_buy_list_1.unitsPrices[10],
    11: unit_buy_list_1.unitsPrices[11],
    21: unit_buy_list_1.unitsPrices[21],
    22: unit_buy_list_1.unitsPrices[22],
    41: unit_buy_list_1.unitsPrices[41],
    42: unit_buy_list_1.unitsPrices[42],
    50: unit_buy_list_1.unitsPrices[50],
    52: unit_buy_list_1.unitsPrices[52],
}).reverse();
const GunShop = () => {
    const coins = zone_1.zoneModel.selectors.useZoneCoins();
    const sapphires = zone_1.zoneModel.selectors.useZoneRubies();
    return (<ui_1.UnitsLayout>
            <>
                <div className={styles_module_scss_1.default.__header}>
                    <div className={styles_module_scss_1.default.iosTop}/>
                    <div className={styles_module_scss_1.default.__main}>
                        <div className={styles_module_scss_1.default.name}>
                            <div className={styles_module_scss_1.default.icon}>
                                <shop_svg_1.ReactComponent width={30} height={30}/>
                            </div>
                            <div className={styles_module_scss_1.default.text}>Магазин</div>
                        </div>
                        <div className={styles_module_scss_1.default.details}>
                            <div className={styles_module_scss_1.default.coins}>
                                <div className={styles_module_scss_1.default.icon}>
                                    <_icons_1.IconCoin />
                                </div>
                                <div className={styles_module_scss_1.default.text}>{coins}</div>
                            </div>
                            <div className={styles_module_scss_1.default.sapphires}>
                                <div className={styles_module_scss_1.default.icon}>
                                    <_icons_1.IconSapphire />
                                </div>
                                <div className={styles_module_scss_1.default.text}>{sapphires}</div></div>
                        </div>
                    </div>
                </div>

                <div className={styles_module_scss_1.default.__before}/>

                {units.map(([_id, unit]) => {
            const id = _id;
            return (<ui_2.UnitCard key={String(id)} id={id} icon={modules_1.modules[id].icon(66, 66)} name={modules_1.modules[id].name} unit={unit}/>);
        })}

                <back_button_1.BackMap />
            </>

        </ui_1.UnitsLayout>);
};
exports.GunShop = GunShop;
