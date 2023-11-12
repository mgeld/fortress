"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapRang = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const user_1 = require("entities/user");
const MapRang = () => {
    return (<div className={`${styles_module_scss_1.default.mapRang} strw1`}>
            <div className={styles_module_scss_1.default.__rang}>
                {user_1.userModel.selectors.useRankLevel()}
            </div>
            <div className={styles_module_scss_1.default.__name}>
                <div className={`${styles_module_scss_1.default.__text}`}>
                    <div>Ранг</div>
                    <div>завоеваний</div>
                </div>
            </div>
        </div>);
};
exports.MapRang = MapRang;
