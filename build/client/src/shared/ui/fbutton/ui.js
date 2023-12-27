"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FButton = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const FButton = ({ text, _click }) => {
    return (<div className={styles_module_scss_1.default.button} onClick={_click}>
            <div className={styles_module_scss_1.default.couche2}>
                <div className={styles_module_scss_1.default.couche3}>
                    <div className={styles_module_scss_1.default.couche4}>
                        <div className={styles_module_scss_1.default.couche5}>

                            <span className={styles_module_scss_1.default.text}>{text}</span>
                            <div className={styles_module_scss_1.default.couche6}></div>

                        </div>
                    </div>
                </div>
            </div>
        </div>);
};
exports.FButton = FButton;
