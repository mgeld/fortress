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
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const units = [{
        id: 100,
        currency: 'coins',
        price: 50
    }, {
        id: 101,
        currency: 'coins',
        price: 100
    }, {
        id: 11,
        currency: 'coins',
        price: 50
    }, {
        id: 12,
        currency: 'coins',
        price: 100
    }, {
        id: 21,
        currency: 'coins',
        price: 100
    }, {
        id: 22,
        currency: 'coins',
        price: 150
    },
    {
        id: 31,
        currency: 'rubies',
        price: 15
    },
    {
        id: 32,
        currency: 'rubies',
        price: 30
    },
    {
        id: 41,
        currency: 'coins',
        price: 50
    }, {
        id: 42,
        currency: 'rubies',
        price: 25
    },
    {
        id: 51,
        currency: 'coins',
        price: 120
    },
    {
        id: 52,
        currency: 'coins',
        price: 150
    },
];
const GunShop = () => {
    const coins = zone_1.zoneModel.selectors.useZoneCoins();
    const sapphires = zone_1.zoneModel.selectors.useZoneRubies();
    return (<ui_1.UnitsList>
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

                {units.map((item, i) => {
            console.log('item', item);
            return (<ui_2.UnitCard key={String(i)} icon={modules_1.modules[item.id].icon(66, 66)} name={modules_1.modules[item.id].name} unit={item}/>);
        })}

                <back_button_1.BackMap />
            </>
        </ui_1.UnitsList>);
};
exports.GunShop = GunShop;
