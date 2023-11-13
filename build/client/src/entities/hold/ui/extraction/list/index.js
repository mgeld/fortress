"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractionList = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const ExtractionList = ({ children }) => {
    return (<div className={styles_module_scss_1.default.extractionList}>
            <div className={styles_module_scss_1.default.__content}>
                {children}
            </div>
        </div>);
};
exports.ExtractionList = ExtractionList;
