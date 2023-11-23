"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapButtons = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const battle_1 = require("./battle");
const booty_1 = require("./booty");
const menu_1 = require("./menu");
const map_1 = require("entities/map");
const MapButtons = () => {
    const mode = map_1.mapModel.selectors.useMapMode().mode;
    if (mode !== 'invade')
        return <></>;
    return (<>
            <div className={styles_module_scss_1.default.nav}>
                <battle_1.NavBattle />
                
                <booty_1.NavBooty />
            </div>
            <menu_1.NavMenu />
        </>);
};
exports.MapButtons = MapButtons;
