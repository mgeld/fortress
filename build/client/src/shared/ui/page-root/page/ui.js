"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
const react_1 = require("react");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const ui_1 = require("../page-root/ui");
const Page = ({ id, children }) => {
    const activePage = (0, react_1.useContext)(ui_1.PageRootContext);
    if (activePage !== id)
        return null;
    return (<div className={styles_module_scss_1.default.page}>
            {children}
        </div>);
};
exports.Page = Page;
