import { createEffect, createEvent, sample } from "effector"
import { arenaModel } from "entities/arena"
import { TArenaStore } from "entities/arena/model/arena"
import { mapModel } from "entities/map"
import { battleGetAboutSectorAPI } from "shared/api/battle-get-about-sector"
import { TMapModes } from "shared/api/events/map"
import { getAboutSectorAPI } from "shared/api/get-about-sector"

type TSource = {
    mapMode: TMapModes | null
    arena: TArenaStore
}

const aboutSectorFx = createEffect(({
    source,
    sect
}: {
    source: TSource
    sect: string
}) => {
    if (!source.mapMode) return
    if (
        source.mapMode === 'invade'
    ) {
        getAboutSectorAPI(sect)
    } else {
        if (source?.arena)
            battleGetAboutSectorAPI(sect, source.arena.id)
    }
})

const getAboutInfo = createEvent<string>()

sample({
    clock: getAboutInfo,
    source: {
        mapMode: mapModel.$mapMode,
        arena: arenaModel.$arenaStore
    },
    fn: (source, sect) => ({ source, sect }),
    target: aboutSectorFx
})

export const events = {
    getAboutInfo
}