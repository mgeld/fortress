import { sample } from "effector"
import { pointerMapModel } from "entities/pointer"
import { userModel } from "entities/user"
import { pointersAPI } from "shared/api/events"

export const filterPointers = () => {
    sample({
        // clock: pointerMapModel.effects.getUsersFx.doneData,
        clock: pointersAPI.events.setPointers,
        source: {
            userId: userModel.$userIdStore,
        },
        fn: ({ userId }, pointers) => pointers.filter(pointer => pointer.userId !== userId),
        target: pointerMapModel.$pointersStore
    })
}