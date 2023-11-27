"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Citadel = void 0;
const react_leaflet_1 = require("react-leaflet");
const citadel_1 = require("entities/citadel");
const pointer_1 = require("entities/pointer");
require("./styles.css");
const popout_root_1 = require("shared/ui/popout-root");
const alert_1 = require("shared/ui/alert");
const Citadel = () => {
    var _a;
    const pos = ((_a = citadel_1.citadelModel.selectors.useCitadel()) === null || _a === void 0 ? void 0 : _a.latlng) || [0, 0];
    const size = pointer_1.droneMapModel.selectors.useDroneSize();
    const p = size * 3.14 / 4;
    const a = p * 0.3;
    const b = p * 0.7;
    const dashArrayDroneCircle = `${a} ${b}`;
    const weightDroneCircle = Math.ceil(p / 4);
    return (<react_leaflet_1.FeatureGroup eventHandlers={{
            click: () => {
                popout_root_1.popoutModel.events.setPopout('alert');
                alert_1.alertModel.events.setAlert({
                    alert: 'Цитадель',
                    message: 'Цитадель - это центр вашей зоны и первый захваченный форт. Куда бы вы не полетели, вы всегда сможете телепортироваться обратно к Цитаделю.',
                    action: {
                        close: false,
                        text: 'Принято',
                        _click: () => popout_root_1.popoutModel.events.setPopout(null)
                    }
                });
            }
        }}>
            <react_leaflet_1.Circle key={1} className={`fort black-fort`} center={[
            pos[0] - 0.00010,
            pos[1] - 0.00002
        ]} pathOptions={{
            fillColor: '#9F9BA8',
            fillOpacity: 1,
            stroke: false,
        }} radius={30}/>
            <react_leaflet_1.Circle key={2} className={`fort fort-stroke`} center={pos} pathOptions={{
            fillColor: '#ffffff',
            fillOpacity: 1,
            dashArray: dashArrayDroneCircle,
            weight: weightDroneCircle,
            opacity: 1,
            color: '#ffffff'
        }} radius={30}/>
            <react_leaflet_1.Circle key={3} className={`fort fort-fill`} center={pos} pathOptions={{
            fillColor: '#D9D9D9',
            fillOpacity: 1,
            stroke: false,
        }} radius={26}/>
            <react_leaflet_1.Circle key={4} className={`fort fort-flag`} center={pos} pathOptions={{
            fillColor: '#8d6a6a',
            fillOpacity: 1,
            stroke: true,
            color: 'white'
        }} radius={10}/>
        </react_leaflet_1.FeatureGroup>);
};
exports.Citadel = Citadel;
