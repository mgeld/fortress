"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hold = void 0;
const popout_root_1 = require("shared/ui/popout-root");
const icons_1 = require("./assets/icons");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const hold_1 = require("entities/hold");
const hold_level_1 = require("entities/hold/lib/hold-level");
const Hold = () => {
    const lengthItems = hold_1.holdModel.selectors.useHoldItems().length;
    const level = hold_1.holdModel.selectors.useHoldLevel();
    return (<div onClick={() => popout_root_1.popoutModel.events.setPopout('hold')} className={styles_module_scss_1.default.item}>
            <div className={styles_module_scss_1.default.__icon}>
                <icons_1.IconHold width={32} height={32}/>
            </div>
            <div className={styles_module_scss_1.default.__info}>
                <div className={styles_module_scss_1.default.head}>
                    <div className={styles_module_scss_1.default.name}>Трюм корабля</div>
                    <div className={styles_module_scss_1.default.level}>
                        <span>{level} ур.</span>
                    </div>
                </div>
                <div className={styles_module_scss_1.default.description}>
                    <div className={styles_module_scss_1.default.name}>Предметы</div>
                    <div className={styles_module_scss_1.default.counter}>{lengthItems} / {hold_level_1.HoldLevel.getMaxItems(level)}</div>
                </div>
            </div>
        </div>);
};
exports.Hold = Hold;
