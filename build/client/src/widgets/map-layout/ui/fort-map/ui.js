"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FortMap = void 0;
const fort_1 = require("entities/fort");
const react_leaflet_1 = require("react-leaflet");
const ship_1 = require("entities/ship");
const debounce_1 = require("shared/lib/debounce");
const h3_js_1 = require("h3-js");
const react_1 = require("react");
const ui_1 = require("entities/fort/ui/attack-fort/ui");
const FortMap = () => {
    const pos = ship_1.shipModel.selectors.useShipPos();
    const [value, setValue] = (0, react_1.useState)(pos);
    const throttled = (0, react_1.useRef)((0, debounce_1.debounce)((_pos) => {
        setValue(_pos);
    }, 300));
    (0, react_1.useEffect)(() => throttled.current(pos), [pos]);
    const h3Index = (0, h3_js_1.latLngToCell)(value[0], value[1], 9);
    const hexCenterCoordinates = (0, h3_js_1.cellToLatLng)(h3Index);
    return (<>
            <react_leaflet_1.Pane name="q1" style={{ zIndex: 3001 }}>
                <fort_1.Fort pos={hexCenterCoordinates}/>
            </react_leaflet_1.Pane>
            <react_leaflet_1.Pane name="q2" style={{ zIndex: 3000 }}>
                {(0, react_1.useMemo)(() => <ui_1.AttackFort pos={hexCenterCoordinates}/>, [hexCenterCoordinates])}
            </react_leaflet_1.Pane>
        </>);
};
exports.FortMap = FortMap;
