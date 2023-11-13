"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notice = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const _icons_1 = require("widgets/counters/icons/_icons");
const warning_svg_1 = require("./warning.svg");
const _1 = require(".");
const _icons_2 = require("shared/assets/icons/_icons");
const modules_1 = require("entities/unit/lib/modules");
const _notice = {
    'cont_1': <_icons_1.IconCoin width={30} height={30}/>,
    'cont_2': <_icons_1.IconCoin width={30} height={30}/>,
    'cont_3': <_icons_1.IconCoin width={30} height={30}/>,
    'level-up': <_icons_2.IconLevelUp width={30} height={30}/>,
    'level-zone': <_icons_2.IconZoneLevel width={34} height={34}/>,
    'rank': <_icons_2.IconRank width={34} height={34}/>,
    'common': <warning_svg_1.ReactComponent width={34} height={34}/>,
    'warning': <warning_svg_1.ReactComponent width={34} height={34}/>,
};
const Notice = () => {
    const toasts = _1.noticeModel.selectors.useNotice().data;
    return (<div className={styles_module_scss_1.default.noticeRoot}>
            {toasts.map(toast => {
            let icon;
            if (toast.type in _notice) {
                icon = _notice[toast.type];
            }
            else if (Number.isInteger(toast.type)) {
                if (toast.type in modules_1.modules) {
                    icon = modules_1.modules[toast.type].icon(44, 44);
                }
            }
            console.log('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff toast', toast);
            return (<div key={toast.id} className={styles_module_scss_1.default.notice}>
                        <div className={styles_module_scss_1.default.__content}>
                            <div className={styles_module_scss_1.default.__border}>
                                <div className={`${styles_module_scss_1.default.icon} e${toast.type}`}>
                                    {icon}
                                </div>
                                <div className={styles_module_scss_1.default.data}>
                                    <div className={styles_module_scss_1.default.__name}>
                                        {toast.name}
                                    </div>
                                    <div className={styles_module_scss_1.default.__text}>
                                        {toast.text}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>);
        })}
        </div>);
};
exports.Notice = Notice;
