"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapSelectPlace = void 0;
const map_1 = require("entities/map");
const point_icon_1 = require("entities/pointer/ui/point-icon");
const user_1 = require("entities/user");
const h3_js_1 = require("h3-js");
const react_1 = require("react");
const react_leaflet_1 = require("react-leaflet");
const MapSelectPlace = () => {
    const clickPos = map_1.mapModel.selectors.useMapClickLatLng();
    const [sector, setSector] = (0, react_1.useState)(null);
    const { userIcon } = user_1.userModel.selectors.useUser();
    const setPolygon = (pos) => {
        const h3Index = (0, h3_js_1.latLngToCell)(pos[0], pos[1], 9);
        const [lat, long] = (0, h3_js_1.cellToBoundary)(h3Index)[0];
        const _pos = [lat, long + 0.0001];
        setSector({
            latlng: _pos,
            bounds: (0, h3_js_1.cellToBoundary)(h3Index)
        });
    };
    (0, react_1.useEffect)(() => {
        if (sector === null && clickPos.latlng) {
            setPolygon(clickPos.latlng);
        }
    }, [clickPos, sector]);
    (0, react_leaflet_1.useMapEvent)('click', (e) => {
        const _pos = [e.latlng.lat, e.latlng.lng];
        setPolygon(_pos);
        map_1.mapModel.events.setLatLngMap(_pos);
    });
    if (!sector)
        return <></>;
    return <>
        <point_icon_1.PointIcon position={sector.latlng} userIcon={userIcon}/>
        <react_leaflet_1.Polygon weight={0.9} fillColor="#ff1c1c" pathOptions={{
            fillColor: 'red',
            color: 'red',
            opacity: 0
        }} positions={sector.bounds}/>
    </>;
};
exports.MapSelectPlace = MapSelectPlace;
