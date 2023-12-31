"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitsLayout = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const UnitsLayout = ({ children }) => {
    return (<>
            <div className={styles_module_scss_1.default.unitsList}>
                <div className={styles_module_scss_1.default.__content}>
                    {children}
                </div>
            </div>
        </>);
};
exports.UnitsLayout = UnitsLayout;
