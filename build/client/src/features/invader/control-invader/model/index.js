"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invaderControl = void 0;
const effector_1 = require("effector");
const storm_corps_1 = require("entities/storm-corps");
const h3_js_1 = require("h3-js");
const take_1 = require("shared/api/take");
const events_1 = require("shared/api/events");
const snackbar_1 = require("shared/ui/snackbar");
const throttle_1 = require("shared/lib/throttle");
const ship_1 = require("entities/ship");
const arena_1 = require("entities/arena");
const battle_take_1 = require("shared/api/battle-take");
const hitSectorFx = (0, effector_1.createEffect)((source) => {
    if (source.stormInvaders === 0) {
        snackbar_1.snackbarModel.events.newToast({
            text: 'Штурмовики закончились!',
            t: 9
        });
        return null;
    }
    events_1.stormAPI.events.setStormInvaders(source.stormInvaders - 1);
    const h3Index = (0, h3_js_1.latLngToCell)(source.userPos[0], source.userPos[1], 9);
    const [lat, long] = (0, h3_js_1.cellToLatLng)(h3Index);
    return {
        userPos: source.userPos,
        sectorId: h3Index,
        toPos: [lat, long],
    };
});
const invaderControlFx = (0, effector_1.createEffect)(({ source, clock }) => {
    if (!clock)
        return;
    const TAKE_ID = Date.now();
    let _invader = {
        id: TAKE_ID,
        from_pos: clock.userPos,
        to_pos: clock.toPos,
    };
    events_1.takesAPI.events.addTake(_invader);
    if (source.battleStatus === 'default' ||
        source.battleStatus === 'over') {
        (0, take_1.takeAPI)(clock.toPos, clock.sectorId);
    }
    else {
        (0, battle_take_1.battleTakeAPI)(clock.toPos, clock.sectorId);
    }
    setTimeout(() => {
        events_1.takesAPI.events.delTakeById({ take_id: TAKE_ID });
    }, 2000);
});
(0, effector_1.sample)({
    clock: hitSectorFx.doneData,
    source: {
        battleStatus: arena_1.arenaModel.$battleStatusStore
    },
    fn: (source, clock) => ({ source, clock }),
    target: invaderControlFx
});
const hitTakeOutSector = (0, effector_1.createEvent)();
(0, effector_1.sample)({
    clock: hitTakeOutSector,
    source: {
        userPos: ship_1.shipModel.$userPositionStore,
        stormInvaders: storm_corps_1.stormModel.$stormInvadersStore
    },
    target: hitSectorFx,
});
exports.invaderControl = (0, throttle_1.throttle)(hitTakeOutSector, 500);
