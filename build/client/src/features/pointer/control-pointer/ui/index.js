"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_joystick_component_1 = require("react-joystick-component");
const use_control_1 = require("../hooks/use-control");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const ControlPointer = () => {
    const { stopPoint, moveControl } = (0, use_control_1.useControl)();
    return (<div className={styles_module_scss_1.default.controlDirections}>
            <div className={styles_module_scss_1.default.__circle}>
                <react_joystick_component_1.Joystick size={74} stickSize={48} sticky={false} baseColor="#ffffff00" stickImage='icons/control_directions.png' minDistance={30} throttle={400} move={moveControl} stop={stopPoint}/>
            </div>
        </div>);
};
exports.default = ControlPointer;
