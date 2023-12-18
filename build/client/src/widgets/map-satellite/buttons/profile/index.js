"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const map_1 = require("entities/map");
const _icons_1 = require("widgets/map-region/counters/icons/_icons");
const _icons_2 = require("shared/assets/icons/_icons");
const Profile = () => {
    const satellite = map_1.mapSatelliteModel.selectors.useMapSatellite();
    if (!satellite)
        return <></>;
    return (<div className={styles_module_scss_1.default.zone}>

            <div className={styles_module_scss_1.default.__content}>

                <div className={styles_module_scss_1.default.icon}>
                    
                    {satellite.type === 'sector' ? <_icons_1.IconZone width={28} height={28}/> : <_icons_2.IconTerrain width={28} height={28}/>}
                </div>
                <div className={`${styles_module_scss_1.default.name} strw2`}>
                    {satellite.name}
                </div>

                <div className={styles_module_scss_1.default.__whiteEffect}>
                    <div />
                </div>

            </div>

        </div>);
};
exports.Profile = Profile;
