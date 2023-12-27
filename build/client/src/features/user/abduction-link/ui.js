"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbductionLink = void 0;
const _icons_1 = require("shared/assets/icons/_icons");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const popout_root_1 = require("shared/ui/popout-root");
const vk_bridge_1 = __importDefault(require("@vkontakte/vk-bridge"));
const user_1 = require("entities/user");
const notice_1 = require("shared/ui/notice");
const AbductionLink = () => {
    const zoneId = user_1.userModel.selectors.useUserId();
    return (<div className={styles_module_scss_1.default.violetScreenRoot}>
            <div className={styles_module_scss_1.default.violetPopout}>

                <div className={`${styles_module_scss_1.default.__content}`}>

                    <div className={styles_module_scss_1.default.header}>

                        <div className={styles_module_scss_1.default.__border}>
                            <div className={styles_module_scss_1.default.name}>
                                Похищение
                            </div>
                            <div onClick={() => popout_root_1.popoutModel.events.setPopout(null)} className={styles_module_scss_1.default.close}>
                                <_icons_1.IconClose width={16} height={16} fill="#ffffff"/>
                            </div>
                        </div>

                        <div className={styles_module_scss_1.default.__whiteEffect}><div /></div>

                    </div>

                    <div className={styles_module_scss_1.default.main}>
                        
                        <div className={styles_module_scss_1.default.__text}>
                            Отправьте ссылку другу, которого хотите похитить и сделать одним из пришельцев
                        </div>
                        <div className={styles_module_scss_1.default.__link}>
                            <div className={styles_module_scss_1.default.__in}>
                                vk.com/app51787878#a{zoneId}
                            </div>
                        </div>
                        <div className={styles_module_scss_1.default.button}>
                            <div className={styles_module_scss_1.default.__copy} onClick={() => {
            vk_bridge_1.default.send("VKWebAppCopyText", { "text": `https://vk.com/app51787878#a${zoneId}` });
            popout_root_1.popoutModel.events.setPopout(null);
            notice_1.noticeModel.events.newToast({
                name: 'Текст скопирован',
                text: 'Ссылка для похищения людей успешна скопирована!',
                t: 'common'
            });
        }}>
                                Скопировать
                            </div>
                            <div className={styles_module_scss_1.default.__share} onClick={() => {
            vk_bridge_1.default.send("VKWebAppShare", { "link": `https://vk.com/app51787878#a${zoneId}` });
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
exports.AbductionLink = AbductionLink;
