"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startConnectUser = void 0;
const effector_1 = require("effector");
const connect_1 = require("shared/api/connect");
const events_1 = require("shared/api/events");
const get_hash_to_abduction_id_1 = require("shared/lib/get-hash-to-abduction-id");
const startConnectUser = () => { };
exports.startConnectUser = startConnectUser;
const connectAPIFx = (0, effector_1.createEffect)(() => {
    const url = window.location.search;
    const abduction = (0, get_hash_to_abduction_id_1.getHashToAbductionId)();
    (0, connect_1.connectAPI)(url, Number(abduction));
});
(0, effector_1.sample)({
    clock: events_1.userAPI.events.connectUser,
    target: connectAPIFx
});
