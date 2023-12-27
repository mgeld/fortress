"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbductionPage = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const abduction_1 = require("widgets/abduction");
const AbductionPage = () => {
    return (<div className={styles_module_scss_1.default.abduction}>
            <abduction_1.LayoutAbduction />
        </div>);
};
exports.AbductionPage = AbductionPage;
