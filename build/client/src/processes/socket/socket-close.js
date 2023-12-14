"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reSocketClose = exports.socketCloseFx = void 0;
const effector_1 = require("effector");
const socket_1 = require("shared/api/socket");
const popout_root_1 = require("shared/ui/popout-root");
const _1 = require(".");
exports.socketCloseFx = (0, effector_1.createEffect)((status) => {
    popout_root_1.popoutModel.events.setPopout(null);
    if (status === 'close') {
        setTimeout(() => {
            popout_root_1.popoutModel.events.setPopout('lock-screen');
        }, 300);
    }
});
(0, effector_1.sample)({
    clock: socket_1.socketModel.events.reSocket,
    source: socket_1.socketModel.$socketStatus,
    target: exports.socketCloseFx
});
const reSocketClose = () => {
    _1.WS.connect();
    setTimeout(() => socket_1.socketModel.events.reSocket(), 300);
};
exports.reSocketClose = reSocketClose;
