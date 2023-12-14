import { FC } from "react";

import styles from './styles.module.scss'
import { ratingModel } from "widgets/layout-rating";

export const Zone: FC = () => {

    const zone = ratingModel.selectors.useSelectZone()

    if (!zone) return <></>

    return (
        <div className={styles.zone}>

            <div className={styles.__content}>

                <div className={styles.icon}>
                    <img src={zone.icon} alt="<>" />
                </div>
                <div className={`${styles.name} strw2`}>
                    {zone.name}
                </div>

                <div className={styles.__whiteEffect}>
                    <div />
                </div>

            </div>

        </div>
    )
}