import { sample } from "effector";
import { pointerMapModel } from "entities/pointer";
import { userModel } from "entities/user";
import { pointersAPI } from "shared/api/events";

export const filterPointersStore = () => {
    sample({
        clock: pointersAPI.events.setPointers,
        source: {
            userId: userModel.$userIdStore,
            pointers: pointerMapModel.$pointersStore,
        },
        fn: ({ userId, pointers }) => pointers.filter(pointer => pointer.userId !== userId),
        target: pointerMapModel.$pointersStore
    })
}