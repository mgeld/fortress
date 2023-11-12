"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prime = void 0;
const popout_root_1 = require("shared/ui/popout-root");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const Prime = ({ name, icon, message, action }) => {
    const closePopout = () => popout_root_1.popoutModel.events.setPopout(null);
    return (<div className={styles_module_scss_1.default.prime}>

            <div className={styles_module_scss_1.default.header}>
                <div className={styles_module_scss_1.default.__border}>
                    {name}
                </div>
            </div>

            <div className={styles_module_scss_1.default.__content}>
                <div className={styles_module_scss_1.default.icon}>
                    {icon}
                </div>
                <div className={styles_module_scss_1.default.message}>
                    {message}
                </div>
            </div>

            <div className={styles_module_scss_1.default.actions}>
                <div className={styles_module_scss_1.default.inside}>
                    
                    <div onClick={action._click} className={styles_module_scss_1.default.button}>
                        {action.text}
                    </div>
                </div>
            </div>

        </div>);
};
exports.Prime = Prime;
