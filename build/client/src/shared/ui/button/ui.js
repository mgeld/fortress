"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const Button = ({ radius = 6, className, text, disabled, onClick }) => {
    return (<div style={{
            borderRadius: `${radius}px`
        }} onClick={onClick} className={`${styles_module_scss_1.default.button} ${className}`}>
            {disabled ? <div style={{
                borderRadius: `${radius / 1.5}px`,
            }} className={styles_module_scss_1.default.disabled}/> : null}
            <div className={styles_module_scss_1.default.__content}>
                <div className={styles_module_scss_1.default.__text}>
                    <span>
                        {text}
                    </span>
                </div>
            </div>
            <div className={styles_module_scss_1.default.__whiteEffect}>
                <div style={{
            borderRadius: `${radius / 1.5}px`,
        }}/>
            </div>
        </div>);
};
exports.Button = Button;
