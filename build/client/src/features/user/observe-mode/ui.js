"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObserveMode = void 0;
const ui_1 = require("shared/ui/button/ui");
const bottom_flex_1 = require("shared/ui/bottom-flex");
const popout_root_1 = require("shared/ui/popout-root");
const ObserveMode = () => {
    return (<bottom_flex_1.BottomFlex text="Корабль сломан" button={<ui_1.Button className="strw1" radius={12} text="Восстановить" onClick={() => popout_root_1.popoutModel.events.setPopout('ship-improve-health')}/>}/>);
};
exports.ObserveMode = ObserveMode;
