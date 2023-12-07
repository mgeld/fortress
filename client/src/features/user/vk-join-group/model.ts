// import { userModel } from "entities/user";
import { zoneModel } from "entities/zone";
import { createEffect, sample } from "effector";
import { popoutModel } from "shared/ui/popout-root";

type TMsgFxProps = {
    sectors: number
    // zoneId: number
}

export const initVkJoinGroup = () => { }

const isMessageFx = createEffect(async ({
    sectors,
    // zoneId
}: TMsgFxProps) => {
    if (sectors === 3) {
        setTimeout(() => popoutModel.events.setPopout('vk-join-group'), 3000)
    }
})

sample({
    clock: zoneModel.events.addSector,
    source: {
        sectors: zoneModel.$zoneSectorsStore,
        // zoneId: userModel.$userIdStore
    },
    target: isMessageFx
})

