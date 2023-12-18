import { FC } from "react";

import { IRatingZone } from "@ctypes/model";
import { ratingAPI } from "shared/api/events";
import { BackMap } from "shared/ui/back-button";
import { pageModel } from "shared/ui/page-root";
import { getSatelliteAPI } from "shared/api/get-satellite";

import styles from './styles.module.scss'

import { userModel } from "entities/user";
import { popoutModel } from "shared/ui/popout-root";
import { ratingModel } from "widgets/layout-rating";
import { Ranks, TRank } from "entities/user/lib/ranks";
import { TZoneLevel, ZoneLevel } from "entities/zone/lib/zone-level";
import { IconSettings, IconTerrain, IconVK } from "shared/assets/icons/_icons";
import { IconExperience, IconZone } from "widgets/map-region/battle-counters/icons/_icons";

import Link from "shared/ui/link/ui";
import { mapSatelliteModel } from "entities/map";

export const LayoutZone: FC = () => {

    const myZoneId = userModel.selectors.useUserId()

    const statistic = ratingModel.selectors.useSelectZone()

    const onZone = (zone: IRatingZone) => {
        // ratingAPI.events.selectRatingZone(zone)
        mapSatelliteModel.events.setMapSatellite({
            type: 'zone',
            latlng: zone.latlng,
            name: zone.name,
        })
        pageModel.events.setPage('map-satellite')
        getSatelliteAPI(zone.latlng, zone.id)
    }

    if (!statistic) return <></>

    const progressExp = statistic.rank_exp * 100 / Ranks.getExp(statistic.rank_level as TRank);

    const zoneSects = statistic.zone_sectors - (ZoneLevel.getMaxLevelAllSectors(statistic.zone_level - 1 as TZoneLevel) || 0)
    const progressZone = zoneSects * 100 / ZoneLevel.getMaxLevelSectors(statistic.zone_level as TZoneLevel)

    return (
        <div className={styles.zoneLayout}>
            <div className={styles.__content}>

                <div className={styles.__header}>
                    <div className={styles.iosTop} />
                    <div className={styles.__main}>

                        <div className={styles.name}>
                            <div className={styles.icon}>
                                <IconTerrain width={32} height={32} />
                            </div>
                            <div className={styles.text}>Зона</div>
                        </div>

                    </div>
                </div>

                <div className={styles.__before} />

                <div className={styles.profileMain}>

                    <div className={styles.zone}>

                        <div className={styles.left}>
                            <div className={styles.image}>
                                <img src={statistic.icon} alt="<>" />
                            </div>
                            <div className={styles.uid}>
                                <div className={styles.zid}>ID зоны</div>
                                <div className={styles.number}>
                                    {statistic.id}
                                </div>
                            </div>
                        </div>

                        <div className={styles.info}>
                            <div className={styles.user}>
                                <div className={styles.name}>

                                    <div className={styles.text}>
                                        {statistic.name}
                                    </div>

                                    {myZoneId === statistic.id && <div
                                        className={styles.edit}
                                        onClick={() => popoutModel.events.setPopout('zone-edit')}
                                    >
                                        <IconSettings width={26} height={26} />
                                    </div>}

                                </div>
                            </div>
                            <div className={styles.showing}>

                                <div className={styles.progressLayout}>

                                    <div className={styles._header}>
                                        <div className={styles.name}>
                                            Ранг завоеваний
                                        </div>
                                        <div className={styles.amount}>
                                            {statistic.rank_level}
                                        </div>
                                    </div>

                                    <div className={styles._bar}>
                                        <div className={styles.icon}>
                                            <IconExperience width={30} height={30} />
                                        </div>
                                        <div className={styles.details}>
                                            <div className={styles.name}>
                                                Опыт завоеваний
                                            </div>
                                            <div className={styles.line}>
                                                <div
                                                    className={styles.progress}
                                                    style={{
                                                        width: `${progressExp > 100 ? 100 : progressExp}%`
                                                    }}>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className={styles.progressLayout}>

                                    <div className={styles._header}>
                                        <div className={styles.name}>
                                            Уровень зоны
                                        </div>
                                        <div className={styles.amount}>
                                            {statistic.zone_level}
                                        </div>
                                    </div>

                                    <div className={styles._bar}>
                                        <div className={styles.icon}>
                                            <IconZone width={29} height={29} />
                                        </div>
                                        <div className={styles.details}>
                                            <div className={styles.name}>
                                                Захвачено
                                            </div>
                                            <div className={styles.line}>
                                                <div
                                                    className={styles.progress}
                                                    style={{
                                                        width: `${progressZone > 100 ? 100 : progressZone}%`
                                                    }}
                                                >
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>


                    <div
                        className={styles.infoZone}
                    >
                        <div className={styles.topInfo}>
                            О зоне
                        </div>
                        <div className={styles.description}>
                            {statistic.description.length > 0 ? statistic.description : 'Нет описании'}
                        </div>
                    </div>

                    <div className={styles.sections}>
                        <div className={styles.__flex}>

                            <div
                                onClick={() => onZone(statistic)}
                                className={styles.section}
                            >
                                <div className={styles.item}>
                                    <div className={styles.icon}>
                                        <IconTerrain width={44} height={44} />
                                    </div>
                                    <div className={styles.name}>
                                        <div>Посмотреть территорию</div>
                                    </div>
                                </div>
                            </div>

                            <Link
                                className={styles.section}
                                link={'https://vk.me/id' + statistic.vk_id}
                            >
                                <div className={styles.item}>
                                    <div className={styles.icon}>
                                        <IconVK width={44} height={44} />
                                    </div>
                                    <div className={styles.name}>
                                        <div>
                                            Написать сообщение
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* <div
                                    onClick={() => {
                                        // popoutModel.events.setPopout(null)
                                        pageModel.events.setPage('zone')
                                    }}
                                    className={styles.section}
                                >
                                    <div className={styles.item}>
                                        <div className={styles.icon}>
                                            <div className={styles.svg}>
                                                <IconTrophy width={32} height={32} />
                                            </div>
                                        </div>
                                        <div className={styles.name}>
                                            <div>Передать предмет</div>
                                        </div>
                                    </div>
                                </div> */}


                        </div>
                    </div>
                </div>


                {/* <div className={styles.noData}>
                            <div>Загрузка...</div>
                        </div> */}

                <BackMap color="#9e7cc3" />

            </div>
        </div>
    )
}