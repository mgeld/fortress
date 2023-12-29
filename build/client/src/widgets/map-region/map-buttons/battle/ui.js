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
const popout_root_1 = require("shared/ui/popout-root");
const alert_1 = require("shared/ui/alert");
const NavBattle = () => {
    const onBattle = () => {
        popout_root_1.popoutModel.events.setPopout('alert');
        alert_1.alertModel.events.setAlert({
            alert: 'Битва на арене',
            message: 'Ваша цель — захватить 5 фортов (башен) раньше, чем ваш соперник. Но будьте осторожны, потому что если корабль одного из вас будет уничтожен, битва завершится мгновенно.',
            action: {
                close: false,
                text: 'На арену',
                _click: () => {
                    popout_root_1.popoutModel.events.setPopout(null);
                    battle_1.battleConnectEvent.events.battleConnect();
                }
            }
        });
    };
    return (<menu_nav_1.MenuNav onClick={onBattle} className={styles_module_scss_1.default.__battle} icon={<swords_svg_1.ReactComponent />} text="Арена"/>);
};
exports.NavBattle = NavBattle;
