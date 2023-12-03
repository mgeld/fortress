import { FC, ReactElement } from "react";

import styles from './styles.module.scss'
import { ratingModel } from ".";
import { BackMap } from "widgets/back-button";
import { IconTrophy, IconZone } from "widgets/counters/icons/_icons";
import { IconHold } from "entities/ship/ui/assets/icons";

export const LayoutRating: FC<{ children: ReactElement }> = ({ children }) => {

    const zones = ratingModel.selectors.useRating().zones

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
                                    <div className={styles.zone}>


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
                                                        Количество секторов:
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
                            <div>Трюм пустой</div>
                        </div>}


                    <BackMap />

                </div>
            </div>
        </>
    )
}