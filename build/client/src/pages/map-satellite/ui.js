"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapSatellitPage = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const close_satellite_1 = require("widgets/map-satellite/close-satellite");
const profile_1 = require("widgets/map-satellite/buttons/profile");
const container_1 = require("widgets/map-satellite/container");
const MapSatellitPage = () => {
    return (<div className={styles_module_scss_1.default.mapPage}>
            <div className={styles_module_scss_1.default.__page}>
                <profile_1.Profile />
                <container_1.MapSatelliteLayout />
                <close_satellite_1.CloseSatellite />
            </div>
        </div>);
};
exports.MapSatellitPage = MapSatellitPage;
