import { FC } from "react";

import { BackMap } from "shared/ui/back-button";
import { getSatelliteAPI } from "shared/api/get-satellite";
import { pageModel } from "shared/ui/page-root";
import { ratingAPI } from "shared/api/events";
import { IRatingZone } from "@ctypes/model";

import { ratingModel } from ".";

import { IconTrophy, IconZone } from "widgets/map-region/battle-counters/icons/_icons";

import styles from './styles.module.scss'

export const LayoutRating: FC = () => {

    const zones = ratingModel.selectors.useRatingZones()

    const onZone = (zone: IRatingZone) => {
        ratingAPI.events.selectRatingZone(zone)
        pageModel.events.setPage('zone')
        getSatelliteAPI(zone.latlng, zone.id)
    }

    return (
        <>
            <div className={styles.ratingLayout}>
                <div className={styles.__content}>

                    <div className={styles.__header}>
                        <div className={styles.iosTop} />
                        <div className={styles.__main}>

                            <div className={styles.name}>
                                <div className={styles.icon}>
                                    <IconTrophy width={24} height={24} />
                                </div>
                                <div className={styles.text}>Топ 20</div>
                            </div>

                        </div>
                    </div>

                    <div className={styles.__before} />

                    {zones ?
                        <div className={styles.ratingList}>
                            {zones.map((item, i) => {
                                return (
                                    <div
                                        onClick={() => onZone(item)}
                                        className={styles.zone}
                                    >

                                        <div className={styles.image}>
                                            <div className={styles.number}>{i + 1}</div>
                                            <img src={item.icon} alt="<>" />
                                        </div>

                                        <div className={styles.info}>
                                            <div className={styles.user}>
                                                <div className={styles.name}>
                                                    {item.name}
                                                </div>
                                                <div className={styles.sectors}>
                                                    <div className={styles.icon}>
                                                        <IconZone width={20} height={20} />
                                                    </div>
                                                    <div className={styles.text}>
                                                        Всего секторов:
                                                    </div>
                                                    <div className={styles.count}>
                                                        {item.zone_sectors}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.showing}>
                                                <div className={styles.trophies}>
                                                    
                                                    <div className={styles.__stroke}>
                                                        <div className={styles.count}>
                                                            {item.trophies}
                                                        </div>
                                                        <div className={styles.icon}>
                                                            <IconTrophy />
                                                        </div>
                                                    </div>
                                                    <div className={styles.__whiteEffect}><div /></div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })}
                        </div> :
                        <div className={styles.noData}>
                            <div>Загрузка...</div>
                        </div>}

                    <BackMap color="#a542d3" />

                </div>
            </div>
        </>
    )
}