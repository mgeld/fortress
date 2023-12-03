"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackMap = void 0;
const page_root_1 = require("shared/ui/page-root");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const arrow_back_svg_1 = require("./arrow-back.svg");
const BackMap = () => {
    return (<>
            <div className={styles_module_scss_1.default.back} onClick={() => page_root_1.pageModel.events.setPage('map')}>

                <div className={styles_module_scss_1.default.__main}>
                    <div className={styles_module_scss_1.default.icon}>
                        <arrow_back_svg_1.ReactComponent width={20} height={20}/>
                    </div>
                    <div className={styles_module_scss_1.default.text}>
                        Вернуться в игру
                    </div>
                </div>
                <div className={styles_module_scss_1.default.iosBottom}/>
            </div>
            <div className={styles_module_scss_1.default.__after}/>
        </>);
};
exports.BackMap = BackMap;
