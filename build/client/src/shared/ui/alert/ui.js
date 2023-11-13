"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alert = void 0;
const popout_root_1 = require("shared/ui/popout-root");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const _1 = require(".");
const Alert = () => {
    const data = _1.alertModel.selectors.useAlert();
    if (!data)
        return <></>;
    const closePopout = () => popout_root_1.popoutModel.events.setPopout(null);
    return (<div className={styles_module_scss_1.default.alert}>

            <div className={styles_module_scss_1.default.header}>
                <div className={styles_module_scss_1.default.__border}>
                    {data === null || data === void 0 ? void 0 : data.alert}
                </div>
            </div>

            <div className={styles_module_scss_1.default.__content}>
                <div className={styles_module_scss_1.default.message}>
                    {data === null || data === void 0 ? void 0 : data.message}
                </div>

            </div>

            <div className={styles_module_scss_1.default.actions}>
                <div className={styles_module_scss_1.default.inside}>
                    <div onClick={closePopout} className={`${styles_module_scss_1.default.button} ${styles_module_scss_1.default.__white}`}>
                        Отмена
                    </div>
                    <div onClick={data.action._click} className={styles_module_scss_1.default.button}>
                        {data.action.text}
                    </div>
                </div>
            </div>

        </div>);
};
exports.Alert = Alert;
