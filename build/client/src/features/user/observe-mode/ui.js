"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObserveMode = void 0;
const ui_1 = require("shared/ui/button/ui");
const bottom_flex_1 = require("shared/ui/bottom-flex");
const ObserveMode = () => {
    return (<bottom_flex_1.BottomFlex text="Режим наблюдателя" button={<ui_1.Button className="" text="В цитадель" onClick={() => { }}/>}/>);
};
exports.ObserveMode = ObserveMode;
