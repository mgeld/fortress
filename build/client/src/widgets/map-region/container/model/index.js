"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapStartPosition = void 0;
const effector_1 = require("effector");
const map_1 = require("entities/map");
const ship_1 = require("entities/ship");
const page_root_1 = require("shared/ui/page-root");
const mapStartPosition = () => {
    (0, effector_1.sample)({
        clock: [page_root_1.pageModel.events.setPage, page_root_1.pageModel.events.returnPage],
        source: ship_1.shipModel.$userPositionStore,
        filter: (pos, clock) => clock === 'map',
        target: map_1.mapModel.$mapCenterDefaultStore
    });
};
exports.mapStartPosition = mapStartPosition;
