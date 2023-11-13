"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = exports.selectors = exports.$zoneRubiesStore = exports.$zoneCoinsStore = exports.$zoneTrophiesStore = exports.$zoneLevelStore = exports.$zoneSectorsStore = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const events_1 = require("shared/api/events");
const { setZoneLevel, setZoneSectors, setZoneTrophies, setZoneCoins, setZoneRubies, spendСoins, spendRubies, addCoins, addRubies } = events_1.zoneAPI.events;
const addSector = (0, effector_1.createEvent)();
const delSector = (0, effector_1.createEvent)();
exports.$zoneSectorsStore = (0, effector_1.createStore)(0)
    .on(setZoneSectors, (_, sectors) => sectors)
    .on(addSector, (sectors) => sectors + 1)
    .on(delSector, (sectors) => sectors - 1);
exports.$zoneLevelStore = (0, effector_1.createStore)(0)
    .on(setZoneLevel, (_, level) => level);
exports.$zoneTrophiesStore = (0, effector_1.createStore)(0)
    .on(setZoneTrophies, (_, trophies) => trophies);
exports.$zoneCoinsStore = (0, effector_1.createStore)(0)
    .on(setZoneCoins, (_, coins) => coins)
    .on(spendСoins, (coins, spend) => coins - spend)
    .on(addCoins, (coins, c) => coins + c);
exports.$zoneRubiesStore = (0, effector_1.createStore)(0)
    .on(setZoneRubies, (_, rubies) => rubies)
    .on(spendRubies, (rubies, spend) => rubies - spend)
    .on(addRubies, (rubies, r) => rubies + r);
const useZoneLevel = () => (0, effector_react_1.useStore)(exports.$zoneLevelStore);
const useZoneSectors = () => (0, effector_react_1.useStore)(exports.$zoneSectorsStore);
const useZoneTrophies = () => (0, effector_react_1.useStore)(exports.$zoneTrophiesStore);
const useZoneCoins = () => (0, effector_react_1.useStore)(exports.$zoneCoinsStore);
const useZoneRubies = () => (0, effector_react_1.useStore)(exports.$zoneRubiesStore);
exports.selectors = {
    useZoneLevel,
    useZoneSectors,
    useZoneTrophies,
    useZoneCoins,
    useZoneRubies,
};
exports.events = {
    addSector,
    delSector,
};
