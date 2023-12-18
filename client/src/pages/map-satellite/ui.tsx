import { FC } from "react";

import styles from './styles.module.scss'

import { CloseSatellite } from "widgets/map-satellite/close-satellite";
import { Profile } from "widgets/map-satellite/buttons/profile";
import { MapSatelliteLayout } from "widgets/map-satellite/container";

export const MapSatellitPage: FC = () => {

    return (
        <div className={styles.mapPage}>
            <div className={styles.__page}>
                <Profile />
                <MapSatelliteLayout />
                <CloseSatellite />
            </div>
        </div>
    )
}