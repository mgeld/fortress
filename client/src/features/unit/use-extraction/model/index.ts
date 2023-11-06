import { createEffect, createEvent, sample } from "effector"
import { extractionModel } from "entities/unit"
import { TExtraction } from "entities/unit/model/extraction"
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
