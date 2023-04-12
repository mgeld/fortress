import { sample } from "effector";
import { pointerMapModel } from "entities/pointer";
import { pointersAPI } from "shared/api/events";

export const filterPointersStore = () => {
    sample({
        clock: pointersAPI.events.setPointers,
        source: pointerMapModel.$pointersStore,
        fn: pointersStore => pointersStore.filter(pointer => pointer.userId !== 0),
        target: pointerMapModel.$pointersStore
    })
}