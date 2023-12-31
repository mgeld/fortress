import { TLatLng } from "@ctypes/model";
import { sample } from "effector";
import { mapModel } from "entities/map";
import { shipModel } from "entities/ship";
import { pageModel } from "shared/ui/page-root";

// export const filterPointersStore = () => {
//     sample({
//         clock: pointerMapModel.effects.getUsersFx.doneData,
//         source: {
//             userId: userModel.$userIdStore
//         },
//         fn: ({ userId }, pointers) => pointers.filter(pointer => pointer.userId !== userId),
//         target: pointerMapModel.$pointersStore
//     })
// }

export const mapStartPosition = () => {
    sample({
        clock: [pageModel.events.setPage,pageModel.events.returnPage],
        source: shipModel.$userPositionStore,
        filter: (pos: TLatLng, clock) => clock === 'map',
        target: mapModel.$mapCenterDefaultStore
    })
}