"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapPage = void 0;
const map_rang_1 = require("entities/user/ui/map-rang");
const counters_1 = require("widgets/counters/counters");
const map_bottom_1 = require("widgets/map-bottom");
const map_buttons_1 = require("widgets/map-buttons");
const menu_1 = require("widgets/map-buttons/menu");
const map_layout_1 = __importDefault(require("widgets/map-layout/ui/map-layout"));
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const MapPage = () => {
    return (<div className='mapPage'>

            <div className={styles_module_scss_1.default.nav}>
                
                <map_buttons_1.NavShop />
                <map_buttons_1.NavBooty />
            </div>

            <menu_1.NavMenu />

            <map_rang_1.MapRang />

            <counters_1.Counters />

            <map_layout_1.default />

            <map_bottom_1.MapBottom />
        </div>);
};
exports.MapPage = MapPage;
