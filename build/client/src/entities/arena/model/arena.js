"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectors = exports.$arenaStore = exports.$battleStatusStore = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const user_1 = require("entities/user");
const events_1 = require("shared/api/events");
const DEFAULT_STORE = null;
const useArena = () => {
    return {
        data: (0, effector_react_1.useStore)(exports.$arenaStore)
    };
};
const useTeams = () => {
    return {
        data: (0, effector_react_1.useStore)($teamStore)
    };
};
const useMyTeamId = () => {
    return {
        data: (0, effector_react_1.useStore)($myTeamId)
    };
};
const useBattleStatus = () => {
    return {
        data: (0, effector_react_1.useStore)(exports.$battleStatusStore)
    };
};
const useBattleTimer = () => {
    return {
        data: (0, effector_react_1.useStore)($arenaTimer)
    };
};
const { setArena, setTeams, killPointer, setBattleStatus, setMyTeam, addSector, loseSector, setTimer, stepTimer } = events_1.battleAPI.events;
exports.$battleStatusStore = (0, effector_1.createStore)('default')
    .on(setBattleStatus, (_, status) => status);
const $arenaTimer = (0, effector_1.createStore)(0)
    .on(setTimer, (_, time) => time)
    .on(stepTimer, (time, _) => time - 1);
exports.$arenaStore = (0, effector_1.createStore)(DEFAULT_STORE)
    .on(setArena, (_, arena) => arena);
const $teamStore = (0, effector_1.createStore)([])
    .on(setTeams, (_, teams) => teams)
    .on(killPointer, (prevTeams, dead) => prevTeams.map(team => {
    if (team.teamId === dead.team) {
        return Object.assign(Object.assign({}, team), { members: team.members.filter(item => item.userId !== dead.pointer) });
    }
    return team;
}))
    .on(addSector, (prevTeams, sector) => prevTeams.map(team => {
    if (team.teamId === sector.team) {
        return Object.assign(Object.assign({}, team), { sectors: team.sectors + 1 });
    }
    return team;
}))
    .on(loseSector, (prevTeams, sector) => prevTeams.map(team => {
    if (team.teamId === sector.team) {
        return Object.assign(Object.assign({}, team), { sectors: team.sectors - 1 });
    }
    return team;
}));
const $myTeamId = (0, effector_1.createStore)(null)
    .on(setMyTeam, (_, team) => team);
const battleOverFx = (0, effector_1.createEffect)((source) => {
    const member = source.teams.filter(team => team.teamId === source.myTeamId)[0]
        .members.filter(member => member.userId === source.zoneId);
    if (member.length > 0) {
        const t = member[0].trophies;
        const c = member[0].coins;
        events_1.zoneAPI.events.addZoneTrophies(t);
        events_1.zoneAPI.events.addCoins(c);
    }
});
(0, effector_1.sample)({
    clock: setBattleStatus,
    source: {
        myTeamId: $myTeamId,
        zoneId: user_1.userModel.$userIdStore,
        teams: $teamStore
    },
    fn: (source) => ({
        myTeamId: source.myTeamId,
        zoneId: source.zoneId,
        teams: source.teams,
    }),
    filter: (source, status) => status === 'over',
    target: battleOverFx
});
exports.selectors = {
    useArena,
    useTeams,
    useMyTeamId,
    useBattleStatus,
    useBattleTimer
};
