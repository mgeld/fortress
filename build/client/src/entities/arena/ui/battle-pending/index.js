"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattlePending = void 0;
const react_1 = require("react");
const _icons_1 = require("shared/assets/icons/_icons");
const battle_1 = require("features/battle");
const popout_root_1 = require("shared/ui/popout-root");
const events_1 = require("shared/api/events");
const notice_1 = require("shared/ui/notice");
const vk_bridge_1 = __importStar(require("@vkontakte/vk-bridge"));
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const BattlePending = () => {
    const breakBattlePending = () => {
        events_1.mapAPI.events.setMapMode('invade');
        events_1.battleAPI.events.setBattleStatus("default");
        popout_root_1.popoutModel.events.setPopout(null);
    };
    const battleLeave = () => battle_1.battleLeaveEvent.battleLeave();
    const tId = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        vk_bridge_1.default.send('VKWebAppShowBannerAd', {
            banner_location: vk_bridge_1.BannerAdLocation.BOTTOM
        });
        return () => {
            vk_bridge_1.default.send('VKWebAppHideBannerAd');
        };
    }, []);
    (0, react_1.useEffect)(() => {
        tId.current = setTimeout(() => {
            notice_1.noticeModel.events.newToast({
                name: 'Тут такое дело...',
                text: 'Время ожидания противника истекло. Попробуйте снова',
                t: 'common'
            });
            battleLeave();
            setTimeout(breakBattlePending, 3000);
        }, 120000);
        return () => clearTimeout(tId.current);
    }, []);
    return (<div className={styles_module_scss_1.default.battleRoot}>
            <div className={styles_module_scss_1.default.battlePending}>
                <div className={`${styles_module_scss_1.default.__content} strw2`}>

                    <div className={styles_module_scss_1.default.__search}>
                        <_icons_1.IconBattleLoupe />
                    </div>

                    <div className={styles_module_scss_1.default.__text}>
                        Поиск противников<span>...</span>
                    </div>

                    <div className={styles_module_scss_1.default.button}>
                        <div className={styles_module_scss_1.default.__break} onClick={() => {
            breakBattlePending();
            battleLeave();
        }}>
                            Прервать
                        </div>
                    </div>

                </div>
            </div>
        </div>);
};
exports.BattlePending = BattlePending;
