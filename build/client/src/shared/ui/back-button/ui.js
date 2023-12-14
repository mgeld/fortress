"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackMap = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const arrow_back_svg_1 = require("./arrow-back.svg");
const go_back_1 = require("processes/go-back");
const BackMap = ({ color }) => {
    const background = {
        backgroundColor: color
    };
    return (<>
            <div className={styles_module_scss_1.default.back} onClick={() => (0, go_back_1.goBack)()}>

                <div className={styles_module_scss_1.default.__main} style={background}>
                    <div className={styles_module_scss_1.default.icon}>
                        <arrow_back_svg_1.ReactComponent width={20} height={20}/>
                    </div>
                    <div className={styles_module_scss_1.default.text}>
                        Вернуться в игру
                    </div>
                </div>
                <div className={styles_module_scss_1.default.iosBottom} style={background}/>
            </div>
            <div className={styles_module_scss_1.default.__after}/>
        </>);
};
exports.BackMap = BackMap;
