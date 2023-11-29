"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadApp = void 0;
const _icons_1 = require("shared/assets/icons/_icons");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const LoadApp = () => {
    return (<div className={styles_module_scss_1.default.loadAppRoot}>
            <div className={styles_module_scss_1.default.loadApp}>
                <div className={`${styles_module_scss_1.default.__content} strw2`}>

                    <div className={styles_module_scss_1.default.__load}>
                        <_icons_1.IconShip width={44} height={44} fill="#393E46"/>
                    </div>
                    <div className={styles_module_scss_1.default.__text}>
                        Загружаем<span>...</span>
                    </div>
                    
                </div>
            </div>
        </div>);
};
exports.LoadApp = LoadApp;
