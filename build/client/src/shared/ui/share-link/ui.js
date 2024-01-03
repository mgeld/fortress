"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareLink = void 0;
const _icons_1 = require("shared/assets/icons/_icons");
const popout_root_1 = require("shared/ui/popout-root");
const notice_1 = require("shared/ui/notice");
const vk_bridge_1 = __importDefault(require("@vkontakte/vk-bridge"));
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const ShareLink = ({ header, link, text }) => {
    return (<div className={styles_module_scss_1.default.violetScreenRoot}>
            <div className={styles_module_scss_1.default.violetPopout}>

                <div className={`${styles_module_scss_1.default.__content}`}>

                    <div className={styles_module_scss_1.default.header}>

                        <div className={styles_module_scss_1.default.__border}>
                            <div className={styles_module_scss_1.default.name}>
                                {header}
                            </div>
                            <div onClick={() => popout_root_1.popoutModel.events.setPopout(null)} className={styles_module_scss_1.default.close}>
                                <_icons_1.IconClose width={16} height={16} fill="#ffffff"/>
                            </div>
                        </div>

                        <div className={styles_module_scss_1.default.__whiteEffect}><div /></div>

                    </div>

                    <div className={styles_module_scss_1.default.main}>
                        <div className={styles_module_scss_1.default.__text}>
                            {text}
                        </div>
                        <div className={styles_module_scss_1.default.__link}>
                            <div className={styles_module_scss_1.default.__in}>
                                {link}
                            </div>
                        </div>
                        <div className={styles_module_scss_1.default.button}>
                            <div className={styles_module_scss_1.default.__copy} onClick={() => {
            vk_bridge_1.default.send("VKWebAppCopyText", { "text": link });
            popout_root_1.popoutModel.events.setPopout(null);
            notice_1.noticeModel.events.newToast({
                name: 'Текст скопирован',
                text: 'Ссылка успешна скопирована!',
                t: 'common'
            });
        }}>
                                Скопировать
                            </div>
                            <div className={styles_module_scss_1.default.__share} onClick={() => {
            vk_bridge_1.default.send("VKWebAppShare", { "link": link });
            popout_root_1.popoutModel.events.setPopout(null);
        }}>
                                Поделиться
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>);
};
exports.ShareLink = ShareLink;
