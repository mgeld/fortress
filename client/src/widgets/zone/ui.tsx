import { FC } from "react";

import { BackMap } from "shared/ui/back-button";

import styles from './styles.module.scss'

import { ratingModel } from "widgets/layout-rating";
import { IconTerrain } from "shared/assets/icons/_icons";

import { Profile } from "./profile";

export const LayoutZone: FC = () => {

    const statistic = ratingModel.selectors.useSelectZone()

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

                {statistic ?
                    <Profile statistic={statistic} />
                    :
                    <div className={styles.noData}>
                        <div>Загрузка...</div>
                    </div>}

                <BackMap color="#9e7cc3" />

            </div>
        </div>
    )
}