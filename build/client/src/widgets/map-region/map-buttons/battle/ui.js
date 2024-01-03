"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavBattle = void 0;
const menu_nav_1 = require("shared/ui/menu-nav");
const swords_svg_1 = require("./swords.svg");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const popout_root_1 = require("shared/ui/popout-root");
const NavBattle = () => {
    const onBattle = () => {
        popout_root_1.popoutModel.events.setPopout('battle-connect');
    };
    return (<menu_nav_1.MenuNav onClick={onBattle} className={styles_module_scss_1.default.__battle} icon={<swords_svg_1.ReactComponent />} text="Арена"/>);
};
exports.NavBattle = NavBattle;
