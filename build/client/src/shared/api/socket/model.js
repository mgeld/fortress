"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = exports.useSocket = exports.$socketStatus = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
exports.$socketStatus = (0, effector_1.createStore)('close');
const setSocketStatus = (0, effector_1.createEvent)();
(0, effector_1.sample)({
    clock: setSocketStatus,
    target: exports.$socketStatus
});
const useSocket = () => (0, effector_react_1.useStore)(exports.$socketStatus);
exports.useSocket = useSocket;
const reSocket = (0, effector_1.createEvent)();
exports.events = {
    setSocketStatus,
    reSocket
};
