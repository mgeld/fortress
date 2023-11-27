"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObserveMode = void 0;
const ui_1 = require("shared/ui/button/ui");
const bottom_flex_1 = require("shared/ui/bottom-flex");
const popout_root_1 = require("shared/ui/popout-root");
const alert_1 = require("shared/ui/alert");
const map_1 = require("entities/map");
const events_1 = require("shared/api/events");
const citadel_1 = require("entities/citadel");
const ObserveMode = () => {
    var _a;
    const { mode } = map_1.mapModel.selectors.useMapMode();
    const latlng = ((_a = citadel_1.citadelModel.selectors.useCitadel()) === null || _a === void 0 ? void 0 : _a.latlng) || null;
    const selectCitadel = (pos) => {
        if (!pos) {
            popout_root_1.popoutModel.events.setPopout('alert');
            alert_1.alertModel.events.setAlert({
                alert: 'Цитадель',
                message: 'Цитадель - это центр вашей зоны и первая захваченная башня. Вы еще не захватили ни одной башни!',
                action: {
                    close: false,
                    text: 'Начать захват',
                    _click: () => popout_root_1.popoutModel.events.setPopout(null)
                }
            });
            return;
        }
        if (mode === 'battle') {
            events_1.mapAPI.events.setMapMode('invade');
        }
        events_1.shipAPI.events.setPos(pos);
        popout_root_1.popoutModel.events.setPopout(null);
    };
    return (<bottom_flex_1.BottomFlex text="Режим наблюдателя" button={<ui_1.Button className="" text="В цитадель" onClick={() => selectCitadel(latlng)}/>}/>);
};
exports.ObserveMode = ObserveMode;
