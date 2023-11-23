"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
const react_1 = require("react");
const arena_1 = require("entities/arena");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const events_1 = require("shared/api/events");
const timeFormat = (function () {
    function num(sec) {
        sec = Math.floor(sec);
        return sec < 10 ? '0' + sec : sec;
    }
    return function (sec) {
        const minutes = sec / 60 % 60;
        const seconds = sec % 60;
        return num(minutes) + ":" + num(seconds);
    };
})();
const Timer = () => {
    const seconds = arena_1.arenaModel.selectors.useBattleTimer().data;
    (0, react_1.useEffect)(() => {
        if (seconds > 0)
            setTimeout(() => events_1.battleAPI.events.stepTimer(), 1000);
    }, [seconds]);
    return (<div className={`${styles_module_scss_1.default.timer}`}>
            <div className={`${styles_module_scss_1.default.__text} strw2`}>
                {timeFormat(seconds)}
            </div>
        </div>);
};
exports.Timer = Timer;
