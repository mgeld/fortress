"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counter = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const Counter = ({ icon, width, className, text, onClick, children }) => {
    return (<div onClick={onClick} style={{ width: `${width}px` }} className={`${styles_module_scss_1.default.__counter} ${className}`}>
            {children}
            <div className={styles_module_scss_1.default.__content}>
                <div className={styles_module_scss_1.default.__icon}>
                    {icon}
                </div>
                <div className={styles_module_scss_1.default.__text}>
                    <span>
                        {text}
                    </span>
                </div>
            </div>
            <div className={styles_module_scss_1.default.__whiteEffect}><div /></div>
        </div>);
};
exports.Counter = Counter;
