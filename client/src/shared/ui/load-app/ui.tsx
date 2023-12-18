import { FC } from "react";
import { IconShip } from "shared/assets/icons/_icons";

import styles from './styles.module.scss'

export const LoadApp: FC = () => {
    return (
        <div className={styles.loadAppRoot}>
            <div className={styles.loadApp}>
                <div className={`${styles.__content} strw2`}>

                    <div className={styles.__load}>
                        <IconShip width={44} height={44} fill="#393E46" />
                    </div>
                    <div className={styles.__text}>
                        Загружаем<span>...</span>
                    </div>
                </div>
            </div>
        </div>
    )
}