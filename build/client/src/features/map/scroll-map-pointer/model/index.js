"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrollMapPointerListener = void 0;
const effector_1 = require("effector");
const map_1 = require("entities/map");
const ship_1 = require("entities/ship");
const scrollMapPointer = (0, effector_1.createEffect)(({ map, userPos }) => {
    if (userPos[0] > 0 && userPos[1] > 0 && map) {
        let bounds = map.getBounds();
        const northEast = bounds.getNorthEast();
        const southWest = bounds.getSouthWest();
        let n_lat = northEast.lat - 0.0010;
        let n_lng = northEast.lng - 0.0010;
        let s_lat = southWest.lat + 0.0010;
        let s_lng = southWest.lng + 0.0010;
        let isSect = (userPos[0] < n_lat && userPos[1] < n_lng &&
            userPos[0] > s_lat && userPos[1] > s_lng);
        if (!isSect) {
            map.setView({
                lat: userPos[0],
                lng: userPos[1],
            });
        }
    }
});
const scrollMapPointerListener = () => {
    (0, effector_1.sample)({
        clock: ship_1.shipModel.events.movePoint,
        source: {
            map: map_1.mapModel.$mapStore,
            userPos: ship_1.shipModel.$userPositionStore,
        },
        fn: (source) => source,
        target: scrollMapPointer
    });
};
exports.scrollMapPointerListener = scrollMapPointerListener;
