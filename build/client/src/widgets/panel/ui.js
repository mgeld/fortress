"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Panel = void 0;
const icons_1 = require("./assets/icons");
const ui_1 = __importDefault(require("shared/ui/link/ui"));
const alert_1 = require("shared/ui/alert");
const page_root_1 = require("shared/ui/page-root");
const citadel_1 = require("entities/citadel");
const events_1 = require("shared/api/events");
const popout_root_1 = require("shared/ui/popout-root");
const _icons_1 = require("shared/assets/icons/_icons");
const _icons_2 = require("widgets/map-region/counters/icons/_icons");
const get_rating_1 = require("shared/api/get-rating");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const select_zone_1 = require("features/user/select-zone");
const Panel = () => {
    var _a;
    const latlng = ((_a = citadel_1.citadelModel.selectors.useCitadel()) === null || _a === void 0 ? void 0 : _a.latlng) || null;
    const selectCitadel = (pos) => {
        if (!pos) {
            popout_root_1.popoutModel.events.setPopout('alert');
            alert_1.alertModel.events.setAlert({
                alert: 'Цитадель',
                message: 'Цитадель - это центр вашей зоны и первая захваченная башня. Вы еще не захватили ни одной башни!',
                action: {
                    close: false,
                    text: 'Начать захват',
                    _click: () => popout_root_1.popoutModel.events.setPopout(null)
                }
            });
            return;
        }
        events_1.mapAPI.events.setMapMode('invade');
        events_1.shipAPI.events.setPos(pos);
        popout_root_1.popoutModel.events.setPopout(null);
    };
    const selectShip = () => {
        popout_root_1.popoutModel.events.setPopout('ship');
    };
    const close = () => popout_root_1.popoutModel.events.setPopout(null);
    return (<div className={styles_module_scss_1.default.panel}>
            <div className={styles_module_scss_1.default.__header}>
                <div className={styles_module_scss_1.default.__border}>
                    <div className={styles_module_scss_1.default.name}>
                        Навигатор
                    </div>
                    <div onClick={close} className={styles_module_scss_1.default.close}>
                        <_icons_1.IconClose width={16} height={16} fill="#867aa0"/>
                    </div>
                </div>
            </div>
            <div className={styles_module_scss_1.default.__content}>
                <div className={styles_module_scss_1.default.sections}>
                    <div className={styles_module_scss_1.default.__flex}>

                        <div onClick={() => {
            popout_root_1.popoutModel.events.setPopout(null);
            page_root_1.pageModel.events.setPage('gun-shop');
        }} className={styles_module_scss_1.default.section}>
                            <div className={styles_module_scss_1.default.item}>
                                <div className={styles_module_scss_1.default.icon}>
                                    <icons_1.IconShop width={44} height={44}/>
                                </div>
                                <div className={styles_module_scss_1.default.name}>Магазин</div>
                            </div>
                        </div>

                        <div onClick={() => {
            popout_root_1.popoutModel.events.setPopout(null);
            page_root_1.pageModel.events.setPage('rating');
            (0, get_rating_1.getRatingAPI)();
        }} className={styles_module_scss_1.default.section}>
                            <div className={styles_module_scss_1.default.item}>
                                <div className={styles_module_scss_1.default.icon}>
                                    <div className={styles_module_scss_1.default.svg}>
                                        <_icons_2.IconTrophy width={32} height={32}/>
                                    </div>
                                </div>
                                <div className={styles_module_scss_1.default.name}>Рейтинг</div>
                            </div>
                        </div>

                        <div onClick={() => {
            popout_root_1.popoutModel.events.setPopout(null);
            (0, select_zone_1.setSelectMyZone)();
            page_root_1.pageModel.events.setPage('zone');
        }} className={styles_module_scss_1.default.section}>
                            <div className={styles_module_scss_1.default.item}>
                                <div className={styles_module_scss_1.default.icon}>
                                    <_icons_1.IconTerrain width={44} height={44}/>
                                </div>
                                <div className={styles_module_scss_1.default.name}>Зона</div>
                            </div>
                        </div>

                        <div onClick={selectShip} className={styles_module_scss_1.default.section}>
                            <div className={styles_module_scss_1.default.item}>
                                <div className={styles_module_scss_1.default.icon}>
                                    <icons_1.IconShip width={44} height={44}/>
                                </div>
                                <div className={styles_module_scss_1.default.name}>Корабль</div>
                            </div>
                        </div>

                        <div onClick={() => selectCitadel(latlng)} className={styles_module_scss_1.default.section}>
                            <div className={styles_module_scss_1.default.item}>
                                <div className={styles_module_scss_1.default.icon}>
                                    <icons_1.IconFort width={44} height={44}/>
                                </div>
                                <div className={styles_module_scss_1.default.name}>Цитадель</div>
                            </div>
                        </div>

                        <ui_1.default className={styles_module_scss_1.default.section} link='https://vk.me/join/P10Woc9dcjIul09klvEP2MKEOrsy/T0hFvI='>
                            <div className={styles_module_scss_1.default.item}>
                                <div className={styles_module_scss_1.default.icon}>
                                    <icons_1.IconChat width={44} height={44}/>
                                </div>
                                <div className={styles_module_scss_1.default.name}>Чат</div>
                            </div>
                        </ui_1.default>

                        <ui_1.default className={styles_module_scss_1.default.section} link='https://vk.com/club223383803'>
                            
                            <div className={styles_module_scss_1.default.item}>
                                <div className={styles_module_scss_1.default.icon}>
                                    <icons_1.IconNews width={44} height={44}/>
                                </div>
                                <div className={styles_module_scss_1.default.name}>Новости</div>
                            </div>
                            
                        </ui_1.default>


                        <ui_1.default className={styles_module_scss_1.default.section} link='https://vk.com/@-223383803-faq'>
                            
                            <div className={styles_module_scss_1.default.item}>
                                <div className={styles_module_scss_1.default.icon}>
                                    <icons_1.IconFaq width={44} height={44}/>
                                </div>
                                <div className={styles_module_scss_1.default.name}>FAQ</div>
                            </div>
                            
                        </ui_1.default>

                    </div>
                </div>
            </div>
        </div>);
};
exports.Panel = Panel;
