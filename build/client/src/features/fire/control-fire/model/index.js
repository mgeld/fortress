"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fireControl = void 0;
const effector_1 = require("effector");
const pointer_1 = require("entities/pointer");
const user_1 = require("entities/user");
const fire_1 = require("shared/api/fire");
const compare_pos_1 = require("../lib/compare-pos");
const events_1 = require("shared/api/events");
const isHitFireTarget_1 = require("shared/lib/isHitFireTarget");
const fromToDirectionPos_1 = require("shared/lib/fromToDirectionPos");
const weapon_1 = require("entities/weapon");
const arena_1 = require("entities/arena");
const battle_fire_1 = require("shared/api/battle-fire");
const ship_1 = require("entities/ship");
const hitPointersFx = (0, effector_1.createEffect)(({ source, fire }) => {
    let hitPointer = {
        health: 0,
        userId: 0,
        pos: [0, 0]
    };
    let to_pos = (0, fromToDirectionPos_1.fromToDirectionPos)(source.userPos, fire.direction, source.distance);
    source.pointers.sort((0, compare_pos_1.comparePos)(fire.direction)).every(pointer => {
        if (pointer.health < 1)
            return true;
        let isFire = (0, isHitFireTarget_1.isHitFireTarget)({
            from: source.userPos,
            to: to_pos,
            marker: pointer.pos,
            radius: 0.0004,
            direction: fire.direction
        });
        if (isFire) {
            hitPointer = {
                health: pointer.health,
                userId: pointer.userId,
                pos: pointer.pos
            };
            return false;
        }
        return true;
    });
    return {
        hitPointer,
        toPos: to_pos,
        distance: source.distance
    };
});
const fireControlFx = (0, effector_1.createEffect)(({ source, clock }) => {
    const FIRE_ID = Date.now();
    let _fire = {
        id: FIRE_ID,
        from_pos: clock.params.source.userPos,
        to_pos: clock.result.toPos,
        direction: clock.params.fire.direction
    };
    if (clock.result.hitPointer.userId) {
        _fire['hit_pos'] = clock.result.hitPointer.pos;
    }
    events_1.firesAPI.events.addFire(_fire);
    if (clock.result.distance) {
        if (source.battleStatus === 'default' ||
            source.battleStatus === 'over') {
            (0, fire_1.fireAPI)(clock.params.source.userPos, clock.result.toPos, clock.params.fire.direction, clock.result.hitPointer);
        }
        else {
            (0, battle_fire_1.battleFireAPI)(clock.params.source.userPos, clock.result.toPos, clock.params.fire.direction, clock.result.hitPointer);
        }
    }
    setTimeout(() => {
        events_1.firesAPI.events.delFireById({ fire_id: FIRE_ID });
        if (clock.result.hitPointer.userId) {
            events_1.pointersAPI.events.changeHealthPointer({
                health: source.gunPower,
                userId: clock.result.hitPointer.userId,
            });
        }
    }, 550);
});
(0, effector_1.sample)({
    clock: hitPointersFx.done,
    source: {
        userId: user_1.userModel.$userIdStore,
        battleStatus: arena_1.arenaModel.$battleStatusStore,
        gunPower: weapon_1.weaponModel.$gunPowerStore,
    },
    fn: (source, clock) => ({ source, clock }),
    target: fireControlFx
});
const hitFireOutTarget = (0, effector_1.createEvent)();
(0, effector_1.sample)({
    clock: hitFireOutTarget,
    source: {
        pointers: pointer_1.pointerMapModel.$pointersStore,
        userPos: ship_1.shipModel.$userPositionStore,
        distance: weapon_1.weaponModel.$gunDistanceStore,
    },
    fn: (source, clock) => ({ source, fire: clock }),
    target: hitPointersFx,
});
const fireControl = (e) => hitFireOutTarget({
    direction: e.direction
});
exports.fireControl = fireControl;
