"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattlePending = void 0;
const react_1 = require("react");
const _icons_1 = require("shared/assets/icons/_icons");
const events_1 = require("shared/api/events");
const battle_1 = require("features/battle");
const popout_root_1 = require("shared/ui/popout-root");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const notice_1 = require("shared/ui/notice");
const BattlePending = () => {
    const breakBattlePending = () => {
        events_1.mapAPI.events.setMapMode('invade');
        events_1.battleAPI.events.setBattleStatus("default");
        popout_root_1.popoutModel.events.setPopout(null);
        battle_1.battleLeaveEvent.battleLeave();
    };
    const tId = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        tId.current = setTimeout(() => {
            notice_1.noticeModel.events.newToast({
                name: 'Тут такое дело...',
                text: 'Время ожидания противника истекло. Попробуйте снова',
                t: 'common'
            });
            setTimeout(breakBattlePending, 3000);
        }, 20000);
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
                        <div className={styles_module_scss_1.default.__break} onClick={breakBattlePending}>
                            Прервать
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};
exports.BattlePending = BattlePending;
