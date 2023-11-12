"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../model");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const ControlInvader = () => {
    console.log('ControlInvader---------');
    return (<div className={styles_module_scss_1.default.controlInvader}>
            <div className={styles_module_scss_1.default.__circle}>
                <div onClick={model_1.invaderControl} className={styles_module_scss_1.default.__button}>
                    <img src={'icons/control-invaders.png'} alt="<>" width={50} height={50}/>
                </div>
                
            </div>
        </div>);
};
exports.default = ControlInvader;
