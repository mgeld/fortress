"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = exports.selectors = exports.$zoneRubiesStore = exports.$zoneCoinsStore = exports.$zoneTrophiesStore = exports.$zoneColorStore = exports.$zoneLevelStore = exports.$zoneDescriptionStore = exports.$zoneSectorsStore = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const events_1 = require("shared/api/events");
const { setZoneLevel, setZoneColor, setZoneDescription, setZoneSectors, setZoneTrophies, setZoneCoins, setZoneRubies, spendСoins, spendRubies, addCoins, addRubies, addZoneTrophies } = events_1.zoneAPI.events;
const addSector = (0, effector_1.createEvent)();
const delSector = (0, effector_1.createEvent)();
exports.$zoneSectorsStore = (0, effector_1.createStore)(0)
    .on(setZoneSectors, (_, sectors) => sectors)
    .on(addSector, (sectors) => sectors + 1)
    .on(delSector, (sectors) => sectors - 1);
exports.$zoneDescriptionStore = (0, effector_1.createStore)('')
    .on(setZoneDescription, (_, descr) => descr);
exports.$zoneLevelStore = (0, effector_1.createStore)(0)
    .on(setZoneLevel, (_, level) => level);
exports.$zoneColorStore = (0, effector_1.createStore)(1)
    .on(setZoneColor, (_, color) => color);
exports.$zoneTrophiesStore = (0, effector_1.createStore)(0)
    .on(setZoneTrophies, (_, trophies) => trophies)
    .on(addZoneTrophies, (trophies, t) => trophies + t < 0 ? 0 : trophies + t);
exports.$zoneCoinsStore = (0, effector_1.createStore)(0)
    .on(setZoneCoins, (_, coins) => coins)
    .on(spendСoins, (coins, spend) => coins - spend)
    .on(addCoins, (coins, c) => coins + c);
exports.$zoneRubiesStore = (0, effector_1.createStore)(0)
    .on(setZoneRubies, (_, rubies) => rubies)
    .on(spendRubies, (rubies, spend) => rubies - spend)
    .on(addRubies, (rubies, r) => rubies + r);
const useZoneLevel = () => (0, effector_react_1.useStore)(exports.$zoneLevelStore);
const useZoneColor = () => (0, effector_react_1.useStore)(exports.$zoneColorStore);
const useZoneDescription = () => (0, effector_react_1.useStore)(exports.$zoneDescriptionStore);
const useZoneSectors = () => (0, effector_react_1.useStore)(exports.$zoneSectorsStore);
const useZoneTrophies = () => (0, effector_react_1.useStore)(exports.$zoneTrophiesStore);
const useZoneCoins = () => (0, effector_react_1.useStore)(exports.$zoneCoinsStore);
const useZoneRubies = () => (0, effector_react_1.useStore)(exports.$zoneRubiesStore);
exports.selectors = {
    useZoneLevel,
    useZoneColor,
    useZoneDescription,
    useZoneSectors,
    useZoneTrophies,
    useZoneCoins,
    useZoneRubies,
};
exports.events = {
    addSector,
    delSector,
};
