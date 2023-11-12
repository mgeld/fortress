"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavBattle = void 0;
const menu_nav_1 = require("shared/ui/menu-nav");
const swords_svg_1 = require("./swords.svg");
const battle_1 = require("features/battle");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const NavBattle = () => {
    return (<menu_nav_1.MenuNav onClick={() => battle_1.battleConnectEvent.events.battleConnect()} className={styles_module_scss_1.default.__battle} icon={<swords_svg_1.ReactComponent />} text="Арена"/>);
};
exports.NavBattle = NavBattle;
