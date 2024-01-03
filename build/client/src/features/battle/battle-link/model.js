"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectors = exports.$battleId = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const events_1 = require("shared/api/events");
const useBattleShareId = () => (0, effector_react_1.useStore)(exports.$battleId);
const { setBattleShareId } = events_1.battleAPI.events;
exports.$battleId = (0, effector_1.createStore)(null)
    .on(setBattleShareId, (_, alert) => alert);
exports.selectors = {
    useBattleShareId,
};
