import { createEffect, createEvent, sample } from "effector"
import { extractionModel } from "entities/extraction"
import { TExtraction } from "entities/extraction/model"
import { useExtractionAPI } from "shared/api/use-extraction"

export const onUseExtraction = createEvent()

sample({
    clock: onUseExtraction,
    source: extractionModel.$extractionSelect,
    filter: (extr): extr is TExtraction => extr !== null,
    target: createEffect((extr: TExtraction) => {
        useExtractionAPI(extr.id, extr.index)
    })
})
