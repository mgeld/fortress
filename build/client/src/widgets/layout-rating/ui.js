"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutRating = void 0;
const back_button_1 = require("shared/ui/back-button");
const get_satellite_1 = require("shared/api/get-satellite");
const page_root_1 = require("shared/ui/page-root");
const events_1 = require("shared/api/events");
const _1 = require(".");
const _icons_1 = require("widgets/map-region/battle-counters/icons/_icons");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const LayoutRating = () => {
    const zones = _1.ratingModel.selectors.useRating();
    const onZone = (zone) => {
        events_1.ratingAPI.events.selectRatingZone(zone);
        page_root_1.pageModel.events.setPage('map-satellite');
        (0, get_satellite_1.getSatelliteAPI)(zone.latlng, zone.id);
    };
    return (<>
            <div className={styles_module_scss_1.default.ratingLayout}>
                <div className={styles_module_scss_1.default.__content}>

                    <div className={styles_module_scss_1.default.__header}>
                        <div className={styles_module_scss_1.default.iosTop}/>
                        <div className={styles_module_scss_1.default.__main}>

                            <div className={styles_module_scss_1.default.name}>
                                <div className={styles_module_scss_1.default.icon}>
                                    <_icons_1.IconTrophy width={24} height={24}/>
                                </div>
                                <div className={styles_module_scss_1.default.text}>Топ 20</div>
                            </div>

                        </div>
                    </div>

                    <div className={styles_module_scss_1.default.__before}/>

                    {zones.zones ?
            <div className={styles_module_scss_1.default.ratingList}>
                            {zones.zones.map((item, i) => {
                    return (<div onClick={() => onZone(item)} className={styles_module_scss_1.default.zone}>

                                        <div className={styles_module_scss_1.default.image}>
                                            <div className={styles_module_scss_1.default.number}>{i + 1}</div>
                                            <img src={item.icon} alt="<>"/>
                                        </div>

                                        <div className={styles_module_scss_1.default.info}>
                                            <div className={styles_module_scss_1.default.user}>
                                                <div className={styles_module_scss_1.default.name}>
                                                    {item.name}
                                                </div>
                                                <div className={styles_module_scss_1.default.sectors}>
                                                    <div className={styles_module_scss_1.default.icon}>
                                                        <_icons_1.IconZone width={20} height={20}/>
                                                    </div>
                                                    <div className={styles_module_scss_1.default.text}>
                                                        Количество секторов:
                                                    </div>
                                                    <div className={styles_module_scss_1.default.count}>
                                                        {item.zone_sectors}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles_module_scss_1.default.showing}>
                                                <div className={styles_module_scss_1.default.trophies}>
                                                    
                                                    <div className={styles_module_scss_1.default.__stroke}>
                                                        <div className={styles_module_scss_1.default.count}>
                                                            {item.trophies}
                                                        </div>
                                                        <div className={styles_module_scss_1.default.icon}>
                                                            <_icons_1.IconTrophy />
                                                        </div>
                                                    </div>
                                                    <div className={styles_module_scss_1.default.__whiteEffect}><div /></div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>);
                })}
                        </div> :
            <div className={styles_module_scss_1.default.noData}>
                            <div>Загрузка...</div>
                        </div>}

                    <back_button_1.BackMap />

                </div>
            </div>
        </>);
};
exports.LayoutRating = LayoutRating;
