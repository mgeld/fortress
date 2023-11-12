"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectors = exports.events = exports.$userVkIdStore = exports.$userIdStore = exports.$userIconStore = exports.$userNameStore = exports.$rankExpStore = exports.$rankLevelStore = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const events_1 = require("shared/api/events");
const { setUser, setRankLevel, setRankExp, addRankExp, } = events_1.userAPI.events;
const setName = (0, effector_1.createEvent)();
const setUserIcon = (0, effector_1.createEvent)();
const setVkUser = (0, effector_1.createEvent)();
exports.$rankLevelStore = (0, effector_1.createStore)(0)
    .on(setRankLevel, (_, rank) => rank);
exports.$rankExpStore = (0, effector_1.createStore)(0)
    .on(setRankExp, (_, exp) => exp)
    .on(addRankExp, (exp, e) => exp + e);
exports.$userNameStore = (0, effector_1.createStore)('')
    .on(setName, (_, name) => name);
exports.$userIconStore = (0, effector_1.createStore)('')
    .on(setUserIcon, (_, icon) => icon);
const DEFAULT_STORE_USER = 0;
exports.$userIdStore = (0, effector_1.createStore)(DEFAULT_STORE_USER)
    .on(setUser, (_, state) => state);
const DEFAULT_STORE_VK_USER = 0;
exports.$userVkIdStore = (0, effector_1.createStore)(DEFAULT_STORE_VK_USER)
    .on(setVkUser, (_, state) => state);
exports.events = {
    setVkUser,
    setName,
    setUserIcon,
};
const useUser = () => {
    return {
        userId: (0, effector_react_1.useStore)(exports.$userIdStore),
        vkUserId: (0, effector_react_1.useStore)(exports.$userIdStore),
        userName: (0, effector_react_1.useStore)(exports.$userNameStore),
        userIcon: (0, effector_react_1.useStore)(exports.$userIconStore),
    };
};
const useVkUserId = () => (0, effector_react_1.useStore)(exports.$userVkIdStore);
const useUserId = () => (0, effector_react_1.useStore)(exports.$userIdStore);
const useRankLevel = () => (0, effector_react_1.useStore)(exports.$rankLevelStore);
const useRankExp = () => (0, effector_react_1.useStore)(exports.$rankExpStore);
exports.selectors = {
    useUser,
    useUserId,
    useVkUserId,
    useRankLevel,
    useRankExp,
};
