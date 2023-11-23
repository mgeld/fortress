"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleType = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const BattleType = () => {
    return (<div className={`${styles_module_scss_1.default.battleType}`}>
            <div className={`${styles_module_scss_1.default.__rang} strw2`}>
                2Х2
            </div>
            <div className={`${styles_module_scss_1.default.__name} strw1`}>
                <div className={`${styles_module_scss_1.default.__text}`}>
                    <div>Арена</div>
                    <div>Сражений</div>
                </div>
            </div>
        </div>);
};
exports.BattleType = BattleType;
