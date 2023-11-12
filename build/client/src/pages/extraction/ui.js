"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractionPage = void 0;
const ui_1 = require("widgets/extraction/ui");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const ExtractionPage = () => {
    return (<div className={styles_module_scss_1.default.hold}>
            <ui_1.Extraction />
        </div>);
};
exports.ExtractionPage = ExtractionPage;
