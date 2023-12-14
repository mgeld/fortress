"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZonePage = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const ui_1 = require("widgets/zone/ui");
const ZonePage = () => {
    return (<div className={styles_module_scss_1.default.rating}>
            <ui_1.LayoutZone />
        </div>);
};
exports.ZonePage = ZonePage;
