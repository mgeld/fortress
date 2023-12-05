"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zone = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const layout_rating_1 = require("widgets/layout-rating");
const Zone = () => {
    const zone = layout_rating_1.ratingModel.selectors.useRating().selectZone;
    if (!zone)
        return <></>;
    return (<div className={styles_module_scss_1.default.zone}>

            <div className={styles_module_scss_1.default.__content}>

                <div className={styles_module_scss_1.default.icon}>
                    <img src={zone.icon} alt="<>"/>
                </div>
                <div className={`${styles_module_scss_1.default.name} strw2`}>
                    {zone.name}
                </div>

                <div className={styles_module_scss_1.default.__whiteEffect}>
                    <div />
                </div>

            </div>

        </div>);
};
exports.Zone = Zone;
