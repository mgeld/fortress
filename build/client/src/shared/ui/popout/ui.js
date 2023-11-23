"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popout = void 0;
const react_1 = require("react");
const popout_root_1 = require("../popout-root");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const Popout = ({ id, fill, screen, edge, close, children }) => {
    const activePopout = (0, react_1.useContext)(popout_root_1.PopoutRootContext);
    if (activePopout !== id)
        return null;
    const _close = () => {
        if (close === false)
            return;
        popout_root_1.popoutModel.events.setPopout(null);
    };
    return (<div onClick={_close} style={{ backgroundColor: fill }} className={styles_module_scss_1.default.popout}>
            <div className={screen === 'full' ? styles_module_scss_1.default.__full : styles_module_scss_1.default.__size} onClick={(e) => e.stopPropagation()} style={{ padding: `0 ${edge}px` }}>
                {screen !== 'full' ? <div className={styles_module_scss_1.default.main}>
                    {children}
                </div> : children}
            </div>
        </div>);
};
exports.Popout = Popout;
