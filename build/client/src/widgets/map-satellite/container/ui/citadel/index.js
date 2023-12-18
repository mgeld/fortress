"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitadelMap = void 0;
const alert_1 = require("shared/ui/alert");
const citadel_1 = require("entities/citadel");
const pointer_1 = require("entities/pointer");
const react_leaflet_1 = require("react-leaflet");
const popout_root_1 = require("shared/ui/popout-root");
const layout_rating_1 = require("widgets/layout-rating");
const CitadelMap = () => {
    const zone = layout_rating_1.ratingModel.selectors.useSelectZone();
    const size = pointer_1.droneMapModel.selectors.useDroneSize().px;
    const eventCitadel = () => {
        popout_root_1.popoutModel.events.setPopout('alert');
        alert_1.alertModel.events.setAlert({
            alert: 'Цитадель',
            message: `Цитадель зоны ${zone === null || zone === void 0 ? void 0 : zone.name}.`,
            action: {
                close: false,
                text: 'Принято',
                _click: () => popout_root_1.popoutModel.events.setPopout(null)
            }
        });
    };
    const map = (0, react_leaflet_1.useMap)();
    (0, react_leaflet_1.useMapEvents)({
        zoomstart: () => {
            var _a;
            (_a = map.getPane('zoom-anim-map')) === null || _a === void 0 ? void 0 : _a.setAttribute('class', 'zoom-anim-map');
        },
        zoomend: () => {
            setTimeout(() => {
                var _a;
                (_a = map.getPane('zoom-anim-map')) === null || _a === void 0 ? void 0 : _a.setAttribute('class', 'zoom-anim');
            }, 300);
            pointer_1.droneMapModel.events.setSizeDrone();
        },
    });
    if (!(zone === null || zone === void 0 ? void 0 : zone.latlng))
        return <></>;
    return (<citadel_1.Citadel pos={zone === null || zone === void 0 ? void 0 : zone.latlng} _click={eventCitadel} droneSize={size}/>);
};
exports.CitadelMap = CitadelMap;
