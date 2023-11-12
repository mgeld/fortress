"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavMenu = void 0;
const popout_root_1 = require("shared/ui/popout-root");
const menu_svg_1 = require("./menu.svg");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const NavMenu = () => {
    return (<div onClick={() => popout_root_1.popoutModel.events.setPopout('panel')} className={styles_module_scss_1.default.menuNav}>
            <div className={styles_module_scss_1.default.__icon}>
                <menu_svg_1.ReactComponent />
            </div>
            <div className={styles_module_scss_1.default.__whiteEffect}><div /></div>
        </div>);
};
exports.NavMenu = NavMenu;
