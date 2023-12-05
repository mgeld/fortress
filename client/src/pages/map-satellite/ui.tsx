import { FC } from "react";

import styles from './styles.module.scss'

import MapSatelliteLayout from "widgets/map-satellite/container/ui/map-satellite-layout";
import { Zone } from "widgets/map-satellite/buttons/zone";
import { CloseSatellite } from "widgets/map-satellite/close-satellite";

export const MapSatellitPage: FC = () => {

    return (
        <div className={styles.mapPage}>
            <div className={styles.__page}>
                <Zone />
                <MapSatelliteLayout />
                <CloseSatellite />
            </div>
        </div>
    )
}