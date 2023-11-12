"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectors = exports.$battleStatusStore = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const events_1 = require("shared/api/events");
const DEFAULT_STORE = null;
const useArena = () => {
    return {
        data: (0, effector_react_1.useStore)($arenaStore)
    };
};
const useTeams = () => {
    return {
        data: (0, effector_react_1.useStore)($teamStore)
    };
};
const useBattleStatus = () => {
    return {
        data: (0, effector_react_1.useStore)(exports.$battleStatusStore)
    };
};
const { setArena, setTeams, killPointer, setBattleStatus, } = events_1.battleAPI.events;
exports.$battleStatusStore = (0, effector_1.createStore)('default')
    .on(setBattleStatus, (_, status) => status);
const $arenaStore = (0, effector_1.createStore)(DEFAULT_STORE)
    .on(setArena, (_, arena) => arena);
const $teamStore = (0, effector_1.createStore)([])
    .on(setTeams, (_, teams) => teams)
    .on(killPointer, (prevTeams, dead) => prevTeams.map(team => {
    if (team.teamId === dead.team) {
        return Object.assign(Object.assign({}, team), { members: team.members.filter(item => item.userId !== dead.pointer) });
    }
    return team;
}));
exports.selectors = {
    useArena,
    useTeams,
    useBattleStatus
};
