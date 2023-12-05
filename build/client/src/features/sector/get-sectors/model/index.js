"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
const effector_1 = require("effector");
const ship_1 = require("entities/ship");
const get_sectors_1 = require("shared/api/get-sectors");
const getSectorsStart = (0, effector_1.createEvent)();
(0, effector_1.sample)({
    clock: getSectorsStart,
    target: (0, effector_1.attach)({
        source: {
            pos: ship_1.shipModel.$userPositionStore,
        },
        effect: (user) => {
            (0, get_sectors_1.getSectorsAPI)(user.pos);
        }
    })
});
exports.events = {
    getSectorsStart
};
