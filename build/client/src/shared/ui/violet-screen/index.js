"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VioletScreen = void 0;
const _icons_1 = require("shared/assets/icons/_icons");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const VioletScreen = ({ name, icon, message, action }) => {
    return (<div className={styles_module_scss_1.default.violetScreenRoot}>
            <div className={styles_module_scss_1.default.violetPopout}>

                <div className={`${styles_module_scss_1.default.__content} strw1`}>

                    <div className={styles_module_scss_1.default.header}>

                        <div className={styles_module_scss_1.default.__border}>
                            <div className={styles_module_scss_1.default.name}>
                                {name}
                            </div>
                            <div onClick={() => { }} className={styles_module_scss_1.default.close}>
                                <_icons_1.IconClose width={16} height={16} fill="#ffffff"/>
                            </div>
                        </div>

                        <div className={styles_module_scss_1.default.__whiteEffect}><div /></div>

                    </div>

                    <div className={styles_module_scss_1.default.main}>
                        <div className={styles_module_scss_1.default.__icon}>
                            {icon}
                        </div>
                        <div className={styles_module_scss_1.default.__text}>
                            {message}
                        </div>
                        <div className={styles_module_scss_1.default.button}>
                            <div className={styles_module_scss_1.default.__action} onClick={action._click}>
                                {action.text}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>);
};
exports.VioletScreen = VioletScreen;
