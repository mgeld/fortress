"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutZone = void 0;
const back_button_1 = require("shared/ui/back-button");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const layout_rating_1 = require("widgets/layout-rating");
const _icons_1 = require("shared/assets/icons/_icons");
const profile_1 = require("./profile");
const LayoutZone = () => {
    const statistic = layout_rating_1.ratingModel.selectors.useSelectZone();
    return (<div className={styles_module_scss_1.default.zoneLayout}>
            <div className={styles_module_scss_1.default.__content}>

                <div className={styles_module_scss_1.default.__header}>
                    <div className={styles_module_scss_1.default.iosTop}/>
                    <div className={styles_module_scss_1.default.__main}>

                        <div className={styles_module_scss_1.default.name}>
                            <div className={styles_module_scss_1.default.icon}>
                                <_icons_1.IconTerrain width={32} height={32}/>
                            </div>
                            <div className={styles_module_scss_1.default.text}>Зона</div>
                        </div>

                    </div>
                </div>

                <div className={styles_module_scss_1.default.__before}/>

                {statistic ?
            <profile_1.Profile statistic={statistic}/>
            :
                <div className={styles_module_scss_1.default.noData}>
                        <div>Загрузка...</div>
                    </div>}

                <back_button_1.BackMap color="#9e7cc3"/>

            </div>
        </div>);
};
exports.LayoutZone = LayoutZone;
