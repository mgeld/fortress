// import { userModel } from "entities/user";
import { zoneModel } from "entities/zone";
import { createEffect, createEvent, sample } from "effector";
import { popoutModel } from "shared/ui/popout-root";
import { userModel } from "entities/user";
import { citadelModel } from "entities/citadel";
import { ratingAPI } from "shared/api/events";
import { IRatingZone } from "@ctypes/model";

type TMsgFxProps = {
    sectors: number
    // zoneId: number
}

export const initSelectZoneSample = () => { }


const selectMyZone = createEvent()

sample({
    clock: selectMyZone,
    source: {
        id: userModel.$userIdStore,
        color: zoneModel.$zoneColorStore,
        description: zoneModel.$zoneDescriptionStore,
        trophies: zoneModel.$zoneTrophiesStore,

        zone_level: zoneModel.$zoneLevelStore,
        zone_sectors: zoneModel.$zoneSectorsStore,
        rank_level: userModel.$rankLevelStore,
        rank_exp: userModel.$rankExpStore,
        icon: userModel.$userIconStore,
        name: userModel.$userNameStore,

        citadel: citadelModel.$citadelStore,

        vk_id: userModel.$userVkIdStore
    },
    fn: (source): IRatingZone => ({
        id: source.id,
        color:  source.color,
        description: source.description,
        trophies: source.trophies,

        zone_level: source.zone_level,
        zone_sectors: source.zone_sectors,
        rank_level: source.rank_level,
        rank_exp: source.rank_exp,
        icon: source.icon,
        name: source.name,

        sectorId: source.citadel!.id,
        latlng: source.citadel!.latlng,

        vk_id: source.vk_id,
    }),
    target: ratingAPI.events.selectRatingZone
})

export const setSelectMyZone = () => selectMyZone()