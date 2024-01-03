"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Abduction = void 0;
const react_1 = require("react");
const user_1 = require("entities/user");
const popout_root_1 = require("shared/ui/popout-root");
const icons_1 = require("entities/ship/ui/assets/icons");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const Abduction = () => {
    const photo = user_1.userModel.selectors.useUser().userIcon;
    const [state, setState] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        setTimeout(() => setState('step_1'), 2000);
        setTimeout(() => setState('step_2'), 6000);
        setTimeout(() => popout_root_1.popoutModel.events.setPopout('abduction-primes'), 9000);
    }, []);
    return (<div className={styles_module_scss_1.default.violetScreenRoot}>
            <div className={`${styles_module_scss_1.default.abductionLayout} ${state ? styles_module_scss_1.default[state] : ''}`}>

                <div className={styles_module_scss_1.default.ship}>
                    <div className={styles_module_scss_1.default.__in}>
                        <icons_1.IconShip width={160} height={160}/>
                    </div>

                    <div className={styles_module_scss_1.default.beamBlock}>
                        <div className={styles_module_scss_1.default.beamBox}>
                            <div className={styles_module_scss_1.default.beam}/>
                        </div>
                    </div>
                </div>

                {state !== 'step_2' && (<div className={styles_module_scss_1.default.user}>
                        <div className={styles_module_scss_1.default.__in}>
                            <img src={photo} alt="<>"/>
                        </div>
                    </div>)}

            </div>
        </div>);
};
exports.Abduction = Abduction;
