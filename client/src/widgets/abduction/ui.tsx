import { FC } from "react";

import { BackMap } from "shared/ui/back-button";
import { pageModel } from "shared/ui/page-root";

import { abductionModel } from ".";

import { IconZone } from "widgets/map-region/battle-counters/icons/_icons";

import { FButton } from "shared/ui/fbutton/ui";
import { popoutModel } from "shared/ui/popout-root";
import { IconShipBeam } from "shared/assets/icons/_icons";

import { getZoneAPI } from "shared/api/get-zone";

import styles from './styles.module.scss'
import { dateTime } from "shared/lib/date-time";

export const LayoutAbduction: FC = () => {

    const zones = abductionModel.selectors.useAbductionZones()

    const onZone = (zone: number) => {
        // ratingAPI.events.selectRatingZone(zone)
        getZoneAPI(zone)
        pageModel.events.setPage('zone')
        // getSatelliteAPI(zone.latlng, zone.id)
    }

    return (
        <>
            <div className={styles.abductionLayout}>
                <div className={styles.__content}>

                    <div className={styles.__header}>
                        <div className={styles.iosTop} />

                        <div className={styles.__main}>

                            <div className={styles.name}>
                                <div className={styles.icon}>
                                    <IconShipBeam width={34} height={34} />
                                </div>
                                <div className={styles.text}>Похищенные</div>

                            </div>

                        </div>
                    </div>

                    <div className={styles.__before} />

                    <div className={styles.button}>
                        <FButton
                            text="Похитить"
                            _click={() => popoutModel.events.setPopout('abduction-link')}
                        />
                    </div>

                    {zones ?
                        <div className={styles.abductionList}>
                            {zones.map((item, i) => {
                                return (
                                    <div
                                        key={item.zone_id}
                                        onClick={() => onZone(item.zone_id)}
                                        className={styles.zone}
                                    >

                                        <div className={styles.image}>
                                            {/* <div className={styles.number}>{i + 1}</div> */}
                                            <img src={item.icon} alt="<>" />
                                        </div>

                                        <div className={styles.info}>
                                            <div className={styles.user}>
                                                <div className={styles.name}>
                                                    {item.name}
                                                </div>
                                                <div className={styles.sectors}>
                                                    {/* <div className={styles.icon}>
                                                        <IconZone width={20} height={20} />
                                                    </div> */}
                                                    <div className={styles.text}>
                                                        Похищен
                                                    </div>
                                                    <div className={styles.count}>
                                                        {/* {item.zone_sectors} */}
                                                        {dateTime(item.date * 1000)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.showing}>
                                                <div className={styles.trophies}>

                                                    <div className={styles.__stroke}>
                                                        <div className={styles.count}>
                                                            {item.sectors}
                                                        </div>
                                                        <div className={styles.icon}>
                                                            {/* <IconTrophy /> */}
                                                            <IconZone width={26} height={26} />
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