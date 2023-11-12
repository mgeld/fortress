"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavShop = void 0;
const menu_nav_1 = require("shared/ui/menu-nav");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const shop_svg_1 = require("./shop.svg");
const page_root_1 = require("shared/ui/page-root");
const NavShop = () => {
    return (<menu_nav_1.MenuNav onClick={() => page_root_1.pageModel.events.setPage('gun-shop')} className={styles_module_scss_1.default.__shop} icon={<shop_svg_1.ReactComponent />} text="Магазин"/>);
};
exports.NavShop = NavShop;
