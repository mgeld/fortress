"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectorControl = void 0;
const effector_1 = require("effector");
const h3_js_1 = require("h3-js");
const events_1 = require("shared/api/events");
const beam_1 = require("shared/api/beam");
const ship_1 = require("entities/ship");
const throttle_1 = require("shared/lib/throttle");
const hitSectorFx = (0, effector_1.createEffect)((userPos) => {
    const h3Index = (0, h3_js_1.latLngToCell)(userPos[0], userPos[1], 9);
    const [lat, long] = (0, h3_js_1.cellToLatLng)(h3Index);
    return {
        sectorId: h3Index,
        toPos: [lat, long],
    };
});
let timerId = null;
const bootyControlFx = (0, effector_1.createEffect)(({ clock }) => {
    if (timerId) {
        clearTimeout(timerId);
    }
    events_1.projectorAPI.events.setBeam({
        from_pos: clock.params,
        to_pos: clock.result.toPos,
    });
    setTimeout(() => (0, beam_1.beamAPI)(clock.params, clock.result.toPos, clock.result.sectorId), 800);
    timerId = setTimeout(() => {
        events_1.projectorAPI.events.setBeam(null);
        timerId = null;
    }, 2800);
});
(0, effector_1.sample)({
    clock: hitSectorFx.done,
    fn: (clock) => ({ clock }),
    target: bootyControlFx
});
const attractBooty = (0, effector_1.createEvent)();
(0, effector_1.sample)({
    clock: attractBooty,
    source: ship_1.shipModel.$userPositionStore,
    target: hitSectorFx,
});
exports.projectorControl = (0, throttle_1.throttle)(attractBooty, 300);
