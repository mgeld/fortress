"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutAbduction = void 0;
const _1 = require(".");
const back_button_1 = require("shared/ui/back-button");
const page_root_1 = require("shared/ui/page-root");
const _icons_1 = require("widgets/map-region/battle-counters/icons/_icons");
const ui_1 = require("shared/ui/fbutton/ui");
const popout_root_1 = require("shared/ui/popout-root");
const _icons_2 = require("shared/assets/icons/_icons");
const get_zone_1 = require("shared/api/get-zone");
const date_time_1 = require("shared/lib/date-time");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const LayoutAbduction = () => {
    const zones = _1.abductionModel.selectors.useAbductionZones();
    const onZone = (zone) => {
        (0, get_zone_1.getZoneAPI)(zone);
        page_root_1.pageModel.events.setPage('zone');
    };
    return (<>
            <div className={styles_module_scss_1.default.abductionLayout}>
                <div className={styles_module_scss_1.default.__content}>

                    <div className={styles_module_scss_1.default.__header}>
                        <div className={styles_module_scss_1.default.iosTop}/>

                        <div className={styles_module_scss_1.default.__main}>

                            <div className={styles_module_scss_1.default.name}>
                                <div className={styles_module_scss_1.default.icon}>
                                    <_icons_2.IconShipBeam width={34} height={34}/>
                                </div>
                                <div className={styles_module_scss_1.default.text}>Похищенные</div>

                            </div>

                        </div>
                    </div>

                    <div className={styles_module_scss_1.default.__before}/>

                    <div className={styles_module_scss_1.default.button}>
                        <ui_1.FButton width={100} color="gold" text="Похитить" _click={() => popout_root_1.popoutModel.events.setPopout('abduction-link')}/>
                    </div>

                    {zones && (zones === null || zones === void 0 ? void 0 : zones.length) > 0 ?
            <div className={styles_module_scss_1.default.abductionList}>
                            {zones.map((item, i) => {
                    return (<div key={item.zone_id} onClick={() => onZone(item.zone_id)} className={styles_module_scss_1.default.zone}>

                                        <div className={styles_module_scss_1.default.image}>
                                            <img src={item.icon} alt="<>"/>
                                        </div>

                                        <div className={styles_module_scss_1.default.info}>
                                            <div className={styles_module_scss_1.default.user}>
                                                <div className={styles_module_scss_1.default.name}>
                                                    {item.name}
                                                </div>
                                                <div className={styles_module_scss_1.default.sectors}>
                                                    <div className={styles_module_scss_1.default.text}>
                                                        Похищен
                                                    </div>
                                                    <div className={styles_module_scss_1.default.count}>
                                                        {(0, date_time_1.dateTime)(item.date * 1000)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles_module_scss_1.default.showing}>
                                                <div className={styles_module_scss_1.default.trophies}>

                                                    <div className={styles_module_scss_1.default.__stroke}>
                                                        <div className={styles_module_scss_1.default.count}>
                                                            {item.sectors}
                                                        </div>
                                                        <div className={styles_module_scss_1.default.icon}>
                                                            <_icons_1.IconZone width={26} height={26}/>
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
                            <div>Тут пока пусто...</div>
                        </div>}

                    <back_button_1.BackMap color="#a542d3"/>

                </div>
            </div>
        </>);
};
exports.LayoutAbduction = LayoutAbduction;
