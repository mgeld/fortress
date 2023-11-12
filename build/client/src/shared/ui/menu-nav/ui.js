"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuNav = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const MenuNav = ({ icon, className, text, onClick }) => {
    return (<div onClick={onClick} className={`${styles_module_scss_1.default.menuNav} ${className}`}>
            {icon ? <div className={styles_module_scss_1.default.__icon}>
                {icon}
            </div> : null}
            <div className={styles_module_scss_1.default.__text}>
                <span>
                    {text}
                </span>
            </div>
            <div className={styles_module_scss_1.default.__whiteEffect}><div /></div>

        </div>);
};
exports.MenuNav = MenuNav;
