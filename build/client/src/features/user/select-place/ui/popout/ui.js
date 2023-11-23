"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectPlace = void 0;
const _icons_1 = require("./icons/_icons");
const map_1 = require("entities/map");
const ui_1 = require("shared/ui/button/ui");
const notice_1 = require("shared/ui/notice");
const popout_root_1 = require("shared/ui/popout-root");
const get_random_position_1 = require("shared/lib/get-random-position");
const vk_bridge_1 = __importDefault(require("@vkontakte/vk-bridge"));
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const SelectPlace = () => {
    const map = map_1.mapModel.selectors.useMapLayout();
    const selectPlace = () => {
        map === null || map === void 0 ? void 0 : map.setView(map.getCenter(), 8);
        popout_root_1.popoutModel.events.setPopout(null);
    };
    const setRandPos = () => {
        const pos = (0, get_random_position_1.getRandomPosition)();
        popout_root_1.popoutModel.events.setPopout(null);
        map === null || map === void 0 ? void 0 : map.setView(pos, 16);
        map_1.mapModel.events.setLatLngMap(pos);
    };
    const getGeo = () => __awaiter(void 0, void 0, void 0, function* () {
        yield vk_bridge_1.default
            .send("VKWebAppGetGeodata")
            .then(data => {
            if (data.available) {
                const pos = [data.lat, data.long];
                if (pos[0] > 0 && pos[1] > 0) {
                    popout_root_1.popoutModel.events.setPopout(null);
                    map === null || map === void 0 ? void 0 : map.setView(pos, 16);
                    map_1.mapModel.events.setLatLngMap(pos);
                }
                else {
                    notice_1.noticeModel.events.newToast({
                        name: 'Упс...',
                        text: 'В вашей стране пока нельзя завоевывать территории, но вы можете выбрать любое место в России или странах СНГ!',
                        t: 'common'
                    });
                }
            }
            else {
                notice_1.noticeModel.events.newToast({
                    name: 'Ошибка',
                    text: 'Не удалось определить ваше местопложение!',
                    t: 'common'
                });
            }
        }).catch(error => {
            notice_1.noticeModel.events.newToast({
                name: 'Ошибка',
                text: 'Не удалось определить ваше местопложение!',
                t: 'common'
            });
        });
    });
    return (<div className={styles_module_scss_1.default.selectPlace}>
            <div className={styles_module_scss_1.default.__content}>

                <div className={styles_module_scss_1.default.header}>
                    <div className={styles_module_scss_1.default.name}>
                        Выбор территории
                    </div>
                    
                    <div className={styles_module_scss_1.default.geoPlace}>
                        <ui_1.Button radius={10} className="" text="Геолокация" onClick={getGeo}/>
                    </div>
                </div>

                <div className={styles_module_scss_1.default.content}>
                    <div className={styles_module_scss_1.default.main}>
                        <div className={styles_module_scss_1.default.icon}>
                            <_icons_1.IconTouch />
                        </div>
                        <div className={styles_module_scss_1.default.text}>
                            Коснитесь карты, чтобы выбрать место, где вы начнете захватывать территории
                        </div>
                    </div>

                    <div className={styles_module_scss_1.default.bottom}>
                        <div className={styles_module_scss_1.default.buttons}>
                            <div className={styles_module_scss_1.default.__randomPlace}>
                                <ui_1.Button radius={10} className="" text="Случайное" onClick={setRandPos}/>
                            </div>
                            <div className={styles_module_scss_1.default.__selectPlace}>
                                <ui_1.Button radius={10} className="" text="Выбрать" onClick={selectPlace}/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>);
};
exports.SelectPlace = SelectPlace;
