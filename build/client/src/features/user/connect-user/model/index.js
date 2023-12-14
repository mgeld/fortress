"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startConnectUser = void 0;
const effector_1 = require("effector");
const ship_1 = require("entities/ship");
const connect_1 = require("shared/api/connect");
const events_1 = require("shared/api/events");
const startConnectUser = () => { };
exports.startConnectUser = startConnectUser;
const connectAPIFx = (0, effector_1.createEffect)((params) => {
    const url = window.location.search;
    (0, connect_1.connectAPI)(url, params.pos);
});
(0, effector_1.sample)({
    clock: events_1.userAPI.events.connectUser,
    source: {
        pos: ship_1.shipModel.$userPositionStore,
    },
    fn: (source, clock) => ({
        pos: source.pos,
    }),
    target: connectAPIFx
});
