import { createEffect, createEvent, sample } from "effector"
import { holdModel } from "entities/hold"
import { TExtraction } from "entities/hold/model/hold"
import { delExtractionAPI } from "shared/api/delete-extraction"
import { useExtractionAPI } from "shared/api/use-extraction"

export const onUseExtraction = createEvent()

sample({
    clock: onUseExtraction,
    source: holdModel.$extractionSelect,
    filter: (extr): extr is TExtraction => extr !== null,
    target: createEffect((extr: TExtraction) => {
        useExtractionAPI(extr.id, extr.index)
    })
})

export const deleteExtraction = createEvent()

sample({
    clock: deleteExtraction,
    source: holdModel.$extractionSelect,
    filter: (extr): extr is TExtraction => extr !== null,
    target: createEffect((extr: TExtraction) => {
        delExtractionAPI(extr.id, extr.index)
    })
})
