import { FC } from "react";

import styles from './styles.module.scss'
import { BattleType } from "entities/arena/ui/battle-type";

import { MapRang } from "entities/user/ui/map-rang";

import { Timer } from "entities/arena/ui/timer";
import { mapModel } from "entities/map";
import MapLayout from "widgets/map-region/container/ui/map-layout";
import { MapButtons } from "widgets/map-region/map-buttons";
import { Counters } from "widgets/map-region/counters/counters";
import { BattleCounters } from "widgets/map-region/battle-counters";
import { MapBottom } from "widgets/map-region/map-bottom";

export const MapPage: FC = () => {

    const mode = mapModel.selectors.useMapMode().mode
    return (
        <div className={styles.mapPage}>
            <div className={styles.__page}>

                {mode === 'invade' ? (
                    <>
                        <MapButtons />
                        <MapRang />
                        <Counters />
                    </>
                ) :
                    mode === 'battle' ? (
                        <>
                            <Timer />
                            <BattleType />
                            <BattleCounters />
                        </>
                    ) : <>
                        <MapRang />
                        <Counters />
                    </>}

                <MapLayout />
                <MapBottom />

            </div>
        </div>
    )
}