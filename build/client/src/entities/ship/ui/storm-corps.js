"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StormCorps = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const popout_root_1 = require("shared/ui/popout-root");
const icons_1 = require("./assets/icons");
const storm_corps_1 = require("entities/storm-corps");
const storm_corps_level_1 = require("entities/storm-corps/lib/storm-corps-level");
const StormCorps = () => {
    const invaders = storm_corps_1.stormModel.selectors.useStormInvaders();
    const level = storm_corps_1.stormModel.selectors.useStormLevel();
    return (<div onClick={() => popout_root_1.popoutModel.events.setPopout('storm-corps')} className={styles_module_scss_1.default.item}>
            <div className={styles_module_scss_1.default.__icon}>
                <icons_1.IconStorm width={36} height={36}/>
            </div>
            <div className={styles_module_scss_1.default.__info}>
                <div className={styles_module_scss_1.default.head}>
                    <div className={styles_module_scss_1.default.name}>Штурмовой корпус</div>
                    <div className={styles_module_scss_1.default.level}>
                        <span>{level} ур.</span>
                    </div>
                </div>
                <div className={styles_module_scss_1.default.description}>
                    <div className={styles_module_scss_1.default.name}>Штурмовики</div>
                    <div className={styles_module_scss_1.default.counter}>{invaders} / {storm_corps_level_1.StormCorpsLevel.getMaxInvaders(level)}</div>
                </div>

            </div>
        </div>);
};
exports.StormCorps = StormCorps;
