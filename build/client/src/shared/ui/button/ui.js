"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const Button = ({ icon, className, text, disabled, onClick }) => {
    return (<div onClick={onClick} className={`${styles_module_scss_1.default.button} ${className}`}>
            {disabled ? <div className={styles_module_scss_1.default.disabled}/> : null}
            <div className={styles_module_scss_1.default.__content}>
                
                <div className={styles_module_scss_1.default.__text}>
                    <span>
                        {text}
                    </span>
                </div>
            </div>
            <div className={styles_module_scss_1.default.__whiteEffect}><div /></div>
        </div>);
};
exports.Button = Button;
