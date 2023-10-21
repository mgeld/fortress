import { sample } from "effector";
import { pointerMapModel } from "entities/pointer";
import { userModel } from "entities/user";

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
export {}