import { FC } from "react";

import styles from './styles.module.scss'
// import { ratingModel } from "widgets/layout-rating";
import { mapSatelliteModel } from "entities/map";
import { IconZone } from "widgets/map-region/counters/icons/_icons";
import { IconTerrain } from "shared/assets/icons/_icons";

export const Profile: FC = () => {

    const satellite = mapSatelliteModel.selectors.useMapSatellite()

    if (!satellite) return <></>

    return (
        <div className={styles.zone}>

            <div className={styles.__content}>

                <div className={styles.icon}>
                    {/* <img src={zone.icon} alt="<>" /> */}
                    {satellite.type === 'sector' ? <IconZone width={28} height={28} /> : <IconTerrain width={28} height={28} />}
                </div>
                <div className={`${styles.name} strw2`}>
                    {satellite.name}
                </div>

                <div className={styles.__whiteEffect}>
                    <div />
                </div>

            </div>

        </div>
    )
}