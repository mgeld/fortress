import { FC } from "react";

import styles from './styles.module.scss'
import { userModel } from "entities/user";

export const MapRang: FC = () => {
    
    return (
        <div className={`${styles.mapRang} strw1`}>
            <div className={styles.__rang}>
                {userModel.selectors.useRankLevel()}
            </div>
            <div className={styles.__name}>
                <div className={`${styles.__text}`}>
                    <div>Ранг</div>
                    <div>завоеваний</div>
                </div>
            </div>
        </div>
    )
}