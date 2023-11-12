"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutSectorItem = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const AboutSectorItem = ({ icon, text, name }) => {
    return (<div className={styles_module_scss_1.default.__item}>
            <div className={styles_module_scss_1.default.__icon}>{icon}</div>
            <div className={styles_module_scss_1.default.__name}>{name}</div>
            <div className={styles_module_scss_1.default.__text}>{text}</div>
        </div>);
};
exports.AboutSectorItem = AboutSectorItem;
