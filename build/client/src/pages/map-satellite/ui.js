"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapSatellitPage = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const map_satellite_layout_1 = __importDefault(require("widgets/map-satellite/container/ui/map-satellite-layout"));
const zone_1 = require("widgets/map-satellite/buttons/zone");
const close_satellite_1 = require("widgets/map-satellite/close-satellite");
const MapSatellitPage = () => {
    return (<div className={styles_module_scss_1.default.mapPage}>
            <div className={styles_module_scss_1.default.__page}>
                <zone_1.Zone />
                <map_satellite_layout_1.default />
                <close_satellite_1.CloseSatellite />
            </div>
        </div>);
};
exports.MapSatellitPage = MapSatellitPage;
