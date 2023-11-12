"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tooltip = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const Tooltip = ({ pos, message }) => {
    return (<div className={`${styles_module_scss_1.default.tooltipRoot} ${styles_module_scss_1.default['p-' + pos]}`}>
            <div className={styles_module_scss_1.default.main}>
                {message}
            </div>
        </div>);
};
exports.Tooltip = Tooltip;
