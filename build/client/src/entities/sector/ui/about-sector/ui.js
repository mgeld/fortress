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
const h3_js_1 = require("h3-js");
const map_1 = require("entities/map");
const _1 = require(".");
const sector_1 = require("entities/sector");
const AboutSector = () => {
    const sector = sector_1.sectorMapModel.selectors.useAboutSector().sector;
    const { latlng } = map_1.mapModel.selectors.useMapClickLatLng();
    (0, react_1.useEffect)(() => {
        if (latlng) {
            const h3Index = (0, h3_js_1.latLngToCell)(latlng[0], latlng[1], 9);
            _1.aboutSectorModel.events.getAboutInfo(h3Index);
        }
    }, [latlng]);
    if (!sector)
        return (<div className={styles_module_scss_1.default.loading}>
            Загружаем информацию...
        </div>);
    return (<div className={`${styles_module_scss_1.default.aboutSector}`}>
            <div className={[styles_module_scss_1.default.__container, styles_module_scss_1.default.__one].join(' ')}>
                
                <about_sector_item_1.AboutSectorItem icon={<_icons_1.IconLocation width={18} height={18}/>} name="Владелец:" text={`${sector.owner}`}/>
                <about_sector_item_1.AboutSectorItem icon={<_icons_1.IconFort width={18} height={18}/>} name="Форт:" text={`${sector.defenders} стражей`}/>
                <about_sector_item_1.AboutSectorItem icon={<_icons_1.IconTarget width={20} height={20}/>} name="Точка:" text={`${sector.latlng[0].toFixed(4)}, ${sector.latlng[1].toFixed(4)}`}/>
            </div>
        </div>);
};
exports.AboutSector = AboutSector;
