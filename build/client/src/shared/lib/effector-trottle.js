"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.effectorThrottle = void 0;
const effector_1 = require("effector");
function effectorThrottle({ source, timeout, target = (0, effector_1.createEvent)(), }) {
    if (!effector_1.is.unit(source))
        throw new TypeError('source must be unit from effector');
    const $timeout = toStoreNumber(timeout);
    const timerFx = (0, effector_1.createEffect)((timeout) => new Promise((resolve) => setTimeout(resolve, timeout)));
    const $payload = (0, effector_1.createStore)(null, { serialize: 'ignore' }).on(source, (_, payload) => payload);
    const triggerTick = (0, effector_1.createEvent)();
    const $canTick = (0, effector_1.createStore)(true, { serialize: 'ignore' })
        .on(triggerTick, () => false)
        .on(target, () => true);
    (0, effector_1.guard)({
        clock: source,
        filter: $canTick,
        target: triggerTick,
    });
    (0, effector_1.sample)({
        source: $timeout,
        clock: triggerTick,
        target: timerFx,
    });
    (0, effector_1.sample)({
        source: $payload,
        clock: timerFx.done,
        target,
    });
    return target;
}
exports.effectorThrottle = effectorThrottle;
function toStoreNumber(value) {
    if (effector_1.is.store(value))
        return value;
    if (typeof value === 'number') {
        if (value < 0 || !Number.isFinite(value))
            throw new Error(`timeout must be positive number or zero. Received: "${value}"`);
        return (0, effector_1.createStore)(value, { name: '$timeout' });
    }
    throw new TypeError(`timeout parameter should be number or Store. "${typeof value}" was passed`);
}
