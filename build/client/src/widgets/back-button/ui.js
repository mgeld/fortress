"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackMap = void 0;
const page_root_1 = require("shared/ui/page-root");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const BackMap = () => {
    return (<>
            <div className={styles_module_scss_1.default.back} onClick={() => page_root_1.pageModel.events.setPage('map')}>
                <div className={styles_module_scss_1.default.__main}>Вернуться в игру</div>
                <div className={styles_module_scss_1.default.iosBottom}/>
            </div>
            <div className={styles_module_scss_1.default.__after}/>
        </>);
};
exports.BackMap = BackMap;
