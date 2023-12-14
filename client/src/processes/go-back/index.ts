import bridge from "@vkontakte/vk-bridge"
import { createEffect, createEvent, sample } from "effector"
import { pageModel } from "shared/ui/page-root"
import { TPage } from "shared/ui/page-root/page-root/model"
import { popoutModel } from "shared/ui/popout-root"
import { TPopout } from "shared/ui/popout-root/model"

export const goBack = createEvent()

type TBackFxProps = {
    // page: TPage
    history: TPage[]
    popout: TPopout | null
}

const backFx = createEffect(({
    // page,
    history,
    popout
}: TBackFxProps) => {
    if (popout) {
        popoutModel.events.setPopout(null)
    } else {
        if(history.length > 1) {
            pageModel.events.delHistoryPage()
            pageModel.events.returnPage(history[0])
        } else {
            bridge.send("VKWebAppClose", { "status": "success" });
        }
    }
})

sample({
    clock: goBack,
    source: {
        // page: pageModel.$pageStore,
        history: pageModel.$historyStore,
        popout: popoutModel.$popoutStore
    },
    // fn: ({ page, popout }) => ({ page, popout }),
    target: backFx
})