import { FC } from "react";

import styles from './styles.module.scss'

export const BattleType: FC = () => {
    return (
        <div className={`${styles.battleType}`}>
            <div className={`${styles.__rang} strw2`}>
                1Х1
            </div>
            <div className={`${styles.__name} strw1`}>
                <div className={`${styles.__text}`}>
                    <div>Арена</div>
                    <div>Сражений</div>
                </div>
            </div>
        </div>
    )
}