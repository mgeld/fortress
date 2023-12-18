"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutZone = void 0;
const back_button_1 = require("shared/ui/back-button");
const page_root_1 = require("shared/ui/page-root");
const get_satellite_1 = require("shared/api/get-satellite");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const user_1 = require("entities/user");
const popout_root_1 = require("shared/ui/popout-root");
const layout_rating_1 = require("widgets/layout-rating");
const ranks_1 = require("entities/user/lib/ranks");
const zone_level_1 = require("entities/zone/lib/zone-level");
const _icons_1 = require("shared/assets/icons/_icons");
const _icons_2 = require("widgets/map-region/battle-counters/icons/_icons");
const ui_1 = __importDefault(require("shared/ui/link/ui"));
const map_1 = require("entities/map");
const LayoutZone = () => {
    const myZoneId = user_1.userModel.selectors.useUserId();
    const statistic = layout_rating_1.ratingModel.selectors.useSelectZone();
    const onZone = (zone) => {
        map_1.mapSatelliteModel.events.setMapSatellite({
            type: 'zone',
            latlng: zone.latlng,
            name: zone.name,
        });
        page_root_1.pageModel.events.setPage('map-satellite');
        (0, get_satellite_1.getSatelliteAPI)(zone.latlng, zone.id);
    };
    if (!statistic)
        return <></>;
    const progressExp = statistic.rank_exp * 100 / ranks_1.Ranks.getExp(statistic.rank_level);
    const zoneSects = statistic.zone_sectors - (zone_level_1.ZoneLevel.getMaxLevelAllSectors(statistic.zone_level - 1) || 0);
    const progressZone = zoneSects * 100 / zone_level_1.ZoneLevel.getMaxLevelSectors(statistic.zone_level);
    return (<div className={styles_module_scss_1.default.zoneLayout}>
            <div className={styles_module_scss_1.default.__content}>

                <div className={styles_module_scss_1.default.__header}>
                    <div className={styles_module_scss_1.default.iosTop}/>
                    <div className={styles_module_scss_1.default.__main}>

                        <div className={styles_module_scss_1.default.name}>
                            <div className={styles_module_scss_1.default.icon}>
                                <_icons_1.IconTerrain width={32} height={32}/>
                            </div>
                            <div className={styles_module_scss_1.default.text}>Зона</div>
                        </div>

                    </div>
                </div>

                <div className={styles_module_scss_1.default.__before}/>

                <div className={styles_module_scss_1.default.profileMain}>

                    <div className={styles_module_scss_1.default.zone}>

                        <div className={styles_module_scss_1.default.left}>
                            <div className={styles_module_scss_1.default.image}>
                                <img src={statistic.icon} alt="<>"/>
                            </div>
                            <div className={styles_module_scss_1.default.uid}>
                                <div className={styles_module_scss_1.default.zid}>ID зоны</div>
                                <div className={styles_module_scss_1.default.number}>
                                    {statistic.id}
                                </div>
                            </div>
                        </div>

                        <div className={styles_module_scss_1.default.info}>
                            <div className={styles_module_scss_1.default.user}>
                                <div className={styles_module_scss_1.default.name}>

                                    <div className={styles_module_scss_1.default.text}>
                                        {statistic.name}
                                    </div>

                                    {myZoneId === statistic.id && <div className={styles_module_scss_1.default.edit} onClick={() => popout_root_1.popoutModel.events.setPopout('zone-edit')}>
                                        <_icons_1.IconSettings width={26} height={26}/>
                                    </div>}

                                </div>
                            </div>
                            <div className={styles_module_scss_1.default.showing}>

                                <div className={styles_module_scss_1.default.progressLayout}>

                                    <div className={styles_module_scss_1.default._header}>
                                        <div className={styles_module_scss_1.default.name}>
                                            Ранг завоеваний
                                        </div>
                                        <div className={styles_module_scss_1.default.amount}>
                                            {statistic.rank_level}
                                        </div>
                                    </div>

                                    <div className={styles_module_scss_1.default._bar}>
                                        <div className={styles_module_scss_1.default.icon}>
                                            <_icons_2.IconExperience width={30} height={30}/>
                                        </div>
                                        <div className={styles_module_scss_1.default.details}>
                                            <div className={styles_module_scss_1.default.name}>
                                                Опыт завоеваний
                                            </div>
                                            <div className={styles_module_scss_1.default.line}>
                                                <div className={styles_module_scss_1.default.progress} style={{
            width: `${progressExp > 100 ? 100 : progressExp}%`
        }}>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className={styles_module_scss_1.default.progressLayout}>

                                    <div className={styles_module_scss_1.default._header}>
                                        <div className={styles_module_scss_1.default.name}>
                                            Уровень зоны
                                        </div>
                                        <div className={styles_module_scss_1.default.amount}>
                                            {statistic.zone_level}
                                        </div>
                                    </div>

                                    <div className={styles_module_scss_1.default._bar}>
                                        <div className={styles_module_scss_1.default.icon}>
                                            <_icons_2.IconZone width={29} height={29}/>
                                        </div>
                                        <div className={styles_module_scss_1.default.details}>
                                            <div className={styles_module_scss_1.default.name}>
                                                Захвачено
                                            </div>
                                            <div className={styles_module_scss_1.default.line}>
                                                <div className={styles_module_scss_1.default.progress} style={{
            width: `${progressZone > 100 ? 100 : progressZone}%`
        }}>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>


                    <div className={styles_module_scss_1.default.infoZone}>
                        <div className={styles_module_scss_1.default.topInfo}>
                            О зоне
                        </div>
                        <div className={styles_module_scss_1.default.description}>
                            {statistic.description.length > 0 ? statistic.description : 'Нет описании'}
                        </div>
                    </div>

                    <div className={styles_module_scss_1.default.sections}>
                        <div className={styles_module_scss_1.default.__flex}>

                            <div onClick={() => onZone(statistic)} className={styles_module_scss_1.default.section}>
                                <div className={styles_module_scss_1.default.item}>
                                    <div className={styles_module_scss_1.default.icon}>
                                        <_icons_1.IconTerrain width={44} height={44}/>
                                    </div>
                                    <div className={styles_module_scss_1.default.name}>
                                        <div>Посмотреть территорию</div>
                                    </div>
                                </div>
                            </div>

                            <ui_1.default className={styles_module_scss_1.default.section} link={'https://vk.me/id' + statistic.vk_id}>
                                <div className={styles_module_scss_1.default.item}>
                                    <div className={styles_module_scss_1.default.icon}>
                                        <_icons_1.IconVK width={44} height={44}/>
                                    </div>
                                    <div className={styles_module_scss_1.default.name}>
                                        <div>
                                            Написать сообщение
                                        </div>
                                    </div>
                                </div>
                            </ui_1.default>

                            


                        </div>
                    </div>
                </div>


                

                <back_button_1.BackMap color="#9e7cc3"/>

            </div>
        </div>);
};
exports.LayoutZone = LayoutZone;
