"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BottomFlex = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const BottomFlex = ({ text, button }) => {
    return (<div className={styles_module_scss_1.default.bottomFlex}>
            <div className={styles_module_scss_1.default.__content}>
                <div className={styles_module_scss_1.default.__nameMode}>
                    {text}
                </div>
                <div className={styles_module_scss_1.default.__buttonMode}>
                    {button}
                </div>
            </div>
        </div>);
};
exports.BottomFlex = BottomFlex;
