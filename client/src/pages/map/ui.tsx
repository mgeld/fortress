import { FC } from "react";
import { MapBottom } from "widgets/map-bottom";
import { MapButtons } from "widgets/map-buttons";

import styles from './styles.module.scss'
import { BattleCounters } from "widgets/battle-counters";
import { BattleType } from "entities/arena/ui/battle-type";

import { MapRang } from "entities/user/ui/map-rang";
import { Counters } from "widgets/counters/counters";

import MapLayout from "widgets/map-layout/ui/map-layout";
import { Timer } from "entities/arena/ui/timer";
import { mapModel } from "entities/map";

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