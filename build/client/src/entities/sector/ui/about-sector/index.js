"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutSector = void 0;
const react_1 = require("react");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const about_sector_item_1 = require("./about-sector-item");
const _icons_1 = require("./icons/_icons");
const sector_1 = require("entities/sector");
const get_about_sector_1 = require("shared/api/get-about-sector");
const h3_js_1 = require("h3-js");
const map_1 = require("entities/map");
const AboutSector = ({ name, zone_id }) => {
    const sector = sector_1.sectorMapModel.selectors.useAboutSector().sector;
    const { latlng } = map_1.mapModel.selectors.useMapClickLatLng();
    (0, react_1.useEffect)(() => {
        if (latlng) {
            const h3Index = (0, h3_js_1.latLngToCell)(latlng[0], latlng[1], 9);
            (0, get_about_sector_1.getAboutSectorAPI)(h3Index);
        }
    }, [latlng]);
    if (!sector)
        return (<div className={styles_module_scss_1.default.loading}>
            Загружаем информацию...
        </div>);
    return (<div className={styles_module_scss_1.default.aboutSector}>
            <div className={[styles_module_scss_1.default.__container, styles_module_scss_1.default.__one].join(' ')}>
                
                <about_sector_item_1.AboutSectorItem icon={<_icons_1.IconTarget width={18} height={18}/>} name="Область:" text={`${sector.areal}`}/>
                <about_sector_item_1.AboutSectorItem icon={<_icons_1.IconFort width={16} height={16}/>} name="Форт:" text={`${sector.defenders} стражей`}/>
                <about_sector_item_1.AboutSectorItem icon={<_icons_1.IconLocation width={16} height={16}/>} name="Владелец:" text={`${sector.owner}`}/>
            </div>
        </div>);
};
exports.AboutSector = AboutSector;
