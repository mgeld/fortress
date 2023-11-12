"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Control = void 0;
const ui_1 = __importDefault(require("features/fire/control-fire/ui"));
const ui_2 = __importDefault(require("features/invader/control-invader/ui"));
const ui_3 = __importDefault(require("features/pointer/control-pointer/ui"));
const ui_4 = __importDefault(require("features/projector/control-projector/ui"));
const observe_mode_1 = require("features/user/observe-mode");
const ship_1 = require("entities/ship");
const Control = () => {
    const userHealth = ship_1.shipModel.selectors.useShipHealth();
    if (userHealth < 1)
        return <observe_mode_1.ObserveMode />;
    return (<>
            <ui_4.default />
            
                    <ui_3.default />
                    <ui_1.default />
                
            <ui_2.default />
        </>);
};
exports.Control = Control;
