"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startConnectUser = void 0;
const effector_1 = require("effector");
const ship_1 = require("entities/ship");
const user_1 = require("entities/user");
const connect_1 = require("shared/api/connect");
const events_1 = require("shared/api/events");
const startConnectUser = () => { };
exports.startConnectUser = startConnectUser;
(0, effector_1.sample)({
    clock: events_1.userAPI.events.connectUser,
    source: {
        userName: user_1.userModel.$userNameStore,
        userIcon: user_1.userModel.$userIconStore,
        pos: ship_1.shipModel.$userPositionStore,
    },
    fn: (source, clock) => ({
        userName: source.userName,
        userIcon: source.userIcon,
        pos: source.pos,
        url: clock
    }),
    target: (0, effector_1.createEffect)((params) => {
        (0, connect_1.connectAPI)(params.url, params.userName, params.userIcon, params.pos);
    })
});
