"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterPointers = void 0;
const effector_1 = require("effector");
const pointer_1 = require("entities/pointer");
const user_1 = require("entities/user");
const events_1 = require("shared/api/events");
const filterPointers = () => {
    (0, effector_1.sample)({
        clock: events_1.pointersAPI.events.setPointers,
        source: {
            userId: user_1.userModel.$userIdStore,
        },
        fn: ({ userId }, pointers) => pointers.filter(pointer => pointer.userId !== userId),
        target: pointer_1.pointerMapModel.$pointersStore
    });
};
exports.filterPointers = filterPointers;
