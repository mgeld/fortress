"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BottomSelectPlace = void 0;
const map_1 = require("entities/map");
const events_1 = require("shared/api/events");
const bottom_flex_1 = require("shared/ui/bottom-flex");
const ui_1 = require("shared/ui/button/ui");
const tutorial_1 = require("shared/ui/tutorial");
const BottomSelectPlace = () => {
    const pos = map_1.mapModel.selectors.useMapClickLatLng().latlng;
    const map = map_1.mapModel.selectors.useMapLayout();
    const selectPosition = (pos) => {
        if (!pos)
            return;
        events_1.mapAPI.events.setMapMode('invade');
        map === null || map === void 0 ? void 0 : map.setView(pos, 16);
        console.log('flyTo 0000');
        events_1.shipAPI.events.setPos(pos);
        console.log('pos', pos);
        setTimeout(() => {
            tutorial_1.tutorialModel.events.setTutorial('ship');
        }, 2000);
    };
    return (<bottom_flex_1.BottomFlex text="Выбор места дислокации" button={<ui_1.Button className="" disabled={!pos} text="Сохранить" onClick={() => selectPosition(pos)}/>}/>);
};
exports.BottomSelectPlace = BottomSelectPlace;
