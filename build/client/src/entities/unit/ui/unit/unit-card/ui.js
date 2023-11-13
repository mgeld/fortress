"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitCard = void 0;
const unit_1 = require("entities/unit");
const popout_root_1 = require("shared/ui/popout-root");
const _icons_1 = require("widgets/counters/icons/_icons");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const UnitCard = ({ icon, name, unit }) => {
    const onUnit = (id) => {
        unit_1.unitModel.events.selectUnit(id);
        popout_root_1.popoutModel.events.setPopout('select-unit');
    };
    return (<div className={styles_module_scss_1.default.unitCard} onClick={() => onUnit(unit.id)}>
            <div className={`${styles_module_scss_1.default.item} c${unit.id}`}>
                <div className={styles_module_scss_1.default.__icon}>
                    {icon}
                </div>
                <div className={styles_module_scss_1.default.__name}>
                    <div>{name}</div>
                </div>
                <div className={styles_module_scss_1.default.__price}>
                    <div className={styles_module_scss_1.default.__flex}>
                        <div className={styles_module_scss_1.default.__number}>
                            {unit.price}
                        </div>
                        <div className={styles_module_scss_1.default.__icon}>
                            {unit.currency === 'coins' ? <_icons_1.IconCoin /> : <_icons_1.IconSapphire />}
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};
exports.UnitCard = UnitCard;
