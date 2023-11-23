import { FC } from "react";
import { IconBattleLoupe } from "shared/assets/icons/_icons";

import { battleAPI, mapAPI } from "shared/api/events";
import { battleLeaveEvent } from "features/battle";
import { popoutModel } from "shared/ui/popout-root";

import styles from './styles.module.scss'

export const BattlePending: FC = () => {

    const breakBattlePending = () => {
        mapAPI.events.setMapMode('invade')
        battleAPI.events.setBattleStatus("default")
        popoutModel.events.setPopout(null)
        battleLeaveEvent.battleLeave()
    }

    return (
        <div className={styles.battleRoot}>
            <div className={styles.battlePending}>
                <div className={`${styles.__content} strw2`}>

                    {/* <div className={styles.__header}>
                    <div className={styles.__border}>
                        <div className={styles.name}>
                            Навигатор
                        </div>
                    </div>
                </div> */}

                    <div className={styles.__search}>
                        <IconBattleLoupe />
                    </div>

                    <div className={styles.__text}>
                        Поиск противников<span>...</span>
                    </div>

                    <div className={styles.button}>
                        <div
                            className={styles.__break}
                            onClick={breakBattlePending}
                        >
                            Прервать
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}