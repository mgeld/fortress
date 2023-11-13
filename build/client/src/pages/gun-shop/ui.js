"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GunShopPage = void 0;
const ui_1 = require("widgets/gun-shop/ui");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const GunShopPage = () => {
    return (<div className={styles_module_scss_1.default.gunShop}>
            <ui_1.GunShop />
        </div>);
};
exports.GunShopPage = GunShopPage;
